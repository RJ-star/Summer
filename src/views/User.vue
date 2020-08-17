<template>
    <div class="app">
        <el-container>
            <el-aside class="app-side app-side-left"
                      :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
                <el-dropdown
                        trigger="hover"
                        :hide-on-click="false" >
                                <span class="el-dropdown-link">

                                    <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                                    <div class="block" v-for="size in sizeList" :key="size">
                                       <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </div>
                                    <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>{{username}}</el-dropdown-item>
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
                            <i class="el-icon-delete" ></i>
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
                                width="180">
                            <template slot-scope="scope">
<!--                                <el-button type="text" size="small">查看</el-button>-->
                                <el-button type="text" size="small" @click="editDoc(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="deleteDoc(scope.$index, scope.row)">删除文档</el-button>
                                <el-button type="text" size="small" @click="share(scope.$index, scope.row)">分享</el-button>
                                <el-button type="text" size="small" @click="favorite(scope.$index, scope.row)">收藏</el-button>
                            </template>
                        </el-table-column>

                    </el-table>

                    <el-dialog
                            title="提示:将文档ID分享给他人"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleCloseDialog">
                        <span>设置文档权限（默认开启查看权限）：</span>
                        <br><br>
                        <span>编辑权限</span>
                        <el-radio v-model="radio1" label="1">有</el-radio>
                        <el-radio v-model="radio1" label="0">无</el-radio>
                        <br><br>
                        <span>分享权限</span>
                        <el-radio v-model="radio2" label="1">有</el-radio>
                        <el-radio v-model="radio2" label="0">无</el-radio>
                        <br><br>
                        <span>评论权限</span>
                        <el-radio v-model="radio3" label="1">有</el-radio>
                        <el-radio v-model="radio3" label="0">无</el-radio>
<!--                        <el-radio v-model="radio" label="1">仅查看</el-radio>-->
<!--                        <el-radio v-model="radio" label="2">可编辑</el-radio>-->
                        <br><br>
                        文档名：
                        <el-input v-model="editObj.address" :disabled="true"></el-input>
                        <br><br>
                        文档ID：
                        <el-input v-model="editObj.id" :disabled="true"></el-input>
<!--                        <br><br>-->
                        <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false, checkShare(editObj.id)">确 定</el-button>
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
                    address:''
                }],
                temp:{
                  id:'',
                  address:''
                },
            // {
            //     address: '测试文档一',
            //         id:'6'
            // }, {
            //     address: '测试文档二',
            //         id:'7'
            // }
                navList:[
                    {name:'/Recent',navItem:'最近文件'},
                    {name:'/User',navItem:'我创建的文件'},
                    {name:'/Favorite',navItem:'我的收藏'}
                ],
                editObj:{
                    date: '',
                    name: '',
                    address: '',
                    id:''
                },
                dialogVisible: false,
                radio1: '1',
                radio2: '1',
                radio3: '1',
                tmp:''
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
            gotoRecent() {
                this.$router.push({
                    path: "/user/Recent"
                });
            },
            gotoDesktop() {
                this.$router.push({
                    path: "/user/Desktop"
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
            share(index, row){
                this.dialogVisible=true;
                console.log(row.id);
                this.listIndex=index;
                this.editObj=row

            },
            checkShare(id){
                console.log(id);
                console.log(this.radio1,this.radio2,this.radio3)
                axios.post('/apis/user/shareFile',{
                    shareFile: "shareFile",
                    file_id:id
                })
                .then(response=>{
                    if (response.data.status===0) {
                        axios.post('/apis/user/setGeneralAuthority',{
                            setGenAuthor: "setGenAuthor",
                            file_id:id,
                            read_file:1,
                            write_file:this.radio1,
                            share_file:this.radio2,
                            review_file:this.radio3
                        })
                    }
                    else {
                        console('Wrong')
                        alert('分享失败')
                    }
                })
            },
            deleteDoc(index,row) {
                console.log(row.id)
                axios.post('/apis/user/moveto_recyclebin',{
                    delete_file: "delete_file",
                    file_id:row.id,
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(response => {
                        if (response.data.status===0) {
                            alert('删除成功')
                            this.$router.push({path: '/user/User'})
                            window.location.reload()
                        }
                        else
                            alert('删除失败，请稍后再试')
                        // if (response.data.status === 0) {
                        //     this.$router.push({path: '/Recent'})
                        //     window.location.reload()
                        // } else {
                        //     return false
                        // }
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
                                console.log('Wrong response')
                                this.$router.push({path: '/user/ops'})
                            }
                            else {
                                console.log('success')
                                axios.post('/apis/user/fileEditStatus',{
                                    freeFile: "freeOrNot",
                                    file_id:row.id
                                })
                                    .then(re=>{
                                        if (re.data.status===1) {
                                            console.log('Wrong 123')
                                            this.$router.push({path: '/user/ops'})
                                        }
                                        else {
                                            console.log('success')
                                            //jump
                                            localStorage.setItem('file_id',re.data.file_id)
                                            axios.post('/apis/user/applyEditFile',{
                                                editFile:"editFile",
                                                file_id:localStorage.getItem('file_id')
                                            })
                                                //then获取成功；response成功后的返回值（对象）
                                                .then(response=>{
                                                    console.log(response);
                                                    this.tmp=response.data.file_text;
                                                })
                                                //获取失败
                                                .catch(error=>{
                                                    console.log(error);
                                                    alert('网络错误，请稍后尝试');
                                                })
                                            localStorage.setItem('text',this.tmp)
                                            axios.post('/apis/user/postModifiedFile',{
                                                browseFile:'browseFile',
                                                file_id:localStorage.getItem('file_id')
                                            })
                                            this.$router.push({path:'/user/edit'})
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
                                                    this.$router.push({path: '/user/ops'})
                                                }
                                                else {
                                                    console.log('success 123')
                                                    //jump

                                                    localStorage.setItem('file_id',re.data.file_id)
                                                    axios.post('/apis/user/applyEditFile',{
                                                        editFile:"editFile",
                                                        file_id:localStorage.getItem('file_id')
                                                    })
                                                        //then获取成功；response成功后的返回值（对象）
                                                        .then(response=>{
                                                            console.log(response);
                                                            this.tmp=response.data.file_text;
                                                        })
                                                        //获取失败
                                                        .catch(error=>{
                                                            console.log(error);
                                                            alert('网络错误，请稍后尝试');
                                                        })
                                                    localStorage.setItem('text',this.tmp)
                                                    axios.post('/apis/user/postModifiedFile',{
                                                        browseFile:'browseFile',
                                                        file_id:localStorage.getItem('file_id')
                                                    })
                                                    this.$router.push({path:'/user/edit'})
                                                }
                                            })
                                    }
                                    else {
                                        console.log('Wrong')
                                        this.$router.push({path: '/user/ops'})
                                    }
                                })
                        }

                    })
            },
            handleCloseDialog(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        created(){
            axios.post('/apis/user/getstatus')
                .then(res=>{
                    if (res.data.status===0) {
                        this.username=res.data.username
                        axios.post('/apis/user/myFile',{
                            myfile: "myfile"
                        })
                            //then获取成功；response成功后的返回值（对象）
                            .then(response=>{
                                console.log(response);
                                this.tableData.pop();
                                for (let i=0, len=response.data.fileNameSet.length;i<len;i++) {
                                    this.temp.id=response.data.fileIdSet[i];
                                    this.temp.address=response.data.fileNameSet[i];
                                    this.tableData.push({id:this.temp.id,address:this.temp.address})
                                }
                            })
                            //获取失败
                            .catch(error=>{
                                console.log(error);
                                alert('网络错误，请稍后尝试');
                            })
                    }
                    else {
                        this.$router.push({
                            path: "/user/login"
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
