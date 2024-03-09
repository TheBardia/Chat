function MessageList({ messages }) {
    console.log('messages on MessageList');
    console.log(messages);
    return (
        <ul>
            {messages.map((msg, index) => (
                <li key={index}>{msg.user}: {JSON.parse(msg.text).text}</li>
            ))}
        </ul>
    );
}


export default MessageList;
