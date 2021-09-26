import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import Chat from './Chat'

let socket = io.connect('http://localhost:3001/')

function App() {

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = ()=>{

    console.log(username)
    console.log(room)

    if(username && room){
      socket.emit('join_room', room)
    }
  }

  return (
    <div className="App">
      <h1>Real time Application</h1>
      <input placeholder="john..." onChange={(e)=> {
        setUsername(e.target.value)
      }}></input>
      <input placeholder="Room ID..." onChange={(e)=>{
        setRoom(e.target.value)
      }}></input>
      <button onClick={()=>{
        joinRoom()
      }}>Join A Room</button>

      <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;
