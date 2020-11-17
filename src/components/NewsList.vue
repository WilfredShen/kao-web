<template>
    <div style="padding: 40px 10px 10px 10px">
        <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;height: 550px">
            <el-table :data="tabledata" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border stripe>
                <el-table-column prop="up_time" label="上传时间" align="center"></el-table-column>
                <el-table-column prop="admin_id" label="管理员ID" align="center"></el-table-column>
                <el-table-column prop="school_name" label="高校名称" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="edit" label="编辑" align="center">
                    <template>
                        <el-button size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                hint:'当前轮次没有数据，请上传',
                tabledata:[{
                    up_time:'2020-11-15',
                    admin_id:'01',
                    school_name:'湖南大学',
                    title:'校园网的爱恨情仇',
                    edit:''
                },{
                    up_time:'2020-11-16',
                    admin_id:'01',
                    school_name:'北京大学',
                    title:'我与清华二三事',
                    edit:''
                }]
            }
        }
    }
</script>

<style scoped>

</style>
