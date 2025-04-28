<script lang='ts' setup>
    import { ref, reactive, onMounted} from 'vue'

    const props=defineProps({
        comments:{
            type:Object,
            required:true
        }
    })
    const comments=props.comments
    console.log(2222,comments.data[0])

    const item=comments.data
    const reply=(false)
    const inputComment= ref('')
    const showitemid = ref('')

    const likeclick=(item:any)=>{
        if(item.isLike===null){
            item.isLike=true
            item.like++
        }else{
            if(item.isLike){
                item.like--
            }else{
                item.like++
            }
            item.islike=!item.isLike
        }
    }

    const dislikeclick=(item:any)=>{
        if(item.isDislike===null){
            item.isDislike=true
            item.dislike++
        }else{
            if(item.isDislike){
                item.dislike--
            }else{
                item.dislike++
            }
            item.isDislike=!item.isDislike
        }
    }

    const cancel=()=>{
        showitemid.value=''
    }

    const commitcomment=()=>{
        console.log(inputComment.value)
    }

    const showcommentinput=(item:any,reply:boolean)=>{
        if(reply){
            inputComment.value='@'+item.username+''
        }else{
            inputComment.value=''
        }
        showitemid.value=item.id
    }

</script>

<template>
    
    <el-container>
        <el-space>
            <el-image class="userimg"></el-image>
            <span class="username">{{ item.username }}</span>
        </el-space>
        <span class="content">{{ item.content }}</span>
        <span>{{ item.date }}</span>
        <el-space>
            <el-button @click="likeclick(item)">点赞</el-button>
            <el-button @click="dislikeclick(item)">踩</el-button>
            <el-button @click="showcommentinput(item,reply)">回复</el-button>
        </el-space>
    </el-container>
    <el-container>
        <el-container v-for="reply in item.reply">
            <el-container>
                <el-space>
                    <el-image class="userimg"></el-image>
                    <span class="username">{{ reply.username }}</span>
                </el-space>
                <span class="content">{{ reply.content }}</span>
                <span>{{ reply.date }}</span>
                <el-space>
                    <el-button @click="likeclick(reply)">点赞</el-button>
                    <el-button @click="dislikeclick(reply)">踩</el-button>
                    <el-button @click="showcommentinput(item,reply)">回复</el-button>
                </el-space>
            </el-container>
        </el-container>
    </el-container>
    <transition>
        <el-container v-if="showitemid === item.id">
            <el-input
                v-model="inputComment"
                type="textarea"
                placeholder="请输入内容"
                rows="2"
                autofocus
                ></el-input>
            <el-button @click="commitcomment">提交</el-button>
        </el-container>
    </transition>
</template>

<style scoped>
    .el-container{
        background-color: aqua;
        width: 1000px;
        height: 1000px;
    }
</style>