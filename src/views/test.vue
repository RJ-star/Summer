<template>
    <div>
        <el-button type="primary" round @click="save">保存</el-button>
    </div>

</template>
<script>
    import axios from 'axios'
    // import qs from 'qs'
    export default{
        data(){
            return {
                content:'777',
            }
        },
        methods:{
            save: function() {
                console.log(this.content)
                axios.post(
                    "/apis/user/test",
                    {content: this.content}
                )
                    .then(response => {
                        console.log(response)
                    }
                    )

            },
        },
    }
</script>
<style>
</style>