<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    width="680px"
    :visible="visible"
    :close-on-click-modal="false"
    custom-class="ele-dialog-form"
    :title="isUpdate ? '修改用户' : '添加用户'"
    @update:visible="updateVisible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="82px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="用户账号:" prop="username">
            <el-input
              clearable
              :maxlength="20"
              :disabled="isUpdate"
              v-model="form.username"
              placeholder="请输入用户账号"
            />
          </el-form-item>
          <el-form-item label="用户名:" prop="nickname">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.nickname"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select
              clearable
              class="ele-block"
              v-model="form.sex"
              placeholder="请选择性别"
            >
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="角色:" prop="roleIds">
            <role-select v-model="form.roleIds" />
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.email"
              placeholder="请输入邮箱"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item label="手机号:" prop="phone">
            <el-input
              clearable
              :maxlength="11"
              v-model="form.phone"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item label="出生日期:" prop="birthday">
            <el-date-picker
              type="date"
              class="ele-fluid"
              v-model="form.birthday"
              value-format="yyyy-MM-dd"
              placeholder="请选择出生日期"
            />
          </el-form-item>
          <el-form-item v-if="!isUpdate" label="登录密码:" prop="password">
            <el-input
              show-password
              :maxlength="20"
              v-model="form.password"
              placeholder="请输入登录密码"
            />
          </el-form-item>
          <el-form-item label="个人简介:">
            <el-input
              :rows="4"
              clearable
              type="textarea"
              :maxlength="200"
              v-model="form.introduction"
              placeholder="请输入个人简介"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="updateVisible(false)">取消 </el-button>
      <el-button type="primary" :loading="loading" @click="save"
        >保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { emailReg, phoneReg } from 'ele-admin/packages/utils/validate';
  import RoleSelect from './role-select';
  import { addUser, updateUser, checkExistence } from '@/api/system/user';
  const DEFAULT_FORM = {
    userId: null,
    username: '',
    nickname: '',
    sex: null,
    roleIds: [],
    email: '',
    phone: '',
    birthday: '',
    password: '',
    introduction: ''
  };

  export default {
    name: 'UserEdit',
    components: { RoleSelect },
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 修改回显的数据
      data: Object
    },
    data() {
      return {
        // 表单数据
        form: { ...DEFAULT_FORM },
        // 表单验证规则
        rules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('请输入用户账号'));
                }
                checkExistence('username', value, this.data?.username)
                  .then(() => {
                    callback(new Error('账号已经存在'));
                  })
                  .catch(() => {
                    callback();
                  });
              }
            }
          ],
          nickname: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          sex: [
            {
              required: true,
              message: '请选择性别',
              trigger: 'blur'
            }
          ],
          roleIds: [
            {
              required: true,
              message: '请选择角色',
              trigger: 'blur'
            }
          ],
          email: [
            {
              pattern: emailReg,
              message: '邮箱格式不正确',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              pattern: /^[\S]{5,18}$/,
              message: '密码必须为5-18位非空白字符',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              pattern: phoneReg,
              message: '手机号格式不正确',
              trigger: 'blur'
            }
          ]
        },
        // 提交状态
        loading: false,
        // 是否是修改
        isUpdate: false
      };
    },
    methods: {
      /* 保存编辑 */
      save() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          const data = {
            ...this.form,
            roles: this.form.roleIds.map((d) => {
              return { roleId: d };
            })
          };
          const saveOrUpdate = this.isUpdate ? updateUser : addUser;
          saveOrUpdate(data)
            .then((msg) => {
              this.loading = false;
              this.$message.success(msg);
              this.updateVisible(false);
              this.$emit('done');
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        });
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
      }
    },
    watch: {
      visible(visible) {
        if (visible) {
          if (this.data) {
            this.$util.assignObject(this.form, {
              ...this.data,
              roleIds: this.data.roles.map((d) => d.roleId),
              password: ''
            });
            this.isUpdate = true;
          } else {
            this.isUpdate = false;
          }
        } else {
          this.$refs['form'].clearValidate();
          this.form = { ...DEFAULT_FORM };
        }
      }
    }
  };
</script>

<style scoped></style>
