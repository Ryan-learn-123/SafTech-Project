import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition from 'react-speech-recognition';
import Say from 'react-say';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
       utterance.onend = () => {
        console.log("Speech has ended.");
      };
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  
  const handleVoiceInput = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleSendMessage = () => {
    const response = 'Here is your AI-generated response.';
    setInput(response);
  };

  const navigate = useNavigate(); 
  const productKnowledge = {
    phone: "Phones come in different types: budget, mid-range, and flagship. Consider battery life, camera quality, and processing power when choosing.",
    laptop: "Laptops vary by purpose: gaming, business, or general use. Important factors are RAM, processor speed, and storage type (SSD is faster than HDD).",
    tablet: "Tablets are great for portability and entertainment. Choose between Android, iOS, or Windows, depending on your needs.",
    desktop: "Desktops offer high-performance computing for gaming and workstations. Choose components carefully based on upgradability and processing power.",
    "computer components": "Key computer components include the CPU, GPU, RAM, SSD, motherboard, and cooling system. Each plays a crucial role in performance.",
    speakers: "Speakers range from wired, Bluetooth, and smart speakers. Consider sound quality, battery life, and compatibility with your devices.",
    microphone: "Microphones can be dynamic or condenser. Dynamic is great for live settings, while condenser mics are ideal for studio recording.",
    camera: "Get some of the highest quality captures which ranges from 1080p to 1440p or simply say capture it in 4K",
    headphones:"Keep the beats grinding as you ears boom with your favourite melodies.They offer the best way to listen to the world",
    techcomponents:"The components are wide range thus can easily provide your necessities without losing much times. Repair is exclusive to the shop with products having a 2 years warranty", 
    screens:"With a wide range on sale you can have the best experience in entertainment, sports, media etc.",
    askAboutTech: "If you have any questions about technology devices or need recommendations, feel free to ask. I'm here to help you make an informed decision!",
    greetings: {
      morning: "Good morning! How can I assist you with your tech needs today?",
      afternoon: "Good afternoon! What technology are you looking to explore?",
      evening: "Good evening! Need help with your tech devices?",
      general: "Hello! How can I help you with your technology questions today?",
    },
    smartwatches: "Smartwatches are the perfect companion for your phone, offering fitness tracking, notifications, and more. Choose based on battery life, app support, and style.But are to be added soon ! Stay tuned.",
    virtualReality: "Virtual Reality headsets offer an immersive experience for gaming and simulations. Key features include resolution, comfort, and motion tracking.But are to be added soon ! Stay tuned.",
    router: "A router connects your home network to the internet. For better performance, consider Wi-Fi 6, range, and speed capabilities based on your home size and internet plan.But are to be added soon ! Stay tuned.",
    storageDevices: "External hard drives and SSDs are great for expanding your storage. SSDs are faster and more durable, while HDDs offer more storage at a lower cost.But are to be added soon ! Stay tuned.",
    printers: "Printers come in inkjet, laser, and thermal varieties. Choose based on print quality, speed, and whether you need color or black-and-white printing.But are to be added soon ! Stay tuned.",
    gamingConsoles: "Gaming consoles like PlayStation, Xbox, and Nintendo Switch each have unique games and features. Consider exclusives, performance, and online services.But are to be added soon ! Stay tuned.",
    powerBanks: "Power banks are essential for charging your devices on the go. Choose one with enough capacity (mAh) to keep your phone or tablet charged throughout the day.But are to be added soon ! Stay tuned.",
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
    setLoading(true);

    setTimeout(() => {
      let botResponse = "Sorry, I don't have knowledge about that. Please ask about tech products like phones, laptops,tablets,desktop,speakers,microphone or even anything else techy you may want to know about. ";

     
      const patterns = Object.keys(productKnowledge).map((key) => ({
        regex: new RegExp(`(.*)(${key})(.*)`, "i"),
        response: productKnowledge[key],
      }));

      for (const pattern of patterns) {
        if (pattern.regex.test(input)) {
          botResponse = pattern.response;
          break;
        }
      }

      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
      setInput("");
      setLoading(false);
    }, 1000); 
    speakText(botResponse);
  };

  return (
    
    <div className="hero-banner">
      <div className="container-fluid">
      <div className="bg getproducts-background">
         <div className="chatbot">
          <div className="chat-box">
            {messages.map((message, index) => (
              <div key={index} className={message.sender}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Ask me about tech products..."
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "Loading..." : "Send"}
            </button>
          </div><br />
          {/* <button onClick={() => {
          const utterance = new SpeechSynthesisUtterance(input);
          window.speechSynthesis.speak(utterance);
        }}>
          🔊 Speak Message
        </button> */}
          <button
            onClick={() => {
              const lastBotMessage = messages[messages.length - 1];
              if (lastBotMessage && lastBotMessage.sender === 'bot') {
                speakText(lastBotMessage.text);
              }
            }}
          >
            🔊 Speak Bot Reply
          </button>
          <button
              onClick={stopSpeaking}
            >
              ⏹️ Stop Speaking
            </button>
          <button onClick={handleVoiceInput}>🎤 Start Listening</button>
          {/* <button onClick={handleSendMessage}>Send Message</button> */}
          <p>{input}</p>
          <Say speak={input} />

          {/* Home Button */}
          <button className="home-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chatbot;