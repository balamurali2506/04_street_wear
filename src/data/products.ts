import { Product } from '@/types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'monolith-heavyweight-hoodie-acid-black',
    name: '04 MONOLITH HEAVY HOODIE',
    subtitle: '500 GSM Brushed Loopback Cotton',
    category: 'Hoodies',
    priceINR: 5999,
    priceUSD: 85,
    compareAtPriceINR: 7499,
    compareAtPriceUSD: 105,
    description: 'An architectural silhouette engineered with our custom-milled 500 GSM loopback cotton. Features exaggerated dropped shoulders, double-layered hood without drawstrings for clean brutalist lines, and tonal 04 screen-print with high-density puff embroidery on the lumbar spine.',
    details: [
      'Custom 500 GSM loopback French terry cotton',
      'Double-lined seamless hood structure',
      'Puff print "04 STUDIO ARCHIVE" back graphic',
      'Vintage acid wash treatment (each piece is unique)',
      'Pre-shrunk with enzyme silicone wash',
      'Ribbed knit 2x2 cuffs and hem band'
    ],
    fabricSpecs: {
      material: '100% Organic Heavyweight Cotton',
      weight: '500 GSM Loopback Fleece',
      fit: 'Oversized Boxy Silhouette (Drop Shoulder)',
      origin: 'Knit & Crafted in Limited Batches'
    },
    colors: [
      { name: 'Acid Washed Black', hex: '#1C1B1B' },
      { name: 'Signal Orange', hex: '#FF4D00' },
      { name: 'Concrete Bone', hex: '#E2DFD8' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockCount: 3,
    isNewDrop: true,
    isLimitedDrop: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Drop 04', 'Limited Edition', 'Heavyweight', 'Boxy'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Kaelen R.',
        rating: 5,
        date: '2 days ago',
        comment: 'The 500 GSM weight is unreal. It holds its structural boxy shape better than any Balenciaga or Yeezy hoodie I own.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Dev V.',
        rating: 5,
        date: '1 week ago',
        comment: 'Acid wash is pure art. Got size L for an exaggerated drape. Signal orange accents pop insane in neon lighting.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-02',
    slug: 'cyber-tactical-bomber-jacket',
    name: '04 CYBER BOMBER JACKET',
    subtitle: 'Cordura® Shell with Signal Orange Quilting',
    category: 'Outerwear',
    priceINR: 11999,
    priceUSD: 165,
    compareAtPriceINR: 14500,
    compareAtPriceUSD: 195,
    description: 'A heavyweight tactical flight bomber inspired by Neo-Tokyo underground mechanics. Built from weatherproof high-tenacity nylon with matte black tactical zippers, a reversible interior emergency hazard signal orange quilted lining, and modular arm carabiner harness.',
    details: [
      'High-tenacity 500D water-repellent nylon shell',
      'Reversible interior: Quilted 3M Thinsulate in Signal Orange',
      'Chunky dual-way YKK tactical zippers',
      'Detachable woven brand ribbon pull-tab',
      'Rib-knit collar and cuffs with thumb loops'
    ],
    fabricSpecs: {
      material: '100% Weatherproof Ballistic Nylon',
      weight: 'Medium-Heavy Insulated Jacket',
      fit: 'Cropped Boxy Flight Fit',
      origin: 'Technical Atelier Production'
    },
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Signal Hazard Orange', hex: '#FF4D00' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 4,
    isNewDrop: true,
    isLimitedDrop: true,
    rating: 5.0,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Outerwear', 'Bomber', 'Tactical', 'Drop 04'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Arjun M.',
        rating: 5,
        date: '3 days ago',
        comment: 'Worth every penny. The cropped fit paired with baggy cargos looks straight off an Awwwards fashion editorial.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-03',
    slug: 'distressed-modular-cargo-pants',
    name: '04 MULTI-POCKET CARGO TRACK PANT',
    subtitle: '10-Pocket Tactical Ripstop with Flare Zippers',
    category: 'Pants',
    priceINR: 6499,
    priceUSD: 89,
    compareAtPriceINR: 7999,
    compareAtPriceUSD: 110,
    description: 'Engineered with 10 ergonomic functional 3D cargo pockets, buckle straps, and lower ankle flare expansion zippers. Transform from a tapered combat drape to an extreme wide-leg puddle hem over your sneakers.',
    details: [
      'Tactical heavyweight cotton-poly ripstop',
      '10 dimensional pockets with heavy-duty snap closures',
      'Adjustable lower leg gusset zippers for puddle stacking',
      'Elastic waist with custom industrial webbing drawstring',
      'Reinforced double-knee panelling'
    ],
    fabricSpecs: {
      material: '65% Cotton, 35% Technical Ripstop Poly',
      weight: '340 GSM Durable Fabric',
      fit: 'Relaxed Wide Straight to Stacked Flare',
      origin: 'Tokyo Street Utility Pattern'
    },
    colors: [
      { name: 'Charcoal Asphalt', hex: '#242424' },
      { name: 'Washed Olive Drab', hex: '#3B4237' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 2,
    isNewDrop: false,
    isLimitedDrop: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 46,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Pants', 'Cargos', 'Tactical', 'Utility'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Siddharth S.',
        rating: 5,
        date: '5 days ago',
        comment: 'The ankle zipper lets you rock chunky high-tops without fabric catching. Pockets are actually practical.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-04',
    slug: 'oversized-brutalist-archive-tee',
    name: '04 ARCHIVE OVERSIZED TEE',
    subtitle: '300 GSM Combed Cotton with Distressed Rib',
    category: 'Tees',
    priceINR: 2799,
    priceUSD: 38,
    compareAtPriceINR: 3499,
    compareAtPriceUSD: 48,
    description: 'Our staple heavyweight t-shirt cut in a dramatic drop-shoulder boxy silhouette. Features a thick 1.25" rib collar that never sags, subtle grinding along the sleeve hems, and an archival typographic print across the chest.',
    details: [
      '300 GSM 100% combed ring-spun cotton',
      'Tight 1.25" crewneck collar construction',
      'Silkscreen rubberized ink print with cracking aesthetic',
      'Blind stitched cuffs and hem',
      'Pre-shrunk vintage wash'
    ],
    fabricSpecs: {
      material: '100% Combed Heavy Cotton',
      weight: '300 GSM Heavy Jersey',
      fit: 'Extreme Boxy Oversized',
      origin: 'Signature Milling'
    },
    colors: [
      { name: 'Vintage Off-White', hex: '#EAE6DC' },
      { name: 'Faded Black', hex: '#1F1E1E' },
      { name: 'Signal Orange', hex: '#FF4D00' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stockCount: 6,
    isNewDrop: true,
    isLimitedDrop: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Tees', 'Heavyweight', 'Graphic', 'Staple'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Zane T.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The collar is tight and pristine. 300 GSM is the sweet spot for summer streetwear.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-05',
    slug: 'ballistic-utility-tactical-vest',
    name: '04 MODULAR TACTICAL UTILITY VEST',
    subtitle: '1000D Cordura® with Fidlock® Magnetic Closures',
    category: 'Outerwear',
    priceINR: 4999,
    priceUSD: 65,
    compareAtPriceINR: 5999,
    compareAtPriceUSD: 80,
    description: 'An architectural streetwear utility vest engineered for high-mobility layering over oversized hoodies or tees. Constructed with mil-spec 1000D Cordura, quick-release magnetic Fidlock closures, multi-tiered cargo chest pockets, and padded breathable air-mesh backing.',
    details: [
      'Weatherproof 1000D Cordura ballistic nylon',
      'Quick-release Fidlock magnetic buckles',
      'Reinforced MOLLE webbing harness system',
      'Dual 3D chest cargo utility compartments',
      'Adjustable side tension buckles for tailored boxy fit'
    ],
    fabricSpecs: {
      material: '1000D Cordura Nylon & Matte Hardware',
      weight: 'Medium Layering Utility Vest',
      fit: 'Relaxed Modular Layering Cut',
      origin: 'Tactical Garment Division'
    },
    colors: [
      { name: 'Matte Stealth Black', hex: '#0D0D0D' },
      { name: 'Signal Orange Highlight', hex: '#FF4D00' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 5,
    isNewDrop: true,
    isLimitedDrop: true,
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Outerwear', 'Tactical', 'Vest', 'Layering'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Rohan P.',
        rating: 5,
        date: '1 day ago',
        comment: 'Layers over the 500 GSM hoodie flawlessly. Adds that techwear edge without looking like cosplay.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-06',
    slug: 'vintage-acid-wash-crewneck-sweatshirt',
    name: '04 ACID WASH HEAVY CREWNECK',
    subtitle: '450 GSM Diagonal French Terry with Distressed Hem',
    category: 'Hoodies',
    priceINR: 4799,
    priceUSD: 64,
    compareAtPriceINR: 5899,
    compareAtPriceUSD: 78,
    description: 'A heavyweight luxury crewneck sweater with substantial drape and volume. Individually pigment-dyed and enzyme washed for a textured vintage patina. Finished with ribbed drop-shoulders and tonal 04 brutalist embroidery.',
    details: [
      '450 GSM custom-knit diagonal French terry',
      'Pigment dyed and salt-washed in small batches',
      'Wide ribbed collar that keeps its structure',
      'Drop shoulder seamless sleeve pattern',
      'Pre-shrunk organic cotton'
    ],
    fabricSpecs: {
      material: '100% Organic Heavy Cotton',
      weight: '450 GSM Heavy French Terry',
      fit: 'Oversized Boxy Silhouette',
      origin: 'Atelier Knitwear'
    },
    colors: [
      { name: 'Pitch Washed Black', hex: '#161616' },
      { name: 'Concrete Bone', hex: '#DFDDD7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 8,
    isNewDrop: false,
    isLimitedDrop: false,
    rating: 4.7,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Hoodies', 'Sweatshirts', 'Heavyweight', 'Drop 04'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Kenzo Y.',
        rating: 5,
        date: '4 days ago',
        comment: 'Essential everyday luxury piece. The wash texture has incredible depth in person.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-07',
    slug: 'reversible-sherpa-zip-fleece',
    name: '04 MODULAR SHERPA FLEECE ZIP',
    subtitle: 'Deep Pile 420 GSM Sherpa with Wind-Stop Shell',
    category: 'Outerwear',
    priceINR: 7999,
    priceUSD: 110,
    compareAtPriceINR: 9999,
    compareAtPriceUSD: 135,
    description: 'Built for winter layering, this reversible jacket pairs plush heavyweight curly sherpa fleece on one side with technical matte nylon ripstop wind-barrier on the other. Features contrast chest zip utility pocket and high neck stand.',
    details: [
      'Side 1: 420 GSM curly pile teddy fleece',
      'Side 2: Water-resistant matte windproof ripstop',
      'High-coverage chin funnel collar',
      'Custom rubber zipper pull tags',
      'Bungee cord toggle cinch hem'
    ],
    fabricSpecs: {
      material: 'Polyester Sherpa & Technical Windproof Shell',
      weight: '420 GSM Dual-Face',
      fit: 'Relaxed Layering Fit',
      origin: 'Cold-Climate Research Lab'
    },
    colors: [
      { name: 'Raw Natural & Black', hex: '#DED9CE' },
      { name: 'Triple Black', hex: '#121212' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 3,
    isNewDrop: true,
    isLimitedDrop: true,
    rating: 4.9,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Outerwear', 'Fleece', 'Sherpa', 'Drop 04'],
    reviews: [
      {
        id: 'rev-8',
        author: 'Tara K.',
        rating: 5,
        date: '1 week ago',
        comment: 'So warm and cozy yet looks super futuristic. The toggle hem lets you crop it high.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-08',
    slug: 'raw-hem-carpenter-denim',
    name: '04 DOUBLE-KNEE CARPENTER DENIM',
    subtitle: '14.5oz Japanese Selvedge Cotton with Raw Hem',
    category: 'Pants',
    priceINR: 6999,
    priceUSD: 95,
    compareAtPriceINR: 8499,
    compareAtPriceUSD: 115,
    description: 'Constructed from rigid 14.5oz black shuttle-loom selvedge denim. Finished with reinforced double-knee front panels, utility hammer loop, custom engraved oxidized steel hardware, and an intentionally frayed raw-cut stacking hem.',
    details: [
      '14.5oz 100% rigid cotton selvedge denim',
      'Hand-distressed vintage stone wash and whiskering',
      'Double knee reinforcement panels with rivet details',
      'Raw edge frayed hem for natural sneaker stacking',
      'Branded embossed leather patch on rear waist'
    ],
    fabricSpecs: {
      material: '100% Cotton Selvedge Denim',
      weight: '14.5oz Heavyweight Rigid',
      fit: 'Loose Straight Leg with 20" Leg Opening',
      origin: 'Shuttle-Loom Milled'
    },
    colors: [
      { name: 'Vintage Washed Black', hex: '#21201F' },
      { name: 'Raw Indigo Ink', hex: '#1B2430' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 5,
    isNewDrop: false,
    isLimitedDrop: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Pants', 'Denim', 'Carpenter', 'Selvedge'],
    reviews: [
      {
        id: 'rev-9',
        author: 'Leo C.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Best jeans I have purchased in years. Heavy selvedge with that perfect 90s skater stack.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-09',
    slug: 'reflective-windbreaker-pullover-anorak',
    name: '04 REFLECTIVE HALF-ZIP ANORAK',
    subtitle: 'Crinkled Ripstop with 3M 360° Safety Accents',
    category: 'Outerwear',
    priceINR: 5499,
    priceUSD: 75,
    compareAtPriceINR: 6999,
    compareAtPriceUSD: 95,
    description: 'An ultra-light, weatherproof anorak built for urban twilight commuters. Features micro-crinkled nylon with a water-shedding DWR finish, a kangaroo utility chest pouch, and concealed 3M reflective piping that ignites under headlights.',
    details: [
      'Crinkle finish matte micro-ripstop nylon',
      '3M Scotchlite reflective linear trims',
      'Packable front kangaroo pouch with key leash',
      'Bungee cinch hood with stiffened brim',
      'Storm flap half-zip collar'
    ],
    fabricSpecs: {
      material: '100% Water-Repellent Nylon Ripstop',
      weight: 'Ultralight Packable',
      fit: 'Relaxed Technical Pullover',
      origin: 'Night-Shift Running Lab'
    },
    colors: [
      { name: 'Signal Hazard Orange', hex: '#FF4D00' },
      { name: 'Graphite Grey', hex: '#262626' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 4,
    isNewDrop: true,
    isLimitedDrop: false,
    rating: 4.8,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Outerwear', 'Anorak', 'Windbreaker', 'Reflective'],
    reviews: [
      {
        id: 'rev-10',
        author: 'Nikhil G.',
        rating: 5,
        date: '6 days ago',
        comment: 'The orange colorway is blinding under flash photography. Packable pouch is handy.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-10',
    slug: 'thermal-waffle-long-sleeve-tee',
    name: '04 HEAVY WAFFLE THERMAL L/S',
    subtitle: '380 GSM Honeycomb Knit with Thumbhole Cuffs',
    category: 'Tees',
    priceINR: 3499,
    priceUSD: 48,
    compareAtPriceINR: 4299,
    compareAtPriceUSD: 58,
    description: 'Substantial 380 GSM heavyweight honeycomb waffle weave knit designed as an armor-like base layer. Finished with flatlock tonal stitching, elongated sleeves with ergonomic thumb loops, and signature 04 rubber patch at sleeve hem.',
    details: [
      '380 GSM heavyweight waffle textured cotton',
      'Heavy ribbed crew neckline and cuffs',
      'Engineered thumbholes for tactical layering',
      'Flatlock anti-chafing seam technology',
      'Garment dyed with vintage fade treatment'
    ],
    fabricSpecs: {
      material: '100% Combed Thermal Waffle Cotton',
      weight: '380 GSM Heavy Knit',
      fit: 'Slim-Relaxed Structural Fit',
      origin: 'Knit & Form Atelier'
    },
    colors: [
      { name: 'Charcoal Black', hex: '#181818' },
      { name: 'Chalk Bone', hex: '#ECE8DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 7,
    isNewDrop: false,
    isLimitedDrop: false,
    rating: 4.9,
    reviewCount: 35,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Tees', 'Thermal', 'Waffle', 'Staple'],
    reviews: [
      {
        id: 'rev-11',
        author: 'Marcus B.',
        rating: 5,
        date: '1 week ago',
        comment: 'Thickest waffle thermal I’ve ever seen. Perfect under the cyber bomber.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-11',
    slug: 'heavyweight-brushed-flannel-overshirt',
    name: '04 HEAVY BRUSHED FLANNEL OVERSHIRT',
    subtitle: '360 GSM Double-Faced Plaid with Matte Snap Buttons',
    category: 'Outerwear',
    priceINR: 5299,
    priceUSD: 72,
    compareAtPriceINR: 6499,
    compareAtPriceUSD: 88,
    description: 'A rugged overshirt tailored from dense 360 GSM brushed twill cotton. Designed with dropped shoulders, oversized flap patch pockets, and matte black heavy-duty snap closures for effortless layering.',
    details: [
      '360 GSM heavyweight double-brushed cotton flannel',
      'Reinforced spread collar with collar-stay construction',
      'Dual oversized dimensional chest pockets',
      'Matte black industrial snap buttons',
      'Curved scalloped hem for fluid drape over cargos'
    ],
    fabricSpecs: {
      material: '100% Brushed Twill Cotton',
      weight: '360 GSM Heavyweight Shacket',
      fit: 'Relaxed Boxy Overshirt Fit',
      origin: 'Heavy Weave Atelier'
    },
    colors: [
      { name: 'Shadow Tartan Black', hex: '#1C1C1C' },
      { name: 'Hazard Ochre Plaid', hex: '#A85A28' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 5,
    isNewDrop: false,
    isLimitedDrop: false,
    rating: 4.8,
    reviewCount: 37,
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Outerwear', 'Flannel', 'Overshirt', 'Layering'],
    reviews: [
      {
        id: 'rev-12',
        author: 'Ravi T.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Fabric feels like wool blanket weight. Snap closures make it so easy to throw on.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-12',
    slug: 'distressed-baggy-puddle-skater-jeans',
    name: '04 EXTREME BAGGY PUDDLE DENIM',
    subtitle: '15oz Raw Japanese Indigo with Hand-Frayed Hems',
    category: 'Pants',
    priceINR: 7499,
    priceUSD: 99,
    compareAtPriceINR: 8999,
    compareAtPriceUSD: 120,
    description: 'Our most exaggerated silhouette yet. Cut with an extreme 24" wide leg circumference that puddles dramatically over chunky footwear. Crafted with vintage-washed heavyweight 15oz denim and subtle grinding along the pocket entries.',
    details: [
      '15oz authentic shuttle-loom ring-spun denim',
      'Extreme wide baggy skater drape',
      'Subtle hand-applied whisker fade and abrasions',
      'Deep front pocket bags with concealed coin stash',
      'Reinforced bar-tack stitching at stress points'
    ],
    fabricSpecs: {
      material: '100% Heavy Rigid Cotton Denim',
      weight: '15oz Heavyweight Denim',
      fit: 'Extreme Baggy Puddle Stacking Fit',
      origin: 'Denim Finishing Studio'
    },
    colors: [
      { name: 'Vintage Acid Slate', hex: '#262A30' },
      { name: 'Washed Stone Ash', hex: '#3E3E3E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockCount: 4,
    isNewDrop: true,
    isLimitedDrop: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 44,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85'
    ],
    turntableImages: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Pants', 'Denim', 'Baggy', 'Skater', 'Drop 04'],
    reviews: [
      {
        id: 'rev-13',
        author: 'Akash D.',
        rating: 5,
        date: '3 days ago',
        comment: 'The puddle over my sneakers is legendary. True archival Japanese denim quality.',
        verified: true
      }
    ]
  }
];

export const VALID_PROMO_CODES = [
  { code: 'DROP04', discountPercent: 20, description: '20% off for Drop 04 VIP Members' },
  { code: 'STREET10', discountPercent: 10, description: '10% off your entire underground order' },
  { code: 'ARCHIVE', discountPercent: 15, description: '15% Archive access discount' }
];

export const LOOKBOOK_IMAGES = [
  {
    id: 'lb-1',
    title: 'LOOK 01 // ACID DRIFT',
    item: 'Monolith Hoodie + Carpenter Denim',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
    tag: 'DROP 04',
    location: 'SHIBUYA INDUSTRIAL PRECINCT'
  },
  {
    id: 'lb-2',
    title: 'LOOK 02 // NEON TACTICAL',
    item: 'Cyber Bomber + Modular Cargo Pant',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    tag: 'LIMITED RUN',
    location: 'WAREHOUSE 04 DOCKS'
  },
  {
    id: 'lb-3',
    title: 'LOOK 03 // COLD HARBOR',
    item: 'Sherpa Fleece + Tactical Utility Vest',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
    tag: 'ESSENTIALS',
    location: 'SUBWAY TERMINAL CONCOURSE'
  },
  {
    id: 'lb-4',
    title: 'LOOK 04 // PROTO HYBRID',
    item: 'Waffle Thermal + Puddle Baggy Denim',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    tag: 'ARCHIVE SPEC',
    location: 'BRUTALIST OVERPASS N°7'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    handle: '@04_street_wear',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    likes: '4,892',
    caption: 'DROP 04 MONOLITH. In the shadows of the concrete jungle.'
  },
  {
    id: 'ig-2',
    handle: '@04_street_wear',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    likes: '6,140',
    caption: 'Reversible emergency orange liner. High-visibility streetwear engineered.'
  },
  {
    id: 'ig-3',
    handle: '@04_street_wear',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    likes: '3,781',
    caption: '450 GSM French terry volume and drape. No mass production.'
  },
  {
    id: 'ig-4',
    handle: '@04_street_wear',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    likes: '5,320',
    caption: '10-pocket cargo drape. Shibuya to Bandra.'
  },
  {
    id: 'ig-5',
    handle: '@04_street_wear',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    likes: '2,940',
    caption: '14.5oz shuttle-loom Japanese selvedge. Built for a lifetime.'
  },
  {
    id: 'ig-6',
    handle: '@04_street_wear',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    likes: '7,402',
    caption: '300 GSM combed cotton. Oversized boxy silhouette test.'
  }
];
