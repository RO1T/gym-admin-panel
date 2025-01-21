<template>
  <q-layout>
    <q-page-container>
        <q-page class="bg-gradient" style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px;">
          <p>Авторизация в админ - панели</p>
          <q-input
            v-if="!isCodeSended"
            v-model="login"
            style="background-color: rgb(101 111 155); width: 50%; border-radius: 10px;"
            dense
            outlined
            label="Почта"
          />

          <q-btn
            v-if="!isCodeSended"
            label="Отправить код"
            style="background-color: rgb(46 104 131); width: 50%; border-radius: 10px;"
            flat
            @click.enter="isCodeSended = true; onSubmit()"
          />

          <q-input
            v-if="isCodeSended"
            v-model="code"
            style="background-color: rgb(101 111 155); width: 50%; border-radius: 10px;"
            dense
            outlined
            label="Введите код с почты"
          />

          <q-btn
            v-if="isCodeSended"
            label="Войти"
            style="background-color: rgb(46 104 131); width: 50%; border-radius: 10px;"
            flat
            @click.enter="onLogin"
          />
        </q-page>
      </q-page-container>
  </q-layout>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import type { EmailResponse } from 'src/types/api';

const router = useRouter()

const login = ref('')
const code = ref('')
const userId = ref('')
const isCodeSended = ref(false)

const onSubmit = async () => {
  // const url = 'email/send'

  await fetch('http://localhost:8083/api/v1/email/send', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': 'POST'
    },
    body: JSON.stringify({email: login.value})
  })
  .then(async (res) => {
    if (res.ok) {
      const response = await res.json()
      userId.value = response.id
    } else {
      isCodeSended.value = false
    }
  })
  .catch(() => {
    isCodeSended.value = false
  })

  // await api.post<EmailResponse>(url, {
  //   email: login.value
  // }).then((res) => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   userId.value = res.data.id
  // })
}

const onLogin = async () => {
  await fetch(`http://localhost:8083/api/v1/email/${userId.value}/confirm`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': 'POST'
    },
    body: JSON.stringify({code: +code.value})
  }).then(async (res) => {
    if (res.ok) {
      const response = await res.json()
      localStorage.setItem('token', response.token)
      router.push('/admin')
    } else {
      isCodeSended.value = false
    }
  })
}
</script>

<style scoped>
  .bg-gradient{
    background: var(--app-background-gradient);
  }
</style>
