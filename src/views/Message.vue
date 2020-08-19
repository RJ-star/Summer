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
                    <!--          <div style="width: 60px; cursor: pointer;"-->
                    <!--               @click.prevent="toggleSideBar">-->
                    <!--            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>-->
                    <!--            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>-->
                    <!--          </div>-->
                    <!-- 我是样例菜单 -->

                    <el-menu default-active="activeIndex"
                             class="el-menu-demo tab-page"
                             router mode="horizontal"
                             @select="handleSelect"
                             >
                            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                                {{ item.navItem }}
                            </el-menu-item>
                    </el-menu>
                        <!--                        <el-submenu index="2">-->
                        <!--                            <template slot="title">我的工作台</template>-->
                        <!--                            <el-menu-item index="2-1">选项1</el-menu-item>-->
                        <!--                            <el-menu-item index="2-2">选项2</el-menu-item>-->
                        <!--                            <el-menu-item index="2-3">选项3</el-menu-item>-->
                        <!--                            <el-submenu index="2-4">-->
                        <!--                                <template slot="title">选项4</template>-->
                        <!--                                <el-menu-item index="2-4-1">选项1</el-menu-item>-->
                        <!--                                <el-menu-item index="2-4-2">选项2</el-menu-item>-->
                        <!--                                <el-menu-item index="2-4-3">选项3</el-menu-item>-->
                        <!--                            </el-submenu>-->
                        <!--                        </el-submenu>-->
                        <!--                        <el-menu-item index="3">消息中心</el-menu-item>-->
                        <!--                        <el-menu-item index="4">-->
                        <!--                            <a href="#">订单管理</a>-->
                        <!--                        </el-menu-item>-->


                        <!--            <el-col :span="12">-->
                        <!--&lt;!&ndash;              <div class="sub-title">circle</div>&ndash;&gt;-->
                        <!--              <div class="demo-basic&#45;&#45;circle">-->
                        <!--                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
                        <!--                <div class="block" v-for="size in sizeList" :key="size">-->
                        <!--                  <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
                        <!--                </div>-->

                        <!--              </div>-->
                        <!--            </el-col>-->



                    <!--          <div class="app-header-userinfo">-->
                    <!--            <el-dropdown trigger="hover"-->
                    <!--                         :hide-on-click="false">-->
                    <!--              <span class="el-dropdown-link">-->
                    <!--                {{ username }}-->
                    <!--                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
                    <!--                <div class="block" v-for="size in sizeList" :key="size">-->
                    <!--                  <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
                    <!--                </div>-->
                    <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                    <!--              </span>-->
                    <!--              <el-dropdown-menu slot="dropdown">-->
                    <!--                <el-dropdown-item>我的消息</el-dropdown-item>-->
                    <!--                <el-dropdown-item>设置</el-dropdown-item>-->
                    <!--                <el-dropdown-item divided-->
                    <!--                                  @click.native="logout">退出登录</el-dropdown-item>-->
                    <!--              </el-dropdown-menu>-->
                    <!--            </el-dropdown>-->
                    <!--          </div>-->
                </el-header>
                    <template>
                        <el-main class="app-body">
                          <div>
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                          </div>
                          <el-divider></el-divider>
                          <div :data="nickname">{{ '昵称：'+ nickname}}</div>
                          <el-divider></el-divider>
                          <div :data="mail">{{ '邮箱：'+ mail }}</div>
                        <router-view/>
                        </el-main>
                    </template>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Container',
        data() {
            return {
              navList:[
                    {name:'/Recent',navItem:'最近文件'},
                    {name:'/User',navItem:'我创建的文件'},
                    {name:'/Favorite',navItem:'我的收藏'}
                ],
              nickname:'',
              mail:'',
              editObj:{
                    date: '',
                    name: '',
                    address: '',
                    id:''
                },
                currentDate: new Date(),
                username: '',
                dialogVisible: false,
                radio1: '1',
                radio2: '1',
                radio3: '1',
                tmp:'',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                tableData: [
                    {
                        id: '',
                        name: '',
                    }
                ]
            }
        },
        methods: {
          getothers() {
             axios.post('/apis/user/getotherinfo',{
               getotherinfo:"getotherinfo",
               user_id:localStorage.getItem('user_id')
                    })
                    .then(response => {
                      this.nickname=response.data.name;
                      this.mail=response.data.mail;
                        console.log(response)
                    })
          },

    gotoBin() {
                this.$router.push({
                    path: "/user/Bin"
                });
            },
    gotoRecent() {
                this.$router.push({
                    path: "/user/Recent"
                });
            },
     gotoPatterns() {
				this.$router.push({
				path: "/user/Patterns"
				});
			},

    gotoTeams() {
                this.$router.push({
                    path: "/user/Teams"
                });
            },
            gotoCreateDoc() {
                this.$router.push({
                    path: "/user/CreateDoc"
                });
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`);
            },

            toggleSideBar() {
                this.isCollapse = !this.isCollapse
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
        },
        created(){
            axios.post('/apis/user/getotherinfo',{
               getotherinfo:"getotherinfo",
               user_email:localStorage.getItem('user_id')
                    })
                    .then(response => {
                        console.log("0000000")
                    console.log(localStorage.getItem('user_id'))
                      this.nickname=response.data.user_nickname;
                      this.mail=response.data.user_email;
                        console.log(response)
                    })
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .card{
        background-color: whitesmoke;
        margin : 10px 5px 10px 5px;
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
