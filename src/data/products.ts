
export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  features: string[];
  inStock: boolean;
  impact: string;
  socialGood: string[];
  isFeatured: boolean;
};

const productsData: Product[] = [
  {
    id: "eternal-bracelet-001",
    name: "Eternal Blessing Bracelet",
    price: 39.99,
    category: "Jewelry",
    description: "This handcrafted bracelet carries the blessings of 108 prayers for eternal peace. Made from sustainable materials and crafted by artisans from rural communities, each purchase provides a month of education for a child in need.",
    shortDescription: "Handcrafted bracelet with 108 blessings for eternal peace.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    features: [
      "Handcrafted by skilled artisans",
      "Made from sustainable materials",
      "108 prayer beads for blessings",
      "Adjustable size",
      "Unique design"
    ],
    inStock: true,
    impact: "Provides one month of education for a child in need.",
    socialGood: [
      "Education support for 1 child for 1 month",
      "Sustainable livelihood for artisans",
      "Environmentally responsible materials"
    ],
    isFeatured: true
  },
  {
    id: "prayer-shawl-002",
    name: "Divine Prayer Shawl",
    price: 79.99,
    category: "Apparel",
    description: "This specially woven prayer shawl carries the intention of eternal blessings. Made from the finest organic cotton and silk blend, each shawl is blessed in a sacred ceremony. Your purchase provides meals for 100 children.",
    shortDescription: "Blessed shawl woven with prayers for eternal peace.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    features: [
      "100% organic materials",
      "Hand-woven with sacred intentions",
      "Blessed in traditional ceremony",
      "Versatile size (72\" x 28\")",
      "Comes with a blessing certificate"
    ],
    inStock: true,
    impact: "Provides 100 nutritious meals to children in underserved communities.",
    socialGood: [
      "100 meals for children in need",
      "Support for traditional weavers",
      "Sustainable farming practices"
    ],
    isFeatured: true
  },
  {
    id: "meditation-cushion-003",
    name: "Eternal Comfort Meditation Cushion",
    price: 59.99,
    category: "Home",
    description: "This meditation cushion is designed to provide eternal comfort for your spiritual practice. Filled with sustainable materials and covered in organic cotton, each cushion helps provide clean water access to communities in need.",
    shortDescription: "Meditation cushion that supports your practice and clean water initiatives.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    features: [
      "Ergonomic design for proper posture",
      "Filled with sustainable buckwheat hulls",
      "Removable and washable organic cotton cover",
      "Available in multiple colors",
      "Handmade with intention"
    ],
    inStock: true,
    impact: "Provides clean water access for a family for one month.",
    socialGood: [
      "Clean water access for families",
      "Support for sustainable agriculture",
      "Fair wages for craftspeople"
    ],
    isFeatured: false
  },
  {
    id: "blessing-candle-004",
    name: "Eternal Light Blessing Candle",
    price: 29.99,
    category: "Home",
    description: "This hand-poured soy candle carries the light of eternal blessings. Made with essential oils and blessed with sacred mantras, each candle provides clothing for a child in need for a full season.",
    shortDescription: "Hand-poured candle with essential oils and sacred blessings.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    features: [
      "100% soy wax for clean burning",
      "Infused with sacred essential oils",
      "Blessed with mantras for peace",
      "Burns for 60+ hours",
      "Reusable glass container"
    ],
    inStock: true,
    impact: "Provides a season's worth of clothing for a child in need.",
    socialGood: [
      "Clothing for children in need",
      "Support for single mothers as candle makers",
      "Sustainable production practices"
    ],
    isFeatured: true
  },
  {
    id: "prayer-beads-005",
    name: "108 Eternal Blessing Mala",
    price: 49.99,
    category: "Jewelry",
    description: "This traditional mala with 108 beads helps count mantras during meditation while carrying eternal blessings. Crafted from sustainably sourced seeds and stones, each mala provides education materials for an entire classroom.",
    shortDescription: "Traditional mala beads for meditation and blessing counting.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    features: [
      "108 beads for traditional mantra counting",
      "Sustainably sourced materials",
      "Hand-knotted with intention",
      "Blessed in a sacred ceremony",
      "Includes a cotton carrying pouch"
    ],
    inStock: true,
    impact: "Provides educational materials for an entire classroom of students.",
    socialGood: [
      "Educational materials for classrooms",
      "Support for indigenous artisans",
      "Preservation of traditional crafting techniques"
    ],
    isFeatured: false
  },
  {
    id: "blessing-box-006",
    name: "Monthly Blessing Box Subscription",
    price: 45.99,
    category: "Subscription",
    description: "Receive a monthly box of eternal blessing items, each supporting various charitable causes. Every box contains 4-6 handcrafted items from around the world, each carrying blessings that last beyond life.",
    shortDescription: "Monthly subscription box of blessing items supporting multiple causes.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    features: [
      "4-6 handcrafted blessing items each month",
      "Products from different cultures and traditions",
      "Informational cards about impact and traditions",
      "Supports multiple charitable causes",
      "Easy to pause or cancel anytime"
    ],
    inStock: true,
    impact: "Each box spreads impact across multiple initiatives including education, nutrition, clean water, and more.",
    socialGood: [
      "Diverse support for multiple causes",
      "Sustainable livelihood for artisans worldwide",
      "Cultural preservation and education"
    ],
    isFeatured: true
  }
];

export default productsData;
