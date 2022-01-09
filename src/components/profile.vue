<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import IDprefecture from '../js/IDprefecture';

   //const birth = new Date(2004, 1, 2, 0, 0, 0,)

    //リアクティブなデータ送ると400エラー吐きます
    const user_id = 576074480;
    const token = 'zREPVgEE2hMIBFEjKcWhFEoqGUBji0';

    //オブジェクトとして宣言
    let profile = reactive({});
    let birthDay = ref('');
    let age = ref();

    let city = ref('');


    // const profile = ref({})
    onMounted ( () => {
        axios 
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

                city.value = IDprefecture[profile.city]
                console.log(IDprefecture[profile.city])

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
            //エラー処理
            })
            .catch((err) => {
                console.log(err)
            })    
    })
//onMounted (() => {
//        axios
//            .post('http://60.130.133.219/get_user',{
//                user_id: user_id,
//                token: token,
//            })
//            .then((res) => {
//                console.log(res);
//                console.log(res.data_header.result_code)
//                profile = res.data;
//                console.log(res.data);
//            })
//            .catch((err) => {
//                console.log(err)
//            })
//    })

    //ユーザーが所属しているグループの取得



    
</script>
<style>
  .flex{
    display:flex;
    margin:5px 40px;
    align-items: flex-end;
    border:1px solid #999999;
  }
  /* .flex直下の子要素 */
  .flex > div{
    word-break: break-all;
    overflow-wrap: anywhere;
  }
  
  #img{
      padding:30px;
      align-content: center;
  }
</style>

<template>
    <!--
    <div class="is-flex ml-6">
        <figure class="image is-128x128 mr-6" style="flex:0 0 128px">
            <img class="is-rounded" alt="topImage" src='../assets/manaka.jpg'>
        </figure>
        
        <div class="mr-6">
            <div class="field is-grouped is-grouped-multiline">
                <div class="control"><span class="tag is-link is-large">Link</span></div>
                <div class="control"><span class="tag is-success is-large">Success</span></div>
                <div class="control"><span class="tag is-black is-large">Black</span></div>
                <div class="control"><span class="tag is-warning is-large">Warning</span></div>
                <div class="control"><span class="tag is-danger is-large">Danger</span></div>
                <div class="control"><span class="tag is-info is-large">Info</span></div>
                <div class="control"><span class="tag is-link is-large">Link</span></div>
                <div class="control"><span class="tag is-success is-large">Success</span></div>
                <div class="control"><span class="tag is-black is-large">Black</span></div>
                <div class="control"><span class="tag is-warning is-large">Warning</span></div>
                <div class="control"><span class="tag is-danger is-large">Danger</span></div>
                <div class="control"><span class="tag is-info is-large">Info</span></div>
                <div class="control"><span class="tag is-link is-large">Link</span></div>
                <div class="control"><span class="tag is-success is-large">Success</span></div>
                <div class="control"><span class="tag is-black is-large">Black</span></div>
                <div class="control"><span class="tag is-warning is-large">Warning</span></div>
                <div class="control"><span class="tag is-danger is-large">Danger</span></div>
                <div class="control"><span class="tag is-info is-large">Info</span></div>
            </div>
            <button class="ml-6 button is-primary">編集</button>
        </div>
    </div>
    -->


    <div class="card m-6 pb-3">
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column is-one-fifth is-vcentered">
                        <div style="border-right: 1px solid #505050; margin-right: -10px">
                            <figure class="image is-128x128 ml-6 mr-3" style="flex:0 0 128px">
                                <img class="is-rounded" alt="topImage" src='../assets/hayabusa.png'>
                            </figure>
                        </div>
                    </div>
                    <div class="column field is-grouped is-grouped-multiline ml-6">
                            <div class="control"><span class="tag is-link is-large">Link</span></div>
                            <div class="control"><span class="tag is-success is-large">Success</span></div>
                            <div class="control"><span class="tag is-black is-large">Black</span></div>
                            <div class="control"><span class="tag is-warning is-large">Warning</span></div>
                            <div class="control"><span class="tag is-danger is-large">Danger</span></div>
                            <div class="control"><span class="tag is-info is-large">Info</span></div>
                            <div class="control"><span class="tag is-link is-large">Link</span></div>
                            <div class="control"><span class="tag is-success is-large">Success</span></div>
                            <div class="control"><span class="tag is-black is-large">Black</span></div>
                            <div class="control"><span class="tag is-warning is-large">Warning</span></div>
                            <div class="control"><span class="tag is-danger is-large">Danger</span></div>
                            <div class="control"><span class="tag is-info is-large">Info</span></div>
                    </div>
                    <div class="column is-one-fifth">
                        <button class="ml-6 button is-primary">編集</button>
                    </div>
                </div>

                <div class="is-flex ml-6 is-align-items-flex-end">
                    <div class="is-size-2 has-text-left" style="flex:0 0 450px;">{{profile.name}}</div>
                    <div class="is-size-4 has-text-left pb-1" >{{city}}</div>
                </div>
                <div class="is-flex mt-1 ml-6">
                    <span class="is-size-5">{{ birthDay }}
                    <span class="is-size-5">{{ age }}歳</span></span>
                </div>
                <div class="is-flex mt-1 ml-6">
                    <div class="is-size-6 has-text-left">{{ Id }}</div>
                </div>
                <div class="is-flex mt-3 ml-6">
                    <div class="is-size-6 has-text-left">あいうえおおおあｊどじょあｊどｊわどｊわおｄっじゃｗだ</div>
                </div>
            </div>
        </div>
    </div>

</template>