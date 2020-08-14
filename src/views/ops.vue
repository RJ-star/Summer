<template>
    <div>
        <el-alert
                title="错误"
                type="error"
                description="权限不足，请联系文档管理员"
                :closable="false"
                center
                show-icon>
        </el-alert>
        <br>
        <el-button round @click="gotoLogin">返回</el-button>
        <br>
        <img src="../assets/background.png" alt="">
    </div>

</template>
<script>
    export default {
        name: "Register",
        methods: {

            // <!--进入登录页-->
            gotoLogin() {
                this.$router.push({
                    path: "/Container"
                });
            }
        }
    };
</script>
