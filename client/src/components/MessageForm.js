import React, { useState } from 'react';

function MessageForm({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage({ user: 'User', text: message });
        setMessage('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default MessageForm;
