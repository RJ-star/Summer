<template>
    <div class="bin">
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
                                    <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
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
                        <el-button round @click="gotoCreateDoc">新建文档</el-button>
                        <el-button type="primary" round>使用模板</el-button>
                        <el-menu-item index="1" @click="gotoRecent">
                            <i class="el-icon-s-platform"></i>
                            <span slot="title">工作台</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="gotoDesktop">
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
<!--                        <el-menu-item index="1">处理中心</el-menu-item>-->
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


<!--                        &lt;!&ndash;            <el-col :span="12">&ndash;&gt;-->
<!--                        &lt;!&ndash;&lt;!&ndash;              <div class="sub-title">circle</div>&ndash;&gt;&ndash;&gt;-->
<!--                        &lt;!&ndash;              <div class="demo-basic&#45;&#45;circle">&ndash;&gt;-->
<!--                        &lt;!&ndash;                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>&ndash;&gt;-->
<!--                        &lt;!&ndash;                <div class="block" v-for="size in sizeList" :key="size">&ndash;&gt;-->
<!--                        &lt;!&ndash;                  <el-avatar :size="size" :src="circleUrl"></el-avatar>&ndash;&gt;-->
<!--                        &lt;!&ndash;                </div>&ndash;&gt;-->

<!--                        &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                        &lt;!&ndash;            </el-col>&ndash;&gt;-->

<!--                        <el-dropdown trigger="hover"-->
<!--                                     :hide-on-click="false" >-->
<!--              <span class="el-dropdown-link">-->
<!--                {{ username }}-->
<!--                <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
<!--                <div class="block" v-for="size in sizeList" :key="size">-->
<!--                  <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--                </div>-->
<!--                  &lt;!&ndash;                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>&ndash;&gt;-->
<!--              </span>-->
<!--                            <el-dropdown-menu slot="dropdown">-->
<!--                                <el-dropdown-item>我的消息</el-dropdown-item>-->
<!--                                <el-dropdown-item>设置</el-dropdown-item>-->
<!--                                <el-dropdown-item divided-->
<!--                                                  @click.native="logout">退出登录</el-dropdown-item>-->
<!--                            </el-dropdown-menu>-->
<!--                        </el-dropdown>-->
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
                    <!--                <i class="el-icon-arrow-down el-icon--right"></i>-->
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

                <el-main class="bin-body">
                    <template>
                        <!--<router-view/>-->
                        <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-white">回收站</div></el-col>
                        </el-row>

                       <el-table
                                :data="tableData"
                                height="400"
                                border
                                style="width: 100%"
                                ref="multipleTable"
                                @selection-change="handleSelectionChange">
                             <el-table-column
                                     type="selection"
                                     width="60">
                             </el-table-column>
                           <el-table-column
                                    prop="name"
                                    label="文件"
                                    width="540">
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    label="删除时间"
                                    width="250">
                            </el-table-column>
                           <el-table-column
                                    fixed="right"
                                    label="打开查看"
                                    width="150">
                               <template slot-scope="scope">
                                   <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                               </template>
                            </el-table-column>
                           <el-table-column
                                    fixed="right"
                                    label="彻底删除"
                                    width="150">
                               <template slot-scope="scope">
                                   <el-button  @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
                               </template>
                            </el-table-column>
                        </el-table>

                         <div style="margin-top: 20px" >
                             <el-button type="danger" round @click="deleteSections()">彻底删除所选文件</el-button>
                         </div>

                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<script>
    export default {
        name: 'Bin',
        data() {
            return {
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                tableData: [{
                    name: '测试文件1',
                    date: '2020-08-08'
                }, {
                    name: '测试文件2',
                    date: '2020-08-09'
                }, {
                    name: '测试文件3',
                    date: '2020-08-10'
                }, {
                    name: '测试文件4',
                    date: '2020-08-11'
                }, {
                    name: '测试文件5',
                    date: '2020-08-12'
                }
                ],
                multipleSelection: []
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
            handleClick(row) {
                console.log(row);
                this.$router.push("Rubbish");
            },
            gotoDesktop() {
                this.$router.push({
                    path: "/Desktop"
                });
            },
            gotoRecent() {
                this.$router.push({
                    path: "/Recent"
                });
            },
            gotoCreateDoc() {
                this.$router.push({
                    path: "/CreateDoc"
                });
            },
            deleteRow(index, rows) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteSections(){
                if(this.multipleSelection==undefined||this.multipleSelection.length<=0) {
                    this.$alert('你还尚未选择任何内容', '提示', {
                        confirmButtonText: '确定'
                    });
                }
                else{
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let multData = this.multipleSelection;
                    let tableData =this.tableData;
                    let multDataLen = multData.length;
                    let tableDataLen = tableData.length;
                    for(let i = 0; i < multDataLen ;i++){
                        for(let y=0;y < tableDataLen;y++){
                            if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就删除
                                this.tableData.splice(y,1)
                                console.log("delete successful!")
                            }
                        }
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }},
            handleSelectionChange(val) {
                this.multipleSelection = val;
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

<!--
                let multData = this.multipleSelection;
                let tableData =this.tableData;
                let multDataLen = multData.length;
                let tableDataLen = tableData.length;
                for(let i = 0; i < multDataLen ;i++){
                    for(let y=0;y < tableDataLen;y++){
                        if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就删除
                            this.tableData.splice(y,1)
                            console.log("delete successful!")
                        }
                    }
                }
-->

<style>
    .el-row {
    margin-bottom: 20px;
  }
    .el-col {
    border-radius: 4px;
  }
    .bg-white {
    background: #ffffff;
  }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
