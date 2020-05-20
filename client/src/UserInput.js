import React, {useEffect, useState} from 'react';

export default function UserInput({onLogin}) {
  let [user, setUser] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    if (typeof onLogin === 'function') {
      onLogin(user);
    }
  }
  return <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={user} onChange={e => setUser(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  </div>
}
