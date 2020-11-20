<template>
    <div style="padding: 40px 10px 10px 10px">
        <div style="width: 60%;border: 1px solid darkgrey;padding: 20px 20px 40px 20px;">
            <div v-for="(item,index) in items" :key="index"
                 style="display: flex;align-items: center;width: 60%" v-bind:class="{changeColor:index%2==0}">
                <div style="width: 30%;text-align: right"><p>{{item.label}}</p></div>
                <div style="width: 70%;text-align: right;">
                    <img class="img" v-bind:src="item.show">
                    <img class="img" v-bind:src="item.edit">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                items:[
                    {label:'联系电话：',show: require('@/assets/eye.png'),edit:require('@/assets/pencil.png')},
                    {label:'邮箱地址：',show: require('@/assets/eye.png'),edit:require('@/assets/pencil.png')},
                    {label:'姓名：',show: require('@/assets/eye.png'),edit:require('@/assets/transparent.png')},
                    {label:'年龄：',show: require('@/assets/eye.png'),edit:require('@/assets/transparent.png')},
                    {label:'性别：',show: require('@/assets/eye.png'),edit:require('@/assets/transparent.png')},
                    {label:'本科就读高校：',show: require('@/assets/eye.png'),edit:require('@/assets/pencil.png')},
                    {label:'本科就读专业：',show: require('@/assets/eye.png'),edit:require('@/assets/pencil.png')},
                    {label:'本科毕业时间：',show: require('@/assets/eye.png'),edit:require('@/assets/pencil.png')},
                    {label:'预期专业：',show: require('@/assets/eye.png'),edit:require('@/assets/pencil.png')},
                    {label:'可被导师查询：',show:require('@/assets/transparent.png'),edit:require('@/assets/pencil.png')},
                ]
            }
        }
    }
</script>

<style scoped>
    .changeColor{
        background-color: #eef1f6;
    }
    .img{
        width: 25px;
        height: 25px;
        margin-right: 20px
    }
</style>
