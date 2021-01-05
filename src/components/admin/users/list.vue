<template>
  <div style="height: 82%">
    <el-table
      :data="users"
      :height="height"
      :header-cell-style="{background:'#3282B8',color:'#ffffff',height:'70px'}"
      style="font-size: 17px;"
    >
      <el-table-column
        prop="uid"
        align="center"
        label="用户ID"
      ></el-table-column>
      <el-table-column
        prop="username"
        align="center"
        label="用户名"
      ></el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="电话号码"
      ></el-table-column>
      <el-table-column
        prop="email"
        align="center"
        label="邮箱地址"
      ></el-table-column>
      <el-table-column
        prop="accountType"
        align="center"
        label="用户类型"
      ></el-table-column>
      <el-table-column
        prop="registerTime"
        align="center"
        label="注册时间"
      ></el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="editUser(scope.$index,scope.row)"
            type="primary"
          >编辑
          </el-button>
          <el-button
            @click="deleteUser(scope.$index,scope.row['uid'])"
            type="danger"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="isEdit"
      :width="width"
    >
      <el-form
        label-width="20%"
        label-position="right"
        :model="userForm"
        :rules="userRules"
        ref="userForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="phone"
        >
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱地址"
          prop="email"
        >
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <div class="func-btn">
          <el-button
            style="background-color: #1e56a0;color: white"
            type="primary"
            @click="commitModify('userForm')"
          >
            确认修改
          </el-button>
          <el-button
            style="background-color: #1e56a0;color: white"
            @click="cancelModify()"
          >取消修改
          </el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "UsersList",
    props: {
      height: {
        type: String,
        default: '100%'
      },
      width: {
        type: String,
        default: '30%'
      },
    },
    data() {
      return {
        users: [],
        isEdit: false,
        uid: -1,
        user: {},
        username: '',
        phone: '',
        email: '',
        index: '',
        userForm: {
          username: '',
          phone: '',
          email: '',
        },
        userRules: {
          phone: [
            {pattern: /^1[0-9]{10}$/, message: "请输入格式正确的手机号", trigger: "blur",}
          ],
          email: [
            {
              pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
              message: "请输入格式正确的邮箱",
              trigger: "blur"
            },
          ],
        }
      }
    },
    methods: {

      editUser: function(index, row) {
        this.isEdit = true;
        this.index = index;
        this.user = row;
        this.userForm.username = row['username'];
        this.userForm.email = row['email'];
        this.userForm.phone = row['phone'];
      },

      commitModify: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let phone = this.userForm.phone === '' ? this.user['phone'] : this.userForm.phone;
            let email = this.userForm.email === '' ? this.user['email'] : this.userForm.email;
            let username = this.userForm.username === '' ? this.user['username'] : this.userForm.username;

            this.$axios.post("/api/admin/u/user", {
              uid: this.user['uid'],
              username: username,
              phone: phone,
              email: email
            })
              .then((res) => {
                console.log("用户修改信息res", res);
                if (res.data.status === 200) {
                  this.isEdit = false;
                  this.$refs['userForm'].resetFields();
                  this.$message.success("修改成功");
                  this.queryUserList();
                } else {
                  this.isEdit = false;
                  this.$refs['userForm'].resetFields();
                  this.$message.error("修改失败");
                }
              })
              .catch((err) => {
                console.log("修改失败", err);
              });
          }
        });
      },

      cancelModify: function() {
        this.isEdit = false;
        this.$refs['userForm'].resetFields();
      },

      deleteUser: function(index, uid) {
        this.$confirm('此操作将删除该用户，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
          .then(() => {
            console.log("uid = ", uid);
            this.$axios.post("/api/admin/d/user", {
              uid: uid
            })
              .then((res) => {
                if (res.data.status === 200) {
                  console.log("成功请求")
                  this.$message.success("删除成功");
                  this.queryUserList();
                }
              })
              .catch((err) => {
                console.log("删除失败", err);
                this.$message.error("删除失败");
              })
          });
        console.log(uid);
      },

      queryUserList: function() {
        let tempUsers = [];
        this.$axios.get("/api/admin/q/userList")
          .then((res) => {
            const items = res.data.data;
            for (let i = 0; i < items.length; i++) {
              let type = "尚未验证";
              if (items[i].accountType === 'student') {
                type = "学生";
              } else if (items[i].accountType === 'tutor') {
                type = "研究生秘书";
              }
              tempUsers.push({
                'uid': items[i].uid,
                'username': items[i].username,
                'phone': items[i].phone,
                'email': items[i].email,
                'accountType': type,
                'registerTime': items[i].registerTime.substring(0, 10),
              });
            }
            this.users = tempUsers;
          })
          .catch((err) => {
            console.log("获取用户列表错误", err);
          });
      }
    },
    created() {
      this.queryUserList();
    }
  }
</script>

<style scoped>
  .func-btn {
    margin-top: 30px;
  }

  /deep/ .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }
</style>
