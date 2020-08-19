<template>
    <div class="Bin">
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
                        <el-menu-item index="2" @click="gotoTeams">
                            <i class="el-icon-s-promotion"></i>
                            <span slot="title">团队空间</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="gotoBin" disabled>
                            <i class="el-icon-delete"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>

                    </el-menu>
                </div>
            </el-aside>

            <el-container>
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
                                    width="630">
                            </el-table-column>
                           <el-table-column
                                    label="打开查看"
                                    width="230">
                               <template slot-scope="scope">
                                   <el-button @click="handleClick(scope.$index)" type="text" size="small">查看</el-button>
                               </template>
                            </el-table-column>
                           <el-table-column
                                    label="彻底删除"
                                    width="230">
                               <template slot-scope="scope">
                                   <el-button  @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
                               </template>
                            </el-table-column>
                        </el-table>

                         <div style="margin-top: 20px" >
                             <el-button type="primary" round @click="deleteSections()">彻底删除所选文件</el-button>
                         </div>

                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<script>
    import axios from 'axios'
    export default {
        name: 'Bin',
        data() {
            return {
                //userID: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                tableData: [{
                    id:'',
                    name: ''
                }
                ],
                temp:{
                    id:'',
                    name:''
                },
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
            handleClick(row) {
                console.log(row);
                this.$router.push({
                    path:"/user/rubbish",
                    query:{
                        fileID:this.tableData[row].id
                    }
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
                    path: "/user/recent"
                });
            },
            gotoTeams() {
                this.$router.push({
                    path: "/user/Teams"
                });
            },
            deleteRow(index, rows) {
                  axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/user/login"
                        })
                        alert('请登录')
                    }
                    else{
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            axios.post("/apis/user/delete_file",{delete_file:'delete_file',file_id:this.tableData[index].id})
                                .then(response=>{
                                    if(response.data.status===0){
                                        rows.splice(index,1);
                                        console.log("delete successful!");
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    }
                                    else
                                        console.log("error");
                                });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    }
                }).catch(error=>{console.log(error);})

            },
            deleteSections(){
                  axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/user/login"
                        })
                        alert('请登录')
                    }
                    else{
                        if(this.multipleSelection===undefined||this.multipleSelection.length<=0) {
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
                                            if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就删除
                                                axios.post("/apis/user/delete_file",{delete_file:'delete_file',file_id:this.tableData[y].id})
                                                    .then(response=>{
                                                        if(response.data.status===0){
                                                            this.tableData.splice(y,1);
                                                            console.log("delete successful!");
                                                        }
                                                        else
                                                            console.log("error");
                                                    });
                                                //this.tableData.splice(y,1)
                                                // console.log("delete successful!")
                                            }
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
                        }
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            initialization:function(){
                //this.userID=this.$route.query.userID;
            axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/user/login"
                        });
                        alert('请登录')
                    }
                    else{
                        axios.post("/apis/user/recyclebin_file",{getrecyclebin_file:'getrecyclebin_file'}).then(response=>{
                            if(response.data.status===1){
                                this.tableData.pop();
                                let len=response.data.namelist.length;
                                for(let i=0;i<len;i++){
                                    this.temp.id=response.data.timelist[i];
                                    this.temp.name=response.data.namelist[i];
                                    this.tableData.push({id:this.temp.id,name:this.temp.name});
                                }
                            }
                            else return false;
                        });
                    }
                })
            }
        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }
        },
        created(){
            this.initialization();
        }
    }

</script>

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
