<template>
    <div class="app">
        <el-container>
            <el-aside class="app-side app-side-left"
                      :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
                <div class="app-side-logo">
                    <img src="@/assets/logo.png"
                         :width="isCollapse ? '60' : '60'"
                         height="60" />
                </div>
                <div>
                    <!-- 我是样例菜单 -->
                    <el-menu default-active="1-4-1"
                             class="el-menu-vertical-demo"
                             @open="handleOpen"
                             :collapse="isCollapse">
<!--                        <el-submenu index="1">-->
<!--                            <template slot="title">-->
<!--                                <i class="el-icon-document"></i>-->
<!--                                <span slot="title">工作台页面</span>-->
<!--                            </template>-->
<!--                            <el-menu-item-group>-->
<!--                                <span slot="title">分组一</span>-->
<!--                                <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                                <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                            </el-menu-item-group>-->
<!--                            <el-menu-item-group title="分组2">-->
<!--                                <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                            </el-menu-item-group>-->
<!--                            <el-submenu index="1-4">-->
<!--                                <span slot="title">选项4</span>-->
<!--                                <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                            </el-submenu>-->
<!--                        </el-submenu>-->
                        <el-menu-item index="1">
                            <i class="el-icon-s-platform"></i>
                            <span slot="title">工作台</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">我的桌面</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span slot="title">团队空间</span>
                        </el-menu-item>
                        <el-menu-item index="4">
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
                    <el-menu default-active="1"
                             class="el-menu-demo tab-page"
                             mode="horizontal"
                             @select="handleSelect"
                             active-text-color="#409EFF">
                        <el-menu-item index="1" @click="gotoRecent">最近文件</el-menu-item>
                        <el-menu-item index="2">我创建的文件</el-menu-item>
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

                        <el-dropdown trigger="hover"
                                     :hide-on-click="false" >
              <span class="el-dropdown-link">
                {{ username }}
                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                <div class="block" v-for="size in sizeList" :key="size">
                  <el-avatar :size="size" :src="circleUrl"></el-avatar>
                </div>
                  <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>我的消息</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item divided
                                                  @click.native="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu>

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

                <el-main class="app-body">
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
        name: 'Container',
        data() {
            return {
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
            gotoRecent() {
                this.$router.push({
                    path: "/Recent"
                });
            }
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
</style>
