<script setup>
import { reactive, ref, watch ,computed } from 'vue'
import prefectureID from '../js/prefectureID';
import axios from 'axios';

    //テストユーザー
    const user_id = 590284198
    const token = "F16GDyTFEmRbqzQjLWV23NPEWFrYzQ"

    //検索されたルーム一覧を受け取るリアクティブなリスト
    let roomList =  reactive([]);
    //選択した県
    const selectedPref = ref('');

    const getRoomsByPref = async () => {
        
        //県の名前
        console.log(selectedPref.value)
        //県のid
        console.log(prefectureID[selectedPref.value])
        
        //通信部
        await axios
            .post('/search_rooms_by_prefecture',{
                pref_id: prefectureID[selectedPref.value],
                user_id: user_id,
                token: token
            }
            )
            .then((res) => {
                Object.assign(roomList, ref([]))
                Object.assign(roomList, res.data.data.rooms)
                console.log(roomList[1].room_name)

            })
            .catch((err) => {
                console.log(err);
            })
    }



    watch(() => selectedPref.value, getRoomsByPref);

</script>

<template>

    <!--デバッグ-->
    <div> {{ selectedPref }} </div>

    <div class="select">
    <select v-model="selectedPref">
        <option v-for="(id, prefecture) in prefectureID" :key="id">
            {{ prefecture }}
        </option>
    </select>

        <div v-for="room in roomList" :key="room.room_id">
            <p>{{ room.room_name }}</p>
            <p>{{ room.descripton }}</p>
        </div>
    </div>

</template>