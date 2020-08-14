<template>
    <div>
        <div class="login-container">
            <div id="login">
                <p class="title">登录</p>
                <el-form
                        :model="ruleForm2"
                        status-icon
                        :rules="rules2"
                        ref="ruleForm2"
                        label-width="0"
                        class="demo-ruleForm"
                >
                    <el-form-item prop="email">
                        <el-input v-model="ruleForm2.email" auto-complete="off" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>

                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Login",
        data() {
            // <!--验证电子邮箱是否合法-->
            let checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电子邮箱'))
                } else if (!this.checkEmail(value)) {
                    callback(new Error('电子邮箱不合法'))
                } else {
                    callback()
                }
            }
            // <!--验证密码-->
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.ruleForm2.checkPass !== "") {
                        this.$refs.ruleForm2.validateField("checkPass");
                    }
                    callback()
                }
            }
            return {
                ruleForm2: {
                    email: "",
                    password: "",
                },
                rules2: {
                    email: [{ validator: checkEmail, trigger: 'change' }],
                    password: [{ validator: validatePass, trigger: 'change' }],
                },
                flag: true
            }
        },
        methods: {
            // <!--发送验证码-->
            // <!--提交注册-->
            submitForm: function(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios.post("/apis/login",{
                            email:this.ruleForm2.email,
                            password:this.ruleForm2.password,
                        })
                        .then(response => {
                            if (response.data.status === 0) {
                                this.$router.push({path:"/Recent"});
                                window.location.reload();
                            } else {
                                this.$notify({
                                    title:'登录失败',
                                    message:response.data.message,
                                    type:'error'
                                })
                            }
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                })
            },
            // <!--进入登录页-->
            gotoLogin() {
                this.$router.push({
                    path: "/Container"
                });
            },
            // 验证电子邮箱
            checkEmail(str) {
                // eslint-disable-next-line no-useless-escape
                let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (filter.test(str)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
</script>
<style scoped>
    .register-container img {
        position: absolute;
        z-index: 1;
    }
    .login-container {
        position: fixed;
        background: linear-gradient(#6ba7fa, #ffffff);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    #login {
        max-width: 340px;
        margin: 60px auto;
        background: #fff;
        padding: 20px 40px;
        border-radius: 10px;
        position: relative;
        z-index: 9;
    }
    .title {
        font-size: 26px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px;
        text-align: center;
    }
    .code >>> .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .code button {
        margin-left: 20px;
        width: 140px;
        text-align: center;
    }
</style>