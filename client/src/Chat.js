import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {getSocket} from './socket';

function ChatMessage({message}) {
  return <p>{message.user} - {message.message}</p>;
}

export default function Chat() {
  const {roomId} = useParams();
  const [roomName, setRoomName] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/rooms/${roomId}`)
      .then(res => {
        setMessages(res.data.messages);
        setRoomName(res.data.name);
      });
  }, [roomId]);
  
  useEffect(() => {
    let socket = getSocket();
    function onNewMessage(msg) {
      setMessages(messages => [...messages, msg]);
    }

    socket.emit('join_room', roomId);

    socket.on('new_message', onNewMessage);
    return () => {
      socket.off('new_message', onNewMessage);
    }
  }, [roomId]);

  return (
    <div className='chat'>
      <h2>{roomName}</h2>
      {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
    </div>
  );
}
