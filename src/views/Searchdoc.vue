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
                    <el-menu default-active="activeIndex"
                             class="el-menu-demo tab-page"
                             router mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item @click="toteaminfo">
                            <span >团队简介<i class="el-icon-plus"></i></span>
                        </el-menu-item>
                        <el-menu-item>
                            <span @click="toteammember">团队成员<i class="el-icon-plus"></i></span>
                        </el-menu-item>
                        <el-menu-item>
                            <span @click="toteampage">团队文档<i class="el-icon-plus"></i></span>
                        </el-menu-item>
                        <el-menu-item @click="toCreateTeamDoc">
                            <span>新建团队文档<i class="el-icon-plus"></i></span>
                        </el-menu-item>
                        <el-menu-item>
                            <span>导入文档<i class="el-icon-plus"></i></span>
                        </el-menu-item>
                        <el-menu-item>
                            <span @click="invitationVisable=true">邀请他人<i class="el-icon-plus"></i></span>
                        </el-menu-item>
                        <el-menu-item>
                            <span @click="dismissTeam()">删除空间<i class="el-icon-delete"></i></span>
                        </el-menu-item>
                        <el-dialog
                                title="邀请他人"
                                :visible.sync="invitationVisable"
                                width="30%"
                                :before-close="handleCloseDialog">
                            <span>被邀请人邮箱:</span>
                            <input v-model="newMember"/>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="invitationVisable = false">取 消</el-button>
                                <el-button type="primary" @click="send_invitation(newMember)">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-menu>
                </el-header>
                <el-main>
                    <template>
                        <el-input
                                placeholder="请输入要搜索的文件id"
                                v-model="input">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <br>
                        <el-button type="success" round @click="search(input)">搜索该文件</el-button>
                        <br>
                        <el-alert
                                title="文件id错误"
                                type="error"
                                description="请重新输入！"
                                :closable="false"
                                center
                                v-if="this.show===2"
                                show-icon>
                        </el-alert>
                        <el-card class="box-card" v-if="this.show===1">
                            <div class="text item">
                                {{'文件id：'+this.file_id }}
                                <br>
                                {{'文件名称：'+this.file_name}}
                                <br>
                                {{'文件创建者：'+this.file_founder}}
                                <br>
                                {{'文件创建时间：'+this.file_found_time}}
                                <br>
                                {{'文件上次修改时间：'+this.file_lastModifiedTime}}
                                <br>
                                <el-button type="warning" round @click="add()">确认添加</el-button>
                            </div>
                        </el-card>
                        <el-alert
                                title="添加成功！"
                                type="success"
                                description="请进入团队文档页面查看"
                                :closable="false"
                                center
                                v-if="this.show===3"
                                show-icon>
                        </el-alert>
                        <el-alert
                                title="不能重复添加文件！"
                                type="error"
                                description="请重新输入文件id"
                                :closable="false"
                                center
                                v-if="this.show===4"
                                show-icon>
                        </el-alert>
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Recent',
        data() {
            return {
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                invitationVisable: false,
                userid: '',
                newMember: '',
                input:'',
                show:0,  //0不展示，1成功，2失败,3成功添加，4重复
                file_id:'',
                file_name: '',
                file_founder:'',
                file_found_time:'',
                file_lastModifiedTime:''
            }
        },
        methods:{
            add(){
                let fileid=this.file_id;
                console.log(fileid);
                axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/login"
                        });
                        alert('请登录')
                    }
                    else{
                        axios.post("/apis/user/addFileToTeam",{addFileToTeam:'addFileToTeam',file_id:fileid,team_id:localStorage.getItem('team_id')}).then(response=>{
                            if(response.data.status===0)
                                this.show=3;
                            else if(response.data.status===1)
                                this.show=4;
                        })
                    }
                })
            },
            search(id){
                axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/login"
                        });
                        alert('请登录')
                    }
                    else{
                        axios.post("/apis/user/file",{getFile:'getFile',file_id:id}).then(response=>{
                            if(response.data.status===0){
                                this.show=1;
                                this.file_id=response.data.file_id;
                                this.file_name=response.data.file_name;
                                this.file_founder=response.data.file_founder;
                                this.file_found_time=response.data.file_found_time;
                                this.file_lastModifiedTime=response.data.file_lastModifiedTime;
                            }
                            else if(response.status===1){
                                this.show=2;
                            }
                        })
                    }
                })
            },
            send_invitation(mail) {
                axios.post('/apis/user/send_invitation', {
                    sendInvitation: 'sendInvitation',
                    user_email: mail
                })
                    .then(response => {
                        console.log(response);
                        switch (response.data.status) {
                            case 0:
                                this.$message(response.data.message);
                                break;
                                case 1:
                                    this.$message({
                                        message: response.data.message,
                                        type: 'success'
                                    });
                                    break;
                                    case 2:
                                        this.$message({
                                            message: response.data.message,
                                            type: 'warning'
                                        });
                                        break;
                                        case 3:
                                            case 4:
                                                this.$message.error(response.data.message);
                                                break;
                        }
                    })
                this.invitationVisable = false;
                },
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
                    path: "/user/Recent"
                });
            },
            gotoTeams() {
                this.$router.push({
                    path: "/user/Teams"
                });
            },
            toteaminfo(){
                localStorage.setItem('team_id', localStorage.getItem('team_id'));
                this.$router.push({
                    path: "/user/teaminfo"
                });
            },
            toteammember(){
                localStorage.setItem('team_id', localStorage.getItem('team_id'));
                this.$router.push({
                    path: "/user/teammember"
                });
                },
            toteampage(){
                localStorage.setItem('team_id', localStorage.getItem('team_id'));
                this.$router.push({
                    path: "/user/teampage"
                });
                },
            toCreateTeamDoc(){
                localStorage.setItem('team_id', localStorage.getItem('team_id'));
                this.$router.push({
                    path: "/user/CreateTeamDoc"
                });
            },
            toSearchDoc(){
                localStorage.setItem('team_id', localStorage.getItem('team_id'));
                this.$router.push({
                    path: "/user/Searchdoc"
                });
            },
            dismissTeam() {
      axios.post('/apis/user/dismissTeam', {
        dismissteam: "dismissteam",
        team_id: localStorage.getItem('team_id')
      })
          .then(response => {
            console.log(localStorage.getItem('team_id'))
            switch (response.data.status) {
              case 0:
                this.$message({
                  message: response.data.message,
                  type: 'success'
                });
                this.$router.push({path: '/user/teams'})
                break;
              case 1:
                this.$message({
                  message: response.data.message,
                  type: 'warning'
                });
                break;
              case 2:
              case 3:
                this.$message.error(response.data.message)
                break;
            }
          })},
            handleCloseDialog(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {

                    });
                },

        },
        mounted: function () {
            let user = sessionStorage.getItem('user');
            if (user) {
                this.username = user;
            }
        }
    }
</script>

<style scoped>
    .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>