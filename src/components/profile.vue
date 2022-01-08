<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as axios from 'axios'

   // 
   //const birth = new Date(2004, 1, 2, 0, 0, 0,)

    const user_id = ref(654134032);
    const token = ref('gk9bVMsRY1WE4cUhctSRZjzdvb8m4y');
    
    const profile = ref({})
    onMounted (() => {
        axios
            .post('http://60.130.133.219/get_user',{
                user_id: user_id,
                token: token,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data_header.result_code)
                profile = res.data;
            })
            .catch((err) => {
                console.log(err)
            })
    })

    const birth = new Date(profile.birthday * 1000);
    const y = birth.getFullYear();
    const m = birth.getMonth();
    const d = birth.getDate();
    const birthDay = y + '年' + m + '月' + d + '日';


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
        <p class="column is-half is-size-3 has-text-centered">{{ profile.name }}name</p>
        <p class="column is-size-4 ">{{ profile.city }}city</p>
    </div>
    <div class="columns">
        <p class="column is-3 is-size-5">{{ profile.birthday }}birthday</p>
        <p class="column is-offset-1 is-size-5">{{ age }}歳</p>
    </div>

    

</template>