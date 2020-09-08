const app = require('express')();
 const http = require('http').Server(app);
 const io = require('socket.io')(http);

 let users = [];
 let messages = [];
 let index = 0;

 io.on('connection', socket => {
   socket.emit('loggedIn', {
     //creates a new array of users with just their usernames
     users: users.map(s => s.username),
     messages: messages,
   })


   socket.on('newUser', username => {
     console.log(`${username} has entered`)
     socket.username = username;
     users.push(socket)

     io.emit('userOnline', socket.username);
   })

   socket.on('msg', msg => {
       console.log(index);
     let message = {
       index: index,
       username: socket.username,
       messageText: msg,
     }
     console.log(message.index);
     messages.push(message);
     console.log(messages);
     io.emit('msg', message);
     index++;
   })

   //disconnect
   socket.on('disconnect', () => {
     console.log(`${socket.username} has left`)
     io.emit('userLeft', socket.username);
     users.splice(users.indexOf(socket), 1);
   })
 });

 http.listen(3000, () => {
   console.log('listening on port %s', 3000)
 })
