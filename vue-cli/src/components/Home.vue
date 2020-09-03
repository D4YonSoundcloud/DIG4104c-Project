<template>
  <div>
    <h1>{{ message }}</h1>
    <div class="change-title-input-div">
      <input v-model="newMessage" :placeholder="placeholder" class="new-message-input">
      <button @click="changeTitleMessage()" class="change-title-button">
        SUBMIT
      </button>
      <button @click="showPlaceholderInput()" class="change-title-button">
        Change Placeholder
      </button>
    </div>
      <input v-if="showPlaceholder" class="new-message-input" v-model="newPlaceholder" placeholder="change the placeholder for the above input">
    <button class="change-title-button" v-if="showPlaceholder" @click="placeholder = newPlaceholder"> SUBMIT PLACEHOLDER </button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return{
        message: 'Yo Group 4, This message is a variable in this File!',
        newMessage: '',
        placeholder: 'Type here to change the Message, You can even change the placeholder text!',
        newPlaceholder: '',
        showPlaceholder: false,
      }
    },
    methods:{
      changeTitleMessage(){
        if(this.newMessage === '') {
          return this.message = 'Nice try! Please enter a message instead of an empty string!'
        }
        //when referencing properties in the data function of our vue component, we must use the 'this' keyword
        this.message = this.newMessage;
      },
      showPlaceholderInput(){
        this.showPlaceholder = !this.showPlaceholder;
      }
    },
    created(){
      console.log('I have been created!')
    }
  }
</script>

<style scoped>
  * button:focus{
    outline: none;
  }
  .change-title-input-div{
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  .new-message-input{
    width: 25vw;
    height: 5vh;
    border: 1px solid #ff6600;
    margin-right: 1vw;
    border-radius: 2%;
    background-color: rgb(255, 255, 255);
    color: black;
  }
  .change-title-button{
    height: 5vh;
    padding: 5px 10px;
    outline: none;
    margin-right: 1vw;
    background-color: #ff6600;
    color: white;
    border-radius: 5%;
  }
</style>
