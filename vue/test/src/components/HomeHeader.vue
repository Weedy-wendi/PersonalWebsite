<script lang="ts" setup>
  import{
    Check,
    Delete,
    Edit,
    Search,
    Star,
    Message,
    Avatar,
    House,
    Position,
    EditPen,
    PhoneFilled,
    ChatDotRound,
    
  } from '@element-plus/icons-vue'
  

  import router from '../router'
  import axios from 'axios';
  import { ref,onMounted} from 'vue';
  import {testAxios} from '../userMG'



  interface ResponseType {
    success: boolean;
    message: string;
    data: any;
}

  const dialogVisible = ref(false)

  interface LoginForm{
    username: string;
    password: string;
  }

  const form=ref<LoginForm>({
    username:'',
    password:'',
  })
  const errorMessage=ref('')
  const loginSuccess=ref(false)

  const header_username=ref('')

  const login = async () => {
    try{
      const res = await axios.post('http://localhost:3000/login',{
        username:form.value.username,
        password:form.value.password,
      })
      dialogVisible.value=false
      form.value.username=''
      form.value.password=''
      console.log(res.data.user.id)
      header_username.value=res.data.user.username
    }catch(err){
      console.log(err)
    }
}
/*const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/login', {
      username: form.value.username,
      password: form.value.password,
    });
    
    // 处理成功响应
    loginSuccess.value = true;
    errorMessage.value = '';
    
    // 可以在这里处理返回的数据
    console.log('登录成功:', res.data);
    
  } catch (err: any) { // 明确指定错误类型为 any 或使用 AxiosError 类型
    // 处理错误
    loginSuccess.value = false;
    
    if (axios.isAxiosError(err) && err.response) {
      // Axios 错误，有响应
      errorMessage.value = err.response.data.message || '登录失败';
    } else {
      // 其他类型的错误
      errorMessage.value = '网络错误或服务器不可用';
    }
    
    console.error('登录错误:', err);
  }
};*/
</script>
<template>
  <el-affix>
    <el-header class="header">
        <el-space wrap :size="30" class="header-gap">
          <el-space class="header-space" id="logo">
            <img>
            <el-link class="home-link" href="#" target="_blank">
              <el-text class="header-home-link-text">Home</el-text>
            </el-link>
          </el-space>
          <el-space class="header-space" id="nav" :size="30">
            <el-link class="nav-link" href="#" target="_blank">
              <el-icon><House /></el-icon>
              <span>Home</span>
            </el-link>
            <el-link class="nav-link" href="#" target="_blank">
              <el-icon><Position /></el-icon>
              <span>About</span>
            </el-link>
            <el-link class="nav-link" href="#" target="_blank">
              <el-icon><EditPen /></el-icon>
              <span>Draw</span>
            </el-link>
            <el-link class="nav-link" href="#" target="_blank">
              <el-icon><ChatDotRound /></el-icon>
              <span>Contact</span>
            </el-link>
          </el-space>
          <el-space class="header-space" id="search-gap">
            <el-form :model="form" label-width="auto" class="search-form" >
              <el-space class="header-search-space">
                <el-form-item class="header-search-item">
                <el-input/>
                </el-form-item>
                <el-form-item class="header-search-item">
                  <el-button :icon="Search" circle class="Search"/>
                </el-form-item>
              </el-space>
            </el-form>
            
          </el-space>
          <el-space class="header-space" id="user-meassage-gap">
            <el-button :icon="Avatar" circle class="Avatar" @click="dialogVisible=true"></el-button>
            <el-text class="header-username" v-if="header_username">{{ header_username }}</el-text>
          </el-space>
          <el-dialog
          v-model="dialogVisible"
          title="Login"
          width="500px"
          :before-close="handleClose"
          >
          <template #footer class="dialog">
    
              <el-form :model="form" label-width="auto" class="login-form" >
                <el-form-item label="Username" class="login-input-form">
                  <el-input v-model="form.username" class="LogInput" placeholder="please input your username" />
                </el-form-item>
                <el-form-item label="Password" class="login-input-form" >
                  <el-input v-model="form.password" class="LogInput" placeholder="please input your password" show-password/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="login" class="login-button">Login</el-button>
                </el-form-item>
                
              </el-form>

          </template>
          </el-dialog>
        </el-space>
      </el-header>

  </el-affix>
</template>
<style scoped>
  .header{
      background-color: #3c7ed4;
      color: #ffffff;
      text-align: center;
      line-height: 60px;
      margin-top: 0px;
      width: 100%;
  }
  .nav-link{
    color: #ededed;
    font-weight: 1000;
  }
  .search-form{
    display: flex;
  }
  .header-search-item{
    margin-top:15px;
  }
  .Avatar{
    display: flex;
    margin-top: -1px;
  }
  .login-form{
    margin-left: 40px;
  }
  .login-input-form{
    padding-left:0px;

  }
  .login-button{
    margin-left:130px;
    width:100px;
  }
  .dialog{
    margin-left: auto;
  }
  .LogInput{
    width: 250px;
  }
  .el-icon{
    font-size: 20px;
    font-weight:bold;
  }
  .header-username{
    font-size:15px;
    color:white;
  }
  .header-home-link-text{
    font-size:20px;
    font-weight:1000;
    color:#ffffff;
  }
</style>