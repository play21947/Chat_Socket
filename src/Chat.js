import { useEffect, useState } from "react"

const Chat=({socket, username, room})=>{

    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage= async ()=>{
        if(currentMessage){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
            }

            await socket.emit('send_message', messageData)
        }
    }

    useEffect(()=>{
        socket.on('receive_message', (data)=>{
            setMessageList((list)=> [...list, data])
        })
    }, [socket])

    return(
        <div>
            <h1>Live Chat</h1>
            <div>

            </div>
            <input type="hey..." onChange={(e)=>{
                setCurrentMessage(e.target.value)
            }}></input>
            <button onClick={()=> sendMessage()}>&#9658;</button>
            {messageList && messageList.length > 0 ? messageList.map((item)=>{
                return (
                    <div>
                        {item.author} : {item.message}
                    </div>
                )
            }) : null}
        </div>
    )
}

export default Chat