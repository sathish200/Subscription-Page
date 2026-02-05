
import Radar from '../asserts/images/Radar.jpg';
import Roboeye from '../asserts/images/roboeye.jpg';
import smartdustbin from '../asserts/images/smartdustbin.jpg';
import arduinoradar from '../asserts/images/arduinoradar.jpg';
import display from '../asserts/images/display.jpg';
import oleddisplay from '../asserts/images/oleddisplay.jpg';

export interface VideoData {
  title: string;
  videoId: string;
  publishedAt: string;
  description: string;
  thumbnail: string;
  link: string;
  views: string;
  duration: string;
  category: string;
  
}
export const getDemoData = (): VideoData[] => {
    return [
        {
            title: "How to Make a Radar With ESP8266",
            videoId: "demo1",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            description: "Watch this incredible radar system using the ESP8266, an ultrasonic sensor, and a servo motor to scan the surroundings and visualize distance data in real time.",
            thumbnail: Radar,
            link: "https://www.youtube.com/watch?v=Fi3g5PLHTlI&t=80s",
            views: "125,847",
            duration: "8:23",
            category: "NodeMCU"
        },
        {
            title: "How to Make a Animated Robot Eyes with ESP8266",
            videoId: "demo2",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            description: "create awesome animated robot eyes using an ESP8266 microcontroller and an OLED display! Whether you're building a robot for fun or adding personality to your next DIY project, these expressive eyes will bring it to life",
            thumbnail: Roboeye,
            link: "https://youtu.be/PVk5r0LEIFw",
            views: "125,847",
            duration: "8:23",
            category: "NodeMCU"
        },
        {
            title: "How to Make a Smart Dustbin with ESP8266",
            videoId: "demo3",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            description: "make a Smart Dustbin using the ESP8266 NodeMCU, which opens automatically using an ultrasonic sensor and detects harmful gases using a gas sensor. Plus, you’ll also see how to connect the system to a mobile dashboard via Wi-Fi!",
            thumbnail: smartdustbin,
            link: "https://www.youtube.com/watch?v=5fTK_asSHKc",
            views: "125,847",
            duration: "8:23",
            category: "NodeMCU"
        },
        {
            title: "How to Make a Radar using Arduino",
            videoId: "demo4",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            description: "In this step-by-step tutorial, learn how to build an LED scrolling text display using the Raspberry Pi Pico microcontroller. Whether you're a beginner in electronics or a Raspberry Pi enthusiast, this project is a fun and educational way to understand interfacing, display control, and embedded coding.",
            thumbnail: arduinoradar,
            link: "https://youtu.be/GS6FJrWg4pA",
            views: "125,847",
            duration: "8:23",
            category: "Arduino"
        },
        {
            title: "Make a LED Scrolling Display Using Raspberry Pi Pico",
            videoId: "demo5",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            description: "In this step-by-step tutorial, learn how to build an LED scrolling text display using the Raspberry Pi Pico microcontroller. Whether you're a beginner in electronics or a Raspberry Pi enthusiast, this project is a fun and educational way to understand interfacing, display control, and embedded coding.",
            thumbnail: display,
            link: "https://youtu.be/_7FEAHZQrWc",
            views: "125,847",
            duration: "8:23",
            category: "Raspberry Pi"
        },
        {
            title: "How to Connect OLED Display with Arduino",
            videoId: "demo6",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            description: "In this video, you'll learn how to connect a 0.96-inch I2C OLED display to an Arduino Uno step-by-step! Whether you're a beginner or an experienced maker, this tutorial will guide you through the wiring, code, and tips to get your OLED screen working perfectly with Arduino.",
            thumbnail: oleddisplay,
            link: "https://youtu.be/UhnA0AFHdY8",
            views: "125,847",
            duration: "8:23",
            category: "Arduino"
        },
    ];
};