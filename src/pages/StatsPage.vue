<template>
  <q-page padding>
    <!-- Таблица -->
    <div class="row q-gutter-md" style="width: 100%; display: flex; align-items: center; justify-content: center" >
      <div class="col-12 col-sm-6" style="width: 80%">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Просмотры видео по дням недели</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <table class="q-table">
              <thead>
              <tr>
                <th>День недели</th>
                <th>Количество просмотров</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data, index) in mockData" :key="index">
                <td style="text-align: center">{{ data.day }}</td>
                <td style="text-align: center">{{ data.views }}</td>
              </tr>
              </tbody>
            </table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Диаграмма -->
      <div class="col-12 col-sm-6" style="width: 80%;">
        <q-card flat bordered style="min-height: 300px">
          <q-card-section style="min-height: 300px">
            <canvas ref="videoChart" style="margin: 0 auto; height: 250px"></canvas>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js'

export default defineComponent({
  name: 'VideoStats',
  setup() {
    const videoChart = ref<HTMLCanvasElement | null>(null);

    // Mock data
    const mockData = [
      { day: 'Понедельник', views: Math.floor(0) },
      { day: 'Вторник', views: Math.floor(0) },
      { day: 'Среда', views: Math.floor(21) },
      { day: 'Четверг', views: Math.floor(Math.random() * 10) },
      { day: 'Пятница', views: Math.floor(0) },
      { day: 'Суббота', views: Math.floor(0) },
      { day: 'Воскресенье', views: Math.floor(0) }
    ];

    onMounted(() => {
      if (!videoChart.value) return;

      Chart.register(...registerables);

      new Chart(videoChart.value.getContext('2d')!, {
        type: 'bar',
        data: {
          labels: mockData.map(data => data.day),
          datasets: [{
            label: 'Просмотры',
            backgroundColor: '#1976D2',
            data: mockData.map(data => data.views)
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Количество просмотров'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Дни недели'
              }
            }
          }
        }
      });
    });

    return {
      mockData,
      videoChart
    };
  }
});
</script>

<style scoped>
.q-table {
  width: 100%;
}
</style>
