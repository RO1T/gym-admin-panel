<template>
  <div class="q-pa-md">
    <h4>Расписание видео</h4>

    <q-list dense>
      <q-expansion-item v-for="(day, idx) in days" :key="idx" expand-separator icon="event" :label="day.name" :header-class="`${day.bg} text-white`" >
        <q-card>
          <q-card-section>
            <q-list v-if="day.items.length !== 0" dense>
              <q-item v-for="(schedule, idx) in day.items" :key="idx">
                <q-item-section style="display: flex; justify-content: space-between; flex-direction: row; align-items: center;">
                  <div>
                    Видео №{{ schedule.ID }}
                  </div>

                  <div style="display: flex; align-items: center; gap: 5px">
                    <div style="text-align: right; flex-direction: row !important">
                      {{ schedule.Time }}
                    </div>
                    <!-- <q-btn
                      icon="edit"
                      flat
                      @click="isEditModalOpen = true; index = schedule.ID"
                    /> -->
                    <q-btn
                      icon="delete"
                      flat
                      @click="index = schedule.ID; _removeSchedule()"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card flat v-else>
              Нет видео на этот день
            </q-card>
          </q-card-section>
        </q-card>
        <q-btn style="width: 100%" icon="add" @click="addSchedule(idx)" />
      </q-expansion-item>
    </q-list>
  </div>
  <q-dialog v-model="isEditModalOpen">
    <q-card style="min-width: 400px; min-height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px">
      <q-select
        v-model="newVideoName"
        label="Название видео"
        style="width: 80%"
        placeholder="Выберите видео"
      />
      <div style="width: 80%; display: flex; gap: 20px;">
        <q-btn
          label="Отмена"
          color="positive"
          style="width: 50%"
          @click="isEditModalOpen = false"
        />
        <q-btn
          label="Сохранить"
          color="negative"
          style="width: 50%"
          @click="_removeSchedule(); isEditModalOpen = false"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const mondayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []
const tuesdayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []
const wednesdayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []
const thursdayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []
const fridayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []
const saturdayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []
const sundayVideos: { ID: string, Time: string, videoID: string, Name: string }[] = []

const days = ref([
  { items: mondayVideos, name: "Понедельник", bg: 'bg-primary' },
  { items: tuesdayVideos, name: "Вторник", bg: 'bg-primary' },
  { items: wednesdayVideos, name: "Среда", bg: 'bg-primary' },
  { items: thursdayVideos, name: "Четверг", bg: 'bg-primary' },
  { items: fridayVideos, name: "Пятница", bg: 'bg-primary' },
  { items: saturdayVideos, name: "Суббота", bg: 'bg-primary' },
  { items: sundayVideos, name: "Воскресенье", bg: 'bg-primary' },
])

const videos = ref()
const index = ref()

const init = () => {
  const token = localStorage.getItem('token');

  days.value.forEach(async (day, idx) => {
    setTimeout(async () => {
      await fetch(`http://localhost:8083/api/v1/schedule/${idx + 1}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': 'GET'
        },
        }).then(async (res) => {
          const response = await res.json()
          day.items = response
        })
    }, idx * 50)
  })
}

onMounted(async () => {
  init()

  await fetch(`http://localhost:8083/api/v1/videos`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': 'GET'
    }
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json()
      videos.value = response
    }
  })
})

const isEditModalOpen = ref(false)
const newVideoName = ref('')

// const removeSchedule = async () => {
//   const token = localStorage.getItem('token');
//   await fetch(`http://localhost:8083/api/v1/videos/${index.value}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-type': 'application/json',
//       'Accept': '*/*',
//       'Access-Control-Allow-Origin': 'DELETE',
//       'Authorization': `Bearer ${token}`,
//     }
//   }).then(async (res) => {
//     if (res.ok) {
//       init()
//     }
//   })
// }

const _removeSchedule = async () => {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:8083/api/v1/schedule/${index.value}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': 'DELETE',
      'Authorization': `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      init()
    }
  })
}

const addSchedule = async (id: number) => {
  const token = localStorage.getItem('token');
  await fetch(`http://localhost:8083/api/v1/schedule/${id + 1}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': 'GET'
    },
    }).then(async () => {
      init()
  })
}

</script>
<style>

</style>
