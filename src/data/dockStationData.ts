export interface DockStationSpec {
  brand: string;
  model: string;
  sku: string;
  card_description: string;
  description: string;
  ports: string;
  power: string;
  dimensions: string;
  weight: string;
  price: number;
  image: string;
  recommended: boolean;
}

export const dockStationData: DockStationSpec[] = [
  {
    brand: "Dell",
    model: "WD19 Docking Station",
    sku: "DEL-WD19130W-5520-001",
    card_description: "Evolve as your needs change with our most versatile dock.",
    description: "Evolve as your needs change with our most versatile dock. This docking station includes a 130W power adapter, but only delivers 90W of power to the laptop due to the power requirements of the dock itself.",
    ports: "1x USB-C 3.1 (Gen 2), 1x USB-A 3.1 (Gen 1 with PowerShare), 2x USB-A 3.1 (Gen 1), 1x combo Audio/ headset, 1x audio Out, 2x DisplayPort 1.4, 1x HDMI 2.0B, 1x USB-C Multifunction DisplayPort, 1x Gigabit Ethernet RJ45",
    power: "Power adapter 130 watt AC 120/230 V (50/60 Hz). docking interface: USB-C",
    dimensions: "8.1 x 3.5 x 1.1 inches.",
    weight: "20.63 oz",
    price: 135,
    image: "/images/dell_wd19_docking_station.png",
    recommended: true
  },
  {
    brand: "Lenovo",
    model: "Dual Display Travel Dock",
    sku: "LEN-USBCDDTD-5520-002",
    card_description: "Your workspace reimagined with a USB-C Dual Display Travel Dock that merges style and productivity.",
    description: "Reimagining your workspace, the Lenovo USB-C Dual Display Travel Dock merges style, productivity, and sustainability. Encased in a modern Eclipse Black design, it makes a distinctive, minimalist statement.",
    ports: "1 x USB-A 3.2 10 Gbps; 2 x USB-C 10 Gbps (Include 1 x always-on USB with max. 5V/2.4A charging when NB disconnected) Video Ports: 1 x DP 1.4; 1 x HDMI 2.0 Networking: 1 x RJ45 (Support 10/100/1000M Network Transmission, Plug-and-Play)",
    power: "Power adapter with up to 100W PD (with an additional 135W USB-C adapter)",
    dimensions: "4.72 x 2.6 x 0.79 inches.",
    weight: "4.8 oz",
    price: 135,
    image: "/images/lenovo_usb-c_travel_dock.png",
    recommended: true
  },
  {
    brand: "ThinkPad",
    model: "Universal Docking Station",
    sku: "THI-40AF0135-5520-003",
    card_description: "This dock station works with any laptops including Intel-based MacBooks.",
    description: "Not only for ThinkPad but the docking station also works with any laptops with a fully functional USB-C port or USB 3.0 Port including Intel-based MacBooks.",
    ports: "6-USB ports in total:1x USB-C 5V 3A power port, 2x USB2.0, and 3x USB 3.1 gen2 that provides a transfer speed of 10Gbps including one that charges. 1x Gigabit Ethernet, 2x Display Port, 2x HDMI Port, and 1x Stereo/Mic Combo Audio Port.",
    power: "USB-C Power adapter with up to 135W",
    dimensions: "3.6 x 2.8 x 2 inches.",
    weight: "1 lb",
    price: 259,
    image: "/images/ThinkPad_hybrid_docking_station.png",
    recommended: false
  },
  {
    brand: "Lenovo",
    model: "Multiport Docking Station",
    sku: "LEN-GANMULTI-5520-004",
    card_description: "This dock provides dual functionality as both a power adapter and portable docking station.",
    description: "Powered by GaN Technology: Features 60W max power output for efficient charging and high-speed data transfer. Dual functionality as both a power adapter and portable docking station.",
    ports: "HDMI 2.1 (4K at 60Hz), 2 USB-C (7.5W, 10Gbps), 1 USB-A (4.5W, 10Gbps), Micro SD slot, and USB-C upstream charging for all your devices.",
    power: "USB-C Power adapter with up to 65W",
    dimensions: "3.15 x 1.32 x 3.15 inches.",
    weight: "250 g",
    price: 95,
    image: "/images/lenovo_gan_multiport_docking_station.png",
    recommended: false
  },
  {
    brand: "Anker",
    model: "Laptop Docking Station",
    sku: "ANK-LAPDOCK-5520-005",
    card_description: "Get both a power adapter and portable docking station.",
    description: "Connect your laptop to the 85W USB-C port and connect your phone or other mobile device to the 18W Power Delivery USB-C port to get simultaneous high-speed charging.",
    ports: "Equipped with an 85W laptop-charging USB-C port, an 18W Power Delivery USB-C port, a USB-C data port, 3 USB-A ports, 2 HDMI ports, a DisplayPort, an Ethernet port, SD/microSD card slots, a 3.5 mm AUX port, and a DC input.",
    power: "PowerExpand 13-in-1 USB-C Dock, a 135W power adapter.",
    dimensions: "3.15 x 1.32 x 3.15 inches.",
    weight: "250 g",
    price: 95,
    image: "/images/anker_docking_station.png",
    recommended: false
  },
]