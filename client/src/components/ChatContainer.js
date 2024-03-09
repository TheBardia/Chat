import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

function ChatContainer() {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:5000');
        setWs(websocket);

        websocket.onopen = () => console.log('WebSocket Connected');
        websocket.onerror = (error) => console.log('WebSocket Error:', error);
        websocket.onmessage = (event) => {
            console.log("Received data type:", typeof event.data);
            console.log("Received data content:", event.data);
            if (typeof event.data === "string") {
                const receivedData = event.data;
                const parsedData = JSON.parse(receivedData);
        
                let text;
                if(parsedData.text.data){
                    text = String.fromCharCode.apply(null, parsedData.text.data);
                } else {
                    text = parsedData.text;
                }
                console.log('text=' + text);
                        
                const messageObj = {
                    user: parsedData.user,
                    text: text
                };
        
                setMessages(prevMessages => [...prevMessages, messageObj]);
            } else {
                console.log("Received non-string message", event.data);
            }
        };
        


        return () => websocket.close();
    }, []);

    const sendMessage = (message) => {
        console.log('Sending message:', message);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open.');
        }
    };


    return (
        <div>
            <MessageList messages={messages} />
            <MessageForm onSendMessage={sendMessage} />
        </div>
    );
}

export default ChatContainer;
