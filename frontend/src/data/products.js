// Temporary presentation-only catalog data; replace with API data in a later phase.
export const categories = [
  {
    name: 'Fashion',
    slug: 'fashion',
    detail: 'Pieces to live in',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    alt: 'Editorial fashion in a warm city setting',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    detail: 'The finishing touch',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    alt: 'Sculptural leather handbag in a warm neutral tone',
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    detail: 'Everyday rituals',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Minimal beauty essentials in soft natural light',
  },
  {
    name: 'Living',
    slug: 'living',
    detail: 'A softer space',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
    alt: 'Calm, natural-toned living space with thoughtful details',
  },
]

export const products = [
  {
    id: 'forma-tote',
    name: 'Forma leather tote',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 248,
    label: 'Bestseller',
    isNew: false,
    isBestSeller: true,
    popularity: 98,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    alt: 'Sculptural leather handbag in a warm neutral tone',
    description:
      'An easy, considered carryall with room for the things that matter. Made to move through the everyday.',
    details: ['Soft-grain leather', 'Cotton lining', 'Interior slip pocket'],
    sizeOptions: [],
  },
  {
    id: 'everyday-knit',
    name: 'The everyday knit',
    category: 'Fashion',
    categorySlug: 'fashion',
    price: 186,
    label: 'New arrival',
    isNew: true,
    isBestSeller: true,
    popularity: 94,
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=1000&q=85',
    alt: 'Soft, timeless knitwear in a natural color',
    description:
      'A relaxed knit with a soft hand-feel and a quietly versatile shape for everyday layering.',
    details: ['Responsibly sourced cotton blend', 'Relaxed fit', 'Gentle machine wash'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'still-life-serum',
    name: 'Still life face oil',
    category: 'Beauty',
    categorySlug: 'beauty',
    price: 64,
    label: 'AUREL ritual',
    isNew: false,
    isBestSeller: true,
    popularity: 91,
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85',
    alt: 'Minimal glass skincare bottles arranged in soft light',
    description:
      'A lightweight daily oil designed to bring a small moment of care to your evening ritual.',
    details: ['30 ml glass bottle', 'Lightweight botanical blend', 'Use after cleansing'],
    sizeOptions: [],
  },
  {
    id: 'objects-vessel',
    name: 'Objects ceramic vessel',
    category: 'Living',
    categorySlug: 'living',
    price: 92,
    label: 'Small batch',
    isNew: true,
    isBestSeller: false,
    popularity: 79,
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85',
    alt: 'Hand-finished ceramic vessel on a warm neutral surface',
    description:
      'A hand-finished ceramic form for a single stem, a favourite corner, or simply as it is.',
    details: ['Hand-finished stoneware', 'Each piece is subtly unique', 'Wipe clean with a soft cloth'],
    sizeOptions: [],
  },
  {
    id: 'studio-blazer',
    name: 'Studio relaxed blazer',
    category: 'Fashion',
    categorySlug: 'fashion',
    price: 276,
    label: 'New arrival',
    isNew: true,
    isBestSeller: false,
    popularity: 84,
    image:
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
    alt: 'Tailored neutral jacket with a relaxed silhouette',
    description:
      'Easy tailoring, softened for everyday. A considered layer that moves from weekday to weekend.',
    details: ['Linen and cotton blend', 'Relaxed, single-breasted fit', 'Dry clean'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'sculpted-hoops',
    name: 'Sculpted hoop earrings',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 78,
    label: 'Bestseller',
    isNew: false,
    isBestSeller: true,
    popularity: 89,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85',
    alt: 'Sculptural gold-tone earrings with a softly polished finish',
    description:
      'A softly sculpted everyday hoop with a considered weight and an understated shine.',
    details: ['Gold-tone recycled brass', 'Hypoallergenic posts', 'Presented in a keepsake pouch'],
    sizeOptions: [],
  },
  {
    id: 'mineral-cream',
    name: 'Daily mineral cream',
    category: 'Beauty',
    categorySlug: 'beauty',
    price: 52,
    label: 'New arrival',
    isNew: true,
    isBestSeller: false,
    popularity: 76,
    image:
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=85',
    alt: 'Minimal daily skincare in a softly lit setting',
    description:
      'A comforting daily moisturiser with a clean finish, made for a simple morning routine.',
    details: ['50 ml glass jar', 'Fragrance-free', 'Apply to clean, dry skin'],
    sizeOptions: [],
  },
  {
    id: 'hand-poured-candle',
    name: 'Quiet hour candle',
    category: 'Living',
    categorySlug: 'living',
    price: 48,
    label: 'Bestseller',
    isNew: false,
    isBestSeller: true,
    popularity: 93,
    image:
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85',
    alt: 'Quietly styled candle for a warm, calm interior',
    description:
      'A gentle, grounding scent for slow evenings and little pauses in the day.',
    details: ['Plant-based wax blend', 'Cotton wick', 'Approx. 45 hour burn time'],
    sizeOptions: [],
  },
  {
    id: 'linen-weekend-shirt',
    name: 'Linen weekend shirt',
    category: 'Fashion',
    categorySlug: 'fashion',
    price: 148,
    label: 'New arrival',
    isNew: true,
    isBestSeller: false,
    popularity: 81,
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1000&q=85',
    alt: 'Relaxed linen shirt in a soft, natural shade',
    description:
      'An airy, easy-fit shirt for unhurried mornings, open windows and everything after.',
    details: ['European flax linen', 'Relaxed fit', 'Machine wash cold'],
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'soft-carryall',
    name: 'Soft form crossbody',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 174,
    label: 'New arrival',
    isNew: true,
    isBestSeller: false,
    popularity: 87,
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    alt: 'Soft structured crossbody bag in a muted neutral color',
    description:
      'A compact carryall with a soft structure, thoughtful pockets and an adjustable strap.',
    details: ['Textured vegan leather', 'Adjustable shoulder strap', 'Interior zip pocket'],
    sizeOptions: [],
  },
  {
    id: 'woven-throw',
    name: 'Woven quiet throw',
    category: 'Living',
    categorySlug: 'living',
    price: 138,
    label: 'Bestseller',
    isNew: false,
    isBestSeller: true,
    popularity: 86,
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
    alt: 'Soft woven home textile in a quiet, natural palette',
    description:
      'A softly textured layer for a favourite chair, a slow morning or an open-air evening.',
    details: ['Cotton and linen blend', 'Generous 130 × 180 cm size', 'Gentle cold wash'],
    sizeOptions: [],
  },
  {
    id: 'botanical-wash',
    name: 'Botanical body wash',
    category: 'Beauty',
    categorySlug: 'beauty',
    price: 38,
    label: 'AUREL ritual',
    isNew: false,
    isBestSeller: false,
    popularity: 72,
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Simple botanical bath and body care in a calm setting',
    description:
      'A gentle, plant-inspired wash that turns the everyday shower into a small reset.',
    details: ['250 ml recyclable bottle', 'Gentle everyday formula', 'Keep away from eyes'],
    sizeOptions: [],
  },
]
