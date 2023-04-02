import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import './styles.css';

const url = 'http://localhost:8080';
const socket = io(url);

export const Chat = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  const sendMessage = async () => {
    const message = messageRef.current.value;
    if (!message) return; // Check if message is empty
    await fetch('http://localhost:8080/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, username }),
    });
    socket.emit('message:server', { message, username });
    messageRef.current.value = ''; // Clear the input field after sending the message
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('http://localhost:8080/api/messages');
      const messages = await response.json();
      setMessages(messages);
    };

    fetchMessages();

    socket.on('message:client', (data) => {
      setMessages((messages) => [...messages, data]); // Add the received message to the messages state
    });

    socket.on('user:connected', (data) => {
      setUsers((users) => [...users, data]); // Add the connected user to the users state
    });

    socket.on('user:disconnected', (data) => {
      setUsers((users) => users.filter((user) => user !== data)); // Remove the disconnected user from the users state
    });
  }, []);

  return (
    <section className="chat__page">
      <div className="chat__box">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.username === username ? 'sent' : 'received'}`}>
              <p className="username">{message.username}</p>
              <p className="text">{message.message}</p>
              <p className="date">{message.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="inputs">
        <input
          className="i-username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="i-message" ref={messageRef} type="text" placeholder="Enter your message" />
        <button className="btn-send" onClick={sendMessage}>
          <i className="bx bxs-send"></i>
        </button>
      </div>
    </section>
  );
};
