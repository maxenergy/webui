<!-- 视频通道编辑弹窗 -->
<template>
  <el-dialog width="460px" :visible="visible" :close-on-click-modal="false" :title="isUpdate ? '修改视频通道' : '添加视频通道'"
    @update:visible="updateVisible">
    <el-form :model="form" ref="form" :rules="rules" label-width="96px">
      <el-form-item label="通道名称:" prop="Cam_name">
        <el-input clearable v-model="form.Cam_name" placeholder="请输入视频通道名称" />
      </el-form-item>
      <el-form-item v-if="isUpdate" label="RTSP地址:" prop="Cam_path">
        <el-input clearable v-model="form.Cam_path" placeholder="请输入视频通道RTSP地址" readonly/>
      </el-form-item>
      <el-form-item v-else label="RTSP地址:" prop="Cam_path">
        <el-input clearable v-model="form.Cam_path" placeholder="请输入视频通道RTSP地址" />
      </el-form-item>

      <el-form-item label="编码方式:" prop="Cam_resolu">
        <el-select v-model="form.Cam_resolu" placeholder="请选择" style="width: 100%;">
          <el-option label="H.264" value="720"></el-option>
          <el-option label="H.265" value="1080"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input :rows="4" type="textarea" :maxlength="200" v-model="form.Cam_comments" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="updateVisible(false)">取消 </el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    addDevices,
    updateDevices,
  } from '@/api/config/channel_config';

  const DEFAULT_FORM = {
    Cam_Id: null,
    Cam_name: '',
    Cam_path: '',
    Cam_resolu: '',
    Cam_comments: ''
  };

  export default {
    name: 'DevicesEdit',
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 修改回显的数据
      data: Object,
      // 字典id
      dictId: String
    },
    data() {
      return {
        // 表单数据
        form: {
          ...DEFAULT_FORM
        },
        // 表单验证规则
        rules: {
          Cam_name: [{
            required: true,
            message: '请输入视频通道名称',
            trigger: 'blur'
          }],
          Cam_path: [{
            required: true,
            message: '请输入视频通道RTSP',
            trigger: 'blur'
          }],
          Cam_resolu:[{
            required: true,
            message: '请选择视频编码方式',
            trigger: 'blur'
          }]
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
          const saveOrUpdate = this.isUpdate ?
            updateDevices :
            addDevices;
          saveOrUpdate({
              ...this.form
            })
            .then((msg) => {
              let that = this;

              if(!that.isUpdate){
                that.$emit('done');
                that.$message.success('视频通道开始启动检测...');
                setTimeout(function(){
                  that.$message.success(msg);
                  that.updateVisible(false);
                  that.loading = false;
                },3000)
              }else{
                that.$emit('done');
                that.$message.success(msg);
                that.updateVisible(false);
              }
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
          this.form = {
            ...DEFAULT_FORM
          };
        }
      }
    }
  };
</script>

<style scoped></style>
