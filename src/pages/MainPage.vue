<template>
  <q-page class="flex flex-center bg-gradient">
    <div class="column items-center text-center">
      <h1 class="text-h3 text-white q-mb-md">
        Добро пожаловать в панель администратора <br>
        «Гимнастика для глаз»
      </h1>
      <p class="text-white q-mb-lg text-body1">
        Данная панель предназначена для просмотра статистики просмотров видео и загрузки новых видеороликов
      </p>

      <div class="row q-gutter-md">
        <q-btn
          label="Статистика просмотров"
          color="primary"
          size="lg"
          @click="$router.push('/admin/stats/')"
        />
        <q-btn
          label="Загрузить видео"
          color="secondary"
          size="lg"
          @click="$router.push('/admin/videos/')"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QBtn, QPage } from 'quasar';
</script>

<style scoped>

.bg-gradient{
  background: var(--app-background-gradient);
}
</style>


<script setup lang="ts">
</script>
