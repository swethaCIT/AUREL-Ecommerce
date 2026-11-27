from urllib.parse import urlparse

import requests


class DummyJsonApiError(Exception):
    pass


class DummyJsonTimeoutError(DummyJsonApiError):
    pass


def fetch_dummyjson_products(api_url, timeout, page_size=100):
    parsed_url = urlparse(api_url)
    if parsed_url.scheme not in {"http", "https"} or not parsed_url.netloc:
        raise DummyJsonApiError("DUMMYJSON_PRODUCTS_URL must be an HTTP(S) URL.")
    if timeout <= 0:
        raise DummyJsonApiError("DUMMYJSON_TIMEOUT must be greater than zero.")

    products = []
    skip = 0
    total = None

    while total is None or skip < total:
        try:
            response = requests.get(
                api_url,
                params={"limit": page_size, "skip": skip},
                timeout=timeout,
            )
            response.raise_for_status()
            payload = response.json()
        except requests.Timeout as error:
            raise DummyJsonTimeoutError(
                "Timed out while requesting products from DummyJSON."
            ) from error
        except requests.RequestException as error:
            raise DummyJsonApiError(
                "DummyJSON could not provide the product catalogue."
            ) from error
        except ValueError as error:
            raise DummyJsonApiError(
                "DummyJSON returned an invalid JSON response."
            ) from error

        if not isinstance(payload, dict) or not isinstance(
            payload.get("products"), list
        ):
            raise DummyJsonApiError(
                "DummyJSON returned an invalid product catalogue response."
            )
        response_total = payload.get("total")
        if isinstance(response_total, bool) or not isinstance(response_total, int):
            raise DummyJsonApiError(
                "DummyJSON returned an invalid product count."
            )
        if response_total < 0:
            raise DummyJsonApiError(
                "DummyJSON returned an invalid product count."
            )
        if total is None:
            total = response_total
        elif response_total != total:
            raise DummyJsonApiError(
                "The DummyJSON catalogue changed during pagination."
            )

        page = payload["products"]
        if skip < total and not page:
            raise DummyJsonApiError(
                "DummyJSON returned an incomplete product catalogue."
            )
        products.extend(page)
        skip += len(page)

    return products
