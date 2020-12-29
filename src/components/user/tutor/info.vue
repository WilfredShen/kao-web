<template>
  <div :style="myBackground" class="center">
    <div style="width: 30%">
      <el-card style="padding-left: 20px;padding-right: 20px;background-color: #ffffff22" shadow="hover">
        <div v-for="(item,index) in items" :key="index"
             style="display: flex;align-items: center;width: 100%;height: 40px">
          <div style="width: 40%;text-align: right"><span class="info">{{item.label}}</span></div>
          <div style="width: 60%;text-align: left;">
            <span class="info" style="padding-left: 15px">{{item.content}}</span>
          </div>
        </div>

        <el-button class="func-btn" style="background-color: #1e56a0;color: white" type="primary"
                   @click="modify()">修改信息
        </el-button>
      </el-card>
      <el-dialog :visible.sync="isModify" :width="width">
        <el-form label-width="20%"
                 label-position="left"
                 :model="tutorForm"
                 :rules="tutorRules"
                 ref="tutorForm">
          <el-form-item label="联系电话" prop="newPhone">
            <el-input v-model="tutorForm.newPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="newEmail">
            <el-input v-model="tutorForm.newEmail"></el-input>
          </el-form-item>
          <el-form-item label="所属院校" prop="newCollege">
            <el-input v-model="tutorForm.newCollege"></el-input>
          </el-form-item>
          <el-form-item label="所属专业" prop="newMajor">
            <el-input v-model="tutorForm.newMajor"></el-input>
          </el-form-item>
          <el-form-item label="研究方向" prop="newResearch">
            <el-input v-model="tutorForm.newResearch"></el-input>
          </el-form-item>
        </el-form>
        <div class="func-btn">
          <el-button style="background-color: #1e56a0;color: white" type="primary" @click="commitModify()">确认修改
          </el-button>
          <el-button style="background-color: #1e56a0;color: white" @click="cancelModify()">取消修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import {updateTeaInfo, updateUserInfo} from '@/assets/lib/getAndSetSelf'
  import {majorList, schoolList} from '@/assets/lib/getResultLjm'

  export default {
    name: 'TutorInfo',
    props: {
      width: {
        type: String,
        default: '30%'
      }
    },
    data() {
      const validateCollege = (rule, value, callback) => {
        if (value !== '' && !this.schools.includes(value)) {
          callback(new Error("学校名有误！"))
        } else {
          callback();
        }
      };
      const validateMajor = (rule, value, callback) => {
        if (value !== '' && !this.majors.includes(value)) {
          callback(new Error("专业名有误！"))
        } else {
          callback();
        }
      };
      return {
        myBackground: {
          backgroundImage: 'url(' + require('@/assets/image/userback.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        tutorForm: {
          newPhone: '',
          newEmail: '',
          newCollege: '',
          newMajor: '',
          newResearch: '',
        },
        isModify: false,
        schools: [],
        majors: [],
        items: [
          {label: '联系电话：', content: ''},
          {label: '邮箱地址：', content: ''},
          {label: '姓名：', content: ''},
          {label: '年龄：', content: ''},
          {label: '性别：', content: ''},
          {label: '所属院校：', content: ''},
          {label: '所属专业：', content: ''},
          {label: '研究方向：', content: ''},
        ],
        tutorRules: {
          newPhone: [
            {pattern: /^1[0-9]{10}$/, message: "请输入格式正确的手机号", trigger: "blur",}
          ],
          newEmail: [
            {
              pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
              message: "请输入格式正确的邮箱",
              trigger: "blur"
            },
          ],
          newCollege: [
            {validator: validateCollege, trigger: "blur"},
          ],
          newMajor: [
            {validator: validateMajor, trigger: "blur"}
          ],
        }
      }
    },
    methods: {
      modify: function() {
        this.isModify = !this.isModify;
        if (this.major == null || this.major.length === 0) {
          majorList()
            .then((res) => {
              for (let i = 0; i < res.length; i++) {
                this.majors.push(res[i].mname);
              }
              console.log(res);
            });
        }
        if (this.schools == null || this.schools.length === 0) {
          schoolList()
            .then((res) => {
              for (let i = 0; i < res.length; i++) {
                this.schools.push(res[i].cname);
              }
              console.log(res);
            });
        }
      },

      cancelModify: function() {
        this.isModify = !this.isModify;
        this.$refs['tutorForm'].resetFields();
      },

      commitModify: function() {
        let pPhone, pEmail, pCollege, pMajor, pResearch;
        pPhone = this.tutorForm.newPhone === '' ? this.items[0].content : this.tutorForm.newPhone;
        pEmail = this.tutorForm.newEmail === '' ? this.items[1].content : this.tutorForm.newEmail;
        pCollege = this.tutorForm.newCollege === '' ? this.items[5].content : this.tutorForm.newCollege;
        pMajor = this.tutorForm.newMajor === '' ? this.items[6].content : this.tutorForm.newMajor;
        pResearch = this.tutorForm.newResearch === '' ? this.items[7].content : this.tutorForm.newResearch;
        updateTeaInfo(pPhone, pEmail, pCollege, pMajor, pResearch)
          .then(() => {
            this.$message.success("修改成功");
            this.$refs['tutorForm'].resetFields();
            this.items[0].content = pPhone;
            this.items[1].content = pEmail;
            this.items[5].content = pCollege;
            this.items[6].content = pMajor;
            this.items[7].content = pResearch;
            this.isModify = !this.isModify;
            console.log("pEmail = ",pEmail);
          })
          .catch((err) => {
            this.$message.error("修改失败");
            console.log("修改教师信息失败",err);
          });

        updateUserInfo(pPhone, pEmail)
          .then((res) => {
            console.log(res);
            this.$store.commit('setNewPhone',pPhone);
            this.$store.commit('setNewEmail',pEmail);
          })
          .catch((err) => {
            console.log("研究生秘书修改基本信息有问题" + err);
          });
      },

      setTutorInfo: function() {
        this.$axios.get("/api/tutor/q/tutor-info")
          .then((res) => {
            let item = res.data.data;
            this.items[0].content = item.phone;
            this.items[1].content = item.email;
            this.items[2].content = item.name;
            this.items[3].content = item.age;
            this.items[4].content = item.sex ? '男' : '女';
            this.items[5].content = item.college;
            this.items[6].content = item.major;
            this.items[7].content = item.research;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    created() {
      this.setTutorInfo();
    }
  }
</script>

<style scoped>
  .func-btn {
    margin-top: 30px;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }

  .info {
    font-size: 19px;
    color: #ffffff;
    font-weight: bold;
  }

</style>
