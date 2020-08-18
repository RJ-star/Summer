<template>
    <div>
        <br><br><br>
        <div class="welcome">欢迎来到金刚石文档</div>
        <br><br><br>
        <el-button round @click="gotoRegister">注册</el-button>
        <el-button round type="primary" @click="gotoLogin">登录</el-button>
    </div>

</template>
<script>
    export default {
        name: "Register",
        methods: {

            // <!--进入登录页-->
            back:function() {
                this.$router.go(-1)
            },
            gotoRegister(){
                this.$router.push({
                    path:'/Register'
                })
            },
            gotoLogin(){
                this.$router.push({
                    path:'/Login'
                })
            }
        }
    };
</script>
<style>
    .welcome{
        font-size: 60px;
        font-family: "微软雅黑";
    }
</style>