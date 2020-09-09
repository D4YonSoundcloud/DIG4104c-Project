<template>
  <div id="app">
    <div class="header-div">
      DIG4104c Chat Room Project
    </div>
<!--    custom vue component-->
    <Home></Home>
    <h1>Chat Room Demo</h1>
    <p class="username" >Username: {{ username }}</p>
    <p class="online">Online: {{ users.length }}</p>
    <ChatRoom v-if="showChatRoom" class="chat-room-container" v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
    <Chart  class="chart-div"></Chart>
  </div>
</template>

<script>

  //you must import a component if you want to use it, as well as define it in the 'components' object of the component you are bringing it into
  import Home from "./components/Home.vue";
  import io from 'socket.io-client';
  import ChatRoom from "./components/ChatRoom";
  import Chart from "./components/Chart";

export default {
  name: 'app',
  components:{
    Home,
    ChatRoom,
    Chart,
  },
  data () {
    return {
      username: "",
      potentialUsername: '',
      socket: io("http://localhost:3030"),
      messages: [],
      users: [],
      showChatRoom: false,
      showUsernameSetWarning: false,
    }
  },
  methods: {

    joinServer(){
      this.socket.on('loggedIn', data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newUser', this.username);
      });
      this.listen();
    },
    listen(){
      this.socket.on('userOnline', user => {
        this.users.push(user);
      });
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on('msg', message => {
        this.messages.push(message);
        console.log(this.messages);
      });
    },
    sendMessage(message){
      console.log(message);
      this.socket.emit('msg', message);
    }
  },
  //run these functions as soon as the components mounts to the DOM
  mounted(){
    this.username = prompt('please enter a username for the chat', 'Anonymous');
    this.joinServer();
    this.showChatRoom = true;
  }
}
</script>

<style>

  *{
    box-sizing: border-box;
  }

  .header-div{
    padding: 10px 20px;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 5%;
    text-align: center;
    background-image: linear-gradient(to right, #ff6600, #ff8400);
    color: white;
    font-size: 1.5rem;
    text-shadow: 0 0 2px 2px black;
  }

  .chat-room-container{
    flex: 0.5;
    display: flex;
  }

  .chart-div{
    position: absolute;
    right: 18%;
    bottom: 20%;
  }


#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}


  input {
    flex: 1;
    height: 35px;
    font-size: 18px;
    box-sizing: border-box;
    width: 45vh;
  }

  button {
    width: 125px;
    height: 35px;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #ff6600, #ff8400);
    color: white;
    border: none;
    outline: none;
    transition: .6s ease;
  }

  button.no-username {
    opacity: 50%;
  }

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
