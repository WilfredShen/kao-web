<template>
  <div :style="myBackground" class="center">
    <div style="width: 30%">
      <el-card style="padding-left: 20px;padding-right: 20px;background-color: #ffffff22" shadow="hover">
        <div v-for="(item,index) in items" :key="index"
             style="display: flex;align-items: center;width: 100%;height: 40px">
          <div style="width: 40%;text-align: right;"><span class="info">{{item.label}}</span></div>
          <div style="width: 60%;text-align: left">
            <span class="info" style="padding-left: 15px">{{item.content}}</span>
          </div>
        </div>

        <el-button class="func-btn" style="background-color: #1e56a0;color: white" type="primary"
                   @click="modify()">修改信息
        </el-button>

      </el-card>
      <el-dialog :visible.sync="isModify" :width="width">
        <el-form label-width="20%"
                 label-position="top"
                 :model="studentForm"
                 :rules="studentRules"
                 ref="studentForm">
          <el-form-item label="联系电话" prop="newPhone">
            <el-input v-model="studentForm.newPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="newEmail">
            <el-input v-model="studentForm.newEmail"></el-input>
          </el-form-item>
          <el-form-item label="本科就读高校" prop="newCollege">
            <el-input v-model="studentForm.newCollege"></el-input>
          </el-form-item>
          <el-form-item label="本科就读专业" prop="newMajor">
            <el-input v-model="studentForm.newMajor"></el-input>
          </el-form-item>
          <el-form-item label="毕业时间(yyyy-mm-dd 如2020-01-01)" prop="newGraduate">
            <el-input v-model="studentForm.newGraduate"></el-input>
          </el-form-item>
          <el-form-item label="期望专业" prop="newExpect">
            <el-input v-model="studentForm.newExpect"></el-input>
          </el-form-item>
        </el-form>
        <div class="func-btn">
          <el-button style="background-color: #1e56a0;color: white" type="primary" @click="commitModify('studentForm')">
            确认修改
          </el-button>
          <el-button style="background-color: #1e56a0;color: white" @click="cancelModify()">取消修改</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

  import {updateStuInfo, updateUserInfo} from '@/assets/lib/getAndSetSelf'
  import {majorList, schoolList} from '@/assets/lib/getResultLjm'
  import {getCookie} from '@/assets/lib/utils'

  export default {
    name: 'StudentInfo',
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
        studentForm: {
          newPhone: '',
          newEmail: '',
          newCollege: '',
          newMajor: '',
          newGraduate: '',
          newExpect: '',
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
          {label: '本科高校：', content: ''},
          {label: '本科专业：', content: ''},
          {label: '毕业时间：', content: ''},
          {label: '预期专业：', content: ''},
        ],
        studentRules: {
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
          newExpect: [
            {validator: validateMajor, trigger: "blur"}
          ],
          newGraduate: [
            {
              pattern: /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/,
              message: "请输入格式正确的时间yyyy-mm-dd",
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods: {
      modify: function() {
        this.isModify = !this.isModify;
        if (this.major==null || this.major.length===0) {
          majorList()
            .then((res) => {
              for (let i = 0; i < res.length; i++) {
                this.majors.push(res[i].mname);
              }
              console.log(res);
            });
        }
        if (this.schools==null || this.schools.length===0) {
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
        this.$refs['studentForm'].resetFields();
      },

      commitModify: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let pPhone, pEmail, pCollege, pMajor, pGraduate, pExpectMajor;
            pPhone = this.studentForm.newPhone === '' ? this.items[0].content : this.studentForm.newPhone;
            pEmail = this.studentForm.newEmail === '' ? this.items[1].content : this.studentForm.newEmail;
            pCollege = this.studentForm.newCollege === '' ? this.items[5].content : this.studentForm.newCollege;
            pMajor = this.studentForm.newMajor === '' ? this.items[6].content : this.studentForm.newMajor;
            pGraduate = this.studentForm.newGraduate === '' ? this.items[7].content : this.studentForm.newGraduate;
            pExpectMajor = this.studentForm.newExpect === '' ? this.items[8].content : this.studentForm.newExpect;
            let uid = getCookie('uid');
            console.log("uid = " + uid);

            updateStuInfo(uid, pPhone, pEmail, pCollege, pMajor, pExpectMajor, pGraduate)
              .then((res) => {
                console.log(res);
                this.$message.success("修改成功！");
                this.items[0].content = pPhone;
                this.items[1].content = pEmail;
                this.items[5].content = pCollege;
                this.items[6].content = pMajor;
                this.items[7].content = pExpectMajor;
                this.items[8].content = pGraduate;
                this.isModify = !this.isModify;
                this.$refs['studentForm'].resetFields();
              })
              .catch((error) => {
                console.log("stu info 有问题" + error);
              });

            updateUserInfo(pPhone, pEmail)
              .then((res) => {
                console.log(res);
                this.$store.commit('setNewPhone',pPhone);
                this.$store.commit('setNewEmail',pEmail);
              })
              .catch((err) => {
                console.log("学生修改基本信息有问题" + err);
              });

            // location.reload();
          } else {
            this.$message.error("提交失败！请检查输入！");
          }
        });
      },

      setStuInfo: function() {
        this.$axios.get("/api/stu/q/stu-info", {
          params: {
            uid: getCookie('uid')
          }
        })
          .then((res) => {
            console.log(res);
            let item = res.data.data;
            this.items[0].content = item.phone;
            this.items[1].content = item.email;
            this.items[2].content = item.name;
            this.items[3].content = item.age;
            this.items[4].content = item.sex ? '男' : '女';
            this.items[5].content = item.college;
            this.items[6].content = item.major;
            this.items[7].content = item.graduationDate;
            this.items[8].content = item.expectedMajor;
          })
          .catch((error) => {
            console.log("学生信息请求失败" + error);
          });
      },
    },
    created() {
      this.setStuInfo();
    }
  }
</script>

<style scoped>

  .func-btn {
    margin-top: 30px;
  }


  .info {
    font-size: 19px;
    color: #ffffff;
    font-weight: bold;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
</style>
