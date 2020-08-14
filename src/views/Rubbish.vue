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
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="删除时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="查看"
                            width="60">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
    export default {
        name: "Rubbish",
        data() {
            return {
                fileID: '',
                wth:'450px',
                tableData2: [{
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
                multipleSelection:[],
                form: {
                    // 存储富文本框内容
                    content:'这是一段测试文字<br>富文本编辑器，Rich Text Editor, 简称 RTE, 它提供类似于 Microsoft Word 的编辑功能，容易被不会编写 HTML 的用户并需要设置各种文本格式的用户所喜爱。它的应用也越来越广泛。最先只有 IE 浏览器支持，其它浏览器相继跟进，在功能的丰富性来说，还是 IE 强些。虽然没有一个统一的标准，但对于最基本的功能，各浏览器提供的 API 基本一致，从而使编写一个跨浏览器的富文本编辑器成为可能。',
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
                    let tableData =this.tableData2;
                    let multDataLen = multData.length;
                    let tableDataLen = tableData.length;
                    for(let i = 0; i < multDataLen ;i++){
                        for(let y=0;y < tableDataLen;y++){
                            if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就删除
                                this.tableData2.splice(y,1)
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
            }
            },
            handleClick(row) {
                console.log(row);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            recover(){
                if(this.multipleSelection==undefined||this.multipleSelection.length<=0) {
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
                            if(JSON.stringify(tableData[y]) === JSON.stringify(multData[i])){ //判断是否相等，相等就删除
                                this.tableData2.splice(y,1)
                                console.log("delete successful!")
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
            }
        },
    }
</script>

<style scoped>

</style>