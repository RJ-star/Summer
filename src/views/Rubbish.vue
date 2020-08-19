<template xmlns:width="">
    <div>
        <el-container>
            <el-main>
                <el-page-header @back="goBack" content="文件详情">
                </el-page-header>
            </el-main>
        </el-container>

        <el-container>
            <el-aside :width="wth">
                <el-table
                        :data="tableData2"
                        height="400"
                        border
                        @selection-change="handleSelectionChange"
                        style="width: 100%"
                        ref="fileTable">
                    <el-table-column
                            type="selection"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="文件"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="查看"
                            width="80">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.$index)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <el-row>
                    <template>
                        <el-col :span="12"><div class="grid-content bg-white"><el-button type="danger" round @click="deleteRow()">彻底删除</el-button></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-white"><el-button type="success" round @click="recover()">复原文件</el-button></div></el-col>
                    </template>
                </el-row>
            </el-aside>
            <el-main>
                    <quill-editor
                            v-model="form.content"
                            ref="content"
                            :options="editorOption"
                            style="height:370px;line-height:15px"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="onContentChange($event)">
                    </quill-editor>
            </el-main>
        </el-container>
    </div>
</template>

<!--

-->

<script>
    import axios from 'axios'
    export default {
        name: "Rubbish",
        data() {
            return {
                //userID:'',
                fileID: '',
                wth:'400px',
                tableData2: [{
                    id:'',
                    name: ''
                }
                ],
                temp:{
                    id:'',
                    name:''
                },
                multipleSelection:[],
                form: {
                    // 存储富文本框内容
                    content:'',
                },
                editorOption: { // 定义富文本编辑器显示
                    modules:{
                        toolbar:[
                            ['bold','italic','underline','strike'], // 加粗、倾斜、下划线、删除线
                            [{'header':1},{'header':2}], // 标题一、标题二
                            [{'list':'ordered'},{'list':'bullet'}], // 列表
                            [{'color':[]},{'background':[]}], // 字体颜色、背景颜色
                        ]
                    }
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
                console.log('go back');
            },
            deleteRow() {
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
                                let tableData =this.tableData2;
                                let multDataLen = multData.length;
                                let tableDataLen = tableData.length;
                                for(let i = 0; i < multDataLen ;i++){
                                    for(let y=0;y < tableDataLen;y++){
                                        if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就删除
                                            axios.post("/apis/user/delete_file",{delete_file:'delete_file',file_id:this.tableData2[y].id})
                                                .then(response=>{
                                                    if(response.data.status===0){
                                                        this.tableData2.splice(y,1);
                                                        console.log("delete successful!");
                                                    }
                                                    else
                                                        console.log("error");
                                                });
                                            //this.tableData2.splice(y,1)
                                            // console.log("delete successful!")
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
            handleClick(row) {
                //console.log(row);
                this.fileID=this.tableData2[row].id
                axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/user/login"
                        })
                        alert('请登录')
                    }
                    else{
                        axios.post("/apis/user/file",{getFile:'getFile',file_id:this.fileID}).then(response=>{
                            if(response.data.status===0){
                                this.form.content=response.data.file_text;
                            }
                            else
                                this.form.content=null;
                        }).catch(this.form.content=null)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            recover(){
                axios.post("/apis/user/getstatus").then(response=>{
                    if(response.data.status!==0){
                        this.$router.push({
                            path: "/user/login"
                        });
                        alert('请登录')
                    }
                    else{
                        if(this.multipleSelection===undefined||this.multipleSelection.length<=0) {
                            this.$alert('你还尚未选择任何内容', '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                        else{
                            this.$confirm('此操作将恢复该文件至原位置, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let multData = this.multipleSelection;
                                let tableData =this.tableData2;
                                let multDataLen = multData.length;
                                let tableDataLen = tableData.length;
                                for(let i = 0; i < multDataLen ;i++){
                                    for(let y=0;y < tableDataLen;y++){
                                        if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就恢复（列表中删除）
                                            axios.post("/apis/user/recoverfrom_recyclebin",{recover_file:'recover_file',file_id:this.tableData2[y].id})
                                                .then(response=>{
                                                    if(response.data.status===0){
                                                        this.tableData2.splice(y,1);
                                                        console.log("recover successful!")
                                                    }
                                                    else{
                                                        this.$message({
                                                            type: 'info',
                                                            message: '恢复失败!'
                                                        });
                                                    }
                                                })
                                        }
                                    }
                                }
                                this.$message({
                                    type: 'success',
                                    message: '恢复成功!'
                                });
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消恢复'
                                });
                            });
                        }
                    }
                })
            },
            onEditorFocus(val){ // 富文本获得焦点
                console.log(val);
                val.enable(false); // 在获取焦点的时候禁用
            },
            onEditorBlur(val){ // 富文本失去焦点
                console.log(val);
            },
            onContentChange(val){ // 富文本内容改变
                console.log(val);
            },
            initialization:function () {
                //this.userID=this.$route.query.userID;
            this.fileID=this.$route.query.fileID;
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
                                this.tableData2.pop();
                                let len=response.data.namelist.length;
                                for(let i=0;i<len;i++){
                                    this.temp.id=response.data.timelist[i];
                                    this.temp.name=response.data.namelist[i];
                                    this.tableData2.push({id:this.temp.id,name:this.temp.name})
                                }
                            }
                        })
                        if(this.fileID!==null){
                            //this.form.content=this.fileID+'下面显示文件内容'
                            axios.post("/apis/user/file",{getFile:'getFile',file_id:this.fileID}).then(response=>{
                                if(response.data.status===0){
                                    this.form.content=response.data.file_text;
                                }
                                else
                                    this.form.content=null;
                            })
                        }
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

<style scoped>

</style>