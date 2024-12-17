<template>
  <div>
    <bar-chart :chart-data="data" :options="options"></bar-chart>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: {
    BarChart: Bar,
  },
  data() {
    return {
      data: {
        labels: [
          "เมือง",
          "ธาตุพนม",
          "นาแก",
          "ศรีสงคราม",
          "บ้านแพง",
          "โพนสวรรค์",
          "ท่าอุเทน",
          "ปลาปาก",
          "นาหว้า",
          "วัง4",
          "วัง3",
        ],
        datasets: [
          {
            label: "Record Count",
            data: [36, 24, 15, 9, 8, 7, 6, 5, 5, 2, 1],
            backgroundColor: "#36A2EB",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
};
</script>
