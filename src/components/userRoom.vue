<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
    //リアクティブなデータ送ると400エラー吐きます
    const user_id = 894984261;
    const token = "fhTrZhtMs0ob3hriy1aq1MgeRnKgDF";

    let rooms = reactive([
        {
            room_id:1,
            room_name:'テストネーム',
            room_description:'これはサンプルの説明です。'

        },
        {
            room_id:2,
            room_name:'Vue勉強中(´・ω・｀)',
            room_description:'誰でも歓迎です！'
        }
    ]);


        onMounted(() => {
       axios
           .post('/get_rooms_by_user_id', {
               user_id:user_id,
               token:token
           })
           .then((res) => {
               console.log('userRoomのres')
               console.log(res.data.data);
               Object.assignment(rooms, res.data.data)
               console.log(rooms)
           })
           .catch((err) => {
               console.log('usrRoomのerr')
               console.log(err)
           })
   })
    console.log(rooms)


</script>


<template>

    <div class="mx-6" style="padding-top: 4px; border-bottom: 1px solid;"> </div>

    <div class=" has-text-centered is-size-3 my-5 ">参加中のグループ</div>

    <div class="columns">
        <div class="column is-half" v-for="Room in rooms" :key="Room.room_id">
            <div class="card ml-6 my-3">
                <div class="columns">
                    <div class="column is-two-third mx-5 is-size-2" style="padding-top:15px; padding-bottom:5px">
                        <div class="is-size-3 has-text-left">{{ Room.room_name }}</div>
                    </div>
                    <div class="column pt-5 ml-4" style="padding-top:3px; padding-bottom:5px">
                        <div class="is-size-4 is-right"><font-awesome-icon icon="users" class="mr-2"/>15</div>
                    </div>
                </div>
                <div class="is-size-4 mx-5 has-text-left" style="padding-bottom:25px">
                    <p class="is-size-6">{{Room.room_description }}</p>
                </div>
            </div>
        </div>
        <div class="column is-half">
            <div class="card mr-6 my-3">
                <div class="columns">
                    <div class="column is-two-third mx-5 is-size-2" style="padding-top:15px; padding-bottom:5px">
                        <div class="is-size-3 has-text-left">VWXYZ</div>
                    </div>
                    <div class="column pt-5 ml-4" style="padding-top:3px; padding-bottom:5px">
                        <div class="is-size-4 is-right"><font-awesome-icon icon="users" class="mr-2"/>15</div>
                    </div>
                </div>
                <div class="is-size-4 mx-5 has-text-left" style="padding-bottom:25px">
                    <p class="is-size-6">こんにちわこんにちわこんばんわこんにちわ</p>
                </div>
            </div>
        </div>
    </div>
   
</template>