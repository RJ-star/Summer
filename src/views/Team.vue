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
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided
                                          @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div>
                    <el-menu default-active="1-4-1"
                             class="el-menu-vertical-demo"
                             @open="handleOpen"
                             :collapse="isCollapse">
                        <el-button round @click="gotoCreateDoc">新建文档</el-button>
                        <el-button type="primary" round @click="gotoPatterns">使用模板</el-button>
                        <el-menu-item index="1">
                            <i class="el-icon-s-platform"></i>
                            <span slot="title">工作台</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="gotoDesktop">
                            <i class="el-icon-menu"></i>
                            <span slot="title">我的桌面</span>
                        </el-menu-item>
                        <el-submenu index="3">					//有改动
                            <span slot="title"><i class="el-icon-document"></i>团队空间</span>
							<el-menu-item-group>
								<el-button round @click="dialogFormVisible = true">创建团队</el-button>			//1开始
								<el-dialog title="创建团队" :visible.sync="dialogFormVisible">
									<el-form :model="formTeam" ref="formTeam" rules="rules">
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
								<el-menu-item index="3-1">团队1</el-menu-item>
								<el-menu-item index="3-2">团队2</el-menu-item>
							</el-menu-item-group>								//1结束
                        </el-submenu>				//有改动
                        <el-menu-item index="4" @click="gotoBin">
                            <i class="el-icon-delete"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>

                    </el-menu>
                </div>
            </el-aside>

            <el-container>
                <el-header class="app-header">
                    <el-menu default-active="activeIndex"
                             class="el-menu-demo tab-page"
                             router mode="horizontal"
                             @select="handleSelect">
                            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                                {{ item.navItem }}
                            </el-menu-item>


                    </el-menu>
                </el-header>

                <el-main class="app-body">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="操作人"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="文档名">
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
<!--                            <template slot-scope="scope">-->
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" @click="deleteHistory">删除记录</el-button>

<!--                            </template>-->
                        </el-table-column>
                    </el-table>

                    <template>
                        <router-view/>
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Recent',
        data() {
            return {
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                tableData: [{
                    date: '2016-05-02',
                    name: '我',
                    address: '测试文档一',
                    id:'1'
                }, {
                    date: '2016-05-04',
                    name: '我',
                    address: '测试文档二',
                    id:'2'
                }, {
                    date: '2016-05-01',
                    name: '我',
                    address: '测试文档三',
                    id:'3'
                }, {
                    date: '2016-05-03',
                    name: '我',
                    address: '测试文档四',
                    id:'4'
                }],
                navList:[
                    {name:'/Recent',navItem:'最近文件'},
                    {name:'/User',navItem:'我创建的文件'},
                ],
				formTeam:{			//2开始
					teamname : '',
					desc : ''
				},
				dialogFormVisible: false,
				formLabelWidth: '120px' 			//2结束
            }
        },
        methods: {
			createTeam: function(formdata){				//3开始
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
			},					//3结束
            toggleSideBar() {
                this.isCollapse = !this.isCollapse
            },
            logout: function () {
                this.$confirm('确认退出?', '提示', {})
                    .then(() => {
                        sessionStorage.removeItem('user');
                        this.$router.push('/login');
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
            gotoUser() {
                this.$router.push({
                    path: "/User"
                });
            },
            gotoDesktop() {
                this.$router.push({
                    path: "/Desktop"
                });
            },
            gotoBin() {
                this.$router.push({
                    path: "/Bin"
                });
            },
			gotoPatterns() {
				this.$router.push({
				path: "/Patterns"
				});
			},
            gotoCreateDoc() {
                this.$router.push({
                    path: "/CreateDoc"
                });
            }
		},
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }
        }
    }

</script>

<style>
</style>
