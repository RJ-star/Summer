<template>
    <div class="app">
        <el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown trigger="hover"
					:hide-on-click="false" >
					<span class="el-dropdown-link">
						{{ username }}
						<div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
						<div class="block" v-for="size in sizeList" :key="size">
							<el-avatar :size="size" :src="circleUrl"></el-avatar>
						</div>
						<!--		<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided
							@click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
            <el-aside  width="200px" style="background-color: rgb(238, 241, 246)"> 
                <div>
                    <el-menu
                        default-active="4"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
						<el-menu-item index="1">处理中心</el-menu-item>
						<el-menu-item index="2">工作台</el-menu-item>
						<el-menu-item index="3">消息中心</el-menu-item>
						<el-submenu index="4">
							<template slot="title">团队空间</template>
							<a href="#">添加新的队伍</a>
							<el-menu-item index="4-1">上海龙之队</el-menu-item>
							<el-menu-item index="4-2">杭州闪电队</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="5">回收站</el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
			<el-main class="app-body">
				<div style="text-align: left;">模板库<br></div>
				<el-row :gutter="20">
					<el-col :span="6" v-for="item in items" :key="item.id">
						<div class="grid-content bg-purple">
							<el-card class="card" shadow="hover">
								<img class="image" :src="patternUrl">
								<div>
									<span>{{item.name}}</span>
									<div class="bottom clearfix">
										<time class="time">{{ item.time }}</time>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
				</el-row>
			</el-main>
			</el-container>
		</el-container>
    </div>
</template>

<script>
    export default {
        name: 'Patterns',
        data() {
            return {
				currentDate: new Date(),
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
				patternUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
                items: [
                    {
                        id: '1',
                        name: 'word',
                        time: '2018-11-11'
                    }, {
                        id: '2',
                        name: 'excel',
                        time: '2018-11-11'
                    }, {
                        id: '3',
                        name: 'powerpoint',
                        time: '2018-11-11'
                    }, {
                        id: '3',
                        name: 'powerpoint',
                        time: '2018-11-11'
                    }, {
                        id: '3',
                        name: 'powerpoint',
                        time: '2018-11-11'
                    }
                ]
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
        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
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
</style>
