<template>
  <div class="chart-container">
<!--    Takes in our dataCollection reactive variable we define in our data() function on this Vue Instance-->
    <line-chart :chart-data="dataCollection" id="myChart"></line-chart>
  </div>
</template>

<script>
  import LineChart from "./LineChart.js";
  import io from "socket.io-client";
  let socket = io.connect("http://localhost:3030");

  export default {
    components: {
      LineChart
    },
    data() {
      return {
        dataCollection: null
      };
    },
    created() {
      //call function to start collecting data from socketIO server
      this.getRealtimeData()
    },
    methods: {
      //function used to fill the data of our line chart
      //fetchedData is the data received from the socketIO server
      fillData(fetchedData) {
        console.log(fetchedData);
        this.dataCollection = {
          //labels for the x and y axis
          labels: [fetchedData.users, fetchedData.messages],
          datasets: [
            {
              label: "Users in Chat",
              //set background color
              backgroundColor: "#ea4c03",
              //data is an array, with the number of points being the length of the array
              data: [0, fetchedData.users]
            },
            {
              label: "Number of Messages",
              backgroundColor: "#eaeaea",
              data: [0, fetchedData.messages]
            }
          ]
        };
      },
      getRealtimeData() {
        //call the getData function on the socketIO server and then
        //call the fillData function on this Vue Instance, and pass in the data received
        //as an argument
          socket.on("getData", fetchedData => {
            this.fillData(fetchedData)
          })
        console.log('it happened');
      },
    }
  };
</script>
<style>
  .chart-container {
    max-width: 50vw;
  }
</style>
