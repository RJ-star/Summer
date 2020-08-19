<template>
	<div class="app">
		<el-container>
			<!-- <el-header style="text-align: right; font-size: 12px">
				<el-dropdown trigger="hover"
					:hide-on-click="false" >
					<span class="el-dropdown-link">
						{{ FromDatas.username }}
						<div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
						<div class="block" v-for="size in sizeList" :key="size">
							<el-avatar :size="size" :src="circleUrl"></el-avatar>
						</div>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided
							@click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
				</el-dropdown>
			</el-header> -->
			<el-main>
				<el-card class="box-card">
					<div slot="header" class="clearfix" style="text-align: center;">
						个人信息
					</div>
					<el-form :label-position="left" label-width="80px" :model="FormDatas" :rules="rules">
						<el-form-item label="昵称:" prop="nickname">
							<el-col :span="16"><el-input v-model="nickname"></el-input></el-col>
							<el-button type="text" size="small" @click="changeNick">修改</el-button>
						</el-form-item>
						<el-form-item label="密码:">
							<el-col :span="16">**********</el-col><el-button type="text" size="small" @click="gotoChange">修改</el-button>
						</el-form-item>
						<el-form-item label="邮箱:">
							<el-col :span="16">{{email}}</el-col>
						</el-form-item>
					</el-form>
					<el-button>返回</el-button>
					<el-button type="danger" @click.native="logout">退出登录</el-button>
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
            return {
				nickname:'',
				password:'',
				email:'',
				username: '',
				rules: {
					nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
				},
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
			gotoChange() {
				this.$router.push({
					path: "/ChangePassword"
				});
			},
			changeNick: function(){
				const h = this.$createElement;
				if(this.nickname==''){
					this.$notify({
						title: '昵称不能为空！',
						message: h('i', { style: 'color: teal'}, '请再次输入'),
						type: 'warning'
					});
				}
				else{
					this.$notify({
						title: '用户名修改成功！',
						message: h('i', { style: 'color: teal'}, '点击返回即可返回工作'),
						type: 'success'
					});
					this.$axios.post('/apis/user/modify_nickname', {nickname : this.nickname})
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
        mounted() {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.FromDatas.username = user;
            }
			this.$axios.post('/apis/user/getInfo',{myInfo : "true"})
			.then(response =>{
			this.nickname = response.data.nickname,
			this.email = response.data.email
			// console.log(this.nickname)
			// console.log(this.email)
			})
			.catch(error=>{
				console.log(error);
				alert('网络错误，不能访问');
			})
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
