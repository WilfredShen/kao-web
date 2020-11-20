<template>
    <div id="infos" style="height: 100%;width: 100%">
        <el-table :data="tableData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border>
            <el-table-column min-width="10%" label="时间"  prop="date" align="center"></el-table-column>
            <el-table-column min-width="10%" label="用户"  prop="user" align="center" ></el-table-column>
            <el-table-column min-width="20%" label="原内容"  prop="o_content" align="center"></el-table-column>
            <el-table-column min-width="50%" label="修改内容"  prop="n_content" align="center"></el-table-column>
            <el-table-column min-width="10%" label="操作" align="center">
                <template>
                    <el-button type="text" size="small">通过</el-button>
                    <el-button type="text" size="small">驳回</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
            return{
                tableData: [{
                    date:'2020-11-17',
                    user:'张三',
                    o_content:'女',
                    n_content:'男'
                }],
            }
        }
    }
</script>

<style scoped>

</style>
