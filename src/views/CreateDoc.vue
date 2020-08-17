<template>
    <div>
        <el-button type="primary" round @click="save">保存</el-button>
        <el-button type="info" round @click="back">返回</el-button>
        <br><br>
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <br><br>
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
                // docData:{
                //     content:null,
                //     file_name:null,
                // },
                title:'',
                username:'',
                editorContent: '',//定义为全局变量
                editor:'',
                editorOption:{}
            }
        },
        methods:{
            //
            // onEditorBlur(){//失去焦点事件
            // },
            // onEditorFocus(){//获得焦点事件
            // },
            // onEditorChange(){//内容改变事件
            // },
            // escapeStringHTML(str) {
            //     str = str.replace(/&lt;/g,'<');
            //     str = str.replace(/&gt;/g,'>');
            //     return str;
            // },
            // save: function() {
            //     axios.post("/apis/user/createDoc",{
            //         upload:"upload",
            //         content:this.docData.content,
            //         file_name:this.docData.file_name
            //     },
            //     console.log(this.docData.file_name),
            //         console.log(this.docData.content))
            //
            //     .then(response => {
            //     console.log(response)
            //     })
            //
            //     // let data={"content":this.content};
            //     // console.log(this.content)
            //     // axios.post(
            //     //     "apis/user/createDoc",
            //     //     qs.stringify(data),
            //     //     {headers:{ 'Content-Type':'application/x-www-form-urlencoded' }}
            //     // )
            //     // .then(response => {
            //     //     console.log(response)
            //     // })
            //
            // },
            save() {
                console.log(this.title)
                console.log(this.editor.txt.html())
                axios.post('/apis/user/createDoc',{
                    upload:"upload",
                    content:this.editor.txt.html(),
                    file_name:this.title
                })
                    .then(response=>{
                        if (response.data.status===0) {
                            alert('上传成功')
                        }
                        else
                            alert('上传失败，请稍后再试')
                    })
            },
            back:function() {
                this.$router.go(-1)
            },
        },
        // computed: {
        //     editor () {
        //         return this.$refs.myTextEditor.quill
        //     }
        // },
        created(){
            axios.post('apis/user/getstatus')
                .then(res=>{
                    if (res.status===0) {
                        this.username=res.data.username
                        // axios.post('apis/user/recentBrowse')
                        //     //then获取成功；response成功后的返回值（对象）
                        //     .then(response=>{
                        //         console.log(response);
                        //         this.tableData=response.data;
                        //     })
                        //     //获取失败
                        //     .catch(error=>{
                        //         console.log(error);
                        //         alert('网络错误，请稍后尝试');
                        //     })
                    }
                    else {
                        this.$router.push({
                            path: "/user/login"
                        })
                        alert('请登录')
                    }
                })

        },
        mounted() {
            this.editor = new Editor("#editor");
            this.editor.create()
        }
    }

</script>
<style>
    /*.quill-editor {*/
    /*    height: 450px;*/
    /*}*/
</style>