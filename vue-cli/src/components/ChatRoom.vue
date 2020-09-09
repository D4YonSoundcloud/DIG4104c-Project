<template>
    <div class="chat-window">
      <div class="messages" id="messages-container">
        <div class="message" v-for="message in messages" :key="message.index">
        <div class="username" style="margin-right: 0.25%;">{{message.username + ': '}} </div>
        <div class="message-text"> {{' ' + message.messageText}}</div>
        </div>
      </div>
      <form class="input-container" v-on:submit="sendMessage()">
        <input type="text" v-model="msg">
        <button v-on:click="sendMessage" v-bind:disabled="!msg" :class="!msg ? 'no-msg' : ''">Send</button>
      </form>
    </div>
</template>

<script>

  //this is the chat room component of our application
    export default {
      name: "ChatRoom",
      data () {
        return {
          //this is the message text that we will send to our socketIO server
          msg: ''
        }
      },
      //these are the properties sent from our parent component
      props: ['messages'],
      methods: {
        sendMessage () {
          if (!this.msg) {
            //return the function if there is no msg
            alert("Please enter a message");
            return;
          }
          //$emit is the keyword used to call a function we have listening in our parent component
          //the "v-on:sendMessage='this.sendMessage'" attribute
          this.$emit('sendMessage', this.msg);
          //set message text back to an empty string
          this.msg = "";
          //update the scroll after 1/10th of a second, if no timeout then it will not update
          setTimeout(() => {
            this.updateScroll();
            console.log('scroll updated');
          }, 100)
        },
        updateScroll () {
          //helper method used to auto scroll down whenever a new message appears
          let element = document.getElementById("messages-container");
          element.scrollTop = element.scrollHeight;
        }
      },
    }
</script>

<style scoped>
  .chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(230, 230, 230);
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.15);
    transform: translateX(-25%);
    /*overflow-y: scroll;*/
    width: 40vw;
    max-height: 400px;
  }

  .messages {
    max-height: 365px;
    flex: 1;
    overflow-y: scroll;
  }
  .message {
    flex-flow: row;
    display: flex;
    border-bottom: 1px solid #EFEFEF;
    padding: 10px;
  }
  .chat-window.messages.message:last-of-type{
    border-bottom: none;
  }

  .chat-window.messages.message.username {
    width: 100px;
    margin-right: 15px;
  }

  .chat-window.messages.message.message-text{
    flex: 1
  }

  form {
    display: flex;
  }

  input {
    flex: 1;
    height: 35px;
    font-size: 18px;
    box-sizing: border-box;
  }

  button {
    width: 75px;
    height: 35px;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #ff6600, #ff8400);
    color: white;
    border: none;
    outline: none;
    transition: .6s ease;
  }

  button.no-msg {
    opacity: 50%;
  }

  .user-info{
    flex: 1;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;

  }

</style>
