<script lang="ts" setup>
  import { ElFooter, ElLink, ElSpace } from 'element-plus'
</script>
<template>
    <el-footer class="footer">
        <el-space wrap :size="100">
          <el-link href="#" target="_blank">Home</el-link>
          <el-link href="#" target="_blank">About</el-link>
          <el-link href="#" target="_blank">Draw</el-link>
          <el-link href="#" target="_blank">Contact</el-link>
        </el-space>
    </el-footer>
</template>
<style scoped>
  .footer{
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
      width:100% ;
      max-width: unset;
  }
</style>