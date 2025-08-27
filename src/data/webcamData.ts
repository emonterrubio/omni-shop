export interface WebcamSpec {
  brand: string;
  model: string;
  card_description: string;
  description: string;
  video_resolution: string;
  display_resolution: string;
  image_aspect_ratio: string;
  image_capture_rate: string;
  supported_image_format: string;
  supported_audio_format: string;
  supported_video_format: string;
  price: number;
  image: string;
  recommended: boolean;
}

export const webcamData: WebcamSpec[] = [
  {
    brand: "Logitech",
    model: "Brio 4K Webcam",
    card_description: "WIth Ultra 4K resolution and noise-canceling technology, this camere helps you stay connected.",
    description: "Ultra 4K HD resolution with Noise-canceling technology, 3 field of view presets, and 1080p at 90fps. Supports work from anywhere with Sync device management software to help employees stay connected.",
    video_resolution: "1080p",
    display_resolution: "4096 x 2160",
    image_aspect_ratio: "16:9",
    image_capture_rate: "90fps",
    supported_image_format: "JPEG",
    supported_audio_format: "MP3, WAV, AAC",
    supported_video_format: "MP4, AVI, MOV, WMV, FLV, MKV, WEBM",
    price: 130,
    image: "/images/logitech_brio_webcam.png",
    recommended: false
  },
  {
    brand: "Logitech",
    model: "C920x HD Pro Webcam",
    card_description: "This makes it a great webcam for streaming and an ideal web camera for laptop use.",
    description: "Automatically fine-tunes the lighting, producing bright, razor-sharp images even in low-light settings. This makes it a great webcam for streaming and an ideal web camera for laptop use.",
    video_resolution: "1080p 4k",
    display_resolution: "4096 x 2160",
    image_aspect_ratio: "16:9",
    image_capture_rate: "60fps",
    supported_image_format: "JPEG, PNG, BMP",
    supported_audio_format: "MP3, WAV, AAC",
    supported_video_format: "MP4, AVI, MOV",
    price: 70,
    image: "/images/logitech_c920x_webcam.png",
    recommended: true
  },
  {
    brand: "Lenovo",
    model: "HD 1080p Webcam",
    card_description: "Experience crystal-clear video quality that delivers sharp and detailed visuals.",
    description: "Experience crystal-clear video quality equipped with a high-resolution 2.1-megapixel CMOS camera that delivers stunning full HD 1080p resolution at 30fps for sharp and detailed visuals.",
    video_resolution: "1072p",
    display_resolution: "1920 x 1080",
    image_aspect_ratio: "16:9",
    image_capture_rate: "30fps",
    supported_image_format: "JPEG",
    supported_audio_format: "AAC, MP3, PCM, FLAC",
    supported_video_format: "AVI",
    price: 40,
    image: "/images/lenovo_hd_1080p_webcam.png",
    recommended: true
  },
  {
    brand: "Emeet",
    model: "NOVA 4K Webcam",
    card_description: "This camera delivers the ultimate high-definition visual experience.",
    description: "This camera delivers the ultimate high-definition visual experience. Ideal for crucial business meetings, online education, or personal streaming. The 4K resolution enhances visual appeal and engagement.",
    video_resolution: "1080p 4k",
    display_resolution: "1920 x 1080",
    image_aspect_ratio: "16:9",
    image_capture_rate: "30fps",
    supported_image_format: "JPEG",
    supported_audio_format: "Multiple (including but not limited to MP3, WAV, AAC, FLAC, OPUS)",
    supported_video_format: "MP4, MP3",
    price: 60,
    image: "/images/emeet_nova_webcam.png",
    recommended: true
  },
  {
    brand: "Insta360",
    model: "Link 2C Webcam",
    card_description: "Capture every detail and experience best-in-class audio with advanced AI noise-canceling.",
    description: "Capture every detail, experience best-in-class audio with advanced AI noise-canceling algorithms, keep your audience engaged with faster, more accurate Phase Detection Auto Focus (PDAF) and adapt to every scenario with versatile modes.",
    video_resolution: "1080p 4k",
    display_resolution: "1920 x 1080",
    image_aspect_ratio: "16:9",
    image_capture_rate: "60fps",
    supported_image_format: "JPEG",
    supported_audio_format: "MP3, WAV)",
    supported_video_format: "MP4",
    price: 150,
    image: "/images/insta360_link_2c_webcam.png",
    recommended: false
  },
  {
    brand: "Anker",
    model: "PowerConf C200 2K Wireless Webcam",
    card_description: "This 2K resolution webcam for professional-grade conferences, enhancing your PC setup.",
    description: "With a 2K Ultra-Clear Resolution, enjoy sharp, detailed video with this 2K resolution webcam for professional-grade conferences, enhancing your PC setup.",
    video_resolution: "1080p 2k",
    display_resolution: "1920 x 1080",
    image_aspect_ratio: "16:9",
    image_capture_rate: "60fps",
    supported_image_format: "JPEG",
    supported_audio_format: "MP3",
    supported_video_format: "MP4",
    price: 55,
    image: "/images/anker_powerconf_c200_webcam.png",
    recommended: true
  },
]