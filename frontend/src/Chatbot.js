import React, { useState } from "react";
import "./chatbot.css";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [options, setOptions] = useState(["English", "हिन्दी"]); // Default buttons

    const sendMessage = async (input) => {
        const userMessage = { text: input, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const botMessage = { text: data.response, sender: "bot" };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            // Ensure options are formatted correctly
            setOptions(data.options.length > 0 ? data.options : []);
        } catch (error) {
            console.error("❌ Error fetching chatbot response:", error);
        }
    };

    return (
        <div>
            <h2>Loan Chatbot</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        {msg.text}
                    </p>
                ))}
            </div>

            {/* Dynamic Buttons */}
            <div>
                {options.length > 0 ? (
                    options.map((option, index) => (
                        <button key={index} onClick={() => sendMessage(option)}>
                            {option}
                        </button>
                    ))
                ) : (
                    <p>No options available</p>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
