<template>
    <div>
        <el-button type="primary" round @click="save">保存</el-button>
        <el-button type="info" round @click="back">返回</el-button>
        <br><br>
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <br><br>
        <div id="editor"></div>
    </div>

</template>
<script>
    import axios from 'axios'
    import Editor from 'wangeditor'
    import 'wangeditor/release/wangEditor.min.css'
    export default{
        name:'createdoctp',
        data(){
            return {
                title:'',
                username:'',
                editorContent: '',
                editor:'',
                editorOption:{}
            }
        },
        methods:{
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
        created(){
            axios.post('apis/user/getstatus')
                .then(res=>{
                    if (res.status===0) {
                        this.username=res.data.username
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
			this.editorContent=localStorage.getItem('text');
			this.editor.txt.html(localStorage.getItem('text'));
        }
    }
</script>
<style>
</style>
