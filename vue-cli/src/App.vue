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
<!--    send the messages array we have in our Vue instance to our ChatRoom Component as a prop-->
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

  //this is a Vue instance, each Vue instance has its own properties
export default {
  //this is the name of the vue component, this is whats referenced when importing
  name: 'app',
  //this is the components that this current vue instance is using, you must define
  //them here before using them
  components:{
    Home,
    ChatRoom,
    Chart,
  },
  //this is where are reactivity data properties resign, it is import that the data()
  //function is returning an object, and not just have the data be an object itself
  data () {
    return {
      username: "",
      potentialUsername: '',
      //this is the socket io object we will be calling emit's and on's with
      socket: io("http://localhost:3030"),
      messages: [],
      users: [],
      showChatRoom: false,
    }
  },
  //this is the methods property of our Vue instance, it acts as an object, where the functions
  //inside are both the key and the value of the object
  methods: {
    //this allows us to join the socketIO server when this function is called
    joinServer(){
      //on, so we are calling the 'loggedIn' function in our socketIO server
      //it then will send us back a data object, we use these to assign our
      //client side variables defined in our data() function
      this.socket.on('loggedIn', data => {
        //in vue, to use a reactive variable we define in our data() function
        //you must reference it with the 'this' keyword, otherwise it wont realize
        //you want the variable in 'this' vue instance context;
        this.messages = data.messages;
        this.users = data.users;
        //emit back to the server the newUser, passing in this username we just assigned in our prompt
        this.socket.emit('newUser', this.username);
      });
      //call function to listen for events from the socketIO server
      this.listen();
    },
    listen(){
      //call the userOnline function in our socketIO server and push the user received into
      //users array
      this.socket.on('userOnline', user => {
        this.users.push(user);
      });
      //call the userLeft function in our socketIO server and
      //update the users array, without the disconnected user
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      //call the msg function in our socketIO server
      //update the messages array with the new message
      this.socket.on('msg', message => {
        this.messages.push(message);
        console.log(this.messages);
      });
    },
    sendMessage(message){
      console.log(message);
      //call the msg function in our socketIO server and send in the message object
      //provided from our chat room component
      this.socket.emit('msg', message);
    }
  },
  //run these functions as soon as the components mounts to the DOM
  mounted(){
    //prompt the user to enter a username, if no username given
    //then set the user to anonymous
    this.username = prompt('please enter a username for the chat', 'Anonymous');
    //join the server
    this.joinServer();
    //show chat room component
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
