export interface MouseSpec {
  brand: string;
  model: string;
  description: string;
  battery: string;
  connectivity: string;
  button_quantity: number;
  compatibility: string;
  price: number;
  image: string;
  recommended: boolean;
}

export const mouseData: MouseSpec[] = [
  {
    brand: "HP",
    model: "X3000 G3 Wireless Mouse",
    description: "Slim, portable mouse with Bluetooth connectivity, side grips for control and optical tracking",
    battery: "1× AA battery (up to 12 months)",
    connectivity: "Bluetooth 4.0",
    button_quantity: 3,
    compatibility: "Windows, macOS, Linux",
    price: 16,
    image: "/images/hp_x3000_g3_mouse.png",
    recommended: true
  },
  {
    brand: "Logitech",
    model: "M185 WirelessMouse",
    description: "Ergonomic high-performance optical tracking mouse with MagSpeed scroll wheel",
    battery: "Rechargeable Li-Po (up to 70 days)",
    connectivity: "Bluetooth, Unifying USB receiver",
    button_quantity: 2,
    compatibility: "Windows, macOS, Linux",
    price: 15,
    image: "/images/logitech_m185_mouse.png",
    recommended: false
  },
  {
    brand: "Apple",
    model: "Magic Mouse 2",
    description: "Multi-touch surface mouse with rechargeable battery",
    battery: "Built-in rechargeable (up to 1 month)",
    connectivity: "Bluetooth 4.2",
    button_quantity: 2,
    compatibility: "macOS",
    price: 80,
    image: "/images/apple_magic_mouse.png",
    recommended: true
  },
  {
    brand: "Cherry",
    model: "MW 8C Ergo Wireless",
    description: "Rechargeable ergonomic mouse with 8 programmable buttons and encrypted high-performance sensor",
    battery: "1× AA battery (up to 9 months)",
    connectivity: "Bluetooth 5.0",
    button_quantity: 6,
    compatibility: "Windows, macOS, Android",
    price: 55,
    image: "/images/cherry_mw8c_ergo_mouse.png",
    recommended: false
  },
  {
    brand: "Logitech",
    model: "M510 Wireless Mouse",
    description: "Compact travel mouse with high-precision optical sensor",
    battery: "1× AAA battery (up to 8 months)",
    connectivity: "2.4 GHz USB receiver",
    button_quantity: 3,
    compatibility: "Windows, macOS",
    price: 25,
    image: "/images/logitech_m510_mouse.png",
    recommended: true
  },
  {
    brand: "Logitech",
    model: "MX Master 2S Bluetooth Edition",
    description: "RGB gaming mouse with adjustable DPI and ergonomic grip",
    battery: "Rechargeable Li-ion (up to 40 hours)",
    connectivity: "Wired USB-C",
    button_quantity: 8,
    compatibility: "Windows, macOS",
    price: 70,
    image: "/images/logitech_mx_master_2s_mouse.png",
    recommended: false
  },
  {
    brand: "Logitech",
    model: "M650 Signature Wireless Mouse",
    description: "Lightweight esports mouse with HERO sensor with silent clicks and customizable buttons",
    battery: "Rechargeable Li-Po (up to 60 hours)",
    connectivity: "Wireless USB receiver",
    button_quantity: 6,
    compatibility: "Windows, macOS",
    price: 35,
    image: "/images/logitech_m650_mouse.png",
    recommended: true
  },
  {
    brand: "Dell",
    model: "MS700 Bluetooth Travel Mouse",
    description: "Slim and light weight with twistable design so you can take it wherever you go",
    battery: "Rechargeable Li-ion (up to 8 weeks)",
    connectivity: "Bluetooth, USB receiver",
    button_quantity: 3,
    compatibility: "Windows, macOS",
    price: 50,
    image: "/images/dell_ms700_mouse.png",
    recommended: false
  },
  {
    brand: "Nulea",
    model: "M501 Wireless Trackball Mouse",
    description: "Move your cursor by the smooth trackball and let the easy and smooth thumb control help you reduce your muscle stress",
    battery: "2× AAA batteries (up to 12 months)",
    connectivity: "2.4 GHz USB dongle",
    button_quantity: 7,
    compatibility: "Windows, macOS, Linux",
    price: 34,
    image: "/images/nulea_m501_mouse.png",
    recommended: true
  }
]