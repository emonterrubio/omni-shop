export interface HeadphoneSpec {
  brand: string;
  model: string;
  card_description: string;
  description: string;
  connectivity: string;
  controls: string;
  battery: string;
  headphone_jack: string;
  charging: string;
  features: string;
  image: string;
  price: number;
  recommended: boolean;
}

export const headphoneData: HeadphoneSpec[] = [
    {
      brand: "Bose",
      model: " QuietComfort 45",
      card_description: "The perfect balance of quiet, comfort, and sound.",
      description: "The perfect balance of quiet, comfort, and sound. Bose uses tiny mics to measure, compare, and react to outside noise, cancelling it with opposite signals.",
      connectivity: "Bluetooth 5.1, wireless",
      controls: "buttons for volume/playback, ANC toggle, voice assistant",
      battery: "Rechargeable battery, up to 24 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-C to USB-C cable",
      features: "Active Noise Cancelling, lightweight, comfortable ear cushions, multipoint pairing",
      image: "/images/bose_quietcomfort_45_headphones.png",
      price: 199,
      recommended: true
    },
    {
      brand: "Bose",
      model: "QuietComfort",
      card_description: "With cancellation technology built for quiet distractions, so you can take music beyond the beat.",
      description: "The Bose Quietcomfort effortlessly combines noise cancellation technology with passive features so you can shut off the outside world, quiet distractions, and take music beyond the beat.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "touch controls, voice assistant",
      battery: "Rechargeable battery, up to 20 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-C cable",
      features: "Adjustable noise cancellation, built-in microphone, sleek design, quick charge",
      image: "/images/bose_quietcomfort_headphones.png",
      price: 249,
      recommended: false
    },
    {
      brand: "Bose",
      model: "QuietComfort Ultra",
      card_description: "This headset offers an immersive experience that will make music feel more real.",
      description: "Bose QuietComfort Ultra Headphones with spatial audio give you an immersive experience that makes music feel more real; CustomTune technology offers personalized sound, shaped to you.",
      connectivity: "Bluetooth 5.3, wireless",
      controls: "touch controls, voice assistant",
      battery: "Rechargeable case, earbuds up to 8 hrs, case adds 16 hrs",
      headphone_jack: "N/A",
      charging: "USB-C to USB-C cable, wireless charging compatible",
      features: "Noise cancelling, secure fit, sweat resistant, transparency mode",
      image: "/images/bose_quietcomfort_ultra_headphones.png",
      price: 399,
      recommended: true
    },
    {
      brand: "Apple",
      model: "AirPods Max",
      card_description: "The Apple AirPods Max are designed with spatial audio for comfort and performance.",
      description: "The Apple AirPods Max are designed for comfort and performance. With up to 20 hours of battery life and a sleek design, these headphones are perfect for travel and work.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "digital crown for volume/playback, button for noise controls",
      battery: "Rechargeable battery, up to 20 hours",
      headphone_jack: "N/A",
      charging: "Lightning to USB-C cable",
      features: "Spatial audio, dynamic head tracking, knit mesh canopy headband, Smart Case",
      image: "/images/apple_airpods_max_headphones.png",
      price: 499,
      recommended: false
    },
    {
      brand: "Apple",
      model: "Beats Studio Pro",
      card_description: "Immersive sound whether you're listening to music or taking calls.",
      description: "The Beats Studio Pro custom acoustic platform delivers rich, immersive sound whether you're listening to music or taking calls.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "force sensor, volume up/down, voice assistant",
      battery: "Rechargeable case, earbuds up to 6 hrs, case adds 18 hrs",
      headphone_jack: "N/A",
      charging: "USB-C to Lightning cable",
      features: "Secure-fit wingtips, ANC, Spatial audio support, sweat and water resistant",
      image: "/images/apple_beats_studio_pro_headphones.png",
      price: 349,
      recommended: true
    },
    {
      brand: "Sony",
      model: "WH-1000XM5",
      card_description: "The headset that ensures an uninterrupted listening experience.",
      description: "Experience the magic of noise cancelling headphones bluetooth technology, ensuring an uninterrupted listening experience free from external disturbances.",
      connectivity: "Bluetooth 5.2, wireless",
      controls: "touch controls, voice assistant",
      battery: "Rechargeable battery, up to 30 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-C cable",
      features: "Industry-leading noise cancellation, auto wind noise reduction, quick charge",
      image: "/images/sony_wh-1000xm5_headphones.png",
      price: 298,
      recommended: false
    },
    {
      brand: "Sony",
      model: "WH-CH720N",
      card_description: "The lightest wireless noise canceling headband ever.",
      description: "The lightest wireless noise canceling headband ever. Super comfortable and lightweight design so you can fully immerse yourself in your work.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "buttons for volume/playback, ANC toggle",
      battery: "Rechargeable battery, up to 35 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-C cable",
      features: "Active Noise Cancelling, foldable design, quick charge",
      image: "/images/sony_wh-cg720n_headphones.png",
      price: 98,
      recommended: true
    },
    {
      brand: "JBL",
      model: "Tune 770NC",
      card_description: "Adaptive Noise Cancelling with Smart Ambient means zero distractions.",
      description: "Adaptive Noise Cancelling with Smart Ambient means zero distractions whether you're working, studying or getting lost in the music.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "buttons for volume/playback, ANC toggle",
      battery: "Rechargeable battery, up to 35 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-C cable",
      features: "Noise Cancelling, foldable design, ambient aware mode",
      image: "/images/jbl_tune_770nc_headphones.png",
      price: 99,
      recommended: false
    },
    {
      brand: "JBL",
      model: "Live 770NC",
      card_description: "Powerful JBL Signature Sound that turns any stereo content from any device into virtual surround sound.",
      description: "Check out the JBL Signature Sound and powerful JBL Signature Sound, the 40mm drivers offer immersive JBL Spatial Sound that turns any stereo content from any device into virtual surround sound.",
      connectivity: "Bluetooth 5.2, wireless",
      controls: "touch controls, voice assistant",
      battery: "Rechargeable case, earbuds up to 10 hrs, case adds 20 hrs",
      headphone_jack: "N/A",
      charging: "USB-C cable, wireless charging compatible",
      features: "Active Noise Cancelling, ear fins for secure fit, IPX7 waterproof",
      image: "/images/jbl_live_770nc_headphones.png",
      price: 149,
      recommended: true
    },
    {
      brand: "Beats",
      model: "Studio3 Wireless",
      card_description: "The Beats Studio3 Wireless are designed for comfort and performance.",
      description: "The Beats Studio3 Wireless are designed for comfort and performance. With up to 22 hours of battery life and a sleek design, these headphones are perfect for travel and work.",
      connectivity: "Bluetooth Class 1, wireless",
      controls: "on-ear controls, voice assistant",
      battery: "Rechargeable battery, up to 22 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-A to micro-USB cable",
      features: "Pure Adaptive Noise Cancelling, Apple W1 chip, comfortable ear cushions",
      image: "/images/beats_studio3_headphones.png",
      price: 299,
      recommended: false
    },
    {
      brand: "Skullcandy",
      model: "Crusher Evo",
      card_description: "Your music and movies will come alive with a sound experience you can actually feel.",
      description: "Skullcandy Crusher is the original, immersive, adjustable sensory bass. Your music and movies will come alive with a sound experience you can actually feel.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "on-ear controls, volume dial",
      battery: "Rechargeable battery, up to 40 hours",
      headphone_jack: "3.5 mm audio jack",
      charging: "USB-C cable",
      features: "Sensory bass technology, built-in Tile tracker, foldable design",
      image: "/images/skullcandy_crusher_evo_headphones.png",
      price: 129,
      recommended: true
    },
    {
      brand: "Skullcandy",
      model: "Hesh ANC",
      card_description: "This model is the perfect headphone for those who want to feel the music.",
      description: "Powered by our 40mm drivers, the Hesh ANC ensures extremly high quality audio with gnarly bass, a dynamic range as well as exceptional acoustics.",
      connectivity: "Bluetooth 5.0, wireless",
      controls: "touch controls, voice assistant",
      battery: "Rechargeable case, earbuds up to 5 hrs, case adds 19 hrs",
      headphone_jack: "N/A",
      charging: "USB-C cable",
      features: "Comfort fit, water resistant, built-in Tile tracker",
      image: "/images/skullcandy_heash_anc_headphones.png",
      price: 79,
      recommended: false
    }
]