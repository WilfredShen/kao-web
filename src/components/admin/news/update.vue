<template>
  <div>
    <el-form
      label-width="120px"
      label-position="right"
      ref="updateForm"
      :model="updateForm"
      :rules="updateRules"
    >
      <el-form-item
        label="类型："
        prop="newsType"
      >
        <el-select
          placeholder="高校新闻"
          v-model="updateForm.newsType"
        >
          <el-option
            label="高校新闻"
            value="news"
          ></el-option>
          <el-option
            label="夏令营"
            value="camp"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="标题："
        prop="title"
      >
        <el-input
          class="input"
          v-model="updateForm.title"
          :placeholder="newsTitle"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="内容："
        prop="content"
      >
        <el-input
          class="input"
          v-model="updateForm.content"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图片："
        prop="image"
      >
        <el-upload
          :limit="1"
          action
          :auto-upload="false"
          ref="upload"
        >
          <el-button>选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="官方链接："
        prop="link"
      >
        <el-input
          class="input"
          v-model="updateForm.link"
          placeholder="单行输入"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      style="min-width: 150px;margin-top: 50px;background-color: #1e56a0;color: white"
      @click="commit('updateForm')"
    >
      确认修改
    </el-button>
    <el-button
      style="min-width: 150px;margin-top: 50px;background-color: #1e56a0;color: white"
      @click="cancel()"
    >
      取消修改
    </el-button>
  </div>
</template>

<script>

  export default {
    name: 'UpdateNews',
    props: ['upTime', 'cid', 'newsTitle'],
    data() {
      const validateFileList = (rule, value, callback) => {
        if (this.$refs.upload.uploadFiles.length > 0) {
          callback();
        } else {
          callback(new Error("请上传文件"));
        }
      };
      return {
        updateForm: {
          title: '',
          newsType: '',
          content: '',
          myTime: '',
          link: '',
        },
        updateRules: {
          title: [
            {required: true, message: "标题不能为空",}
          ],
          newsType: [
            {required: true, message: "请选择类型", trigger: "change"}
          ],
          content: [
            {required: true, message: "内容不能为空",}
          ],
          link: [
            {required: true, message: "请填写新闻链接，注意格式正确"}
          ],
          image: [
            {required: true, message: "请上传图片"},
            {validator: validateFileList}
          ],
        },
        schIndex: '',
        posterURL: '',
        ifCommit: true,
        imgFile: '',
      }
    },
    methods: {
      commit: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //上传图片
            let file = this.$refs.upload.uploadFiles.pop().raw;
            let formData = new FormData();
            formData.append("image", file);
            this.$axios.post("/api/admin/p/image", formData)
              .then((res) => {
                console.log("请求成功", res);
                this.posterURL = res.data.data;
                console.log("图片路径为", this.posterURL);
                this.$axios.post("/api/admin/u/news", {
                  cid: this.cid,
                  date: this.upTime,
                  title: this.updateForm.title,
                  content: this.updateForm.content,
                  image: this.posterURL,
                  officialLink: this.updateForm.link
                })
                  .then((res) => {
                    console.log(res);
                    this.$message.success("成功更新新闻");
                    this.schIndex = 0;
                    this.cancel();
                    this.$emit('hasEdit', true);
                    this.$refs['updateForm'].resetFields();
                  })
                  .catch((error) => {
                    console.log("上传图片有误", error);
                  });
              })
              .catch((error) => {
                console.log("更新新闻有误", error);
              });
          }else {
            this.$message.error("请检查输入!");
          }
        })

      },

      cancel: function() {
        this.ifCommit = false;
        this.$emit('eIfCommit', this.ifCommit);
        this.$refs['updateForm'].resetFields();
      }
    },
  }
</script>

<style scoped>
  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
    overflow: scroll !important;
  }
</style>
