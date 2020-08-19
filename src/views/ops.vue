<template>
    <div>
        <el-alert
                title="错误"
                type="error"
                description="权限不足或他人正在编辑或文档不存在，请联系文档管理员"
                :closable="false"
                center
                show-icon>
        </el-alert>
        <br>
        <el-button round @click="back">返回</el-button>
        <br>
        <img src="../../assets/background.png" alt="">
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
        }
    };
</script>
