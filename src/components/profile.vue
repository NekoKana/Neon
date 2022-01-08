<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

   //const birth = new Date(2004, 1, 2, 0, 0, 0,)

    //リアクティブなデータ送ると400エラー吐きます
    const user_id = 576074480;
    const token = 'zREPVgEE2hMIBFEjKcWhFEoqGUBji0';

    //配列として宣言
    let profile = reactive({});
    let birthDay = ref('');
    let age = ref();

    // const profile = ref({})
    onMounted ( async () => {
        await axios 
            //エンドポイントを指定して通信
            //user_idとtokenはlocalStorageに保存
            .post('/get_user',{
                user_id: user_id,
                token: token,
            })

            //レスポンスを受け取ることができた際の処理
            .then((res) => {
                console.log(res);//レスポンス本体
                console.log(res.data.data_headers.result_code)//りざるとこーど
                
                Object.assign(profile, res.data.data)
                console.log(profile)

                //誕生日の生成
                const birth = new Date(profile.birthday * 1000);
                const y = birth.getFullYear();
                const m = birth.getMonth() + 1;
                const d = birth.getDate();
                birthDay.value = y + '年' + m + '月' + d + '日';  
                console.log(birthDay);

                //年齢の生成
                const now = new Date();
 //               const yy = now.getFullYear();
 //               const mm = now.getMonth() + 1;
 //               const dd = now.getDate();
 //               console.log(yy + '年' + mm + '月' + dd + '日');  
                let tmpage = now.getFullYear() - y;
                let tmpday = new Date(now.getFullYear(), m, d)
                if(now > tmpday) {
                    tmpage--;
                }
                age.value = tmpage;
                
            })
            .catch((err) => {
                console.log(err)
            })    
    })

    
</script>

<style>
p{
    text-align: left;
}
</style>

<template>
    <figure class="image is-128x128">
        <img class="is-rounded" alt="topImage" src='../assets/manaka.jpg'>
    </figure>
    <div class="columns">
        <p class="column is-half is-size-3 has-text-centered">{{ profile.name }}</p>
        <p class="column is-size-4 ">{{ profile.city }}</p>
    </div>
    <div class="columns">
        <p class="column is-3 is-size-5">{{ birthDay }}</p>
        <p class="column is-offset-1 is-size-5">{{ age }}歳</p>
    </div>
</template>