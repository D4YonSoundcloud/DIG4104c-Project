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
  import io from 'socket.io-client';

    export default {
      name: "ChatRoom",
      data () {
        return {
          msg: ''
        }
      },
      props: ['messages'],
      methods: {
        sendMessage () {
          if (!this.msg) {
            alert("Please enter a message");
            return;
          }
          this.$emit('sendMessage', this.msg);
          this.msg = "";
          setTimeout(() => {
            this.updateScroll();
            console.log('scroll updated');
          }, 100)
        },
        updateScroll () {
          let element = document.getElementById("messages-container");
          console.log(element, element.scrollTop, element.scrollHeight);
          element.scrollTop = element.scrollHeight;
          console.log(element, element.scrollTop, element.scrollHeight);
        }
      },
      created(){
        console.log('ive been created!');
      }
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
