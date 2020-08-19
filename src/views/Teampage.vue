<template>
  <div class="app">
    <el-container>
      <el-aside :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
                class="app-side app-side-left">
        <el-dropdown
            :hide-on-click="false"
            trigger="hover">
                                <span class="el-dropdown-link">
                                    {{ username }}
                                    <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
                                    <div :key="size" class="block" v-for="size in sizeList">
                                       <el-avatar :size="size" :src="circleUrl"></el-avatar>
                                    </div>
                                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="gotoMail">我的消息</el-dropdown-item>
            <el-dropdown-item @click.native="gotoUserprofile">设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout"
                              divided>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <br>
        <br>
        <div>
          <el-menu :collapse="isCollapse"
                   @open="handleOpen"
                   class="el-menu-vertical-demo"
                   default-active="1-4-1">
            <el-button @click="gotoCreateDoc" round>新建文档</el-button>
            <br>
            <br>
            <el-button @click="gotoPatterns" round type="primary">使用模板</el-button>
            <br>
            <br>
            <el-menu-item @click="gotoRecent" index="1">
              <i class="el-icon-s-platform"></i>
              <span slot="title">工作台</span>
            </el-menu-item>
            <el-menu-item @click="gotoTeams" disabled index="2">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">团队空间</span>
            </el-menu-item>
            <el-menu-item @click="gotoBin" index="3">
              <i class="el-icon-delete"></i>
              <span slot="title">回收站</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <el-menu @select="handleSelect"
                   class="el-menu-demo tab-page"
                   default-active="activeIndex" mode="horizontal"
                   router>
            <el-menu-item @click="toteaminfo">
              <span>团队简介<i class="el-icon-mouse"></i></span>
            </el-menu-item>
            <el-menu-item @click="toteammember">
              <span>团队成员<i class="el-icon-user"></i></span>
            </el-menu-item>
            <el-menu-item>
              <span>团队文档<i class="el-icon-document-copy"></i></span>
            </el-menu-item>
              <el-menu-item @click="toCreateTeamDoc">
                  <span>新建团队文档<i class="el-icon-plus"></i></span>
              </el-menu-item>
              <el-menu-item @click="toSearchDoc">
                  <span>导入文档<i class="el-icon-plus"></i></span>
              </el-menu-item>
            <el-menu-item>
              <span @click="invitationVisable=true">邀请他人<i class="el-icon-plus"></i></span>
            </el-menu-item>
            <el-menu-item>
              <span @click="dismissTeam()">删除空间<i class="el-icon-delete"></i></span>
            </el-menu-item>
            <el-dialog
                :before-close="handleCloseDialog"
                :visible.sync="invitationVisable"
                title="邀请他人"
                width="30%">
              <el-form label-width="80px">
                <el-form-item label="被邀请人邮箱:">
                  <el-input v-model="newMember"></el-input>
                </el-form-item>
              </el-form>
              <span class="dialog-footer" slot="footer">
                          <el-button @click="invitationVisable = false">取 消</el-button>
                          <el-button @click="send_invitation(newMember)" type="primary">确 定</el-button>
                        </span>
            </el-dialog>
          </el-menu>
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
                                prop="name"
                                label="文档名">
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="180">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="browserDoc(scope.$index, scope.row)">查看</el-button>
                                <el-button type="text" size="small" @click="editDoc(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="text" size="small" @click="setting(scope.$index, scope.row)">权限设置</el-button>
<!--                                <el-button type="text" size="small" @click="deleteHistory">删除记录</el-button>-->
<!--                                <el-badge :value=gridData.length class="item">-->
<!--                                    <el-button size="small" @click="dialogTableVisible = true">评论</el-button>-->
<!--                                    <el-dialog style="text-align: left;" title="全部评论" :visible.sync="dialogTableVisible">-->
<!--                                        <el-table :data="gridData">-->
<!--                                            <el-table-column property="date" label="日期" width="150"></el-table-column>-->
<!--                                            <el-table-column property="name" label="昵称" width="200"></el-table-column>-->
<!--                                            <el-table-column property="comment" label="内容"></el-table-column>-->
<!--                                        </el-table>-->
<!--                                        &nbsp;<br>-->
<!--                                        <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--                                            <el-form-item label="发表评论" :label-width="formLabelWidth">-->
<!--                                                <el-input v-model="formcomment.comment" autocomplete="off"></el-input>-->
<!--                                            </el-form-item>-->
<!--                                            <el-form-item>-->
<!--                                                <el-button type="primary" @click="onSubmit">发表</el-button>-->
<!--                                            </el-form-item>-->
<!--                                        </el-form>-->
<!--                                    </el-dialog>-->
<!--                                </el-badge>-->
                            </template>
                        </el-table-column>

                    </el-table>
          <el-dialog :visible.sync="settingVisable" title="团队成员权限设置">
            待设置用户邮箱：<input v-model="usermail"/>
            <el-divider></el-divider>
            <el-form label-position="right" label-width="300px" ref="form">
              <el-form-item label="是否允许读取:">
                <el-radio label="1" v-model="r1">有</el-radio>
                <el-radio label="0" v-model="r1">无</el-radio>
              </el-form-item>
              <el-form-item label="是否允许编辑:">
                <el-radio label="1" v-model="r2">有</el-radio>
                <el-radio label="0" v-model="r2">无</el-radio>
              </el-form-item>
              <el-form-item label="是否允许分享:">
                <el-radio label="1" v-model="r3">有</el-radio>
                <el-radio label="0" v-model="r3">无</el-radio>
              </el-form-item>
              <el-form-item label="是否允许评论:">
                <el-radio label="1" v-model="r4">有</el-radio>
                <el-radio label="0" v-model="r4">无</el-radio>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-button @click="settingVisable = false">取 消</el-button>
            <el-button @click="submitchange(usermail)" type="primary">确 定</el-button>
          </el-dialog>
          <el-dialog
              :before-close="handleCloseDialog"
              :visible.sync="dialogVisible"
              title="提示:将文档ID分享给他人"
              width="30%">
            <span>设置文档权限（默认开启查看权限）：</span>
            <br><br>
            <span>编辑权限</span>
            <el-radio label="1" v-model="radio1">有</el-radio>
            <el-radio label="0" v-model="radio1">无</el-radio>
            <br><br>
            <span>分享权限</span>
            <el-radio label="1" v-model="radio2">有</el-radio>
            <el-radio label="0" v-model="radio2">无</el-radio>
            <br><br>
            <span>评论权限</span>
            <el-radio label="1" v-model="radio3">有</el-radio>
            <el-radio label="0" v-model="radio3">无</el-radio>
            <!--                        <el-radio v-model="radio" label="1">仅查看</el-radio>-->
            <!--                        <el-radio v-model="radio" label="2">可编辑</el-radio>-->
            <br><br>
            文档名：
            <el-input :disabled="true" v-model="editObj.address"></el-input>
            <br><br>
            文档ID：
            <el-input :disabled="true" v-model="editObj.id"></el-input>
            <!--                        <br><br>-->
            <span class="dialog-footer" slot="footer">
                                                            <el-button @click="dialogVisible = false">取 消</el-button>
                                                            <el-button @click="dialogVisible = false, checkShare(editObj.id)"
                                                                       type="primary">确 定</el-button>
                                                </span>
          </el-dialog>
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
      usermail: '',
      r1: '',
      r2: '',
      r3: '',
      r4: '',
      tempid: '',
      editright: true,
      readright: true,
      reviewright: false,
      shareright: true,
      document_id: '',
      sizeList: '',
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
      tableData: [
        {
          id: '',
          name: '操作指南',
        }
      ],
      temp: {
        id: '',
        name: ''
      },
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
  methods: {
    gotoTeams() {
      this.$router.push({
        path: "/user/Teams"
      });
    },
    gotoMail: function () {
      this.$router.push({
        path: "/user/Mail"
      });
    },
    gotoUserprofile: function () {
      this.$router.push({
        path: "/user/Userprofile"
      })
    },
    toteammember() {
      localStorage.setItem('team_id', localStorage.getItem('team_id'));
      this.$router.push({
        path: "/user/teammember"
      });
    },
    toteaminfo() {
      localStorage.setItem('team_id', localStorage.getItem('team_id'));
      this.$router.push({
        path: "/user/teaminfo"
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
    submitchange(usermail) {
      this.settingVisable = false;
      axios.post('/apis/user/setSpecificAuthority', {
        setOther: 'setOther',
        file_id: this.tempid,
        team_id: localStorage.getItem('team_id'),
        user_email: usermail,
        read_file: this.r1,
        write_file: this.r2,
        share_file: this.r3,
        review_file: this.r4,
      })
          .then(response => {
            switch (response.data.status) {
              case 0:
                this.$message({
                  message: response.data.message,
                  type: 'success'
                })
                break;
              case 1:
                this.$message(response.data.message);
                break;
              case 2:
                this.$message({
                  message: response.data.message,
                  type: 'warning'
                })
                break;
              case 3:
              case 4:
                this.$message.error(response.data.message);
                break;
            }
          })
      this.tempid = '';
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
    setting(index, row) {
      this.settingVisable = true;
      // axios.post('/apis/user/checkSpecificAuthority',{
      //   checkSpecificAuthority:'checkSpecificAuthority',
      //   file_id:row.id
      // })
      // .then(response => {
      //   switch(response.data.status)
      //   {
      //     case 0:
      //       this.r1=response.data.read;
      //       this.r2=response.data.write;
      //       this.r3=response.data.share;
      //       this.r4=response.data.review;
      //       break;
      //     case 1:
      //       this.$message({
      //         message:response.data.message,
      //         type:'warning'
      //       })
      //       break;
      //     case 2:
      //     case 3:
      //       this.$message.error(response.data.message)
      //       break;
      //   }
      // })
      this.tempid = row.id;
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
    gotoDesktop() {
      this.$router.push({
        path: "/Desktop"
      });
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
  },
  mounted: function () {
    let user = sessionStorage.getItem('user');
    if (user) {
      this.username = user;
    }
  },

        // created(){
        //     axios.post('/apis/user/getstatus')
        //     .then(res=>{
        //         if (res.data.status===0) {
        //             this.username=res.data.username
        //             axios.post('/apis/user/showTeamFile', {
        //               showteamfile: "showteamfile",
        //               team_id: localStorage.getItem('team_id')
        //             })
        //                 //then获取成功；response成功后的返回值（对象）
        //                 .then(response=>{
        //                     console.log(response);
        //                     this.tableData.pop();
        //                     // let list1=JSON.parse(response.data.fileIdSet);
        //                     // let list2=JSON.parse(response.data.fileNameSet);
        //                     // for (let i=0, len=list1.length;i<len;i++) {
        //                     //     this.temp.id=list1[i];
        //                     //     this.temp.address=list2[i];
        //                     //     this.tableData.push({id:this.temp.id,address:this.temp.address})
        //                     // }
        //                     console.log(typeof response.data.namelist)
        //                     for (let i=0, len=response.data.namelist.length;i<len;i++) {
        //                         this.temp.id=response.data.fileIdList[i];
        //                         this.temp.address=response.data.namelist[i];
        //                         this.tableData.push({id:this.temp.id,address:this.temp.address})
        //                     }
        //                 })
        //                 //获取失败
        //                 .catch(error=>{
        //                     console.log(error);
        //                     alert('网络错误，请稍后尝试');
        //                 })
        //         }
        //         else {
        //             this.$router.push({
        //                 path: "/user/login"
        //             })
        //             alert('请登录')
        //         }
        //     })
        //
        // },
  created() {
    axios.post('/apis/user/getstatus')
        .then(res => {
          if (res.data.status === 0) {
            this.username = res.data.username
            axios.post('/apis/user/showTeamFile', {
              showteamfile: "showteamfile",
              team_id: localStorage.getItem('team_id')
            })
                //then获取成功；response成功后的返回值（对象）
                .then(response => {
                            this.tableData.pop();
                  switch (response.data.status) {
                    case 0:
                      for (let i = 0, len = response.data.retFileIdList.length; i < len; i++) {
                        this.temp.id = response.data.retFileIdList[i];
                        this.temp.name = response.data.retFileNameList[i];
                        this.tableData.push({id: this.temp.id, name: this.temp.name})
                      }
                      break;
                    case 1:
                      this.$message({
                        message: response.data.message,
                        type: 'warning'
                      })
                      break;
                    case 2:
                    case 3:
                      this.$message.error(response.data.message)
                      break;
                  }
                })
                //获取失败
                .catch(error => {
                  console.log(error);
                  alert('网络错误，请稍后尝试');
                })
          } else {
            this.$router.push({
              path: "/user/login"
            })
            alert('请登录')
          }
        })

  }
}

</script>

<style>
</style>
