<script setup>
import axios from 'axios'
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Input from '../components/Input.vue'
import toMD5 from '../js/toMD5'

const router = useRouter()
const store = useStore()

const user = store.state.user
const flags = reactive({
  isSamePassword: true,
  isCollect: true
})

onMounted(() => {
  const form = document.getElementById('form')
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    // confirm password
    if (user.password === user.confirmationPassword) {
      flags.isSamePassword = true
    } else {
      flags.isSamePassword = false
    }

    if (flags.isSamePassword) {
      const hashedPassword = toMD5(user.password)
      const body = {
        email: user.email,
        password: hashedPassword
      }
      axios
        .post('/login', body)
        .then((res) => {
          flags.isCollect = true
          // cookie に保存
          document.cookie = `token=${res.data.data.token}`
          document.cookie = `user_id=${res.data.data.user_id}`
        })
        .catch((err) => {
          console.log(err)
          flags.isCollect = false
        })
      // TODO: 遷移先の変更
      router.push({ name: 'mypage' })
    }
  })
})

watch(user, (newUser) => {
  store.commit("setUser", newUser)
})
</script>

<template>
  <div class="content">
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <!-- error messages -->
        <article class="message is-danger" v-if="!flags.isSamePassword">
          <div class="message-body">
            パスワードが一致しません
          </div>
        </article>
        <article class="message is-danger" v-if="!flags.isCollect">
          <div class="message-body">
            メールアドレスかパスワードが間違っています
          </div>
        </article>

        <!-- form -->
        <div class="box">
          <form id="form">
            <!-- email address -->
            <div class="field">
              <label class="label" for="email">メールアドレス</label>
              <Input
                v-model="user.email"
                id="email"
                type="email"
                placeholder="メールアドレス"
                required
              />
            </div>

            <!-- password -->
            <div class="field">
              <label class="label" for="password">パスワード(8~16文字)</label>
              <Input
                v-model="user.password"
                id="password"
                type="password"
                placeholder="パスワード"
                required
                maxlength="12"
                minlength="8"
              />
            </div>
            <div class="field">
              <label class="label" for="confirmationPassword">パスワード確認</label>
              <Input
                v-model="user.confirmationPassword"
                id="confirmationPassword"
                type="password"
                placeholder="パスワード確認"
                required
                maxlength="16"
                minlength="8"
              />
            </div>

            <!-- register button -->
            <button class="button is-primary">ログイン</button>
          </form>
        </div>
        <router-link to="/signup">
          <p>新規登録</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
