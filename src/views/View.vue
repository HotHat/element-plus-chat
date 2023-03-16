<template>
  <div class="views">
    <el-container>
      <el-header>
        <h1>智慧长龙数字化协同管理软件</h1>

        <div class="ml-auto nav">
          <div class="nav-item">吉林省辉南长龙药业股份有限公司</div>
          
          <el-icon size="24px" @click="toUrl({path: '/Message'})" style="cursor: pointer;"><ChatDotRound /></el-icon>

          <el-dropdown>
            <div class="nav-item">{{userInfo.name}}</div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>{{userInfo.tel}}</el-dropdown-item>
                <el-dropdown-item @click="setting.show = true">修改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button class="nav-item" link @click="handleOut">退出</el-button>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            :default-openeds="menuOpeneds"
            :default-active="menuActive"
            text-color="#fff"
            router
            @select="handleMenuSelect"
          >
            <template v-for="(item, index) of menuList" :key="index">
              <el-sub-menu :index="item.path" v-if="item.children.length">
                <template #title>
                  <el-icon>
                    <component :is="item.icon"></component>
                  </el-icon>
                  <span>{{item.title}}</span>
                </template>
                
                <el-menu-item :index="children.path" v-for="(children, c) of item.children" :key="c">{{children.title}}</el-menu-item>

              </el-sub-menu>

              <el-menu-item :index="item.path" v-else>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{item.title}}</span>
              </el-menu-item>
              
            </template>

          </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main>
          <div class="container bg-white">
            <el-breadcrumb :separator-icon="ArrowRight">
              <template v-for="(item, index) of breadcrumb">
                <el-breadcrumb-item :to="item.path" :key="index" v-if="item.meta.title" @click.stop="toUrl(item)">
                  {{item.meta.title}}
                </el-breadcrumb-item>
              </template>
            </el-breadcrumb>
          </div>

          <el-scrollbar class="page-content mt-5">
            <el-config-provider :locale="locale">
              <router-view />
            </el-config-provider>
          </el-scrollbar>

        </el-main>
      </el-container>

    </el-container>


    <el-dialog v-model="setting.show" :title="setting.title" width="40%" align-center @close="handleSettingCancel">
      <el-form :model="setting.data" label-width="120px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="setting.data.old_password" placeholder="请填写旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="setting.data.new_password" placeholder="请填写新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="setting.data.confirm_password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
          <span class="dialog-footer">
              <el-button type="primary" @click="settingItem">提交</el-button>
              <el-button @click="handleSettingCancel">取消</el-button>
          </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import { provide, ref, shallowRef, watch} from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router"
import zhCn from 'element-plus/dist/locale/zh-cn'

import { ChatDotRound, ArrowRight, HomeFilled, Location, Position, Service, Money, Setting, UserFilled, Menu, Message, CopyDocument, Link, Operation } from '@element-plus/icons-vue'
import * as Axios from '~/api/chat';
import { ElMessage } from 'element-plus';


const locale = ref(zhCn)

const route = useRoute()
const router = useRouter()
const currentRoute = ref(router.currentRoute.value)

// 菜单栏
const menuOpeneds = ref([])
const menuActive = ref(currentRoute.value.fullPath)

// let info: any = localStorage.getItem('userInfo')
// const userInfo: any = JSON.parse(info)
const userInfo = {
  name: "Tel",
  tel: "152928372872",
  checkMenu: []
}
provide('pagePower', userInfo.checkMenu)

const menuList = shallowRef([])
const init = () => {
  const menuArr: any = [
    {
      id: 2,
      title: "首页",
      icon: HomeFilled,
      path: "/home",
      children: []
    },{
      id: 5,
      title: "工具中心",
      icon: Location,
      path: "/tools",
      children: [
        {
          id: 10,
          title: "ChatGPT",
          path: "/chat",
        },
        {
          id: 44,
          title: "表单",
          path: "/form",
        }
      ]
    },{
      id: 6,
      title: "合作管理",
      icon: Position,
      path: "/home",
      children: [
        {
          id: 11,
          title: "标书管理",
          path: "/home",
        },
        {
          id: 12,
          title: "竞标管理",
          path: "/home",
        },
        {
          id: 13,
          title: "协议管理",
          path: "/home",
        },
        {
          id: 14,
          title: "服务方管理",
          path: "/home",
        },
        {
          id: 65,
          title: "服务方银行账户管理",
          path: "/home",
        }
      ]
    },{
      id: 7,
      title: "服务管理",
      icon: Service,
      path: "/home",
      children: [
        {
          id: 15,
          title: "客户管理",
          path: "/home",
        },
        {
          id: 17,
          title: "线上拜访",
          path: "/home",
        },
        {
          id: 16,
          title: "线下拜访",
          path: "/home",
        },
        
      ]
    },
  ]
  let newArr: any = []
  for(let item of menuArr){
    if(item.children.length){
      let childArr: any = []
      for(let child of item.children){
        if(userInfo.checkMenu.includes(child.id)) childArr.push(child)
      }
      if(childArr.length) newArr.push({
        id: item.id,
        title: item.title,
        icon: item.icon,
        path: item.path,
        children: childArr
      })
    }else{
      if(userInfo.checkMenu.includes(item.id)) newArr.push(item)
    }
  }
  
  // menuList.value = newArr
  menuList.value = menuArr
}
init()




// 面包屑
const breadcrumb = ref(route.matched)

onBeforeRouteUpdate((to) => {
  // console.log('当前页面：', to)
  currentRoute.value = to
})

watch(() => route.matched, (newValue, oldValue) => {
  let list = []

  for(let item of route.matched){
    list.push(item)
  }

  breadcrumb.value = list

  // for(let item of menuList.value){
  //   if(currentRoute.value.fullPath.includes(item.path)){
  //     menuOpeneds.value = [item.path]
  //   }
  // }

}, { immediate: true })


const toUrl = (obj: any) => {
  let url = obj.meta && obj.meta.path || obj.path

  if(!url.includes(location.pathname)) router.push(url)
  
}



const handleMenuSelect = (key: string, keyPath: string[]) => {
  menuActive.value = key
}


// 修改密码
const setting: any = ref({
    show: false,
    title: '修改密码',
    data: {},
})
const handleSettingCancel = () => {
    setting.value.show = false
    setting.value.data = {}
}
const settingItem = () => {
  Axios.post('/panel/admin/change_pwd', setting.value.data).then((res: any) => {
    ElMessage({
      message: res.meta.msg,
      type: "success"
    })
    
    setting.show = false
    handleSettingCancel()
  })
}


// 退出
const handleOut = () => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('token')
  router.replace('/login')

  Axios.get('/panel/account_logout')
}

</script>

<style lang="scss" scoped>
$color-main: #F66;
$header-height: 60px;

.el-header{
  display: flex;
  align-items: center;
  height: $header-height;

  color: #fff;
  background-color: $color-main;

  .nav{
    display: flex;
    align-items: center;

    .nav-item{
      margin-left: 10px;
      margin-right: 10px;

      color: #fff;
      user-select: none;
    }
  }
}
.container {
  padding: 20px;
}

.el-aside{
  height: calc(100vh - $header-height);
  background-color: #333;
}

.el-main{
  height: calc(100vh - $header-height);
  padding: 0;
  background-color: #f2f2f2;
}

.page-content{
  height: calc( 100% - 104px);
}
</style>