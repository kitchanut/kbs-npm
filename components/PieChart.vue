<template>
  <div>
    <pie-chart :chart-data="data" :options="options"></pie-chart>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  components: {
    PieChart: Pie,
  },
  data() {
    return {
      data: {
        labels: ["ขย.1", "ขย.2", "ขย.3", "ขสม", "คมพ."],
        datasets: [
          {
            data: [82.5, 7.9, 6.3, 2.0, 1.3],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#FF9F40", "#FF6384"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    };
  },
};
</script>
