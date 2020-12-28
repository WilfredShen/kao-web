<template>
  <div style="padding: 20px 20px 40px 20px;width: 60%">
    <el-form label-width="15%" label-position="right"
             ref="uploadForm"
             :model="uploadForm"
             :rules="uploadRules">
      <el-form-item label="类型：" prop="newsType">
        <el-select placeholder="高校新闻" v-model="uploadForm.newsType">
          <el-option label="高校新闻" value="news"></el-option>
          <el-option label="夏令营" value="camp"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="高校名称：" prop="schIndex">
        <el-select v-model="uploadForm.schIndex" filterable placeholder="模糊查询">
          <el-option v-for="(item,index) in schools" :key="index" :value="index" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input class="input" v-model="uploadForm.title" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input class="input" v-model="uploadForm.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="图片：" prop="imageList">
        <el-upload :limit="1" action :auto-upload="false" ref="upload" :show-file-list="true">
          <el-button>选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="时间：" prop="myTime">
        <el-date-picker v-model="uploadForm.myTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="官方链接：" prop="link">
        <el-input class="input" v-model="uploadForm.link" placeholder="单行输入"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="min-width: 200px;margin-top: 20px;background-color: #1e56a0;color: white"
               @click="commit('uploadForm')">
      确认上传
    </el-button>
    <el-button @click="mytest()">test</el-button>
  </div>
</template>

<script>
  import {schoolList} from "@/assets/lib/getResultLjm";

  export default {
    name: 'UploadNews',

    data() {
      const validateFileList = (rule, value, callback) => {
        if (this.$refs.upload.uploadFiles.length > 0) {
          callback();
        } else {
          callback(new Error("请上传图片"));
        }
      };
      return {
        schools: [],
        schoolIds: [],
        uploadForm: {
          title: '',
          newsType: '',
          content: '',
          myTime: '',
          link: '',
          schIndex: '',
          imageList: []
        },
        fileList: [],
        posterURL: '',
        image: {},
        uploadRules: {
          title: [
            {required: true, message: "标题不能为空", trigger: "blur"}
          ],
          newsType: [
            {required: true, message: "请选择类型", trigger: "change"}
          ],
          content: [
            {required: true, message: "内容不能为空", trigger: "blur"}
          ],
          link: [
            {required: true, message: "请填写新闻链接，注意格式正确", trigger: "blur"}
          ],
          imageList: [
            {required: true, validator: validateFileList}
          ],
          myTime: [
            {required: true, message: "请选择时间", trigger: "blur"}
          ],
          schIndex: [
            {required: true, message: "请选择高校", trigger: "change"},
          ],

        },
      }
    },
    methods: {
      commit: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success("验证成功");
            //上传图片
            let file = this.$refs.upload.uploadFiles.pop().raw;
            let formData = new FormData();
            formData.append("image", file);
            this.$axios.post("/api/admin/p/image", formData)
              .then((res) => {
                console.log("请求成功", res);
                this.posterURL = res.data.data;
                console.log("图片路径为", this.posterURL);
                console.log("cid为", this.schoolIds[this.uploadForm.schIndex])
                this.$axios.post("/api/admin/p/news", {
                  cid: this.schoolIds[this.uploadForm.schIndex],
                  date: this.uploadForm.myTime,
                  title: this.uploadForm.title,
                  content: this.uploadForm.content,
                  image: this.posterURL,
                  officialLink: this.uploadForm.link
                })
                  .then((res) => {
                    console.log(res);
                    this.$message.success("成功上传新闻");
                    this.$refs['uploadForm'].resetFields();
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log("上传图片有误", error);
              });
          } else {
            this.$message.error("提交失败！请检查输入！");
          }
        })
      },

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
            res.forEach((row) => {
              this.schoolIds.push(row.cid);
              this.schools.push(row.cname);
              this.$store.commit("setSchMap", {
                cname: row.cname,
                cid: row.cid
              });
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 250px;
  }

  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
    overflow: scroll !important;
  }
</style>
