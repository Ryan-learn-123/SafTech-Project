import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    screens:"With a wide range on sale you can have the best experience in entertainment, sports, media etc."
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
    setLoading(true);

    setTimeout(() => {
      let botResponse = "Sorry, I don't have knowledge about that. Please ask about tech products like phones, laptops,tablets,desktop,speakers or microphone";

     
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
  };

  return (
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
          </div>

          {/* Home Button */}
          <button className="home-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;