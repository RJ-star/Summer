<template>
    <div>
<!--        <el-header>Header</el-header>-->
        <el-button type="primary" round @click="save">保存</el-button>
        <el-button type="info" round @click="back">返回</el-button>
        <br><br>
        <quill-editor
                v-model="docData.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
                class="quill-editor">
        </quill-editor>
        <div v-html="str" class="ql-editor">
            {{str}}
        </div>
    </div>

</template>
<script>
    // import { quillEditor } from 'vue-quill-editor'
    // import axios from 'axios'
    // // 1、使用qs将axios发送的数据格式转换为form-data格式（在安装axios时，默认就安装了）
    // import qs from 'qs'
    export default{
        // components: {
        //     quillEditor
        // },
        data(){
            return {
                docData:{
                    content:null,
                },

                str:'',
                editorOption:{}
            }
        },
        methods:{

            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
            escapeStringHTML(str) {
                str = str.replace(/&lt;/g,'<');
                str = str.replace(/&gt;/g,'>');
                return str;
            },
            save: function(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                            this.$axios.post("/apis/user/createDoc",{
                            content:this.docData.content,

                        },
                        console.log(this.docData.content))
                        .then(response => {
                            console.log(response)
                        })
                        } else {
                            console.log("error submit!!");
                            return false;
                        }
                // let data={"content":this.content};
                // console.log(this.content)
                // axios.post(
                //     "apis/user/createDoc",
                //     qs.stringify(data),
                //     {headers:{ 'Content-Type':'application/x-www-form-urlencoded' }}
                // )
                // .then(response => {
                //     console.log(response)
                // })
                })
            },
            back:function() {
                this.$router.go(-1)
            },
            print() {
                console.log(this.content)
            }
        },
        computed: {
            editor () {
                return this.$refs.myTextEditor.quill
            }
        },
        mounted() {
            let content = '';  // 请求后台返回的内容字符串
            this.str = this.escapeStringHTML(content);
        }
    }

</script>
<style>
    .quill-editor {
        height: 500px;
    }
</style>