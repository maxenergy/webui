<template>
  <div>
    <div class="ele-body" style="padding-bottom: 71px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-card shadow="never" header="LOGO和标题" body-style="padding: 22px 22px 0 22px;">
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="系统标题:">
                <el-input v-model="form.title" placeholder="人工智能推理系统" clearable>
                  <template slot="append" @click="systemSetTitle">
                    <el-button @click="systemSetTitle">保存</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="系统logo:">
                <el-upload class="upload-demo" ref="upload1" action="/api/system/logo"
                  accept=".png,.jpeg,.jpg" :before-upload="handleBeforeLogoUpload">
                  <el-button slot="trigger" size="small" type="primary">上传系统logo</el-button>
                  <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-top: 0;" >只能上传jpg/png文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="系统icon:">
                <el-upload class="upload-demo" ref="upload1" action="/api/system/icon"
                  accept=".ico" :before-upload="handleBeforeIconUpload">
                  <el-button slot="trigger" size="small" type="primary">上传系统icon</el-button>
                  <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-top: 0">只能上传ico文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { getSystemLogos, setSystemTitle } from "@/api/system-config"
  export default {
    name: 'FormAdvanced',
    data() {
      return {
        // 表单提交状态
        loading: false,
        // 表单数据
        form: {
          title: null
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
    mounted() {
      this.$nextTick(() => {
        getSystemLogos().then((data)=>{
          this.form.title = data.title
          console.log(data)
        })
      })
    },
    methods: {
      systemSetTitle() {
        setSystemTitle(this.form).then(()=>{
          this.$message.success('修改成功,刷新后生效');
        })
      },
      handleBeforeLogoUpload(file) {
        if(!this.handleFileSize(file)){
          return false
        }
        let suffix = this.getFileType(file.name)
        let suffixArray = ["png","jpg","jpeg"] //限制的文件类型，根据情况自己定义
        if (suffixArray.indexOf(suffix) === -1) {
          this.$message({
            message: "文件格式错误",
            type: "error",
            duration: 2000
          })
          return false
        }
      },
      handleBeforeIconUpload(file) {
        if(!this.handleFileSize(file)){
          return false
        }
        let suffix = this.getFileType(file.name)
        let suffixArray = ["ico"] //限制的文件类型，根据情况自己定义
        if (suffixArray.indexOf(suffix) === -1) {
          this.$message({
            message: "文件格式错误",
            type: "error",
            duration: 2000
          })
          return false
        }
      },
      handleFileSize(file){
        if (file.size / (1024 * 1024) > 20) { // 限制文件大小
          this.$message.warning(`当前限制文件大小不能大于20Mb`)
          return false
        }
        return true
      },
      getFileType(name) {
        let startIndex = name.lastIndexOf(".")
        if (startIndex !== -1) {
          return name.slice(startIndex + 1).toLowerCase()
        } else {
          return ""
        }
      }
    }
  };
</script>

<style scoped></style>
