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
                                    <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided
                                          @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
<!--                <div class="app-side-logo">-->
<!--                    <img src="@/assets/logo.png"-->
<!--                         :width="isCollapse ? '60' : '60'"-->
<!--                         height="60" />-->
<!--                </div>-->
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
                        <el-menu-item index="1">
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
<!--                        <el-menu-item index="1">最近文件</el-menu-item>-->
<!--                        <el-menu-item index="2" @click="gotoUser">我创建的文件</el-menu-item>-->



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
                            style="width: 100%">
<!--                        <el-table-column-->
<!--                                prop="date"-->
<!--                                label="日期"-->
<!--                                width="180">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="name"-->
<!--                                label="操作人"-->
<!--                                width="180">-->
<!--                        </el-table-column>-->
                        <el-table-column
                                prop="address"
                                label="文档名">
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="browserDoc(scope.$index, scope.row)">查看</el-button>
                                <el-button type="text" size="small" @click="editDoc(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="favorite(scope.$index, scope.row)">收藏</el-button>
<!--                                <el-button type="text" size="small" @click="deleteHistory">删除记录</el-button>-->

                            </template>
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
    import axios from 'axios'
    export default {
        name: 'Container',
        data() {
            return {
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                tableData: [{
                    id:'',
                    address:'',
                }],
            // {
            //     address: '测试文档一',
            //         id:'1'
            // }, {
            //     address: '测试文档二',
            //         id:'2'
            // }, {
            //     address: '测试文档三',
            //         id:'3'
            // }, {
            //     address: '测试文档四',
            //         id:'777'
            // }
                navList:[
                    {name:'/Recent',navItem:'最近文件'},
                    {name:'/User',navItem:'我创建的文件'},
                    {name:'/Favorite',navItem:'我的收藏'}
                ],
                temp:{
                    id:'',
                    address:''
                }
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
            gotoCreateDoc() {
                this.$router.push({
                    path: "/CreateDoc"
                });
            },
            // deleteHistory() {
            //     axios.post('',{
            //         id:this.tableData.id,
            //         del:true,
            //     })
            //         // eslint-disable-next-line no-unused-vars
            //     .then(response => {
            //         this.$router.push({path: '/Recent'})
            //         window.location.reload()
            //         // if (response.data.status === 0) {
            //         //     this.$router.push({path: '/Recent'})
            //         //     window.location.reload()
            //         // } else {
            //         //     return false
            //         // }
            //     })
            // },
            favorite(index,row){
                console.log(row.id);
                axios.post('/apis/user/add_favorite',{
                    add_favorite:"add_favorite",
                    file_id:row.id
                })
                    .then(response=>{
                        if (response.data.status===1)
                            alert('收藏成功')
                        else if (response.data.status===0)
                            alert('你已经收藏了此文档')
                        else alert('收藏失败，请稍后再试')
                    })
            },
            browserDoc(index, row){
                console.log(index,row.id)
                axios.post('/apis/user/checkSpecificAuthority',{
                    checkSpecificAuthority:"checkSpecificAuthority",
                    file_id:row.id
                })
                .then(response=>{
                    if (response.data.status===0) {
                        if (response.data.read===0) {
                            console.log('Wrong')
                            this.$router.push({path: '/ops'})
                        }
                        else {
                            console.log('success')
                            axios.post('/apis/user/fileEditStatus',{
                                freeFile: "freeOrNot",
                                file_id:row.id
                            })
                            .then(re=>{
                                if (re.data.status===1) {
                                    console.log('Wrong')
                                    this.$router.push({path: '/ops'})
                                }
                                else {
                                    console.log('success')
                                    localStorage.setItem("searchParam", JSON.stringify(re.data));
                                }
                            })
                        }
                    }

                    if (response.data.status===1) {//验证通用权限
                        axios.post('/apis/user/checkGeneralAuthority',{
                            checkGerneralAuthority:"checkGerneralAuthority",
                            file_id:row.id
                        })
                        .then(res=>{
                            if (res.data.status===0) {
                                console.log('success')
                                axios.post('/apis/user/fileEditStatus',{
                                    freeFile: "freeOrNot",
                                    file_id:row.id
                                })
                                    .then(re=>{
                                        if (re.data.status===1) {
                                            console.log('Wrong')
                                            this.$router.push({path: '/ops'})
                                        }
                                        else {
                                            console.log('success')
                                            //jump
                                        }
                                    })
                            }
                            else {
                                console.log('Wrong')
                                this.$router.push({path: '/ops'})
                            }
                        })
                    }

                })
            },
            editDoc(index,row) {
                console.log(index,row.id)
                axios.post('/apis/user/checkSpecificAuthority',{
                    checkSpecificAuthority:"checkSpecificAuthority",
                    file_id:row.id
                })
                    .then(response=>{
                        if (response.data.status===0) {
                            if (response.data.write===0) {
                                console.log('Wrong')
                                this.$router.push({path: '/ops'})
                            }
                            else {
                                console.log('success')
                                axios.post('/apis/user/fileEditStatus',{
                                    freeFile: "freeOrNot",
                                    file_id:row.id
                                })
                                    .then(re=>{
                                        if (re.data.status===1) {
                                            console.log('Wrong')
                                            this.$router.push({path: '/ops'})
                                        }
                                        else {
                                            console.log('success')
                                            //jump
                                        }
                                    })
                            }
                        }

                        if (response.data.status===1) {//验证通用权限
                            axios.post('/apis/user/checkGeneralAuthority',{
                                checkGerneralAuthority:"checkGerneralAuthority",
                                file_id:row.id
                            })
                                .then(res=>{
                                    if (res.data.status===0) {
                                        console.log('success')
                                        axios.post('/apis/user/fileEditStatus',{
                                            freeFile: "freeOrNot",
                                            file_id:row.id
                                        })
                                            .then(re=>{
                                                if (re.data.status===1) {
                                                    console.log('Wrong')
                                                    this.$router.push({path: '/ops'})
                                                }
                                                else {
                                                    console.log('success')
                                                    //jump
                                                }
                                            })
                                    }
                                    else {
                                        console.log('Wrong')
                                        this.$router.push({path: '/ops'})
                                    }
                                })
                        }

                    })
            }
        },
        created(){
            axios.post('/apis/user/getstatus')
            .then(res=>{
                if (res.data.status===0) {
                    this.username=res.data.username
                    axios.post('/apis/user/recentBrowse',{
                        recent: "recent"
                    })
                        //then获取成功；response成功后的返回值（对象）
                        .then(response=>{
                            console.log(response);
                            this.tableData.pop();
                            let vlist = {{ response.data.fileNameSet|safe }} ;
                            // for (let i=0, len=response.data.fileNameSet.length;i<len;i++) {
                            //     this.temp.id=response.data.fileIdSet[i];
                            //     this.temp.address=response.data.fileNameSet[i];
                            //     this.tableData.push({id:this.temp.id,address:this.temp.address})
                            // }
                        })
                        //获取失败
                        .catch(error=>{
                            console.log(error);
                            alert('网络错误，请稍后尝试');
                        })
                }
                else {
                    this.$router.push({
                        path: "/login"
                    })
                    alert('请登录')
                }
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
</style>
