//this is the express server, we import with require the express module,
// and then invoke it with the () right after it
const app = require('express')();
//built in node module that allows us to use http protocols and listen on a port
 const http = require('http').Server(app);
 //socketIO, the framework we are using, it is built of web sockets
//we must import the framework, then invoke it with () right after
//passing in our http module that we imported above
 const io = require('socket.io')(http);

 //users in our chat, messages in our chat, and the index of each message
 let users = [];
 let messages = [];
 let index = 0;

 //helper function that gets us the length of our users and messages Array
let getChatChartData = () => {
    return {
        users: users.length,
        messages: messages.length,
    };
}


//start our socketIO connection
 io.on('connection', socket => {
     //emit is SENDING data away from the socket, in this function
     //we are sending back to our client an object with the users array + the messages array
   socket.emit('loggedIn', {
     //creates a new array of users with just their usernames
     users: users.map(s => s.username),
     messages: messages,
   })

     //interval we are using to watch for new data to send back to our chart
   setInterval(() => {
       //emits data back to our chart using our helper function defined outside this function
       socket.emit('getData', getChatChartData())
   }, 1000)

     //on is for RECEIVING data from the client, in this case we emit 'newUser' from the client
   socket.on('newUser', username => {
     console.log(`${username} has entered`)
       //set the username of this socket to username given
     socket.username = username;
     //add user to users array
     users.push(socket)
       //send back to client the username
     io.emit('userOnline', socket.username);
   })

     //on, so we are RECEIVING a message from the client
   socket.on('msg', msg => {
       //created message object
     let message = {
       index: index,
       username: socket.username,
       messageText: msg,
     }
        //push new message to server
     messages.push(message);
        //emit back to the client the new message object
     io.emit('msg', message);
        //increase index for the next message
     index++;
   })

   //listen for 'disconnect' event (the page not existing anymore counts)
   socket.on('disconnect', () => {
     console.log(`${socket.username} has left`)
       //emit back to client that a user has left, sending the socket username
     io.emit('userLeft', socket.username);
        //remove that user from the users array
     users.splice(users.indexOf(socket), 1);
   })
 });

//start our server, listening on port 3030;
 http.listen(3030, () => {
   console.log('listening on port %s', 3030)
 })
