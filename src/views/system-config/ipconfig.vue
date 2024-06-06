<template>
  <div>
    <div class="ele-body" style="padding-top: 15px;">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-card shadow="never" header="IP地址配置" body-style="padding: 22px 22px 0 22px;">
          <!-- <el-row v-show="form.dhcp" :gutter="15">
            <el-col :lg="10" :md="12">
              <el-form-item label="开启DHCP:">
                <el-select v-model="form.dhcp" placeholder="请选择" class="ele-fluid	">
                  <el-option label="开启" :value="true"></el-option>
                  <el-option label="关闭" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <h3 class="title">LAN1(1000M)</h3>
          <div>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="IP地址:">
                  <el-input v-model="form.address" placeholder="192.168.100.80" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="子网掩码:">
                  <el-input v-model="form.netmask" placeholder="255.255.255.0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="网关:">
                  <el-input v-model="form.gateway" placeholder="192.168.100.1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="DNS:">
                  <el-input v-model="form.dns" placeholder="8.8.8.8" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <h3 class="title">LAN2(100M)</h3>
           <div>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="IP地址:">
                  <el-input v-model="form.address1" placeholder="192.168.100.80" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="子网掩码:">
                  <el-input v-model="form.netmask1" placeholder="255.255.255.0" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="网关:">
                  <el-input v-model="form.gateway1" placeholder="192.168.100.1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :lg="10" :md="12">
                <el-form-item label="DNS:">
                  <el-input v-model="form.dns" placeholder="8.8.8.8" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="15">
            <el-col :lg="10" :md="12">
              <el-form-item>
                <el-button type="primary" :loading="loading" @click="submit">
                  保存配置
                </el-button>
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
    getSystemAppconfig,
    setSystemIpconfig
  } from '@/api/system-config';

  export default {
    name: 'FormAdvanced',
    data() {
      return {
        // 表单提交状态
        loading: false,
        loading1: false,
        // 表单数据
        form: {
          serverUrl: null,
          uploadTime: null
        },
        // 表单验证规则
        rules: {

        },
        // 表单验证信息
        validMsg: '',
      };
    },
    mounted() {
      this.$nextTick(() => {
        getSystemAppconfig().then((data) => {
          this.form = data
        })
      })
    },
    methods: {
      /* 表单提交 */
      submit() {
        this.$refs['form'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading = true;
            // this.form.dhcp = false
            setSystemIpconfig(this.form).then(() => {
              this.loading = false;
              this.$message.success('保存成功');
            }).catch(() => {
              this.loading = false;
              this.$message.success('保存失败');
            })
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    }
  };
</script>

<style scoped>
    .title {
    padding:10px;
  }

</style>
