import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Room({room, onRemoveRoom}) {
  return <div>
    <Link to={"/room/" + room._id}>{room.name}</Link>
    <button onClick={() => onRemoveRoom(room._id)}>x</button> 
  </div>;
}

export default function RoomMenu({rooms, onAddNewRoom, onRemoveRoom}) {
  const [newRoom, setNewRoom] = useState('');
  function addNewRoom(e) {
    e.preventDefault();
    if (typeof onAddNewRoom === 'function') {
      onAddNewRoom(newRoom);
    }
    setNewRoom('');
  }

  return <div className='room-menu'>
    <nav>
      {rooms.map(room => {
        return <Room key={room._id} room={room} onRemoveRoom={onRemoveRoom} />;
      })}
    </nav>
    <p>Create new room</p>
    <form onSubmit={addNewRoom}>
      <input type="text" onChange={e => setNewRoom(e.target.value)} value={newRoom} />
      <button type="submit">Create room</button>
    </form>
  </div>
}
