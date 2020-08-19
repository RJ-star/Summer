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
					<el-menu default-active=""
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
						<el-menu-item index="2" @click="gotoTeams">
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
					<el-menu default-active="2"
							class="el-menu-demo tab-page"
							router mode="horizontal"
							@select="handleSelect">
						<el-menu-item index="1" @click="gotoPatterns">模板库</el-menu-item>
						<el-menu-item index="2">当前模板</el-menu-item>
					</el-menu>
				</el-header>
			<el-main class="app-body">
				<div style="text-align: left;margin-bottom: 20px;">
					<font size="5">{{title}}</font>
				</div>
				<div id="editor"></div>
				<div style="text-align: right;">
					<el-button size="small" @click="toCreatetp">选择该模板</el-button>
				</div>
			</el-main>
		</el-container>
	</el-container>
	</div>
</template>

<script>
	import Editor from 'wangeditor'
	import 'wangeditor/release/wangEditor.min.css'
    export default {
        name: 'Detail',
        data() {
            return {
				editorContent: '',
				editor:'',
				title:'',
                username: '',
				drawer: false,
                isCollapse: false,
				formLabelWidth: '80px',
				dialogTableVisible: false,
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
			onEditorFocus(){
				event.enable(false);
			},
			gotoPatterns() {
				this.$router.push({
					path: "/user/patterns"
				});
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
			toCreatetp(){
				localStorage.clear();
				localStorage.setItem('text',this.editorContent);
				this.$router.push({path:'/user/createdoctp'})
			}
        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }
			this.editor = new Editor("#editor");
			this.editor.create();
			this.editor.$textElem.attr('contenteditable', false);
			this.title=localStorage.getItem('name');
			this.editorContent=localStorage.getItem('text');
			this.editor.txt.html(localStorage.getItem('text'));
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
