<template>
    <div>
        <div class="register-container">
            <div id="register">
                <p class="title">注册</p>
                <el-form
                        :model="FormData"
                        status-icon
                        :rules="rules"
                        ref="FormData"
                        label-width="0"
                        class="demo-ruleForm"
                >
                    <el-form-item prop="email">
                        <el-input v-model="FormData.email" auto-complete="off" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="FormData.password" auto-complete="off" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="FormData.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="nickname">
                        <el-input type="input"  v-model="FormData.nickname"  auto-complete="off" placeholder="输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('FormData')" style="width:100%;">注册</el-button>
                        <p class="login" @click="gotoLogin">已有账号？立即登录</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Register",
        data() {
            // <!--验证电子邮箱是否合法-->
            let checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电子邮箱'))
                } else if (!this.checkEmail(value)) {
                    callback(new Error('电子邮箱不合法'))
                } else {
                    this.$axios.post('/apis/Register?select=1', {
                        select_username: value
                    })
                        .then(response => {
                            if (response.data.is_indb === 1) {
                                callback(new Error('该邮箱已经被注册'))
                            } else {
                                callback();
                            }
                        })
                }
            }
                // <!--验证密码-->
                let validatePass = (rule, value, callback) => {
                    if (value === "") {
                        callback(new Error("请输入密码"))
                    } else {
                        if (this.FormData.checkPass !== "") {
                            this.$refs.FormData.validateField("checkPass");
                        }
                        callback()
                    }
                }
                // <!--再次验证密码-->
                let validatePass2 = (rule, value, callback) => {
                    if (value === "") {
                        callback(new Error("请再次输入密码"));
                    } else if (value !== this.FormData.password) {
                        callback(new Error("两次输入密码不一致!"));
                    } else {
                        callback();
                    }
                }
                let checkNickname = (rule, value, callback) => {
                    if (value === "") {
                        callback(new Error("请输入昵称"));
                    } else {
                        callback();
                    }
                };
                return {
                    FormData: {
                        email: "",
                        password: "",
                        checkPass: "",
                        nickname: ""
                    },
                    rules: {
                        email: [{validator: checkEmail, trigger: 'change'}],
                        password: [{validator: validatePass, trigger: 'change'}],
                        checkPass: [{validator: validatePass2, trigger: 'change'}],
                        nickname: [{validator: checkNickname, trigger: 'change'}]
                    },
                    flag: true
                }

        },
        methods: {
            // <!--提交注册-->
            submitForm:function (formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios.post('/apis/user/register', {
                            email: this.FormData.email,
                            password: this.FormData.password,
                            nickname: this.FormData.nickname,
                        })
                        .then(response => {
                            if (response.data.status === 0) {
                                this.$router.push({path: '/Recent'})
                                window.location.reload()
                            } else {
                                return false
                            }
                        })
                        // setTimeout(() => {
                        //     alert('注册成功')
                        // }, 400);
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                })
            },
            // <!--进入登录页-->
            gotoLogin() {
                this.$router.push({
                    path: "/login"
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
    .register-container {
        position: fixed;
        background: linear-gradient(#6ba7fa, #ffffff);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    #register {
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
    .el-form-item {
        text-align: center;
    }
    .login {
        margin-top: 10px;
        font-size: 14px;
        line-height: 22px;
        color: #1ab2ff;
        cursor: pointer;
        text-align: left;
        text-indent: 8px;
        width: 160px;
    }
    .login:hover {
        color: #2c2fd6;
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
    .el-button--primary:focus {
        background: #409EFF;
        border-color: #409EFF;
        color: #fff;
    }
</style>