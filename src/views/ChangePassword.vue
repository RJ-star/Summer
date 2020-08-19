<template>
	<div class="app">
		<el-container>
			<el-main>
				<el-card class="box-card">
					<div slot="header" class="clearfix" style="text-align: center;">
						密码修改
					</div>
					<el-form :label-position="left" :model="ruleForm" label-width="80px" :rules="rules">
						<el-form-item label="密码" prop="pass">
							<el-col :span="22"><el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input></el-col>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPass">
							<el-col :span="22"><el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input></el-col>
						</el-form-item>
						<el-button @click="backtoProfile">返回</el-button>
						<el-button type="danger" @click="changePass">确认修改</el-button>
					</el-form>
				</el-card>
			</el-main>
		</el-container>
    </div>
</template>

<script>
	// import axios from 'axios'
    export default {
        name: 'UserProfile',
        data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
            return {
				ruleForm:{
					pass: '',
					checkPass: ''
				},
				username: '',
				rules: {
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
						{ validator: validatePass2, trigger: 'blur' }
					]}
				,
				dialogTableVisible : false,
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"  
			}
        },
        methods: {
            toggleSideBar() {
                this.isCollapse = !this.isCollapse
            },
            logout: function () {
                this.$confirm('确认退出?', '提示', {})
                    .then(() => {
                        sessionStorage.removeItem('user');
                        this.$router.push('/user/login');
                    })
                    .catch(() => { });
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
			requestInfo(){
				this.$axios.post('apis/user/getInfo',{myInfo : "true"})
				.then(response =>{
				this.nickname = response.nickname,
				this.password = response.password,
				this.email = response.email
				})
				.catch(error=>{
					console.log(error);
					alert('网络错误，不能访问');
				})
			},
			backtoProfile() {
				this.$router.push({
					path: "/UserProfile"
				});
			},
			changePass: function(){
				const h = this.$createElement;
				if(this.ruleForm.pass==''){
					this.$notify({
						title: '密码不能为空！',
						message: h('i', { style: 'color: teal'}, '请再次输入'),
						type: 'warning'
					});
				}
				else if(this.ruleForm.pass!=this.ruleForm.checkPass){
					this.$notify({ 
						title: '密码不一致！',
						message: h('i', { style: 'color: teal'}, '请再次输入'),
						type: 'warning'
					});
				}
				else{
					this.$notify({
						title: '密码修改成功！',
						message: h('i', { style: 'color: teal'}, '点击返回即可返回查看个人信息'),
						type: 'success'
					});
					this.$axios.post('/apis/user/modifyPassword', {newPassword : this.ruleForm.pass})
					.then(response => {
						if (response.data.status === 0) {
							window.location.reload()
						} else {
							return false
						}
					})
				}
			}
        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.FromDatas.username = user;
            }
        },
		
    }
</script>

<style>
.el-header {
	background-color: #B3C0D1;
	color: #333;
	line-height: 60px;
}
  
.el-aside {
	color: #333;
}
  
.time {
	font-size: 13px;
	color: #999;
}
  
.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
  
.clearfix:after {
	clear: both
}
.box-card {
	width: 540px;
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
}
</style>
