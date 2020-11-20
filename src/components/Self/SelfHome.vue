<template>
    <div style="padding: 40px 10px 10px 10px">
        <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;height: 550px">
            <p>最近消息：</p>
            <el-table :data="tabledata" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border stripe>
                <el-table-column prop="focus_school" label="关注的高校" align="center"></el-table-column>
                <el-table-column prop="info_type" label="信息类型" align="center"></el-table-column>
                <el-table-column prop="up_date" label="更新日期" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tabledata:[{
                    focus_school:'湖南大学',
                    info_type:'高校新闻',
                    up_date:'2020-11-12'
                },{
                    focus_school:'蓝翔技术学校',
                    info_type:'夏令营',
                    up_date:'2020-11-13'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
