<template>
     <div>
         <el-page-header @back="goBack" content="消息页面">
         </el-page-header>
         <el-alert
                 title="Congratulations!"
                 type="success"
                 description="你已经成功加入了该团队。"
                 :closable="false"
                 center
                 show-icon>
         </el-alert>
         <br>
         <el-button type="primary" round @click="intoTeam">进入该团队首页</el-button>
         <br>
         <br>
         <img src="../assets/team.jpeg" alt="">
     </div>
</template>

<script>
    export default {
        name: "Congratulations",
        methods: {
            goBack() {
                this.$router.go(-1);
                console.log('go back');
            },
            intoTeam(){
                console.log('into team');
            }
        }
    }
</script>

<style scoped>

</style>