<template>
  <div class="app-container">
    <div>
      <el-button @click="info">请求个人信息</el-button>
    </div>
  </div>
</template>

<script>
import {getInfo} from "../../api/login";
import {getToken} from "../../utils/auth";
export default {
    name: 'home',
    data() {
      return {

      }
    },
    created(){

    },
    methods:{
      info(){
        console.log(this.$store.state)
      }
    },
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }


</style>
