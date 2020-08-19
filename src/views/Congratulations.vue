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
         <el-button type="primary" round @click="intoTeam">进入我的团队进行查看</el-button>
     </div>
</template>

<script>
    export default {
        name: "Congratulations",
        data(){
            return{
                //userID:'',
                teamID:'',
                teamname:''
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
                console.log('go back');
            },
            intoTeam(){
                this.$router.push({
                    path: "/user/Teams"
                });
            },
            initialization:function () {
                this.teamID=this.$route.query.teamID;
            }
        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }

        },
        created(){
            this.initialization();
        }
    }
</script>

<style scoped>

</style>