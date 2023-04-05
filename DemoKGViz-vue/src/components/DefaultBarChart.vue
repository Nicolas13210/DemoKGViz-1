<template>
  <Bar :data="data" :options="options" />
</template>

<script>
import { Bar } from 'vue-chartjs'
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
  data() {
    return {
      data: {
        labels: [
          '2016-01-01',
          '2016-02-08',
          '2016-03-18',
          '2016-04-25',
          '2016-06-02',
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [20, 5, 12, 20, 5]
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