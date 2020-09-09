<template>
  <div class="chart-container">
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
      this.getRealtimeData()
    },
    methods: {
      fillData(fetchedData) {
        console.log(fetchedData);
        this.dataCollection = {
          labels: [fetchedData.users, fetchedData.messages],
          datasets: [
            {
              label: "Users in Chat",
              backgroundColor: "#ea4c03",
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
