<template>
  <div>
    <div class="ele-body" style="padding-bottom: 71px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" @keyup.enter.native="submit"
        @submit.native.prevent>
        <el-card shadow="never" header="系统信息" body-style="padding: 22px 22px 0 22px;">
          <el-row :gutter="15">
            <el-col :lg="10" :md="12">
              <el-form-item label="系统版本号:">
                <el-input v-model="form.versionSystem" placeholder="V1.1.0" readonly clearable />
              </el-form-item>
            </el-col>
            <el-col :lg="10" :md="12">
              <el-form-item label="APP版本号:">
                <el-input v-model="form.versionApp" placeholder="V1.1.0" readonly clearable />
              </el-form-item>
            </el-col>
            <el-col :lg="10" :md="12">
              <el-form-item label="UI版本号:">
                <el-input v-model="form.versionUI" placeholder="V1.1.0" readonly clearable />
              </el-form-item>
            </el-col>
            <el-col :lg="10" :md="12">
              <el-form-item label="模型版本号:">
                <el-input v-model="form.versionModel" placeholder="V1.1.0" readonly clearable />
              </el-form-item>
            </el-col>
            <el-col style="width: 100%;">
              <el-form-item label="显示预览框:">
                <el-switch
                  v-model="form.isLocalPlay"
                  @change="updateLocalPlay"
                  active-text="显示预览分析框"
                  inactive-text="隐藏预览分析框">
                </el-switch>
                <span v-if="form.isLocalPlay" style="color: red;padding-left: 50px;">带预览框会降低清晰度并且相对占用资源较大</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="8" :md="12">
              <el-form-item label="仓库域名:" prop="url">
                <el-input v-model="form.url" placeholder="请输入" clearable>
                  <template slot="prepend">http://</template>
                  <template slot="append">.com</template>
                </el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-card>
        <el-card shadow="never" :header="form.registed?'系统授权(已授权)':'系统授权(未授权)'" body-style="padding: 22px 22px 0 22px;">
          <el-row :gutter="15">
            <el-col :lg="10" :md="12">
              <el-form-item label="系统机器码:">
                {{form.machineCode}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="10" :md="12">
              <el-form-item label="系统注册码:">
                <el-input placeholder="请输入注册码" v-model="form.registcode" style="max-width: 400px;">
                    <el-button slot="append" @click="registcode" style="background-color: #1890ff;color: white;border-radius: 0px 3px 3px 0px;border: 1px solid #1890ff;">提交</el-button>
                  </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="never" header="系统升级" body-style="padding: 22px 22px 0 22px;">
          <el-row :gutter="15">
            <!-- <el-col :lg="8" :md="12">
              <el-form-item label="系统升级:">
                <el-upload class="upload-demo" ref="upload" action="/api/system/update" :on-preview="handlePreview"
                  :on-remove="handleRemove">
                  <el-button slot="trigger" size="small" type="primary">选取升级包文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="APP升级:">
                <el-upload class="upload-demo" ref="upload" action="/api/system/update/app" :before-upload="handleFileSize">
                  <el-button slot="trigger" size="small" type="primary">选取升级包文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="模型升级:">
                <el-upload class="upload-demo" ref="upload" action="/api/system/update/model" accept=".zip"
                  :before-upload="handleBeforeUpload">
                  <el-button slot="trigger" size="small" type="primary">选取升级包文件</el-button>
                  <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-top: 0">只能上传zip文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="前端升级:">
                <el-upload class="upload-demo" ref="upload" action="/api/system/update/ui" accept=".zip"
                  :before-upload="handleBeforeUpload">
                  <el-button slot="trigger" size="small" type="primary">选取升级包文件</el-button>
                  <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-top: 0">只能上传zip文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item label="文件上传:">
                <el-upload class="upload-demo" ref="upload" action="/api/mp4"
                  :before-upload="handleBeforeUploadMP4">
                  <el-button slot="trigger" size="small" type="primary">&ensp;选取文件&ensp;</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card id="shellcard" shadow="never" header="系统升级" style="display: none;"
          body-style="padding: 22px 22px 0 22px;">
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
    getSystemLogos,
    sentSystemShell,
    setIsLocalPlay,
    setregistcode
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
          versionUI: 'Base_V1.6.5',
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
        getSystemLogos().then((data) => {
          let versionUI = this.form.versionUI
          this.form = data
          this.form.versionUI = versionUI
        })
      })
    },
    methods: {
      /* 表单提交 */
      updateLocalPlay(val){
        let status = val?1:0
        setIsLocalPlay(status).then(()=>{
          this.$message.success('设置成功')
          setTimeout(function(){
            window.location.reload()
          },100)
        })
      },
      submit() {
        this.$refs['form'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$message.success('提交成功');
            }, 1500);
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      shellsubmit() {
        sentSystemShell({
          shell: this.form.shell
        }).then((data) => {
          this.$message.success(JSON.stringify(data));
        }).catch((msg) => {
          this.$message.error(msg);
        })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      registcode(){
        if(this.form.registcode){
          setregistcode(this.form.registcode).then(()=>{
            this.form.registed = true
          }).catch(()=>{
            this.$message.error('注册码错误')
          })
          return;
        }
        this.$message.error('请输入注册码')
      },
      handleBeforeUpload(file) {
        console.log(file)

        if(!this.handleFileSize(file)){
          return false
        }
        let suffix = this.getFileType(file.name)
        let suffixArray = ["zip"] //限制的文件类型，根据情况自己定义
        if (suffixArray.indexOf(suffix) === -1) {
          this.$message({
            message: "文件格式错误",
            type: "error",
            duration: 2000
          })
          return false
        }
      },
      handleBeforeUploadMP4() {
        /* let suffix = this.getFileType(file.name)
        let suffixArray = ["mp4"] //限制的文件类型，根据情况自己定义
        if (suffixArray.indexOf(suffix) === -1) {
          this.$message({
            message: "文件格式错误",
            type: "error",
            duration: 2000
          })
          return false
        } */
      },
      handleFileSize(file){
        if (file.size / (1024 * 1024) > 1000) { // 限制文件大小
          this.$message.warning(`当前限制文件大小不能大于100Mb`)
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
