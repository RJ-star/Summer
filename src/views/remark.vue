<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="用户名"
                    width="300">
                <template slot-scope="scope">

                    <p type="text" size="small" @click="gotoMessage(scope.$index, scope.row)">{{scope.row.nickname}}</p>
                    <!--                                <el-button type="text" size="small" @click="deleteDoc(scope.$index, scope.row)">删除文档</el-button>-->
                    <!--                                <el-button type="text" size="small" @click="share(scope.$index, scope.row)">分享</el-button>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="评论">
            </el-table-column>
<!--            <el-table-column-->
<!--                    fixed="right"-->
<!--                    label="操作"-->
<!--                    width="200">-->
<!--                <template slot-scope="scope">-->

<!--                    <el-button type="text" size="small" @click="gotoMessage(scope.$index, scope.row)">查看此人</el-button>-->
<!--                    &lt;!&ndash;                                <el-button type="text" size="small" @click="deleteDoc(scope.$index, scope.row)">删除文档</el-button>&ndash;&gt;-->
<!--                    &lt;!&ndash;                                <el-button type="text" size="small" @click="share(scope.$index, scope.row)">分享</el-button>&ndash;&gt;-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>
        <br><br>
        <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入评论"
                v-model="my_remark">
        </el-input>
        <br><br>
        <el-button type="primary" round @click="submit">提交</el-button>
    </div>

</template>
<script>

    import axios from 'axios'
    export default {
        data () {
            return {
                tableData: [{
                    date: '',
                    nickname: '',
                    remark: ''
                },{
                    date: '1',
                    nickname: '2',
                    remark: '3'
                }],
                temp:{
                    data:'',
                    nickname:'',
                    remark:''
                },
                my_remark: ''
            }
        },
        methods: {
            gotoMessage(index, row){
                console.log(row)
                localStorage.setItem('user_id',row.nickname)
                this.$router.push({
                    path:'/user/Message'
                })
            },
            submit(){

                axios.post('/apis/user/fileReview',{
                    add_review: "add_review",
                    review_text:this.my_remark,
                    file_id:localStorage.getItem('remark_file_id')
                })
                .then(response=>{
                    if (response.data.status===0){
                        alert('评论成功')
                        this.$router.go(0)
                    }
                    else {
                        alert('请求失败，请稍后再试')
                    }
                })
            }
        },
        created() {
            axios.post('/apis/user/showreviews',{
                showreviews: "showreviews",
                file_id:localStorage.getItem('remark_file_id')
            })
                .then(response=>{
                    console.log(response);
                    this.tableData.pop();
                    for (let i=0, len=response.data.retReviewerList.length;i<len;i++) {
                        this.temp.date=response.data.retReviewTimeList[i];
                        this.temp.nickname=response.data.retReviewerList[i];
                        this.temp.remark=response.data.retReviewTextList[i];
                        this.tableData.push({date: this.temp.date, nickname: this.temp.nickname, remark: this.temp.remark})
                    }
                })
                //获取失败
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，请稍后尝试');
                })
        }
    }

</script>
<style>

</style>