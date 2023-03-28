import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
    const params = useParams();
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState({ id: '', name: '' })
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef(messages);
    const navigate = useNavigate();
    useEffect(() => {
        const { userId, userName } = params;
        const user = {
            id: userId,
            name: userName,
        }
        setUser(user);

        const url = 'http://localhost:5000';
        const socket = io(url);
        setSocket(socket);

        socket.emit('join', { user })
        socket.on('messageReceived', (message) => handleMessageReceived(message, messagesRef.current))
        socket.on('userJoined', (user) => handleUserJoined(user, messagesRef.current))
        socket.on('userLeftRoom', (user) => handleUserLeft(user, messagesRef.current))
    }, []);

    const handleMessageTextChange = (e) => {
        const { target: { value } } = e;
        setNewMessage(value);
    }

    const sendMessage = () => {
        const message = {
            text: newMessage,
            userId: user.id,
            userName: user.name,
        };
        setMessages((prevValue) => ([
            ...prevValue,
            message,
        ]));
        setNewMessage('');
        socket.emit('sendMessage', { message });
    }

    const handleMessageReceived = (message, messages) => {
        setMessages([
            ...messages,
            message,
        ]);
    }

    const handleUserJoined = (user, messages) => {
        const messageEvent = {
            user,
            isUserJoined: true,
        }
        setMessages([
            ...messages,
            messageEvent,
        ])
    }

    const handleUserLeft = (user, messages) => {
        const messageEvent = {
            user,
            isUserLeft: true,
        };
        setMessages([
            ...messages,
            messageEvent,
        ])
    }

    const leaveChat = () => {
        socket.emit('leaveChat', { user });
        socket.off();
        navigate('/');
    }
    return (
        <div>
            <div>
                <div>
                    <button onClick={leaveChat}>
                        Leave Chat
                    </button>
                </div>
                {messages.length ? (
                    messages.map((message) => {
                        if (message.isUserJoined) {
                            return (
                                <div
                                    key={Math.random()}
                                >
                                    <div>
                                        <span>{`${message.user.name} joined the chat`}</span>
                                    </div>
                                </div>
                            )
                        } else if (message.isUserLeft) {
                            <div
                                    key={Math.random()}
                                >
                                    <div>
                                        <span>{`${message.user.name} left the chat`}</span>
                                    </div>
                                </div>
                        } else if (parseInt(message.userId) === parseInt(user.id)) {
                            return (
                                <div
                                    key={Math.random()}
                                >
                                    {message.text}
                                </div>
                            )
                        } else {
                            <div
                                key={Math.random()}
                            >
                                <div>
                                    {message.userName}
                                </div>
                                <div>
                                    {message.text}
                                </div>
                            </div>
                        }
                    })
                ) : (
                    <div>
                        <h1>No message yet</h1>
                    </div>
                )}
            </div>
            <div>
                <textarea
                    name="text"
                    rows={5}
                    onChange={(e) => handleMessageTextChange(e)}
                    placeholder="Type your message"
                    value={newMessage}
                />
                <div>
                    <button
                        type='submit'
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;