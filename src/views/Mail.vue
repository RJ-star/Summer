<template>
    <div class="Mail">
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
                        <el-dropdown-item @click.native="gotoMail" disabled>我的消息</el-dropdown-item>
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
                        <el-menu-item index="3" @click="gotoBin">
                            <i class="el-icon-delete"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>

                    </el-menu>
                </div>
            </el-aside>
            <el-container>
                <el-main class="mail-body">
                    <template>
                        <el-row :gutter="20">
                            <el-col :span="3" :offset="9"><div>
                                <el-badge :value="mailnum" :max="99" class="invation">
                                    <el-button type="primary" round disabled>邀请信息</el-button>
                                </el-badge>
                            </div></el-col>
                            <el-col :span="3" :offset="1"><div>
                                <el-badge :value="todomailnum" :max="99" class="invation">
                                    <el-button type="warning" round disabled>未读信息</el-button>
                                </el-badge>
                            </div></el-col>
                        </el-row>
                        <br><br>
                        <el-collapse v-model="activeName" accordion >
                            <el-collapse-item :key=item.mailID v-for="(item,index) in collapseData"
                                              style="border-right: none">
                                <template slot="title">
                                    <div>
                                        <el-button v-if="item.hasread===1" type="warning" round @click="read(index)">未读</el-button>
                                        <el-button v-else-if="item.hasread===0" type="success" round>已读</el-button>
                                    </div>
                                     &#12288;&#12288;{{item.teamname}}
                                </template>
                                我们诚心邀请您加入我们的团队，大家齐心协力，共同进步！
                                <br>
                                <el-button type="success" round @click="join(index,item.teamid)">确认加入</el-button>
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Mail",
        data() {
            return {
                username: '',
                isCollapse: false,
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                activeName: '1',
                mailnum:'0',
                todomailnum:'0',
                collapseData:[{
                    teamid:'',
                    teamname:'',
                    hasread:'',
                    mailID:''
                }],
                temp:{
                    teamid:'',
                    teamname:'',
                    hasread:'',
                    mailID:''
                }
            };
        },
        methods:{
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
            join(index,teamID){
                axios.post("/apis/user/getstatus").then(response => {
                    
                if (response.data.status !== 0) {
                    this.$router.push({
                        path: "/user/login"
                    })
                    alert('请登录')
                }
                else{
                    axios.post("/apis/user/hasRead",{hasread:'hasread',noti_id:this.collapseData[index].mailID}).then(response=>{
                    if(response.data.status===0){
                        console.log("12343412321")
                        this.todomailnum-=1;
                        this.collapseData[index].hasread=0;
                    }
                    else
                        console.log("error");
                    })
                }})
                this.$router.push({
                    path:"/congratulations",
                    query:{
                        teamID:teamID
                    }
                });
            },
            read(index){
                axios.post("/apis/user/getstatus").then(response => {
                if (response.data.status !== 0) {
                    this.$router.push({
                        path: "/user/login"
                    });
                    alert('请登录')
                }
                else{
                    axios.post("/apis/user/hasRead",{hasread:'hasread',noti_id:this.collapseData[index].mailID}).then(response=>{
                    if(response.data.status===0){
                        this.todomailnum-=1;
                        this.collapseData[index].hasread=0;
                    }
                    else
                        console.log("error");
                    })
                }})
            },
            initialization:function () {

            axios.post("/apis/user/getstatus").then(response => {
                if (response.data.status !== 0) {
                    this.$router.push({
                        path: "/user/login"
                    })
                    alert('请登录')
                }
                else{
                    axios.post("/apis/user/myNotifications",{mynotifications:'mynotifications'}).then(response=>{
                        if(response.data.status===0){
                            console.log(response)
                            this.collapseData.pop();
                            let len=response.data.noti_idSet.length;
                            this.todomailnum=0;
                            for(let i=0;i<len;i++){
                                this.temp.mailID=response.data.noti_idSet[i];
                                this.temp.teamid=response.data.post_infoSet[i];
                                this.temp.teamname=response.data.notification_textSet[i];
                                this.temp.hasread=response.data.is_newSet[i];
                                this.collapseData.push({mailID:this.temp.mailID,teamid:this.temp.teamid,teamname:this.temp.teamname,hasread:this.temp.hasread});
                                if(response.data.is_newSet[i]===1)
                                    this.todomailnum+=1;
                            }
                            this.mailnum=len;
                        }
                    })
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
        created() {
            this.initialization();
        }
    }
</script>

<style scoped>

</style>