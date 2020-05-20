import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat';
import ChatInput from './ChatInput';
import UserInput from './UserInput';
import RoomMenu from './RoomMenu';

function App() {
  let [user, setUser] = useState(localStorage.getItem('user'));
  let [room, setRoom] = useState('general');
  let [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms')
      .then(res => {
        setRooms(res.data.rooms);
      });
  }, []);

  function onUserLogin(newUser) {
    setUser(newUser);
    localStorage.setItem('user', newUser);
  }

  if (!user) {
    return (
      <div className='App'>
        <div className='content'>
          <h2>Welcome to fruitchat</h2>
          <p>What's your name?</p>
          <UserInput onLogin={onUserLogin} />
        </div>
      </div>
    );
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  function addNewRoom(room) {
    axios.post('/api/rooms', {name: room})
      .then(res => {
        setRooms([...rooms, res.data]);
      });
  }

  function removeRoom(roomId) {
    axios.delete('/api/rooms/' + roomId)
      .then(res => {
        setRooms(rooms.filter(x => x._id !== roomId));
      });
  }

  if (!rooms || !rooms.length) return <p>Loading...</p>;

  return (
    <div className="App">
      <Router>
        <aside>
          <h2>Fruitchat</h2>
          <button onClick={logout}>Logout</button>
          <RoomMenu rooms={rooms} onAddNewRoom={addNewRoom} onRemoveRoom={removeRoom} />
        </aside>
        <div className='content'>
          <Route exact path="/">
            <Redirect to={`/room/${rooms[0]._id}`} />
          </Route>
          <Route path="/room/:roomId">
            <Chat />
            <ChatInput user={user} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
