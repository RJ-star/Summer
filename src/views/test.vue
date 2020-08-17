<template>
    <div>
        <el-button type="primary" round @click="save">保存</el-button>
        <el-button type="info" round @click="back">返回</el-button>
        <br><br>
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <br><br>
        <div id="editor" disabled="false"></div>
    </div>

</template>
<script>

    // import { quillEditor } from 'vue-quill-editor'
    // import axios from 'axios'
    // // 1、使用qs将axios发送的数据格式转换为form-data格式（在安装axios时，默认就安装了）
    // import qs from 'qs'
    // import E from 'wangeditor'
    import Editor from 'wangeditor'
    import 'wangeditor/release/wangEditor.min.css'
    import axios from 'axios'
    export default {
        name: 'editor',
        data () {
            return {
                editorContent: '',//定义为全局变量
                editor:'<p style="text-align: left;">用 777 设置的内容</p>',    //定义为全局变量
                title:'',
                temp:'11qqq1'
            }
        },
        methods: {
            getContent: function () {
                this.editor.txt.html('')  //清空富文本框
                alert(this.editorContent)
                this.editor.txt.html("“内容”"); //富文本框设置内容
            },
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
        mounted() {
            this.editor='<p style="text-align: left;">用 777 设置的内容</p>'
            this.editor = new Editor("#editor");
            this.editor.create();
            this.editor.txt.html(this.temp)
            console.log(this.editor)
            this.title='111'
            localStorage.setItem('number',112)
            console.log(localStorage.getItem('number'))
            localStorage.setItem('number',113)
            console.log(localStorage.getItem('number'))
        }
    }

</script>
<style>

</style>