<template>
  <Bar :data="barChart" :options="options"/>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export default {
  name: "DefaultBarChart",
  components: {
    Bar
  },
  methods: {
    selectAndConcatAttributes(json, attributes) {
      let result = [];

      for (let i = 0; i < attributes.length; i++) {
        let values = [];

        for (let j = 0; j < json.values.length; j++) {
          let value = json.values[j][attributes[i]];
          values.push(value);
        }

        result.push({"attribute": attributes[i], "values": values});
      }

      return result;
    }
  },
  computed: {
    barChart() {
      let test = this.selectAndConcatAttributes(this.$store.getters.getAllData[0].result,["date","temp_avg", "temp_min"])
      this.data.labels = test.find(item => item.attribute === "date").values;
      //TODO: rework more dynamic
      this.data.datasets = ["temp_avg", "temp_min"].map(attr => ({
        label: attr,
        backgroundColor: '#f87979',
        data:  test.find(item => item.attribute === attr).values
      }))
      console.log(this.data)
      return this.data
    }
  },
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      options: {}
    }
  }
}
</script>

<style scoped>

</style>