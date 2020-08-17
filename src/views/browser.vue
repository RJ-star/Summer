<template>
    <div>
        <!--        <el-header>Header</el-header>-->
        <el-alert
                title="提示"
                type="info"
                description="只读模式"
                :closable="false"
                center
                show-icon>
        </el-alert>
        <br>
        <!--        <el-button type="primary" round @click="save">保存</el-button>-->
        <el-button type="info" round @click="back">返回</el-button>
        <br><br>
        <el-input v-model="title" :disabled="true" placeholder="请输入标题"></el-input>
        <br><br>
        <!--        <el-input v-model="docData.file_name" placeholder="请输入标题"></el-input>-->
        <!--        <br><br>-->
        <!--        <quill-editor-->
        <!--                v-model="docData.content"-->
        <!--                ref="myQuillEditor"-->
        <!--                :options="editorOption"-->
        <!--                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"-->
        <!--                @change="onEditorChange($event)"-->

        <!--                class="quill-editor">-->
        <!--        </quill-editor>-->
        <!--        <div v-html="str" class="ql-editor">-->
        <!--            {{str}}-->
        <!--        </div>-->
        <!--        <div class="ql-container ql-snow">-->
        <!--            <div class="ql-editor">-->
        <!--                {{this.str}}-->
        <!--            </div>-->
        <!--        </div>-->
        <div id="editor"></div>
    </div>

</template>
<script>
    // import { quillEditor } from 'vue-quill-editor'
    import axios from 'axios'
    import Editor from 'wangeditor'
    import 'wangeditor/release/wangEditor.min.css'
    // // 1、使用qs将axios发送的数据格式转换为form-data格式（在安装axios时，默认就安装了）
    // import qs from 'qs'
    export default{
        // components: {
        //     quillEditor
        // },
        name:'editor',
        data(){
            return {
                editorContent: '',//定义为全局变量
                editor:'',    //定义为全局变量
                title:'',
                username:'',
                temp:''
            }
        },
        methods:{
            back() {
                axios.post('/apis/user/postModifiedFile',{
                    browseFile:'browseFile',
                    file_id:localStorage.getItem('file_id')
                })
                this.$router.go(-1)
            },
            print() {
                console.log(this.content)
            }
        },
        // created(){
        //     axios.post('/apis/user/getstatus')
        //         .then(res=>{
        //             if (res.data.status===0) {
        //                 this.username=res.data.username
        //                 axios.post('/apis/user/applyEditFile',{
        //                     editFile:"editFile",
        //                     file_id:localStorage.getItem('file_id')
        //                 })
        //                     //then获取成功；response成功后的返回值（对象）
        //                     .then(response=>{
        //                         console.log(response);
        //                         this.title=response.data.file_name;
        //                         this.editorContent=response.data.file_text;
        //                         this.temp=response.data.file_text;
        //                     })
        //                     //获取失败
        //                     .catch(error=>{
        //                         console.log(error);
        //                         alert('网络错误，请稍后尝试');
        //                     })
        //             }
        //             else {
        //                 this.$router.push({
        //                     path: "/user/login"
        //                 })
        //                 alert('请登录')
        //             }
        //         })
        // },
        mounted() {
            axios.post('/apis/user/applyEditFile',{
                editFile:"editFile",
                file_id:localStorage.getItem('file_id')
            })
                //then获取成功；response成功后的返回值（对象）
                .then(response=>{
                    console.log(response);
                    this.title=response.data.file_name;
                    this.editorContent=response.data.file_text.toString();
                    console.log(response.data.file_text.toString())
                    this.editor.txt.html(response.data.file_text.toString());
                })
                //获取失败
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，请稍后尝试');
                })
            console.log(this.temp)
            // this.temp=localStorage.getItem('text');
            this.editor = new Editor("#editor");
            this.editor.create();
            // this.editor.txt.html(this.temp);
            this.editor.$textElem.attr('contenteditable', false)
        }
    }

</script>
<style>
</style>