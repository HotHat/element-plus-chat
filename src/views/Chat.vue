<template>

<div style="display: flex;align-items: center; justify-content: center; ">
  <div class="common-layout">

    <el-container>
      <el-header height="60px"

        ><div

        class="mainH" style=" width: 100%;text-align: center;  background-color: #409eff; color: #fff;font-size: 2rem; margin: 0 auto;"

        >

        <el-icon><IceTea /></el-icon>

          ChatGpt在线体验

        </div>
      </el-header>

      <el-main>
        <div class=".mainContent" style="height: 100%; overflow: hidden; ">
          <el-scrollbar ref="scrollbarRef">
          <div style="height: calc(100vh - 60px - 5vh - 420px);">
            <div  ref="innerRef">
              <el-timeline style="font-size:large" >
              <el-timeline-item
                v-for="(activity, index) in activities"

                :key="index"

                :icon="activity.icon"

                :type="activity.type"

                :color="activity.color"

                :size="activity.size"

                :hollow="activity.hollow"

                :timestamp="timestamp"

              >

              <el-icon v-if="activity.userType==2"><User /></el-icon>  

              <el-icon v-if="activity.userType==1"><Bell /></el-icon>  

                <span v-html="activity.content"></span>

              </el-timeline-item>

            </el-timeline>


            </div>
            
          </div>


          </el-scrollbar>
                  <el-card class="box-card">

          <el-input

            v-model="textarea"

            :rows="4"

            type="textarea"

            placeholder="Please input"

          />

          <el-button

            type="primary"

            :disabled="sendDisabled"

            @click="sendChat"

            style="width: 100%; height: 50px; margin-top: 10px"

            >Send</el-button

          >

        </el-card>

        </div>
      </el-main>

      <el-footer height="5vh"><el-icon><Sunny /></el-icon>体验版(网络问题 回复时间会长，耐心等待) power by zhoufc</el-footer>

    </el-container>

  </div>
</div>
</template>

<script lang="ts" setup>


import { MoreFilled ,CircleCheck} from "@element-plus/icons-vue";

import { ref,shallowReactive,shallowRef } from "vue";

import { chat } from "~/api/chat";

import { ElMessage, ElScrollbar, ElTimeline } from 'element-plus'

const scrollbarRef = ref<typeof ElScrollbar>()
const innerRef = ref<HTMLDivElement>()



const textarea =ref("");

const buttonText =ref("Send");

const sendDisabled =shallowRef(false);

const sendChat = (data) => {
  let prompt = textarea.value;

  // console.log("height", innerRef.value!.scrollHeight)
  // console.log("height", innerRef.value!.clientHeight)
  // console.log("height", innerRef.value!.clientHeight)
  // scrollbarRef.value!.setScrollTop(innerRef.value!.scrollHeight)


  if(prompt!=''){
    textarea.value='';

    ElMessage({
    message: '已发送请等待.',

    type: 'success',

  })

    sendDisabled.value = true;

    activities.splice(0,0,

      {
    content: "Robot: 正在努力思考。。。,受网络影响可能会需要一会",

    timestamp: new Date(),

    userType:'1',

    size: "large",

    type: "primary",

    icon: MoreFilled

  }, {
    content: `You: ${prompt}`,

    timestamp: new Date(),

    userType:'2',

    size: "large",

    color: "#0bbd87",

    icon: CircleCheck,

  }

    );

    console.log('数组', activities);

  chat({q:prompt}).then(res=>{
    if(res.status){
      textarea.value = '';

      let content = res.response.replace(/\\n/g, '<br/>');

    console.log(res.response);

   

    activities[0] =   {
    content: content,

    timestamp: new Date(),

    size: "large",

    type: "primary",

    icon: CircleCheck,

  };

    }else{
      ElMessage.error(`Oops, error ${res.response}.`)

    }

    sendDisabled.value = false;

  }).catch(res=>{
    sendDisabled.value = false;

    activities[0] =   {
    content: '回答已超时，可以尝试更详细的对话',

    timestamp: new Date(),

    size: "large",

    type: "primary",

    icon: CircleCheck,

  };

  })

}

}


 

let activities = shallowReactive([

  {
    content: "Robot: 你可以开始跟我对话了",

    timestamp: new Date(),

    size: "large",

    userType:'1',

    type: "primary",

    icon: CircleCheck,

  },

]);




</script>


<style scoped>

header {
  line-height: 1.5;

  max-height: 100vh;

}

.logo {
  display: block;

  margin: 0 auto 2rem;

}

nav {
  width: 100%;

  font-size: 12px;

  text-align: center;

  margin-top: 2rem;

}

nav a.router-link-exact-active {
  color: var(--color-text);

}

nav a.router-link-exact-active:hover {
  background-color: transparent;

}

nav a {
  display: inline-block;

  padding: 0 1rem;

  border-left: 1px solid var(--color-border);

}

nav a:first-of-type {
  border: 0;

}

.common-layout{
	width: 800px;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;

    place-items: center;

    padding-right: calc(var(--section-gap) / 2);

  }

  .logo {
    margin: 0 2rem 0 0;

  }

  header .wrapper {
    display: flex;

    place-items: flex-start;

    flex-wrap: wrap;

  }

  nav {
    text-align: left;

    margin-left: -1rem;

    font-size: 1rem;

    padding: 1rem 0;

    margin-top: 1rem;

  }

} */

</style>