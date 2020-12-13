<template>
  <div style="padding: 40px 10px 10px 10px">
    <div style="border: 1px solid darkgrey;padding: 20px 20px 40px 20px;width: 60%;">
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
          <el-upload :limit="1" action :auto-upload="false" :show-file-list="false"
                     :on-change="uploadImage">
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
      <el-button type="primary" style="min-width: 200px;margin-top: 50px" @click="commit()">
        确认上传
      </el-button>
    </div>
  </div>
</template>

<script>
  import {getSchool} from "../../assets/lib/getHomeServe";

  export default {
    data() {
      return {
        school_name: '',
        schools: [],
        schoolIds: [],
        title: '',
        content: '',
        myTime: '',
        link: '',
        schIndex: '',
        newsType: "",
        posterURL: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }
    },
    methods: {
      commit() {
        console.log(this.schoolIds[this.schIndex] + " " + this.schools[this.schIndex])
        this.$axios.post("/api/admin/p/news", {
          cid: this.schoolIds[this.schIndex],
          date: this.myTime,
          title: this.title,
          content: this.content,
          image: this.posterURL,
          officialLink: this.link
        })
          .then(res => {
            console.log("成功上传新闻", res);
          })
          .catch(error => {
            console.log(error);
          })
      },
    },
    created() {
      if (JSON.stringify(this.$store.state.schoolMap) !== '{}') {
        let sMap = this.$store.state.schoolMap;
        for (const key in sMap) {
          this.schoolIds.push(key);
          this.schools.push(sMap[key])
        }
      } else {
        getSchool().then((res) => {
          res.data.forEach(row => {
            this.schoolIds.push(row.cid);
            this.schools.push(row.cname);
            this.$store.commit("setSchMap", {
              cname: row.cname,
              cid: row.cid
            });
          })
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 250px;
  }
</style>
