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
            <el-menu-item>
              <span >团队简介<i class="el-icon-mouse"></i></span>
            </el-menu-item>
            <el-menu-item @click="toteammember">
              <span>团队成员<i class="el-icon-user"></i></span>
            </el-menu-item>
            <el-menu-item @click="toteampage">
              <span>团队文档<i class="el-icon-plus"></i></span>
            </el-menu-item>
              <el-menu-item @click="toCreateTeamDoc">
                  <span>新建团队文档<i class="el-icon-plus"></i></span>
              </el-menu-item>
              <el-menu-item @click="toSearchDoc">
                  <span>导入文档<i class="el-icon-plus"></i></span>
              </el-menu-item>
            <el-menu-item @click="invitationVisable=true">
              <span>邀请他人<i class="el-icon-document-copy"></i></span>
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
            <el-form ref="form" :model="teaminfo" label-width="80px">
              <el-form-item label="名称:">
                <span>{{teaminfo.name}}</span>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item label="管理员:">
                <span>{{teaminfo.manager}}</span>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item label="简介:">
                <span>{{teaminfo.description}}</span>
              </el-form-item>
            </el-form>
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
      teaminfo:{
        description:'',
        name:'',
        manager:'',
        id:''
      },
      document_id:'',
      sizeList: '',
      gridData: [{
        name: '',
        mail: '',
        editright:true,
        shareright:false,
        reviewright:true,
        readright:false
      }],
      member: [
        {
          id: '',
        }
      ],
      newMember: '',
      settingVisable: false,
      invitationVisable: false,
      userid: '',
      username: '',
      editObj: {
        date: '',
        name: '',
        address: '',
        id: ''
      },
      isCollapse: false,
      dialogVisible: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      radio1: '1',
      radio2: '1',
      radio3: '1',
      formTeam: {			//2开始
        teamname: '',
        desc: ''
      },
      dialogFormVisible: false,
      dialogRightVisible: false,
      formLabelWidth: '120px' 			//2结束
    }
  },
  created() {
      console.log("9878567898")
      console.log(localStorage.getItem('team_id'))
      axios.post('/apis/user/getTeamInformation',{
        team:"team",
        team_id:localStorage.getItem('team_id')
      })
      .then(response => {
        switch(response.data.status)
        {
          case 0:
            this.teaminfo.description=response.data.team_description;
            this.teaminfo.name=response.data.team_name;
            this.teaminfo.id=response.data.team_id;
            this.teaminfo.manager=response.data.team_manager;
            break;
          case 1:
            this.$message({
              message:'response.data.message',
              type:'warning'
            })
            break;
          case 2:
          case 3:
            this.$message.error(response.data.message);
            break;
        }
      })
    },
  methods: {
    gotoTeams() {
                this.$router.push({
                    path: "/user/Teams"
                });
            },
    gotoRecent() {
                this.$router.push({
                    path: "/user/Recent"
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
    submitchange(){
      this.settingVisable = false;
          for(let i=0,len=this.gridData.length;i<len;i++)
          {
            axios.post('apis/user/setSpecificAuthority',{
              checkSpecificAuthority:'setSpeAuthor',
              file_id:this.document_id,
              read_file:this.gridData[i].readright,
              write_file:this.gridData[i].editright,
              share_file:this.gridData[i].shareright,
              review_file:this.gridData[i].reviewright,
            })
            .then(response1 => {
              switch (response1.data.status) {
              case 0:
                this.$message({
                  message: response1.data.message,
                  type: 'success'
                });
                break;
              case 1:
              case 2:
              case 5:
                this.$message({
                  message: response1.data.message,
                  type: 'warning'
                });
                break;
              case 3:
              case 4:
                this.$message.error(response1.data.message)
                break;
            }
            })
            axios.post('apis/user/setGeneralAuthority',{
              checkGerneralAuthority:'setGenAuthor',
              file_id:this.document_id,
              read_file:this.gridData[i].readright,
              write_file:this.gridData[i].editright,
              share_file:this.gridData[i].shareright,
              review_file:this.gridData[i].reviewright,
            })
                .then(response2 => {
                  switch (response2.data.status) {
              case 0:
                this.$message({
                  message: response2.data.message,
                  type: 'success'
                });
                break;
              case 1:
                this.$message(response2.data.message);
                break;
              case 2:
                this.$message({
                  message: response2.data.message,
                  type: 'warning'
                });
                break;
              case 3:
              case 4:
                this.$message.error(response2.data.message)
                break;
            }
                })
          }
      this.document_id='';
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
          })
    },
    setting(index,row) {
      this.settingVisable = true;
      axios.post('/apis/user/showteammembers',{
        showteam:'showteam',
        team_id:localStorage.getItem('team_id')
      })
      .then(response => {
        console.log(response.data)
        if(response.data.status==0)
        {
          for(let i=0,len=response.data.fileNameSet.length();i<len;i++)
          {
            this.gridData.name=response.data.retTeamMemName[i];
            this.gridData.mail=response.data.retTeamMemEmail[i];
          }
          for(let i=0,len=response.data.fileNameSet.length();i<len;i++)
          {
            axios.post('/apis/user/checkSpecificAuthority',{
              checkSpecificAuthority:'checkSpecificAuthority',
              file_id:row.id
            })
            .then(response1 => {
              switch (response1.data.status) {
              case 0:
                this.gridData[i].readright= response1.data.speAuthority.read_file;
                this.gridData[i].editright= response1.data.speAuthority.write_file;
                this.gridData[i].shareright= response1.data.speAuthority.share_file;
                this.gridData[i].reviewright= response1.data.speAuthority.review_file;
                break;
              case 1:
              case 2:
                this.$message({
                  message: response.data.message,
                  type: 'warning'
                });
                break;
              case 3:
              case 4:
                this.$message.error(response.data.message)
                break;
            }
            })
            axios.post('/apis/user/checkGeneralAuthority',{
              checkGerneralAuthority:'checkGerneralAuthority',
              file_id:row.id
            })
                .then(response2 => {
                  switch (response2.data.status) {
              case 0:
                this.gridData[i].readright= response2.data.speAuthority.read_file;
                this.gridData[i].editright= response2.data.speAuthority.write_file;
                this.gridData[i].shareright= response2.data.speAuthority.share_file;
                this.gridData[i].reviewright= response2.data.speAuthority.review_file;
                break;
              case 1:
                this.$message({
                  message: response2.data.message,
                  type: 'warning'
                });
                break;
              case 2:
              case 3:
                this.$message.error(response2.data.message)
                break;
            }
                })
          }
        }
          else
            this.$message.error(response.data.message)
      })
          .catch(error=>{
            console.log("111111")
                                console.log(error);
                                alert('网络错误，请稍后尝试');
                            })
      this.document_id=row.id;
    },
    browserDoc(index, row) {
      console.log(index, row.id)
      axios.post('/apis/user/checkSpecificAuthority', {
        checkSpecificAuthority: "checkSpecificAuthority",
        file_id: row.id
      })
          .then(response => {
            if (response.data.status === 0) {
              if (response.data.read === 0) {
                console.log('Wrong')
                this.$router.push({path: '/user/ops'})
              } else {
                console.log('success')
                axios.post('/apis/user/fileEditStatus', {
                  freeFile: "freeOrNot",
                  file_id: row.id
                })
                    .then(re => {
                      if (re.data.status === 1) {
                        console.log('Wrong')
                        this.$router.push({path: '/user/ops'})
                      } else {
                        console.log('success')
                        localStorage.setItem('file_id', re.data.file_id);
                        axios.post('/apis/user/applyEditFile', {
                          editFile: "editFile",
                          file_id: localStorage.getItem('file_id')
                        })
                            //then获取成功；response成功后的返回值（对象）
                            .then(response => {
                              console.log(response);
                              this.tmp = response.data.file_text;
                            })
                            //获取失败
                            .catch(error => {
                              console.log(error);
                              alert('网络错误，请稍后尝试');
                            })
                        localStorage.setItem('text', this.tmp)
                        axios.post('/apis/user/postModifiedFile', {
                          browseFile: 'browseFile',
                          file_id: localStorage.getItem('file_id')
                        })
                        this.$router.push({path: '/user/browser'})
                      }
                    })
              }
            }

            if (response.data.status === 1) {//验证通用权限
              axios.post('/apis/user/checkGeneralAuthority', {
                checkGerneralAuthority: "checkGerneralAuthority",
                file_id: row.id
              })
                  .then(res => {
                    if (res.data.status === 0) {
                      console.log('success')
                      axios.post('/apis/user/fileEditStatus', {
                        freeFile: "freeOrNot",
                        file_id: row.id
                      })
                          .then(re => {
                            if (re.data.status === 1) {
                              console.log('Wrong')
                              this.$router.push({path: '/user/ops'})
                            } else {
                              console.log('success')
                              localStorage.setItem('file_id', re.data.file_id)
                              axios.post('/apis/user/applyEditFile', {
                                editFile: "editFile",
                                file_id: localStorage.getItem('file_id')
                              })
                                  //then获取成功；response成功后的返回值（对象）
                                  .then(response => {
                                    console.log(response);
                                    this.tmp = response.data.file_text;
                                  })
                                  //获取失败
                                  .catch(error => {
                                    console.log(error);
                                    alert('网络错误，请稍后尝试');
                                  })
                              localStorage.setItem('text', this.tmp)
                              axios.post('/apis/user/postModifiedFile', {
                                browseFile: 'browseFile',
                                file_id: localStorage.getItem('file_id')
                              })
                              this.$router.push({path: '/user/browser'})
                            }
                          })
                    } else {
                      console.log('Wrong')
                      this.$router.push({path: '/user/ops'})
                    }
                  })
            }

          })
    },
    gotoCreateDoc() {
                this.$router.push({
                    path: "/user/CreateDoc"
                });
            },
    favorite(index, row) {
      console.log(row.id);
      axios.post('/apis/user/add_favorite', {
        add_favorite: "add_favorite",
        file_id: row.id
      })
          .then(response => {
            if (response.data.status === 1)
              alert('收藏成功')
            else if (response.data.status === 0)
              alert('你已经收藏了此文档')
            else alert('收藏失败，请稍后再试')
          })
    },
    share(index, row) {
      this.dialogVisible = true;
      console.log(row.id);
      this.listIndex = index;
      this.editObj = row
    },
    checkShare(id) {
      console.log(id);
      console.log(this.radio1, this.radio2, this.radio3)
      axios.post('/apis/user/shareFile', {
        shareFile: "shareFile",
        file_id: id
      })
          .then(response => {
            if (response.data.status === 0) {
              axios.post('/apis/user/setGeneralAuthority', {
                setGenAuthor: "setGenAuthor",
                file_id: id,
                read_file: 1,
                write_file: this.radio1,
                share_file: this.radio2,
                review_file: this.radio3
              })
            } else {
              console('Wrong')
              alert('分享失败')
            }
          })
    },
    // created() {
    //   console.log(localStorage.getItem('234324234'))
    //   console.log(localStorage.getItem('team_id'))
    //   axios.post('/apis/user/getTeamInformation',{
    //     team:"team",
    //     team_id:localStorage.getItem('team_id')
    //   })
    //   .then(response => {
    //     switch(response.data.status)
    //     {
    //       case 0:
    //         this.teaminfo.description=response.data.team_description;
    //         this.teaminfo.name=response.data.team_name;
    //         this.teaminfo.id=response.data.team_id;
    //         this.teaminfo.manager=response.data.team_manager;
    //         break;
    //       case 1:
    //         this.$message({
    //           message:'response.data.message',
    //           type:'warning'
    //         })
    //         break;
    //       case 2:
    //       case 3:
    //         this.$message.error(response.data.message);
    //         break;
    //     }
    //   })
    // },
    deleteDoc(index, row) {
      console.log(row.id)
      axios.post('/apis/user/moveto_recyclebin', {
        delete_file: "delete_file",
        file_id: row.id,
      })
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            if (response.data.status === 0) {
              alert('删除成功')
              this.$router.push({path: '/user/User'})
              window.location.reload()
            } else
              alert('删除失败，请稍后再试')
            // if (response.data.status === 0) {
            //     this.$router.push({path: '/Recent'})
            //     window.location.reload()
            // } else {
            //     return false
            // }
          })
    },
    editDoc(index, row) {
      console.log(index, row.id)
      axios.post('/apis/user/checkSpecificAuthority', {
        checkSpecificAuthority: "checkSpecificAuthority",
        file_id: row.id
      })
          .then(response => {
            if (response.data.status === 0) {
              if (response.data.write === 0) {
                console.log('Wrong response')
                this.$router.push({path: '/user/ops'})
              } else {
                console.log('success')
                axios.post('/apis/user/fileEditStatus', {
                  freeFile: "freeOrNot",
                  file_id: row.id
                })
                    .then(re => {
                      if (re.data.status === 1) {
                        console.log('Wrong 123')
                        this.$router.push({path: '/user/ops'})
                      } else {
                        console.log('success')
                        //jump
                        localStorage.setItem('file_id', re.data.file_id)
                        axios.post('/apis/user/applyEditFile', {
                          editFile: "editFile",
                          file_id: localStorage.getItem('file_id')
                        })
                            //then获取成功；response成功后的返回值（对象）
                            .then(response => {
                              console.log(response);
                              this.tmp = response.data.file_text;
                            })
                            //获取失败
                            .catch(error => {
                              console.log(error);
                              alert('网络错误，请稍后尝试');
                            })
                        localStorage.setItem('text', this.tmp)
                        axios.post('/apis/user/postModifiedFile', {
                          browseFile: 'browseFile',
                          file_id: localStorage.getItem('file_id')
                        })
                        this.$router.push({path: '/user/edit'})
                      }
                    })
              }
            }

            if (response.data.status === 1) {//验证通用权限
              axios.post('/apis/user/checkGeneralAuthority', {
                checkGerneralAuthority: "checkGerneralAuthority",
                file_id: row.id
              })
                  .then(res => {
                    if (res.data.status === 0) {
                      console.log('success')
                      axios.post('/apis/user/fileEditStatus', {
                        freeFile: "freeOrNot",
                        file_id: row.id
                      })
                          .then(re => {
                            if (re.data.status === 1) {
                              console.log('Wrong')
                              this.$router.push({path: '/user/ops'})
                            } else {
                              console.log('success 123')
                              //jump

                              localStorage.setItem('file_id', re.data.file_id)
                              axios.post('/apis/user/applyEditFile', {
                                editFile: "editFile",
                                file_id: localStorage.getItem('file_id')
                              })
                                  //then获取成功；response成功后的返回值（对象）
                                  .then(response => {
                                    console.log(response);
                                    this.tmp = response.data.file_text;
                                  })
                                  //获取失败
                                  .catch(error => {
                                    console.log(error);
                                    alert('网络错误，请稍后尝试');
                                  })
                              localStorage.setItem('text', this.tmp)
                              axios.post('/apis/user/postModifiedFile', {
                                browseFile: 'browseFile',
                                file_id: localStorage.getItem('file_id')
                              })
                              this.$router.push({path: '/user/edit'})
                            }
                          })
                    } else {
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
          .catch(() => {
          });
    },
    createTeam: function (formdata) {				//3开始
      // this.$axios.post('/apis/user/getstatus')
      // .then(res=>{
      // 	if (res.data.status===0) {
      this.$refs[formdata].validate((valid) => {
        if (valid) {
          const h = this.$createElement;
          if (this.formTeam.teamname == '') {
            this.$notify({
              title: '团队名不能为空！',
              message: h('i', {style: 'color: teal'}, '请再次输入'),
              type: 'warning'
            });
          } else {
            this.$notify({
              title: '团队创建成功！',
              message: h('i', {style: 'color: teal'}, '请再次输入'),
              type: 'success'
            });
            this.$axios.post('/apis/user/create_team', {
              create: "create",
              team_name: this.formTeam.teamname,
              team_description: this.formTeam.desc
            })
                .then(response => {
                  if (response.data.status === 0) {
                    window.location.reload()
                  } else {
                    return false
                  }
                })
          }
        } else {
          return false;
        }
      })
      // }
      // else{
      // 	this.$router.push({
      // 		path: "/login"
      // 	})
      // 		alert('请登录')
      // }
      // })
    },					//3结束
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
            this.$router.push('/login');
          })
          .catch(() => {
          });
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
