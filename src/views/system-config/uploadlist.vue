<template>
  <div style="padding: 8px;">
    <el-row
      :gutter="15"
      class="ele-body"
      style="padding-bottom: 0;padding-top: 0;"
    >
      <el-card style="margin: 0;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="设备云对接(HTTP协议)" name="first">
            <el-col :md="24">
              <div class="ele-body" style="padding-bottom: 0;">
                <el-form
                  ref="form1"
                  :model="form1"
                  :rules="rules1"
                  label-width="100px"
                >
                  <el-card
                    shadow="never"
                    header="设备云对接(HTTP协议)"
                    body-style="padding: 22px 22px 0 22px;"
                  >
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="服务器地址:">
                          <el-input
                            v-model="form1.cloudServerUrl"
                            placeholder="http://demo.com/upload-url"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="心跳间隔时间:">
                          <el-input
                            type="number"
                            v-model="form1.heartBeat"
                            placeholder="30"
                          >
                            <template slot="append">秒</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="8" :md="12" style="height: 40px">
                        <el-form-item>
                          <el-button
                            type="primary"
                            :loading="loading1"
                            @click="submit1"
                          >
                            提交
                          </el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-form>
              </div>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="设备云对接(MQTT协议)" name="second">
            <el-col :md="24">
              <div class="ele-body" style="padding-bottom: 0;">
                <el-form
                  ref="form4"
                  :model="form4"
                  :rules="rules"
                  label-width="100px"
                >
                  <el-card
                    shadow="never"
                    header="设备云对接(MQTT协议)"
                    body-style="padding: 22px 22px 0 22px;"
                  >
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="MQ服务地址:">
                          <el-input
                            v-model="form4.mqttAddress"
                            placeholder="tcp://192.168.0.102:61613"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="自定义SN码:">
                          <el-input
                            v-model="form4.sn"
                            placeholder="自定义SN码"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="MQTT账号:">
                          <el-input
                            type="text"
                            v-model="form4.mqttUsername"
                            placeholder="MQTT账号"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="MQTT密码:">
                          <el-input
                            type="text"
                            v-model="form4.mqttPassword"
                            placeholder="MQTT密码"
                          >
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="8" :md="12" style="height: 40px">
                        <el-form-item>
                          <el-button
                            type="primary"
                            :loading="loading4"
                            @click="submit4"
                          >
                            提交
                          </el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-form>
              </div>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="设备云对接(SNUrl协议)" name="thess">
            <el-col :md="24">
              <div class="ele-body" style="padding-bottom: 0;">
                <el-form
                  ref="form5"
                  :model="form5"
                  :rules="rules"
                  label-width="100px"
                >
                  <el-card
                    shadow="never"
                    header="设备云对接(SNUrl协议)"
                    body-style="padding: 22px 22px 0 22px;"
                  >
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="自定义SNUrl:">
                          <el-input
                            v-model="form5.snUrl"
                            placeholder="自定义SNUrl"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="8" :md="12" style="height: 40px">
                        <el-form-item>
                          <el-button
                            type="primary"
                            :loading="loading5"
                            @click="submit5"
                          >
                            提交
                          </el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-form>
              </div>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>

    <el-row :gutter="15" class="ele-body">
      <el-card>
        <el-tabs v-model="activeName2" @tab-click="handleClick2">
          <el-tab-pane label="第三方数据上报配置" name="first">
            <el-col :md="24">
              <div class="ele-body" style="padding-bottom: 0;">
                <el-form
                  ref="form"
                  :model="form"
                  :rules="rules"
                  label-width="100px"
                >
                  <el-card
                    shadow="never"
                    header="第三方数据上报配置"
                    body-style="padding: 22px 22px 0 22px;"
                  >
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="上报地址:">
                          <el-input
                            v-model="form.serverUrl"
                            placeholder="http://demo.com/upload-url"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="上报间隔时间:">
                          <el-input
                            type="number"
                            v-model="form.uploadTime"
                            placeholder="30"
                          >
                            <template slot="append">秒</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17" style="height: 40px">
                        <el-form-item>
                          <el-button
                            type="primary"
                            :loading="loading"
                            @click="submit"
                          >
                            提交
                          </el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-form>
              </div>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="第三方数据上报配置(备用)" name="second">
            <el-col :md="24">
              <div class="ele-body" style="padding-bottom: 0;">
                <el-form
                  ref="form3"
                  :model="form3"
                  :rules="rules"
                  label-width="100px"
                >
                  <el-card
                    shadow="never"
                    header="第三方数据上报配置(备用)"
                    body-style="padding: 22px 22px 0 22px;"
                  >
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="上报地址:">
                          <el-input
                            v-model="form3.WeChatUrl"
                            placeholder="http://demo.com/upload-url"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17">
                        <el-form-item label="上报间隔时间:">
                          <el-input
                            readonly
                            type="number"
                            v-model="form.uploadTime"
                            placeholder="30"
                          >
                            <template slot="append">秒</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="15">
                      <el-col :lg="11" :md="17" style="height: 40px">
                        <el-form-item>
                          <el-button
                            type="primary"
                            :loading="loading3"
                            @click="submit3"
                          >
                            提交
                          </el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-form>
              </div>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>

    <div class="ele-body" style="padding: 7px;padding-top: 0;">
      <el-form ref="form2" :model="form2" :rules="rules2" label-width="140px">
        <el-card
          shadow="never"
          header="算法间隔配置"
          body-style="padding: 22px 22px 0 22px;"
        >
          <el-row :gutter="15">
            <el-col :lg="11" :md="17">
              <el-form-item label="人员离岗间隔时间:">
                <el-input
                  type="number"
                  v-model="form2.TimeLiGuang"
                  placeholder="30"
                >
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="11" :md="17">
              <el-form-item label="人员离岗人数(<=):">
                <el-input
                  type="number"
                  v-model="form2.LiGuang"
                  placeholder="30"
                >
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="11" :md="17">
              <el-form-item label="区域人数时间间隔:">
                <el-input
                  type="number"
                  v-model="form2.TimeQuYuRenShu"
                  placeholder="30"
                >
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="11" :md="17">
              <el-form-item label="区域人数(>=):">
                <el-input
                  type="number"
                  v-model="form2.QuYuRenShu"
                  placeholder="30"
                >
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="11" :md="17">
              <el-form-item label="人员聚众间隔时间:">
                <el-input
                  type="number"
                  v-model="form2.TimeRenYuanJuZhong"
                  placeholder="30"
                >
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="11" :md="17">
              <el-form-item label="人员聚众人数(>=):">
                <el-input
                  type="number"
                  v-model="form2.RenYuanJuZhong"
                  placeholder="30"
                >
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="11" :md="17">
              <el-form-item label="超员检测间隔时间:">
                <el-input
                  type="number"
                  v-model="form2.TimeChaoYuan"
                  placeholder="30"
                >
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="11" :md="17">
              <el-form-item label="超员检测人数(>=):">
                <el-input
                  type="number"
                  v-model="form2.ChaoYuan"
                  placeholder="30"
                >
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="11" :md="17">
              <el-form-item label="少员检测间隔时间:">
                <el-input
                  type="number"
                  v-model="form2.TimeShaoYuan"
                  placeholder="30"
                >
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="11" :md="17">
              <el-form-item label="少员检测人数(<=):">
                <el-input
                  type="number"
                  v-model="form2.ShaoYuan"
                  placeholder="30"
                >
                  <template slot="append">人</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="11" :md="17">
              <el-form-item label="车辆离开间隔时间:">
                <el-input
                  type="number"
                  v-model="form2.TimeCheLingLiKai"
                  placeholder="30"
                >
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="11" :md="17">
              <el-form-item label="车辆离开辆数(<=):">
                <el-input
                  type="number"
                  v-model="form2.CheLingLiKai"
                  placeholder="30"
                >
                  <template slot="append">辆</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :lg="8" :md="12">
              <el-form-item>
                <el-button type="primary" :loading="loading2" @click="submit2">
                  提交
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
    getRocordUpload,
    setRocordUpload,
    setRocordServer,
    getRocordServer,
    getRocordTimeInterval,
    setRocordTimeInterval,
    getRocordUploadSpare,
    setRocordUploadSpare,
    getMqttConfig,
    setMqttConfig,
    getSnUrl,
    setSnUrl
  } from '@/api/system-config';

  export default {
    name: 'FormAdvanced',
    data() {
      return {
        // 表单提交状态
        loading: false,
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
        // 表单数据
        form: {
          serverUrl: null,
          uploadTime: null
        },
        form1: {
          cloudServerUrl: null,
          heartBeat: 0
        },
        form2: {
          LiGuang: 0,
          QuYuRenShu: 1,
          RenYuanJuZhong: 1,
          ChaoYuan: 1,
          ShaoYuan: 1,
          CheLingLiKai: 0,
          TimeLiGuang: 30,
          TimeQuYuRenShu: 30,
          TimeRenYuanJuZhong: 30,
          TimeChaoYuan: 30,
          TimeShaoYuan: 30,
          TimeCheLingLiKai: 30
        },
        form3: {
          WeChatUrl: null,
          uploadTime: null
        },
        form4: {
          mqttAddress: null,
          mqttUsername: null,
          mqttPassword: null
        },
        form5: {
          snUrl: null
        },
        // 表单验证规则
        rules: {},
        // 表单验证信息
        validMsg: '',
        activeName: 'first',
        activeName2: 'first'
      };
    },
    mounted() {
      this.$nextTick(() => {
        getRocordUpload().then((data) => {
          this.form = data;
        });
        getRocordServer().then((data) => {
          this.form1 = data;
        });
        getRocordTimeInterval().then((data) => {
          this.form2 = data;
        });
        getRocordUploadSpare().then((data) => {
          this.form3 = data;
        });
        getMqttConfig().then((data) => {
          this.form4 = data;
        });
        getSnUrl().then((data) => {
          this.form5 = data;
        });
      });
    },
    methods: {
      /* 表单提交 */
      submit() {
        this.$refs['form'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading = true;
            this.form.uploadTime = parseInt(this.form.uploadTime);
            setRocordUpload(this.form)
              .then(() => {
                this.loading = false;
                this.$message.success('保存成功');
              })
              .catch(() => {
                this.loading = false;
                this.$message.success('保存失败');
              });
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      submit1() {
        this.loading1 = true;
        this.$refs['form1'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading1 = true;
            this.form1.heartBeat = parseInt(this.form1.heartBeat);
            setRocordServer(this.form1)
              .then(() => {
                this.loading1 = false;
                this.$message.success('保存成功');
              })
              .catch(() => {
                this.loading1 = false;
                this.$message.success('保存失败');
              });
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      submit2() {
        this.loading2 = true;
        this.$refs['form2'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading2 = true;

            this.form2.LiGuang = parseInt(this.form2.LiGuang);
            this.form2.QuYuRenShu = parseInt(this.form2.QuYuRenShu);
            this.form2.RenYuanJuZhong = parseInt(this.form2.RenYuanJuZhong);
            this.form2.ChaoYuan = parseInt(this.form2.ChaoYuan);
            this.form2.ShaoYuan = parseInt(this.form2.ShaoYuan);
            this.form2.CheLingLiKai = parseInt(this.form2.CheLingLiKai);

            this.form2.TimeLiGuang = parseInt(this.form2.TimeLiGuang);
            this.form2.TimeQuYuRenShu = parseInt(this.form2.TimeQuYuRenShu);
            this.form2.TimeRenYuanJuZhong = parseInt(
              this.form2.TimeRenYuanJuZhong
            );
            this.form2.TimeChaoYuan = parseInt(this.form2.TimeChaoYuan);
            this.form2.TimeShaoYuan = parseInt(this.form2.TimeShaoYuan);
            this.form2.TimeCheLingLiKai = parseInt(this.form2.TimeCheLingLiKai);
            setRocordTimeInterval(this.form2)
              .then(() => {
                this.loading2 = false;
                this.$message.success('保存成功');
              })
              .catch(() => {
                this.loading2 = false;
                this.$message.success('保存失败');
              });
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      submit3() {
        this.loading3 = true;
        this.$refs['form3'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading3 = true;
            setRocordUploadSpare(this.form3.WeChatUrl)
              .then(() => {
                this.loading3 = false;
                this.$message.success('保存成功');
              })
              .catch(() => {
                this.loading3 = false;
                this.$message.success('保存失败');
              });
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      submit4() {
        this.loading4 = true;
        this.$refs['form4'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading4 = true;
            setMqttConfig(this.form4)
              .then(() => {
                this.loading4 = false;
                this.$message.success('保存成功');
              })
              .catch(() => {
                this.loading4 = false;
                this.$message.success('保存失败');
              });
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      submit5() {
        this.loading5 = true;
        this.$refs['form5'].validate((valid, obj) => {
          if (valid) {
            this.validMsg = '';
            this.loading4 = true;
            setSnUrl(this.form5)
              .then(() => {
                this.loading5 = false;
                this.$message.success('保存成功');
              })
              .catch(() => {
                this.loading5 = false;
                this.$message.success('保存失败');
              });
          } else {
            this.validMsg = ` 共有校验 ${Object.keys(obj).length} 项不通过`;
            return false;
          }
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleClick2(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style scoped></style>
