export interface KeyboardSpec {
  brand: string;
  model: string;
  card_description: string;
  description: string;
  battery: string;
  connectivity: string;
  compatibility: string;
  number_keys: number;
  price: number;
  image: string;
  recommended: boolean;
}

export const keyboardData: KeyboardSpec[] = [
    {
      brand: "Logitech",
      model: "K585 Multi-Device Slim Keyboard",
      card_description: "Day and night, this keyboard is perfect for your needs.",
      description: "Featuring a rechargable Li-Po battery and advanced wireless illuminated keyboard with smart backlighting and perfect stroke keys, this keyboard is perfect for your needs.",
      battery: "Rechargeable Li-Po (up to 10 days with backlighting, 5 months without)",
      connectivity: "Bluetooth, USB",
      compatibility: "Windows, macOS, Linux, iOS, Android",
      number_keys: 104,
      price: 44,
      image: "/images/logitech_k585_keyboard.png",
      recommended: true
    },
    {
      brand: "Arteck",
      model: "Stainless 2.4G WirelessKeyboard",
      card_description: "Armed with low-profile keys, this keyboard offers quiet and comfortable typing.",
      description: "The ergonomic design and stainless steel material gives heavy duty feeling, low-profile keys offer quiet and comfortable typing.",
      battery: "Rechargeable Li-Po (up to 40 hours RGB on)",
      connectivity: "Lightspeed wireless, Bluetooth, wired USB-C",
      compatibility: "Windows, macOS (partial support)",
      number_keys: 104,
      price: 25,
      image: "/images/arteck_stainless_keyboard.png",
      recommended: false
    },
    {
      brand: "Keychron",
      model: "K8 Tenkeyless Mechanical Keyboard",
      card_description: "Offering a unique Mac layout, this keyboard has all essential multimedia and function keys you need.",
      description: "With a unique Mac layout, the Keychron K8 has all essential multimedia and function keys you need. It's a great keyboard for those who prefer a Mac layout.",
      battery: "2× AAA batteries (up to 2 years)",
      connectivity: "Bluetooth, USB-A)",
      compatibility: "Windows, macOS",
      number_keys: 87,
      price: 64,
      image: "/images/keychron_k8_keyboard.png",
      recommended: true
    },
    {
      brand: "Logitech",
      model: "Pebble Keys 2 K380s",
      card_description: "A keyboard with a slim design that lets you express your vibe and make your statement.",
      description: "With a slim design, multiple colors and smarter tech, this Bluetooth keyboard from the Pebble 2 Collection lets you express your vibe and make your statement",
      battery: "Rechargeable Li-ion (up to 2 months)",
      connectivity: "Bluetooth, wired USB-C",
      compatibility: "Windows, macOS, Linux",
      number_keys: 104,
      price: 34,
      image: "/images/logitech_pebble_keys2_keyboard.png",
      recommended: false
    },
    {
      brand: "Razer",
      model: "Ornata V3 X Gaming Keyboard",
      card_description: "Perfect for those who prefer a quieter, more comfortable experience when gaming or typing.",
      description: "Perfect for those who prefer a quieter, more comfortable experience when gaming or typing. This future-proof keyboard is designed to last.",
      battery: "2× AAA batteries (up to 12 months)",
      connectivity: "Bluetooth 5.0",
      compatibility: "Windows",
      number_keys: 87,
      price: 29,
      image: "/images/razer_ornatav3_keyboard.png",
      recommended: true
    },
    {
      brand: "Arteck",
      model: "HB193 Universal Bluetooth",
      card_description: "Mechanical gaming keyboard with RGB underglow and dedicated macro keys.",
      description: "If you're the type that loves the sound of a key stroke, this keyboard is for you. Mechanical gaming keyboard with RGB underglow and dedicated macro keys. This keyboard is designed to last.",
      battery: "Wired (no battery)",
      connectivity: "Bluetooth, USB-A",
      compatibility: "Windows, macOS, Linux",
      number_keys: 100,
      price: 199,
      image: "/images/arteck_hb193_keyboard.png",
      recommended: false
    },
    {
      brand: "Apple",
      model: "Magic Keyboard",
      card_description: "Magic Keyboard delivers a remarkably comfortable and precise typing experience.",
      description: "Magic Keyboard delivers a remarkably comfortable and precise typing experience. The Apple brand is known for its quality and durability.",
      battery: "Rechargeable Li-ion (up to 12 months)",
      connectivity: "Bluetooth",
      compatibility: "Windows, macOS",
      number_keys: 78,
      price: 99,
      image: "/images/apple_magic_keyboard.png",
      recommended: true
    },
    {
      brand: "Lenovo",
      model: "ThinkPad TrackPoint Keyboard",
      card_description: "Optical-mechanical keyboard with analog key detection and per-key RGB.",
      description: "For those who prefer a more traditional keyboard, this keyboard is for you. Optical-mechanical keyboard with analog key detection and per-key RGB.",
      battery: "2× AAA batteries (up to 12 months)",
      connectivity: "Wired USB-A",
      compatibility: "Windows",
      number_keys: 84,
      price: 115,
      image: "/images/lenovo_thinkpad_keyboard.png",
      recommended: false
    }
]