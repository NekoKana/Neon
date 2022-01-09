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
<!--
    <div class="dropdown">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span>地域を選択</span>
                <span class="icon is-normal">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>

        <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div> {{ selectedPref }} </div>
            <div class="dropdown-content">
                <a href="#" class="dropdown-item"> 
                    北海道
                </a>
                <a href="#" class="dropdown-item">
                    青森
                </a>

            </div>
        </div>
    </div> 
    -->
    <div class="title">ルーム検索</div>
    <div class="select">
        <select v-model="selectedPref">
            <option v-for="(id, prefecture) in prefectureID" :key="id">
                {{ prefecture }}
            </option>
        </select>
        
        <div v-for="room in roomList" :key="room.room_id">
            <div class="columns">
                <div class="column is-half">
                    <div class="card mx-5 my-3">
                        <div class="columns">
                            <div class="column is-two-third mx-5 is-size-2" style="padding-top:15px; padding-bottom:5px">
                                <div class="is-size-3 has-text-left">{{ room.room_name }}</div>
                            </div>
                            <div class="column pt-5 ml-4" style="padding-top:3px; padding-bottom:5px">
                                <div class="is-size-4 is-right"><font-awesome-icon icon="users" class="mr-2"/>15</div>
                            </div>
                        </div>
                        <div class="is-size-4 mx-5 has-text-left" style="padding-bottom:25px">
                            <p class="is-size-6">{{ room.descripton }}</p>
                        </div>
                    </div>
                </div>
                <div class="column is-half">
                    <div class="card mx-5 my-3">
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
        </div>
    </div>

</template>