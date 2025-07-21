export interface backpackSpec {
  brand: string;
  model: string;
  sku: string;
  description: string;
  features: string;
  size: string;
  capacity: string;
  price: number;
  image: string;
  recommended: boolean;
}

export const backpackData: backpackSpec[] = [
  {
    brand: "Lenovo",
    model: "B325 Laptop Backpack",
    sku: "LEN-B325-5520-001",
    description: "Spacious 35L Design and dual compartments with padded storage fit laptops up to 16 inches, tablets, and essentials, making it perfect for work, school, or travel.",
    features: "35L travel laptop backpack with two spacious compartments, fits laptops up to 16 inches, plus books, accessories, and daily essentials.External USB port with built-in charging cable keeps your devices powered on the go. Water-Resistant & Travel-Ready.",
    size: "17 inches",
    capacity: "35L",
    price: 30,
    image: "/images/lenovo_b325_backpack.png",
    recommended: true
  },
  {
    brand: "Lenovo",
    model: "Legion 17” Armored Backpack",
    sku: "LEN-LEGION17-5520-002",
    description: "Bring your A-game everywhere with the Lenovo Legion 17 inch Armored backpack II. Seamlessly combining durability, convenience, and style, This computer bag is built for gamers on the go who need room for everything.",
    features: "Rock-solid EVA molded front shield, as well as double-layered protection in the PC compartment to safeguard any gaming Laptop up to 17.3 inches. A water-resistant lining and rugged base help keep all of your gear safe from the elements. Well-designed storage pockets – including dedicated headset, keyboard, and mouse pockets – enable you to quickly access your gear..",
    size: "17 inches",
    capacity: "35L",
    price: 90,
    image: "/images/lenovo_legion_armored_backpack.png",
    recommended: true
  },
  {
    brand: "Kensington",
    model: "EQ Backpack",
    sku: "KEN-EQ-5520-003",
    description: "The B210 casual laptop backpack is the sleek and lightweight solution to all of your notebook computer carrying needs. With its casual, modern design and water-repellent fabric, this is a laptop case that's perfectly suited to your daily life.",
    features: "Made from 250ml plastic bottles - 14 inch (14.5) and 16 inch (17.3). 42% post-consumer recycled (PCR) polyester. Accommodates up to 14 inch and 16 inch laptops (including 15.6 inch notebooks).",
    size: "16 inches",
    capacity: "25L",
    price: 45,
    image: "/images/kensington_eq_backpack.png",
    recommended: true
  },
  {
    brand: "Bange",
    model: "Business Smart Backpack",
    sku: "BAN-BUSSMART-5520-004",
    description: "The BANGE business smart backpack is a strong, all-purpose backpack with ample capacity for business, overnight, or weekend trips, designed to hold all your personal items. It can accommodate a 15.6-inch laptop, featuring a 180° opening pocket for easy laptop extraction.",
    features: "Made of high-density coated oxford fabric not only waterproof and resistant but also scratch-resistant. 180° opening pocket for easy laptop extraction. 2 side pockets for water bottles or other small items.",
    size: "16 inches",
    capacity: "30L",
    price: 45,
    image: "/images/bange_business_smart_backpack.png",
    recommended: true
  },
  {
    brand: "Thule",
    model: "Crossover 32L Backpack",
    sku: "THU-CROSS32L-5520-005",
    description: "The Thule Crossover 32L backpack is the perfect travel companion. Dedicated slots for your laptop, tablet, notebooks and accessories offers peace of mind while traveling. Easy to access interior storage makes getting through TSA quick and easy. Plus, pleanty of space for packing clothes and toiletries.",
    features: "A front bulk storage pocket allows easy access to your in-transit necessities. The roomy main compartment can house books, bulky items or a change of clothes. Heat-molded, crush-proof SafeZone™ compartment protects eyewear, portable electronics and other fragile gear. A bottom zippered pocket accommodates a power source or other small accessories. Dual external pockets stretch to fit a water bottle and quick-grab items.",
    size: "15.6 inches",
    capacity: "32L",
    price: 120,
    image: "/images/thule_crossover_backpack.png",
    recommended: false
  },
  {
    brand: "The North Face",
    model: "Vault Everyday Laptop Backpack",
    sku: "TNF-VAULT-5520-006",
    description: "From a hiking pack for weekend adventures to a laptop bag for daily commutes, or even a carry-on approved travel backpack for jet-setters, This North Face backpack has you covered, delivering rugged, functional gear for all walks of life.",
    features: "Sleek modern design, a protective water-repellent finish, and a self-standing structure for easy access. A streamlined front compartment keeps things tidy with zip pockets, a tablet sleeve and a key hook for your everyday essentials. On the outside, two water bottle pockets offer added convenience and quick access to hydration on the go. The spacious main compartment easily fits all your essentials and includes a padded 15 inch laptop sleeve to help shield your computer from bumps and drops.",
    size: "15.6 inches",
    capacity: "32L",
    price: 120,
    image: "/images/northface_vault_everyday_backpack.png",
    recommended: false
  },
  {
    brand: "SwissGear",
    model: "Cecil 5505 Laptop Backpack",
    sku: "SWI-CECIL5505-5520-007",
    description: "The SwissGear 5505 Cecil Special Edition Laptop Backpack is a highly functional backpack for your everyday. It features a large main compartment with padded pockets for most 16” laptops and 10” tablets. An essentials organizer keeps cables, pens, and other accessories safe and secure.",
    features: "Large main compartment with padded pockets for most 16” laptops and 10” tablets and an array of organizer pockets and gear attachment options that keep your essential accessories within reach. Dual water bottle pockets, a multi-pocket organizer compartment, a D-ring buckle and web loop for external gear, and a pass-thru trolley sleeve for luggage compatibility.",
    size: "18 inches",
    capacity: "27.3L",
    price: 70,
    image: "/images/swissgear_cecil_5505_backpack.png",
    recommended: true
  },
]