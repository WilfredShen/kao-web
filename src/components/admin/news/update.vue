<template>
  <div>
    <!--    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;">-->
    <el-form label-width="100px">
      <el-form-item label="类型：">
        <el-select placeholder="高校新闻" v-model="newsType">
          <el-option label="高校新闻" value="news"></el-option>
          <el-option label="夏令营" value="camp"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高校名称：">
        <el-select v-model="schIndex" filterable placeholder="模糊查询">
          <el-option v-for="(item,index) in schools" :key="index" :value="index" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input class="input" v-model="title" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input class="input" v-model="content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload :limit="1" action :auto-upload="false" :show-file-list="false">
          <el-button>选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="时间：">
        <el-date-picker v-model="myTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="官方链接：">
        <el-input class="input" v-model="link" placeholder="单行输入"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="min-width: 150px;margin-top: 50px;background-color: #1e56a0;color: white" @click="commit()">
      确认修改
    </el-button>
    <el-button style="min-width: 150px;margin-top: 50px;background-color: #1e56a0;color: white" @click="cancel()">
      取消修改
    </el-button>
  </div>
</template>

<script>
  import {schoolList} from "@/assets/lib/getResultLjm";

  export default {
    name: 'UpdateNews',
    data() {
      return {
        schools: [],
        schoolIds: [],
        title: '',
        content: '',
        myTime: '',
        link: '',
        schIndex: '',
        newsType: "",
        posterURL: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        ifCommit: true,
      }
    },
    methods: {
      commit() {
        this.$axios.post("/api/admin/u/news", {
          cid: this.schoolIds[this.schIndex],
          date: this.myTime,
          title: this.title,
          content: this.content,
          image: this.posterURL,
          officialLink: this.link
        })
          .then(res => {
            console.log("成功更新新闻", res);
            this.ifCommit = false;
            this.$emit('eIfCommit', this.ifCommit);
            location.reload();
          })
          .catch(error => {
            console.log("更新新闻有误", error);
          });
      },
      cancel() {
        this.ifCommit = false;
        this.$emit('eIfCommit', this.ifCommit);
      }
    },
    created() {
      if (JSON.stringify(this.$store.state.schoolMap) !== '{}') {
        let sMap = this.$store.state.schoolMap;
        for (const key in sMap) {
          this.schoolIds.push(key);
          this.schools.push(sMap[key]);
        }
      } else {
        schoolList()
          .then((res) => {
            res.forEach(row => {
              this.schoolIds.push(row.cid);
              this.schools.push(row.cname);
              this.$store.commit("setSchMap", {
                cname: row.cname,
                cid: row.cid
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped>

</style>
