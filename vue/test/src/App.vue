<!--home导航-->
<script lang="ts" setup>
  import{
    Check,
    Delete,
    Edit,
    Search,
    Star,
    Message,
  } from '@element-plus/icons-vue'


import { reactive,ref,onMounted, onBeforeMount, watchEffect, computed} from 'vue';
  const form=reactive({})
import HomeHeader from './components/HomeHeader.vue'
import HomeLeftAside from './components/HomeLeftAside.vue'
import HomeMain from './components/HomeMain.vue'
import HomeFooter from './components/HomeFooter.vue'


import jue from './assets/jue.png'
import type { ButtonInstance } from 'element-plus';

const qqq='./assets/1.png'
const ref1 = ref<ButtonInstance>()

const isVisible = ref(true)

const open=ref(false)


function isdone(){
  isVisible.value=!isVisible.value
  open.value=false
}
</script>
<template>
    <video
    class="background-vedio"
    autoplay
    loop
    muted
    src="./assets/backvedio1.webm"
    x-webkit-airplay="allow" 
    webkit-playsinline
    playsinline
    preload="auto"
    ></video>
  <div class="common-layout">
    <el-container>
    <HomeHeader v-if="isVisible"></HomeHeader>
      <el-container>
          <HomeLeftAside v-if="isVisible"></HomeLeftAside>
            <HomeMain v-if="isVisible"></HomeMain>
          <el-aside class="rightaside">
            <el-image class="jue-img" :src="jue" @click="open=true" ref="ref1">

            </el-image>
            <el-tour v-model="open" :mask="false">
              <el-tour-step :target="ref1?.$el" title="对话" description="我是逆蝶">
                <el-button @click="isdone">
                  <span>
                    隐藏组件
                  </span>
                </el-button>
              </el-tour-step>
            </el-tour>
        </el-aside>
      </el-container>
      <el-footer v-if="isVisible">
        <HomeFooter ></HomeFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.background-vedio{
  position:fixed;
  width:1690px;
  margin-left: -845px;
  z-index:-1;
}
  .rightaside{
      margin-left: auto;
      margin-top: 330px;
      right: 0;
      color: #333;
      text-align: center;
      width: 250px !important;
      width:var(--boxWidth);
      position:fixed;
  }
  p{
    color:#333;
  }
  .common-layout {
      height:100%;
  }
  .el-main{
  }
  .el-footer{
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
  }

</style>
<style>
  body{
    /*cursor: url('./assets/vue.svg'),auto;*/
  }
  .asterisk-left{
    
  }
  .message-note-input{
    margin-left:250px;
    max-width: var(--boxWidth);
  }
  .el-calendar-table .el-calendar-day{
    height: 34px;
    font-size: 12px;
  }
  .el-calendar__title .el-calendar-head{
    font-size: 100px !important;
  }
  .el-calendar_button{
    display: none;
  }
  th{
    font-size:12px;
    font-weight: bolder;
  }
  .el-button--small span{

  }
  .el-calendar__header{
    margin-left: -5px;
  }
  .el-calendar__title{
    font-size: 15px;
  }
  .el-button--small{
    width:32px;
    height:33px;
    border-style:solid;
  }
  .el-button--small:focus{
    outline: none;    
  }
  .el-calendar__button-group{
    margin-right:-5px;
  }
  .el-tour{
    background-color: aqua !important;
  }
  .el-tour__body{
    color:black
  }
  .el-tour-indicator{
    visibility: hidden;
  }
  .el-tour-buttons span{
      
  }
</style>