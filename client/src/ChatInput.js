import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getSocket} from './socket';

export default function ChatInput({user}) {
  const {roomId} = useParams();
  const [message, setMessage] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    let socket = getSocket();
    socket.emit('new_message', {message: message, user: user, roomId: roomId});
    setMessage('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={e => setMessage(e.target.value)} value={message} type="text" name="message" />
      <button type="submit">Send</button>
    </form>
  );
}
