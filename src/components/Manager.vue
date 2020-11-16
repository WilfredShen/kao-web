<template>
<!--    最外侧-->
    <div style="height: 800px">
        <div class="choices" style="float:left; border-right: solid 1px;width: 10%;height: 100%">
<!--            头像和用户名-->
            <div class="userinfo">
                <el-avatar shape="square" :size="80" :src="imgurl"></el-avatar>
                <p>用户名</p>
            </div>

            <div class="index">
<!--                <el-link id="home">主页</el-link><br>-->
                <el-link id="check">信息审核</el-link><br>
                <el-link id="refresh">信息更新</el-link>
            </div>
        </div>
<!--        右侧-->
        <div class="main" style="float:right;width: 89%;height: 100%">
            <div id="top" style="height: 50px; width: 100%;border-bottom: 1px solid">
                
            </div>

            <div id="infos" style="height: 100%; width: 100%;">
                <template>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                fixed="left"
                                prop="date"
                                label="修改时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="用户名"
                                width="120">
                        </el-table-column>

                        <el-table-column
                                prop="province"
                                label="修改项"
                                width="200px">
                        </el-table-column >
                        <el-table-column
                                prop="city"
                                label="修改内容"
                                width="1000px">
                        </el-table-column>

                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                            <template >
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                imgurl : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }]
            }
        }
    }
</script>

<style scoped>
    .userinfo{
        margin-left: 20px;
        margin-top: 20px;
        width: 100px;
    }
    #home,#check,#refresh{
        margin: 20px 0px 0px 25px;
    }

</style>