const imageUrl = (photoId, width = 960) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=82`

export const categories = [
  {
    name: 'Men',
    slug: 'men',
    detail: 'Everyday pieces, considered',
    image: imageUrl('photo-1523398002811-999ca8dec234', 1200),
    alt: 'Men’s contemporary everyday fashion',
  },
  {
    name: 'Women',
    slug: 'women',
    detail: 'New season, made personal',
    image: imageUrl('photo-1512316609839-ce289d3eba0a', 1200),
    alt: 'Women’s new-season fashion in natural light',
  },
  {
    name: 'Kids',
    slug: 'kids',
    detail: 'Room to move and play',
    image: imageUrl('photo-1471286174890-9c112ffca5b4', 1200),
    alt: 'Children enjoying a bright outdoor day',
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    detail: 'A little room for ritual',
    image: imageUrl('photo-1556229010-6c3f2c9ca5f8', 1000),
    alt: 'Thoughtful skincare essentials',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    detail: 'The finishing touch',
    image: imageUrl('photo-1584917865442-de89df76afd3', 1000),
    alt: 'Sculptural leather accessories in warm neutral tones',
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    detail: 'Make room for feeling at home',
    image: imageUrl('photo-1616486338812-3dadae4b4ace', 1200),
    alt: 'Natural textures in a considered living space',
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    detail: 'Good steps, every day',
    image: imageUrl('photo-1542291026-7eec264c27ff', 1000),
    alt: 'A pair of everyday sneakers',
    isSubcategory: true,
  },
]

const categoryBySlug = new Map(
  categories
    .filter((category) => !category.isSubcategory)
    .map((category) => [category.slug, category]),
)

const productRows = [
  ['men-oxford-shirt', 'Northline', 'Relaxed Oxford Shirt', 'Shirts', 58, 84, 4.7, 238, 'A breathable cotton Oxford with an easy shape for workdays and weekends.', 'photo-1603252109303-2751441dd157', ['S', 'M', 'L', 'XL'], ['White', 'Sky'], true, 94],
  ['men-merino-crew', 'Alder House', 'Merino Crew-Neck', 'Knitwear', 92, 128, 4.6, 174, 'A fine merino layer with a soft hand and a clean, versatile profile.', 'photo-1618354691373-d851c5c3a990', ['S', 'M', 'L', 'XL'], ['Oat', 'Navy'], false, 88],
  ['men-tapered-chino', 'Stillform', 'Tapered Cotton Chinos', 'Trousers', 74, 105, 4.5, 192, 'Comfortable cotton chinos with a gently tapered leg and considered finishing.', 'photo-1624378439575-d8705ad7ae80', ['30', '32', '34', '36'], ['Stone', 'Olive'], false, 82],
  ['men-twill-overshirt', 'Loom & Field', 'Cotton Twill Overshirt', 'Outerwear', 98, 140, 4.8, 126, 'A sturdy midweight overshirt that works as a layer through changing seasons.', 'photo-1598033129183-c4f50c736f10', ['S', 'M', 'L', 'XL'], ['Moss', 'Charcoal'], true, 91],
  ['men-heavyweight-tee', 'Common Form', 'Heavyweight Everyday Tee', 'T-Shirts', 34, 49, 4.4, 321, 'A substantial cotton jersey tee with a relaxed shoulder and an easy drape.', 'photo-1521572163474-6864f9cf17ab', ['S', 'M', 'L', 'XL'], ['White', 'Black'], false, 86],
  ['men-city-trainer', 'Runwell', 'City Leather Trainer', 'Footwear', 110, 159, 4.6, 148, 'A minimal low-profile trainer designed to move comfortably through the day.', 'photo-1542291026-7eec264c27ff', ['8', '9', '10', '11'], ['White', 'Ink'], true, 89],
  ['men-commuter-pack', 'Northline', 'Canvas Commuter Backpack', 'Bags', 89, 129, 4.5, 102, 'A practical canvas carry with a padded sleeve and room for everyday essentials.', 'photo-1553062407-98eeb64c6a62', [], ['Olive', 'Black'], false, 74],
  ['men-brushed-coat', 'Alder House', 'Brushed Wool Coat', 'Outerwear', 185, 265, 4.8, 86, 'A softly structured wool-blend coat made for crisp mornings and long walks.', 'photo-1548126032-079a0fb0099d', ['S', 'M', 'L', 'XL'], ['Camel', 'Charcoal'], false, 80],
  ['men-leather-belt', 'Loom & Field', 'Reversible Leather Belt', 'Accessories', 42, 60, 4.3, 113, 'A simple leather belt with a reversible finish for a little more versatility.', 'photo-1617127365659-c47fa864d8bc', ['S', 'M', 'L'], ['Tan', 'Black'], false, 70],
  ['men-everyday-watch', 'Morrow', 'Stainless Everyday Watch', 'Watches', 149, 199, 4.7, 94, 'A clean analogue watch with a brushed steel case and an easy-to-read dial.', 'photo-1523170335258-f5ed11844a49', [], ['Steel', 'Gold'], true, 84],

  ['women-fluid-midi', 'Willow & Rue', 'Fluid Midi Dress', 'Dresses', 118, 169, 4.7, 286, 'A fluid midi dress with soft movement and a shape that feels easy all day.', 'photo-1515886657613-9f3515b0c78f', ['XS', 'S', 'M', 'L', 'XL'], ['Rust', 'Ink'], true, 97],
  ['women-linen-set', 'Sol & Form', 'Linen Co-Ord Set', 'Sets', 138, 198, 4.6, 164, 'An airy linen shirt and trouser set for slower mornings and warm evenings.', 'photo-1525507119028-ed4c629a60a3', ['XS', 'S', 'M', 'L'], ['Sand', 'Sage'], true, 93],
  ['women-sculpted-blazer', 'Alder House', 'Sculpted Single-Breasted Blazer', 'Jackets', 165, 235, 4.8, 123, 'A softly tailored blazer with a neat shoulder and a relaxed, modern fit.', 'photo-1591047139829-d91aecb6caea', ['XS', 'S', 'M', 'L', 'XL'], ['Stone', 'Navy'], false, 88],
  ['women-rib-top', 'Common Form', 'Ribbed Cotton Tank', 'Tops', 36, 52, 4.5, 315, 'A close but comfortable ribbed tank made for layering or wearing on its own.', 'photo-1503342217505-b0a15ec3261c', ['XS', 'S', 'M', 'L'], ['Cream', 'Black'], false, 85],
  ['women-straight-denim', 'Denim State', 'Straight-Leg Denim', 'Jeans', 78, 112, 4.6, 207, 'Everyday denim with a straight leg, mid rise and a soft, lived-in feel.', 'photo-1541099649105-f69ad21f3246', ['26', '28', '30', '32'], ['Mid blue', 'Dark rinse'], true, 92],
  ['women-leather-flats', 'Aureline', 'Square-Toe Leather Flats', 'Footwear', 98, 140, 4.5, 118, 'A pared-back leather flat with a softly squared toe and cushioned footbed.', 'photo-1543163521-1bf539c55dd2', ['6', '7', '8', '9'], ['Black', 'Biscuit'], false, 82],
  ['women-shoulder-bag', 'Morrow & Co.', 'Soft-Structure Shoulder Bag', 'Handbags', 124, 178, 4.7, 137, 'A gently structured everyday bag with room for the pieces you keep close.', 'photo-1584917865442-de89df76afd3', [], ['Cocoa', 'Black'], true, 90],
  ['women-silk-scarf', 'Forma Atelier', 'Printed Silk Scarf', 'Accessories', 48, 68, 4.4, 82, 'A lightweight printed scarf with a soft sheen and several easy ways to wear it.', 'photo-1601924994987-69e26d50dc26', [], ['Terracotta', 'Blue'], false, 72],
  ['women-wrap-cardigan', 'Willow & Rue', 'Wrap Knit Cardigan', 'Knitwear', 89, 128, 4.8, 156, 'A soft wrap cardigan with a relaxed line for comfortable layering.', 'photo-1576566588028-4147f3842f27', ['XS', 'S', 'M', 'L'], ['Oat', 'Rose'], true, 91],
  ['women-wide-leg-trouser', 'Sol & Form', 'Pleated Wide-Leg Trouser', 'Trousers', 92, 132, 4.5, 146, 'A fluid wide-leg trouser with a clean pleat and a comfortable mid rise.', 'photo-1594633312681-425c7b97ccd1', ['XS', 'S', 'M', 'L'], ['Black', 'Olive'], false, 79],
  ['women-everyday-sneaker', 'City Edit', 'Everyday Leather Sneaker', 'Footwear', 106, 152, 4.6, 109, 'A versatile low-top sneaker with a cushioned sole and minimal detailing.', 'photo-1514989940723-e8e51635b782', ['6', '7', '8', '9'], ['White', 'Stone'], true, 87],
  ['women-evening-clutch', 'Morrow & Co.', 'Textured Evening Clutch', 'Handbags', 75, 108, 4.4, 71, 'A compact evening bag with a tactile finish and space for the essentials.', 'photo-1566150905458-1bf1fc113f0d', [], ['Champagne', 'Black'], false, 68],

  ['kids-zip-hoodie', 'Little North', 'Zip-Through Cotton Hoodie', 'Clothing', 42, 60, 4.8, 103, 'A soft cotton hoodie with a smooth zip and room for busy little days.', 'photo-1519689680058-324335c77eba', ['2Y', '4Y', '6Y', '8Y'], ['Blue', 'Oat'], true, 87],
  ['kids-cotton-play-set', 'Tiny Stories', 'Cotton Play Set', 'Sets', 38, 54, 4.6, 88, 'A breathable top and short set for play, rest and everything in between.', 'photo-1519238263530-99bdd11df2ea', ['2Y', '4Y', '6Y', '8Y'], ['Sage', 'Peach'], false, 77],
  ['kids-colorblock-sneaker', 'Mini Form', 'Colorblock Everyday Sneaker', 'Footwear', 44, 64, 4.7, 95, 'A lightweight everyday sneaker with a flexible sole and easy fastening.', 'photo-1552346154-21d32810aba3', ['10K', '11K', '12K', '13K'], ['Blue', 'Coral'], true, 84],
  ['kids-quilted-puffer', 'Little North', 'Quilted Lightweight Puffer', 'Outerwear', 68, 98, 4.5, 64, 'A warm, packable layer with a soft lining for chilly school-run mornings.', 'photo-1544923246-77307dd654cb', ['2Y', '4Y', '6Y', '8Y'], ['Olive', 'Rose'], false, 69],
  ['kids-cotton-overall', 'Tiny Stories', 'Soft Cotton Overalls', 'Clothing', 46, 66, 4.8, 127, 'Comfortable cotton overalls with adjustable straps and practical pockets.', 'photo-1522771930-78848d9293e8', ['2Y', '4Y', '6Y'], ['Denim', 'Sand'], true, 90],
  ['kids-day-out-pack', 'Paper Planes', 'Mini Day-Out Backpack', 'Bags', 34, 48, 4.4, 56, 'A small, lightweight backpack with an easy-to-reach pocket for little finds.', 'photo-1577733966973-d680bffd2e80', [], ['Yellow', 'Navy'], false, 73],
  ['kids-printed-dress', 'Little Fern', 'Printed Cotton Dress', 'Dresses', 52, 74, 4.6, 76, 'A cheerful cotton dress with a comfortable shape made for easy movement.', 'photo-1503919005314-30d93d07d823', ['2Y', '4Y', '6Y', '8Y'], ['Floral', 'Blue'], true, 82],
  ['kids-packable-sunhat', 'Little Fern', 'Packable Sun Hat', 'Accessories', 22, 32, 4.3, 43, 'A light, foldable hat with a brim for sunny days outside.', 'photo-1521369909029-2afed882baee', ['S', 'M'], ['Natural', 'Blue'], false, 65],

  ['beauty-botanical-cleanser', 'Field Notes', 'Botanical Gel Cleanser', 'Skincare', 28, 40, 4.7, 342, 'A gentle daily cleanser that leaves skin feeling fresh without a tight finish.', 'photo-1608248543803-ba4f8c70ae0b', [], ['150 ml'], true, 96],
  ['beauty-barrier-cream', 'Quiet Ritual', 'Barrier Repair Moisturizer', 'Skincare', 34, 48, 4.8, 281, 'A comforting moisturizer made to support a simple, balanced skincare routine.', 'photo-1556229010-6c3f2c9ca5f8', [], ['50 ml'], true, 92],
  ['beauty-daily-spf', 'Sunroom', 'Daily Mineral SPF', 'Skincare', 26, 36, 4.5, 194, 'A lightweight mineral sunscreen for everyday use under makeup or on its own.', 'photo-1556228720-195a672e8a03', [], ['50 ml'], false, 85],
  ['beauty-tinted-balm', 'Soft Standard', 'Tinted Lip Balm', 'Makeup', 18, 26, 4.4, 173, 'A comfortable balm with a sheer tint for a soft wash of everyday colour.', 'photo-1586495777744-4413f21062fa', [], ['Rose', 'Clear'], true, 86],
  ['beauty-gentle-body-wash', 'Field Notes', 'Gentle Body Wash', 'Bath & Body', 24, 34, 4.6, 132, 'A mild, lightly scented body wash for an easy daily reset.', 'photo-1601049541289-9b1b7bbbfe19', [], ['250 ml'], false, 78],
  ['beauty-nourishing-hair-oil', 'Root & Ritual', 'Nourishing Hair Oil', 'Haircare', 22, 32, 4.5, 118, 'A lightweight finishing oil to smooth lengths and add a subtle, healthy-looking sheen.', 'photo-1631730359585-38a4935cbec4', [], ['30 ml'], true, 81],

  ['accessories-sculpted-hoops', 'Forma Atelier', 'Sculpted Gold Hoops', 'Jewelry', 36, 52, 4.8, 207, 'A softly sculpted pair of hoops with a polished finish and easy everyday scale.', 'photo-1611652022419-a9419f74343d', [], ['Gold', 'Silver'], true, 95],
  ['accessories-chain-necklace', 'Forma Atelier', 'Everyday Chain Necklace', 'Jewelry', 58, 84, 4.6, 149, 'A fine chain necklace designed to wear alone or layer with a favourite pendant.', 'photo-1617038220319-276d3cfab638', [], ['Gold', 'Silver'], false, 83],
  ['accessories-pebble-tote', 'Morrow & Co.', 'Pebble Leather Tote', 'Handbags', 145, 208, 4.7, 118, 'A roomy tote in softly grained leather with a comfortable shoulder drop.', 'photo-1590874103328-eac38a683ce7', [], ['Cocoa', 'Black'], true, 89],
  ['accessories-acetate-sunglasses', 'Sunroom', 'Acetate Frame Sunglasses', 'Eyewear', 44, 64, 4.5, 97, 'Sculptural acetate frames with UV-protective lenses for bright days out.', 'photo-1511499767150-a48a237f0083', [], ['Tortoise', 'Black'], false, 78],
  ['accessories-cardholder', 'Morrow & Co.', 'Folded Leather Cardholder', 'Wallets', 32, 46, 4.4, 89, 'A slim leather cardholder with neatly finished edges and space for daily essentials.', 'photo-1627123424574-724758594e93', [], ['Tan', 'Black'], false, 73],
  ['accessories-brass-bangle', 'Forma Atelier', 'Minimalist Brass Bangle', 'Jewelry', 42, 60, 4.6, 112, 'A clean, gently rounded bangle that adds a quiet finishing touch.', 'photo-1611591437281-460bfbe1220a', [], ['Gold', 'Silver'], true, 84],

  ['home-stoneware-vase', 'House of Common', 'Stoneware Sculpted Vase', 'Decor', 58, 84, 4.8, 121, 'A hand-finished stoneware vase with a tactile glaze and a quietly sculptural shape.', 'photo-1578749556568-bc2c40e68b61', [], ['Chalk', 'Clay'], true, 91],
  ['home-amber-candle', 'Quiet Ritual', 'Amber & Cedar Candle', 'Home Fragrance', 32, 46, 4.7, 168, 'A warm, grounding blend of amber and cedar for a gentler end to the day.', 'photo-1602874801007-bd458bb1b8b6', [], ['220 g'], false, 89],
  ['home-woven-throw', 'Loom & Field', 'Woven Cotton Throw', 'Textiles', 78, 112, 4.6, 93, 'A softly textured cotton throw for a favourite chair, sofa or quiet morning.', 'photo-1610701596007-11502861dcfa', [], ['Natural', 'Olive'], true, 82],
  ['home-cotton-bedding', 'Maison Vale', 'Washed Cotton Duvet Set', 'Bedding', 145, 208, 4.7, 86, 'A breathable washed-cotton bedding set with a relaxed finish and soft hand.', 'photo-1616486338812-3dadae4b4ace', [], ['Queen', 'King'], false, 79],
  ['home-oak-serving-board', 'Alder House', 'Oak Serving Board', 'Kitchen', 48, 68, 4.5, 74, 'A solid oak serving board with a smooth finish for daily preparation and sharing.', 'photo-1600210492486-724fe5c67fb0', [], ['Small', 'Large'], false, 72],
  ['home-ribbed-glass-set', 'House of Common', 'Ribbed Glass Set', 'Kitchen', 36, 90, 4.6, 103, 'A set of four ribbed glasses that bring a little texture to everyday tables.', 'photo-1574269909862-7e1d70bb8078', [], ['Set of 4'], true, 80],
]

const additionalProductPhotos = {
  'men-oxford-shirt': ['photo-1523381210434-271e8be1f52b'],
  'men-city-trainer': ['photo-1606760227091-3dd870d97f1d'],
  'men-commuter-pack': ['photo-1622560480654-d96214fdc887'],
  'men-everyday-watch': ['photo-1523275335684-37898b6baf30'],
  'women-fluid-midi': ['photo-1512436991641-6745cdb1723f'],
  'accessories-chain-necklace': ['photo-1605100804763-247f67b3557e'],
}

export const slugify = (value) =>
  value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const products = productRows.map(
  ([
    id,
    brand,
    name,
    subcategory,
    sellingPrice,
    originalPrice,
    rating,
    reviewCount,
    description,
    photoId,
    sizeOptions,
    variantOptions,
    isNew,
    popularity,
  ]) => {
    const category = categoryBySlug.get(id.split('-')[0] === 'home' ? 'home-living' : id.split('-')[0])
    const discountPercentage = Math.round(
      ((originalPrice - sellingPrice) / originalPrice) * 100,
    )
    const image = imageUrl(photoId)
    const additionalImages = (additionalProductPhotos[id] ?? []).map((photo) =>
      imageUrl(photo),
    )

    return {
      id,
      brand,
      name,
      category: category.name,
      categorySlug: category.slug,
      subcategory,
      subcategorySlug: slugify(subcategory),
      price: sellingPrice,
      sellingPrice,
      originalPrice,
      discountPercentage,
      rating,
      reviewCount,
      description,
      image,
      imageAlt: `${brand} ${name}, product photograph`,
      images: [image, ...additionalImages],
      additionalImages,
      sizeOptions,
      variantOptions,
      variantLabel: sizeOptions.length ? 'Colour' : 'Variant',
      availability: 'In stock',
      available: true,
      isNew,
      isBestSeller: popularity >= 88,
      isTrending: popularity >= 84,
      popularity,
    }
  },
)

export const campaigns = [
  {
    eyebrow: 'Season sale · Demo offer',
    title: 'A little more of what you love.',
    description: 'Explore selected pieces with demo savings of up to 60%.',
    offer: 'UP TO 60% OFF',
    image: imageUrl('photo-1490481651871-ab68de25d43d', 1800),
    imageAlt: 'Seasonal fashion in warm, natural light',
    to: '/shop?collection=deals',
    cta: 'Shop the sale',
  },
  {
    eyebrow: 'New season · Women',
    title: 'Find your own kind of ease.',
    description: 'Fresh layers, fluid shapes and new-season pieces to make yours.',
    offer: 'NEW ARRIVALS',
    image: imageUrl('photo-1512316609839-ce289d3eba0a', 1800),
    imageAlt: 'Women’s new-season collection in a sunlit setting',
    to: '/category/women?collection=new',
    cta: 'Shop women',
  },
  {
    eyebrow: 'Everyday essentials · Men',
    title: 'Considered, from the first layer.',
    description: 'Well-made essentials for getting out the door and into the day.',
    offer: '',
    image: imageUrl('photo-1523398002811-999ca8dec234', 1800),
    imageAlt: 'Contemporary menswear styled for everyday wear',
    to: '/category/men',
    cta: 'Shop men',
  },
  {
    eyebrow: 'Small adventures · Kids',
    title: 'Made for their kind of everyday.',
    description: 'Comfortable new arrivals for little plans and big discoveries.',
    offer: 'NEW ARRIVALS',
    image: imageUrl('photo-1516627145497-ae6968895b74', 1800),
    imageAlt: 'Children exploring outdoors in comfortable everyday clothes',
    to: '/category/kids?collection=new',
    cta: 'Shop kids',
  },
]

export const departments = [
  categories.find((category) => category.slug === 'beauty'),
  categories.find((category) => category.slug === 'accessories'),
  categories.find((category) => category.slug === 'footwear'),
  categories.find((category) => category.slug === 'home-living'),
]

export const brands = [...new Set(products.map((product) => product.brand))].sort()

export const curatedLooks = [
  {
    title: 'Layers for the in-between',
    detail: 'An easy layer, a well-made carryall and the finishing touch.',
    productIds: ['men-twill-overshirt', 'accessories-pebble-tote', 'accessories-sculpted-hoops'],
  },
  {
    title: 'A slower morning',
    detail: 'Soft layers and a simple ritual to ease into the day.',
    productIds: ['women-linen-set', 'beauty-botanical-cleanser', 'women-wrap-cardigan'],
  },
  {
    title: 'Good things at home',
    detail: 'A few quiet objects for the places you return to.',
    productIds: ['home-stoneware-vase', 'home-amber-candle', 'home-woven-throw'],
  },
]
