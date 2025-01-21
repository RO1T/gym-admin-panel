<template>
  <q-layout view="lHh Lpr lFf" class="bg-gradient">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Гимнастика
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color: #161E43;"
    >
      <q-list style="height: 100%; display: flex; flex-direction: column;">
        <q-item-label
          header
          class="q-toolbar__title"
          style="color: white; padding: 16px; max-height: 50px"
        >
          Панель управления
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <div style="padding-left: 16px; color: rgb(184, 188, 194); cursor: pointer; margin-top: auto; margin-bottom: 20px;"
             @click="logout"
        >
          <q-icon
            :name="'logout'"
            class="essential-link__text"
            size="md"
          />
          Выйти из аккаунта
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const linksList: EssentialLinkProps[] = [
  {
    title: 'Панель',
    caption: 'Главная страница',
    icon: 'home',
    link: '/admin',
  },
  {
    title: 'Видео',
    caption: 'Добавьте видео для сотрудников',
    icon: 'menu_book',
    link: '/admin/videos/',
  },
  {
    title: 'Расписание',
    caption: 'Создайте / отредактируйте расписание по которому сотрудники будут выполнять гимнастику',
    icon: 'turned_in',
    link: '/admin/schedule/',
  },
  {
    title: 'Статистика по видео',
    caption: 'Статистика по просмотренным видео',
    icon: 'trending_up',
    link: '/admin/stats/',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout(): void {
 localStorage.clear();
  router.push('/login');
}
</script>
<style>
.q-drawer--left {
  border-right: none !important;
}
.bg-gradient{
  background: var(--app-background-gradient);
}
</style>
