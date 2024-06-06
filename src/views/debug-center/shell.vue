<template>
  <div>
    <div class="ele-body" style="padding-bottom: 71px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" @keyup.enter.native="submit"
        @submit.native.prevent>
        <el-card id="shellcard" shadow="never" header="系统指令"
          body-style="padding: 22px 22px 0 22px;" style="">
          <el-row :gutter="15">
            <el-col >
              <el-form-item label="快捷指令:">
                <el-button @click="shellClearRecord">清空全部记录</el-button>
                <el-button @click="shellClearFileCache">清空文件缓存</el-button>
                <el-button v-show="false" @click="recover">恢复出厂设置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="10" :md="12">
              <el-form-item label="shell命令:">
                <el-input v-model="form.shell" clearable>
                  <template slot="append">
                    <el-button @click="shellsubmit" style="color: red;">提交</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    sentSystemShell,shellClearRecord,shellClearFileCache,systemRecover
  } from '@/api/system-config';

  export default {
    name: 'SystemConfigUpLoad',
    data() {
      return {
        // 表单提交状态
        loading: false,
        // 表单数据
        form: {
          weight: 0,
          publicType: 1,
          versionUI: 'V1.0.1',
        },
        // 表单验证规则
        rules: {
          name: [{
            required: true,
            message: '请输入仓库名',
            trigger: 'blur'
          }],
        },
        // 表单验证信息
        validMsg: '',
      };
    },
    methods: {
      shellsubmit() {
        sentSystemShell({
          shell: this.form.shell
        }).then((data) => {
          this.$message.success(JSON.stringify(data));
        }).catch((msg) => {
          this.$message.error(msg);
        })
      },
      shellClearRecord(){
        this.$confirm('确认清空全部记录,该操作不可恢复', '提示', {
          type: 'warning'
        }).then(() => {
          shellClearRecord().then(()=>{
            this.$message.success("已清空全部记录");
          })
        })
      },
      recover(){
        this.$confirm('确认恢复出厂设置,该操作不可恢复', '提示', {
          type: 'warning'
        }).then(() => {
          systemRecover().then(()=>{
            this.$message.success("已恢复出厂设置");
          })
        })
      },
      shellClearFileCache(){
        this.$confirm('确认清空文件缓存,该操作不可恢复', '提示', {
          type: 'warning'
        }).then(() => {
          shellClearFileCache().then(()=>{
            this.$message.success("清空文件缓存");
          })
        })
      }
    }
  };
</script>

<style scoped></style>
