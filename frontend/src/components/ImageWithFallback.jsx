import { useState } from 'react'
import fallbackImage from '../assets/product-fallback.svg'

function ImageWithFallback({ src, alt, ...imageProps }) {
  const [failedSource, setFailedSource] = useState('')
  const hasFailed = failedSource === src

  return (
    <img
      {...imageProps}
      src={hasFailed ? fallbackImage : src}
      alt={alt}
      onError={() => {
        if (!hasFailed) setFailedSource(src)
      }}
    />
  )
}

export default ImageWithFallback
