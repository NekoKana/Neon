<script setup>
import axios from 'axios';
import { ref, onMounted, reactive, resolveDirective } from 'vue';
import parseCookie from '../js/parseCookie'

const datas = reactive([
  {
    name: 'userA',
    text: 'hello',
    timestamp: 1000
  },
  {
    name: 'userB',
    text: 'goodbye',
    timestamp: 2000
  }
])

const memberID2Name = (memberID, token) => {
  const body = {
    user_id: Number(memberID),
    token: token
  }
  const name = ref('')
  axios
    .post('/get_user', body)
    .then((res) => {
      console.log(res)
      name.value = res.data.data.name
    })
    .catch((err) => {
      console.log(err)
    })
  return name
}

const socket = new WebSocket('ws://api.neonchan.net:19999')
const sendJsonBase64 = (json) => {
  const jsonString = JSON.stringify(json).toString()
  socket.send(btoa(jsonString))
}
// 接続が確立したとき
socket.addEventListener('open', event => {
  console.log('connected')
  const body = {
    id: 1,
    user_id: Number(cookie['user_id']),
    token: cookie['token'],
    room_id: 259034846
  }
  sendJsonBase64(body)
})
// 接続が切れたとき
socket.addEventListener('close', event => {
  console.log('closed')
})
// メッセージを受け取ったとき
socket.addEventListener('message', event => {
  console.log('event.data', event.data)
  const name = memberID2Name(event.data.data_headers.user_id, event.data.data_headers.token)
  const data = {
    name: name,
    text: event.data.data.text,
    timestamp: event.data.data.timestamp
  }
  datas.push(data)
})

const sendMessage = ref("")
// cookieをパース
const cookie = parseCookie(document.cookie)

onMounted(() => {
  // 送信ボタンが押されたとき
  const form = document.getElementById('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    // リクエストを作成
    const timestamp = Date.now()
    const body = {
      id: 2,
      token: cookie['token'],
      user_id: Number(cookie['user_id']),
      room_id: 259034846,
      text: sendMessage.value,
      timestamp: timestamp
    }
    sendJsonBase64(body)

    // データを更新
    const name = memberID2Name(body.user_id, body.token)
    console.log('name', name.value)
    const data = {
      // name: name.value,
      name: 'you',
      text: sendMessage.value,
      timestamp: timestamp
    }
    datas.push(data)
    // メッセージを初期化
    sendMessage.value = ""
  })
})
</script>

<template>
  <article class="media" v-for="data of datas">
    <figure class="media-left">
      <p class="image is-48x48">
        <img class="is-rounded" src="../assets/logo.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <div class="has-text-left">
          <p>
            <strong>{{ data.name }}</strong>
            <br>
            {{ data.text }}
            <br>
          </p>
        </div>
      </div>
    </div>
  </article>
  <article class="media"></article>

  <form id="form">
  <div class="field is-grouped">
    <div class="control is-expanded">
      <input class="input is-medium" type="text" autofocus v-model="sendMessage">
    </div>
    <div class="control control-submit">
      <button class="button is-link is-medium" :disabled="sendMessage.length==0">送信</button>
    </div>
  </div>
  </form>
</template>
