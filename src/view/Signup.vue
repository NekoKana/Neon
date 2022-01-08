<script setup>
import axios from 'axios'
import flattenn from 'flat'
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Input from '../components/Input.vue'
import toMD5 from '../js/toMD5'
import prefectureID from '../js/prefectureID'

const router = useRouter()
const store = useStore()

const user = store.state.user
const flags = reactive({
  isSamePassword: true,
  allInputted: false
})

let cities = reactive({})
const updateCities = () => {
  const body = {
    pref_id: prefectureID[user.region.prefecture]
  }
  axios
    .post('/get_city', body)
    .then((res) => {
      Object.assign(cities, res.data.data.city)
    })
    .catch((err) => {
      console.log(err)
    })
}

const verifyUserValue = (user) => {
  for (let value of Object.values(flattenn(user))) {
    if (!value) {
      return false
    }
  }
  return true
}

onMounted(() => {
  updateCities()
  flags.allInputted = verifyUserValue(user)

  const form = document.getElementById('form')
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (flags.allInputted && flags.isSamePassword) {
      // パスワードをハッシュ化
      const hashedPassword = toMD5(user.password)
      // 誕生日をunixtimeに変換
      const birthdayUnixtime = new Date(Date.parse(user.birthday)).getTime() / 1000

      // TODO: city と topic_listの入力
      const body = {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        birthday: birthdayUnixtime,
        city: 1,
        topic_list: [
          1,
          2,
          3
        ]
      }
      axios
        .post('/signup', body)
        .then((res) => {
          // cookie に保存
          document.cookie = `token=${res.data.data.token}`
          document.cookie = `user_id=${res.data.data.user_id}`

          // TODO: 遷移先の変更
          // router.push({ name: '' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
})

watch(user, (newUser) => {
  store.commit("setUser", newUser)
  // 全部入力されているか
  flags.allInputted = verifyUserValue(user)
  // パスワード確認
  if (user.password === user.confirmationPassword) {
    flags.isSamePassword = true
  } else {
    flags.isSamePassword = false
  }
})

watch(() => user.region.prefecture, updateCities)
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

        <!-- form -->
        <div class="box">
          <form id="form">
            <!-- email address -->
            <div class="field">
              <label class="label" for="name">名前</label>
              <Input
                v-model="user.name"
                id="name"
                type="name"
                placeholder="名前"
                autofocus
                required
              />
            </div>

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

            <div class="field">
              <label class="label" for="birthday">誕生日</label>
              <Input
                v-model="user.birthday"
                id="birthday"
                type="date"
                required
              />
            </div>

            <!-- region -->
            <label class="label" for="prefecture">住んでいる地域</label>
            <div class="field is-grouped is-grouped-centered">
              <div class="control">
                <div class="select">
                  <select v-model="user.region.prefecture">
                    <option v-for="(id, prefecture) in prefectureID" :key="id">
                      {{ prefecture }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="select">
                <select v-model="user.region.city">
                  <option v-for="(city, id) in cities" :key="id">
                    {{ city.city_name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- topic -->


            <!-- register button -->
            <button class="button is-primary" :disabled="!flags.allInputted">新規登録</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
