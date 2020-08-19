<template>
    <div class="app">
        <el-container>
			<el-aside class="app-side app-side-left"
                      :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
                <el-dropdown
                        trigger="hover"
                        :hide-on-click="false" >
                                <span class="el-dropdown-link">
                                    {{ username }}
                                    <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                                    <div class="block" v-for="size in sizeList" :key="size">
                                       <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </div>
                                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="gotoMail">我的消息</el-dropdown-item>
                        <el-dropdown-item @click.native="gotoUserprofile">设置</el-dropdown-item>
                        <el-dropdown-item divided
                                          @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <br>
                <br>
                <div>
                    <el-menu default-active="1-4-1"
                             class="el-menu-vertical-demo"
                             @open="handleOpen"
                             :collapse="isCollapse">
                        <el-button round @click="gotoCreateDoc">新建文档</el-button>
                        <br>
                        <br>
                        <el-button type="primary" round @click="gotoPatterns">使用模板</el-button>
                        <br>
                        <br>
                        <el-menu-item index="1" @click="gotoRecent">
                            <i class="el-icon-s-platform"></i>
                            <span slot="title">工作台</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="gotoTeams" disabled>
                            <i class="el-icon-s-promotion"></i>
                            <span slot="title">团队空间</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="gotoBin">
                            <i class="el-icon-delete"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>

                    </el-menu>
                </div>
            </el-aside>
			<el-container>
				<el-header class="app-header">
					<el-menu default-active="1"
							class="el-menu-demo tab-page"
							mode="horizontal"
							@select="handleSelect"
							active-text-color="#409EFF">
						<el-menu-item index="1">团队空间列表</el-menu-item>
					</el-menu>
				</el-header>
				<template>
					<el-main class="app-body">
						<el-table
							:data="items"
							style="width: 100%">
							<el-table-column
								prop="name"
								label="团队名">
							</el-table-column>
							<el-table-column
								fixed="right"
								label="操作"
								width="150">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click="toTeam(scope.$index, scope.row)">前往团队空间</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div style="text-align: center;margin-top: 20px;">
							<el-button round @click="dialogFormVisible = true">创建团队</el-button>
							<el-dialog title="创建团队" :visible.sync="dialogFormVisible">
								<el-form :model="formTeam" ref="formTeam">
									<el-form-item label="团队名称" :label-width="formLabelWidth">
									<el-col :span="22"><el-input v-model="formTeam.teamname" autocomplete="off"></el-input></el-col>
									</el-form-item>
									<el-form-item label="团队介绍" :label-width="formLabelWidth">
										<el-col :span="22"><el-input type="textarea" v-model="formTeam.desc"></el-input></el-col>
									</el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="dialogFormVisible = false">取 消</el-button>
									<el-button type="primary" @click="createTeam('formTeam')">确 定</el-button>
								</div>
							</el-dialog>
						</div>
						<router-view/>
					</el-main>
					
				</template>
			</el-container>
		</el-container>
    </div>
</template>

<script>
    export default {
        name: 'Teams',
        data() {
            return {
				currentDate: new Date(),
                username: '',
                isCollapse: false,
				formTeam:{
					teamname : '',
					desc : ''
				},
				dialogFormVisible:false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                items: [{
					id: '',
					name: ''
				}],
				temp: [{
					id: '',
					name: ''
				}]
            }
        },
        methods: {
			createTeam: function(formdata){
				// this.$axios.post('/apis/user/getstatus')
				// .then(res=>{
				// 	if (res.data.status===0) {
						this.$refs[formdata].validate((valid) => { 
							if (valid) {
								const h = this.$createElement;
								if(this.formTeam.teamname==''){
									this.$notify({
										title: '团队名不能为空！',
										message: h('i', { style: 'color: teal'}, '请再次输入'),
										type: 'warning'
									});
								}
								else{
									this.$notify({
										title: '团队创建成功！',
										message: h('i', { style: 'color: teal'}, '请再次输入'),
										type: 'success'
									});
									this.$axios.post('/apis/user/create_team', {
										create : "create",
										team_name : this.formTeam.teamname,
										team_description : this.formTeam.desc
									})
									.then(response => {
										if (response.data.status === 0) {
										window.location.reload()
										// this.$router.go(0)
										} else {
										return false
										}
									})
								}
							}	
							else {
								return false;
							}
						})
					// }
					// else{
					// 	this.$router.push({
					// 		path: "/login"
					// 	})
					// 		alert('请登录')
					// }
					// })
			},
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
			toTeam(index, row){
				console.log(row.id)
				localStorage.setItem('team_id',row.id);
				this.$router.push({path:'/user/teaminfo'})
			},
			gotoUser() {
                this.$router.push({
                    path: "/user/User"
                });
            },
            gotoBin() {
                this.$router.push({
                    path: "/user/Bin"
                });
            },
			gotoPatterns() {
				this.$router.push({
				path: "/user/Patterns"
				});
			},
            gotoCreateDoc() {
                this.$router.push({
                    path: "/user/CreateDoc"
                });
            },
            gotoMail:function() {
                this.$router.push({
                    path: "/user/Mail"
                });
            },
            gotoUserprofile:function()
            {this.$router.push({
                    path:"/user/Userprofile"
                })
            },
            gotoRecent() {
                this.$router.push({
                    path: "/user/Recent"
                });
            },
            gotoTeams() {
                this.$router.push({
                    path: "/user/Teams"
                });
            },
		},
		mounted: function () {
			let user = sessionStorage.getItem('user');
			if (user) {
				this.username = user;
			}
			this.$axios.post('/apis/user/getstatus')
			.then(res=>{
				if (res.data.status===0) {
					this.$axios.post('/apis/user/myTeam',{myteam : "myteam"})
						.then(response =>{
						console.log(response);
							this.items.pop();
							for (let i=0, len=response.data.retTeamIdlist.length;i<len;i++) {
								this.temp.id=response.data.retTeamIdlist[i],
								this.temp.name=response.data. retTeamNamelist[i],
								this.items.push({id:this.temp.id,name:this.temp.name})
							}
						})
					.catch(error=>{
						console.log(error);
						alert('网络错误，不能访问');
					})
				}
				else{
					this.$router.push({
						path: "/user/login"
					})
					alert('请登录')
				}
			})
		},
	}
</script>

<style>
.el-header {
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
</style>
