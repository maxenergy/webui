<!-- 字典编辑弹窗 -->
<template>
  <el-dialog
    width="460px"
    :visible="visible"
    :close-on-click-modal="false"
    :title="isUpdate ? '修改字典' : '添加字典'"
    @update:visible="updateVisible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="82px">
      <el-form-item label="字典名称:" prop="dictName">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.dictName"
          placeholder="请输入字典名称"
        />
      </el-form-item>
      <el-form-item label="字典值:" prop="dictCode">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.dictCode"
          placeholder="请输入字典值"
        />
      </el-form-item>
      <el-form-item label="排序号:" prop="sortNumber">
        <el-input-number
          :min="0"
          :max="9999"
          v-model="form.sortNumber"
          controls-position="right"
          placeholder="请输入排序号"
          class="ele-fluid ele-text-left"
        />
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          :rows="4"
          type="textarea"
          :maxlength="200"
          v-model="form.comments"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addDictionary, updateDictionary } from '@/api/system/dictionary';
  const DEFAULT_FORM = {
    dictId: null,
    dictName: '',
    dictCode: '',
    sortNumber: null,
    comments: ''
  };

  export default {
    name: 'DictEdit',
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
          dictName: [
            {
              required: true,
              message: '请输入字典名称',
              trigger: 'blur'
            }
          ],
          dictCode: [
            {
              required: true,
              message: '请输入字典值',
              trigger: 'blur'
            }
          ],
          sortNumber: [
            {
              required: true,
              message: '请输入排序号',
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
          const saveOrUpdate = this.isUpdate ? updateDictionary : addDictionary;
          saveOrUpdate(this.form)
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
            this.$util.assignObject(this.form, this.data);
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
