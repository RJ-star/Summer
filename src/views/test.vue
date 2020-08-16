<template>
    <div>
        <el-button type="primary" round @click="save">保存</el-button>
    </div>

</template>
<script>
    // import axios from 'axios'
    // import qs from 'qs'
    export default{
        data(){
            return {
                content:'',
                table:[{
                    id:'',
                    name:''
                }],
                // table2:[{
                //     id:'1111',
                //     name:'11'
                // },{
                //     id:'1112',
                //     name:'12'
                // }]
                temp:{
                    id:null,
                    name:null
                },
                table1:['1','2','3'],
                table2:['a','b','c']
            }

        },
        methods:{
            save: function() {
                // this.table.push({id: '111',name:'aaa'})
                // this.table.push({id: '112',name:'aaa'})
                // this.table.push({id: '113',name:'aaa'})
                // this.table.push({id: '114',name:'aaa'})

                // this.table2.forEach(item=>{
                //     this.table.push(item)
                //
                // })
                this.table.pop()
                for (var i = 0, len = this.table1.length; i < len; i++) {
                    this.temp.id=this.table1[i];
                    this.temp.name=this.table2[i];
                     this.table.push({id:this.temp.id,name:this.temp.name});
                    console.log(this.temp.id+'tse');
                }
                console.log('------------------------')
                for (i=0;i<len;i++) {
                    console.log(this.table[i].id+'ttt')
                }
                // for (var j=0, l=this.table.length; j<l;j++) {
                //     console.log(this.table.id+'test')
                // }
                // this.table.forEach(item=>{
                //     console.log(item.id)
                // })
                // console.log(this.content)
                // axios.post(
                //     "apis/user/test",
                //     {content: this.content}
                // )
                //     .then(response => {F
                //         console.log(response)
                //     }
                //     )

            },
        },
    }
</script>
<style>
</style>