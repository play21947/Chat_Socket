const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors:{
        origin: '*'
    }
})

app.use(express.json())
app.use(cors())

io.on("connection", (socket)=>{
    console.log("User connected")

    socket.on('join_room', (id)=>{
        socket.join(id)
        console.log("User Id : " + socket.id + "Stayed in room :" + id)
    })

    socket.on('send_message', (data)=>{// ส่งmessageแล้ว
        socket.to(data.room).emit('receive_message', data) //รับmessageที่เข้ามาใหม่ด้วย
    })

    socket.on('disconnect', ()=>{
        console.log("User Disconnect")
    })
})

app.get("/hello", (req, res)=>{
    res.json({data: "Success"})
})


http.listen(3001, ()=>{
    console.log("server is running on port 3001")
})