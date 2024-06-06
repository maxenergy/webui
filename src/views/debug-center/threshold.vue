<template>
  <div class="ele-body" style="padding-bottom: 71px">
    <el-form ref="form" label-width="100px">
      <el-card
        shadow="never"
        header="摄像头检测-算法阈值配置"
        body-style="padding: 22px 22px 0 22px;"
      >
        <el-row :gutter="15">
          <el-col :lg="8" :md="12" :sm="18" :xs="24">
            <el-form-item label="摄像头:">
              <el-select
                v-model="current"
                clearable
                placeholder="请选择"
                style="width: 100%;"
                :disabled="!showEdit"
              >
                <el-option
                  v-for="item in loadallDevices"
                  :key="item.Cam_path"
                  :label="item.Cam_name"
                  :value="item.Cam_path"
                >
                  <span style="float: left">{{ item.Cam_name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-button
              :type="showEdit ? 'primary' : 'warning'"
              @click.native="edit"
              :loading="loading"
              >{{ showEdit ? '编辑' : '保存' }}</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="15">
             <el-col
            v-for="item in AlarmTypes"
            :key="item.typeindex"
            style="width: 535px;"
          >
            <el-form-item :label="item.label" v-show="isImgShow(item.name)">
              <div class="block">
                <el-slider
                  v-model="values[item.typeindex]"
                  show-input
                  :min="10"
                  :max="100"
                  :disabled="showEdit"
                >
                </el-slider>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import {
    // loadallDevicesConfig,
    loadallDevicesss
  } from '@/api/debug-center';
  import {
    aigetconfig,
    aisetconfigthreshold,
    aiGetAlgorithm
  } from '@/api/config/channel_config';

  export default {
    name: '算法阈值配置',
    components: {},
    data() {
      return {
        AlarmTypes: [],
        loadallDevices: [],
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: true,
        // 编辑回显数据
        editData: null,
        loading: false,
        showEditNumber: false,
        values: []
      };
    },
    mounted: function() {
      aiGetAlgorithm()
        .then((msg) => {
          this.AlarmTypes = msg.list;
          let a = [];
          for (let i = 0; i < this.AlarmTypes.length; i++) {
            a.push(10);
          }
          console.log(a);
          this.values = a;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
      loadallDevicesss().then((res) => {
        this.loadallDevices = this.loadallDevices.concat(res.list);
        console.log(this.loadallDevices);
      });
    },
    methods: {
      isImgShow(src){
        return src.indexOf("NULL")==0?false:true;
      },
      edit() {
        if (!this.current) {
          this.$message.error('请先选择摄像头');
          return;
        }

        if (this.showEdit) {
          this.loading = true;

          for (let i = 0; i < this.loadallDevices.length; i++) {
            if (this.loadallDevices[i].Cam_path == this.current) {
              aigetconfig({ device: this.loadallDevices[i] })
                .then((res) => {
                  this.showEdit = !this.showEdit;
                  this.loading = false;
                  console.log(res);
                  if (res.threshold) {
                    let thresholds = res.threshold.split(',');
                    for (let i = 0; i < thresholds.length; i++) {
                      this.values[i] = parseInt(thresholds[i] * 100);
                    }
                  } else {
                    let a = [];
                    for (let i = 0; i < this.AlarmTypes.length; i++) {
                      a.push(10);
                    }
                    console.log(a);
                    this.values = a;
                  }
                })
                .catch((e) => {
                  this.loading = false;
                  this.$message.error(e.message);
                });
            }
          }
          return;
        }

        let thresholds = new Array();
        for (let i = 0; i < this.values.length; i++) {
          thresholds.push(this.values[i] / 100);
        }

        for (let i = 0; i < this.loadallDevices.length; i++) {
          if (this.loadallDevices[i].Cam_path == this.current) {
            let body = {
              device: this.loadallDevices[i],
              threshold: thresholds.join(',')
            };

            this.loading = true;
            aisetconfigthreshold(body)
              .then(() => {
                this.loading = false;
                this.$message.success('修改成功');
                this.showEdit = !this.showEdit;
              })
              .catch((e) => {
                this.loading = false;
                this.loading = false;
                this.$message.error(e.message);
              });
          }
        }
      }
    }
  };
</script>

<style scoped></style>
