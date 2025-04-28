<script lang="ts" setup>
import { reactive,ref,onMounted, onBeforeMount, watchEffect, computed, h, render,  } from 'vue';
import { ElCard, ElButton, ElInput, ElLink, ElImage, ElMessage, ElText } from 'element-plus'
import axios from 'axios'

import {FillNewOhterLikeThumbUp, FillNewOhterDislikeThumbDown} from "@element-extended-icon-pack/vue"

import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

import * as CommentData from './data.json'

console.log(111,CommentData.data)

const open=ref(false)
const boxWidth=ref(100)
const leftasideWidth=ref(250)
const updateinputLeft=ref(0)
const updatebutton=ref(0)
const updateinputbox=ref(0)
const updateBoxWidth=()=>{
  const maxWidth=window.innerWidth;
  const minWidth=100;
  boxWidth.value=Math.min(
    maxWidth,
    Math.max(minWidth,maxWidth*0.645)
  )
  
  if(maxWidth<900){
    leftasideWidth.value=0
    updateinputLeft.value=0
    updatebutton.value=Math.min(
      maxWidth,
      Math.max(maxWidth*0.645-320)
    )

  }
  else{
    leftasideWidth.value=260
    updateinputLeft.value=240
    updatebutton.value=Math.min(
    maxWidth,
    Math.max(maxWidth*0.645-55)
  )
  }
}
const debounce=(fn:any,delay:any)=>{
  let timer:any=null;
  return function(){
    clearTimeout(timer);
    timer=setTimeout(fn,delay);
  }
}
const debounceUpdate=debounce(updateBoxWidth,100);
onMounted(()=>{
  updateBoxWidth();
  window.addEventListener('resize',debounceUpdate)
})
onBeforeMount(()=>{
  window.removeEventListener('resize',debounceUpdate)
})
watchEffect(()=>{
  document.documentElement.style.setProperty('--boxWidth',boxWidth.value+'px');
  document.documentElement.style.setProperty('--leftasideWidth',leftasideWidth.value+'px');
  document.documentElement.style.setProperty('--updateinputLeft',updateinputLeft.value+'px');
  document.documentElement.style.setProperty('--updatebutton',updatebutton.value+'px');
  document.documentElement.style.setProperty('--updateinputbox',updateinputbox.value+'px');
})

const textarea=ref('')


/*  虚拟节点尝试
const commend=ref<string[]>([])

const comments=ref<CommentItem[]>(
  [
    
  ]
)


// 1. 明确定义组件类型（使用字符串字面量联合类型）
type ComponentType = 'image' | 'link' | 'div' | 'span'

// 2. 定义组件映射类型（使用条件类型）
type ComponentMap = {
  [K in ComponentType]: 
    K extends 'image' ? typeof ElImage :
    K extends 'link' ? typeof ElLink :
    Component | string
}

// 3. 实现组件映射
const componentMap: ComponentMap = {
  image: ElImage,
  link: ElLink,
  div: 'div',
  span: 'span'
}

// 4. 组件配置接口
interface ComponentConfig {
  type: ComponentType
  props?: Record<string, unknown>
  content?: string
  children?: ComponentConfig[]
}

// 5. 评论项接口
interface CommentItem {
  id: number
  username: string
  avatar: string
  content: string
  timestamp: number
}

// 6. 渲染函数
const renderComponent = (config: ComponentConfig): VNode => {
  const Component = componentMap[config.type]
  return h(
    Component as Component,
    config.props || {},
    config.children?.map(child => renderComponent(child)) || config.content
  )
}

// 7. 创建评论VNode
const createCommentVNode = (comment: CommentItem): VNode => {
  const config: ComponentConfig = {
    type: 'div',  // 直接使用字面量
    props: { class: 'comment' },
    children: [
      {
        type: 'image',
        props: { 
          src: comment.avatar,
          class: 'user-avatar'
        },
        
      },
      {
        type: 'span',
        props: { 
          content: comment.username,
          class: 'username'
        },
      },
      {
        type: 'div',
        props: {
          content: comment.content,
          class: 'content'
        }
      }
    ]
  }
  return renderComponent(config)
}
//提交处理

const onSubmit=()=>{
  if(textarea.value.trim()){
    comments.value.push({
      id:Date.now(),
      username:'用户',
      avatar:'#',
      content:textarea.value,
      timestamp:Date.now()
    })
    textarea.value=''
    console.log(comments.value[0].content)
  }
}               */

const commentdata=ref('')

const onSubmit=()=>{
  if(textarea.value.trim()){
    axios.post('http://localhost:3000/addcomment',{
      content:textarea.value,
      time:Date.now()
    })
    textarea.value=''
    console.log(commentdata.value)
  }
}

const Like=async (id:any)=>{
  //传输数据到后端，让后端修改赞数量
  const reslike=await axios.post('http://localhost:3000/like/:commentId',{
    id:id,
    isLike:true
  })
}
const Hate=async (id:any)=>{
  //传输数据到后端，让后端修改踩数量
  const reshate=await axios.post('http://localhost:3000/hate/:commentId',{
    id:id,
    isLike:true
  })
}

const replyLike=async (parentid:any,childid:any)=>{
  //传输数据到后端，让后端修改赞数量
  const reslike=await axios.post('http://localhost:3000/replylike/:replyId',{
    parentid:parentid,
    childid:childid,
    isLike:true
  })
}


const replyHate=async (parentid:any,childid:any)=>{
  //传输数据到后端，让后端修改踩数量
  const reshate=await axios.post('http://localhost:3000/replyhate/:replyId',{
    parentid:parentid,
    childid:childid,
    isLike:true
  })
}


const Expand=async (id:any)=>{
  //传输数据到后端，让后端修改是否展开
  const resexpand=await axios.post('http://localhost:3000/expand',{
    id:id,
  })

}

</script>

<template>
        <el-main class="main">
            <el-form class="message-note-input">
              <el-form-item class="message-note">
                <el-input class="message-note-inputbox" v-model="textarea" placeholder="等待你的评论"></el-input>
              </el-form-item>
              <el-form-item class="message-note">
                <el-button class="message-note-button" type="primary" @click="onSubmit">评论</el-button>
              </el-form-item>
            </el-form>
            <el-card class="comments-containner" v-for="card in CommentData.data" :key="card.id">
              <div class="user-info">
                <el-button class="user-avatar"></el-button>
                <el-text class="user-name" >{{card.username}}</el-text>
              </div>
              <div class="content-container">
                <span class="content">{{card.content}}</span>
              </div>
              <el-space class="content-button-containner" :size="5">
                <el-button class="like-button" @click="Like(card.id)">
                  <FillNewOhterLikeThumbUp />
                </el-button>
                <el-text>{{ card.likeNum }}</el-text>
                <el-button class="hate-button" @click="Hate(card.id)">
                  <FillNewOhterDislikeThumbDown />
                </el-button>
                <el-text>{{ card.hateNum }}</el-text>
                <el-button class="reply-show-button" @click="Expand(card.id)">{{ card.isExpand ? '收起' : '展开'}}</el-button>
                <el-button class="reply-todo-button">回复</el-button>
              </el-space>
              <div class="reply-container" v-if="card.isExpand" v-for="reply in card.reply">
                <el-card class="reply-container" v-if="card.isExpand" >
                  <div class="user-info">
                    <el-button class="user-avatar"></el-button>
                    <el-text class="user-name" >{{reply.username}}</el-text>
                  </div>
                  <div class="content-container">
                    <span class="content"><span class="at-user">{{ '@'+reply.toName }}</span>{{' '+reply.content}}</span>
                  </div>
                  <el-space class="reply-content-button-containner" :size="5">
                  <el-button class="like-button" @click="replyLike(card.id,reply.id)">
                    <FillNewOhterLikeThumbUp />
                  </el-button>
                  <el-text>{{ reply.likeNum }}</el-text>
                  <el-button class="hate-button" @click="replyHate(card.id,reply.id)">
                    <FillNewOhterDislikeThumbDown />
                  </el-button>
                  <el-text>{{ reply.hateNum }}</el-text>
                  <el-button class="reply-todo-button">回复</el-button>
                </el-space>
                </el-card>
              </div>
              
            </el-card>
            <!--<template>
              <Comment :comments="CommentData.comment">111</Comment>
            </template>-->
            <!--<el-card v-for="card in comments" :key="card.id" class="message-conent-container">
              <component :is="createCommentVNode(card)" ></component>
            </el-card>-->
        </el-main>
</template>

<style lang="scss" scoped>

@mixin focus-style{
  &:focus{
    outline: none;
  }
}

.main{
      color: #333;
      text-align: center;
      line-height: 160px;
      min-height: 1000px;
      min-width: 100px;
}
.el-main{
    background-image:url('./assets/back-img.png');
    background-size: cover;
}

.message-note-inputbox{
  min-width: 200px;
  min-height: 100px;
  max-width: var(--boxWidth);
  left: var(--updateinputLeft);
  border-radius: 10px;
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
  background-color: #e4e4e4;
  border-style:hidden;
  box-shadow: #37168c 0px 0px 5px 0px;
  z-index:2;
}
.message-note-button{
  margin-top: -10px;
  margin-left: var(--updatebutton);
}
.message-note-input{
    
  }
  .message-note{
    
  }
  .message-note-inputbox{
    min-width: 200px;
    min-height: 100px;
    max-width: var(--boxWidth);
    margin-left: -230px;
  }
  main{
    background-image:url('./assets/back-img.png');
    background-size: cover;
  }
.message-conent-container{
  margin-left: 20px;
  min-width: 200px;
  min-height: 50px;
  max-height: 300px;
  max-width: var(--boxWidth);
  height: auto;
  left: var(--updateinputLeft);
  border-color: #000000;
  border-width: 1px;
  background-color: #e4e4e4;
  border-style:hidden;
}
.el-card{
  left:10px;
  margin-left:var(--leftasideWidth);
  margin-top: 20px;
  min-width:200px;
  max-width:var(--boxWidth);

  background-color: #e4e4e4;
}
.comments-containner{
  text-align:start;
  height:auto;
}
.user-info{
  width:auto;
  height:50px;
}
.user-avatar{
  margin-top: -120px;
  border-radius: 50%;
  width:50px;
  height:50px;
  @include focus-style;
}
.user-name{
  position: relative;
  top: -60px;
  left: 10px;

  font-weight: 800;
}
.content-container{
  max-height:10px;
}
.content{
  position: relative;
  margin-left: 60px;
  top:-40px;
}
.content-button-containner{
  margin-left:50px;
  margin-top: 90px;
  margin-bottom:0px;
  height:50px;
}
.like-button{
  width:20px;
  border-radius: 50%;
  @include focus-style;
}
.hate-button{
  width:20px;
  margin-left:20px;
  border-radius: 50%;
  @include focus-style;
}
.reply-show-button{
  width:70px;
  margin-left:60px;
  border-radius: 10%;
  @include focus-style;

}
.reply-todo-button{
  margin-left:50px;
  border-radius:10%;
  @include focus-style;

}
.reply-container{
  margin-top:10px;
  margin-left: 0px;
  height:210px;
}
.at-user{
  color:#1940c1;
}
.reply-content-button-containner{
  margin-left:50px;
  margin-top: 70px;
  margin-bottom:0px;
  height:50px;
}
</style>

<style>
  .coment-card{
    min-width: 200px;
    min-height: 100px;
    max-width: var(--boxWidth);
    height: auto;
    left: var(--updateinputLeft);
    border-color: #000000;
    border-width: 1px;
    background-color: #e4e4e4;
    border-style:hidden;
    box-shadow: #37168c 0px 0px 5px 0px;
    margin-left: 415px;
  }

</style>