<script lang="ts" setup>
    import { reactive,ref,onMounted, onBeforeMount, watchEffect, computed} from 'vue';
    const qqq='../assets/1.png'

    const datevalue=ref(new Date())
</script>

<template>
        <el-aside class="leftaside" >
          <el-container>
            <div class="datecontainer">
              <el-calendar v-model="datevalue" class="date"/>
              <el-divider class="left-divider"/>
              <el-card class="left-card">
                <span>今天去钓鱼</span>
              </el-card>
              <el-divider class="left-divider"/>
              <el-image class="small-image" :src="qqq"/>
            </div>
          </el-container>
        </el-aside>
</template>

<style lang="scss" scoped>
  .leftaside{
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      max-width:var(--leftasideWidth);
      position:fixed;
      box-shadow: #888888 0px 0px 10px;
  }
  .left-card{
    background-color: #e4e4e4;
    text-align: center;
    width:205px;
    margin-left: 20px;
  }
  .left-divider{
    max-height:5px
  }

</style>
<style>
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
    font-size: 0px;
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

</style>