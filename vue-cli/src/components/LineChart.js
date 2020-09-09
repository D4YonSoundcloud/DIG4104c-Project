//import Line and mixins from vue-chartJs
import { Line, mixins } from 'vue-chartjs'
//destructure the mixins symbol to get the reactiveProp from it
const { reactiveProp } = mixins


export default {
  name: "LineChart",
  //have this module extend the Line object from vue-chartJs
  extends: Line,
  //reactiveProp allows our chart to update without a page refresh, since it has a reactive property
  mixins: [reactiveProp],
  //options is a property that we have to pass into our renderChart method
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
