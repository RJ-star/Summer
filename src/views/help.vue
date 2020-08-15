<template>
    <div class="app">
        <el-container>
            <el-aside class="app-side app-side-left"
                      :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
                <el-dropdown trigger="hover"
                             :hide-on-click="false">
              <span class="el-dropdown-link">
                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                <div class="block" v-for="size in sizeList" :key="size">
                  <el-avatar :size="size" :src="circleUrl"></el-avatar>
                </div>
                  <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{username}}</el-dropdown-item>
                        <el-dropdown-item divided>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided
                                          @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
                    <el-menu default-active="activeIndex"
                             class="el-menu-demo tab-page"
                             router mode="horizontal"
                             @select="handleSelect"
                             >
                            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                                {{ item.navItem }}
                            </el-menu-item>
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
                    <el-table
                            :data="tableData"
                            stripe
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
                                width="180">
                                                        <template slot-scope="scope">
                            <el-button type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button type="text" size="small">删除文档</el-button>
                            <el-button type="text" size="small" @click="share(scope.$index, scope.row)">分享</el-button>


                                                        </template>
                        </el-table-column>

                    </el-table>
                    <el-dialog
                            title="提示:将文档ID分享给他人即可分享文档"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleCloseDialog">
                        <span>设置文档权限：</span>
                        <el-radio v-model="radio" label="1">仅查看</el-radio>
                        <el-radio v-model="radio" label="2">可编辑</el-radio>
                        <br><br>
                        <span>文档名：{{tableData}}</span>
                        <br><br>
                        <span>文档ID：</span>
<!--                        <br><br>-->
                        <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
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
                sizeList:'',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                tableData: [{
                    date: '2016-05-02',
                    name: '我',
                    address: '测试文档一'
                }, {
                    date: '2016-05-04',
                    name: '我',
                    address: '测试文档二'
                }],
                navList:[
                    {name:'/Recent',navItem:'最近文件'},
                    {name:'/User',navItem:'我创建的文件'},
                ],
                dialogVisible: false,
                radio: '1'
            }
        },

        methods: {
            share: function(index, row){
                this.dialogVisible=true;
                console.log(index,row.name);
    },
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
            },
            handleCloseDialog(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
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
