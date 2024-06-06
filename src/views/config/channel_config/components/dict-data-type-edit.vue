<!-- 视频通道编辑弹窗 -->
<template>
  <el-dialog width="580px" :visible="visible" :close-on-click-modal="false" title="检测类型绑定"
    @update:visible="updateVisible">
    <el-form :model="form" ref="form" :rules="rules" label-width="96px">


    </el-form>
    <div slot="footer">
      <el-button @click="updateVisible(false)">取消 </el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </div>


    <el-row :gutter="15">
      <!-- <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(1)?'always':'hover'" @click.native="bundingType(1)"
          :style="existenceBundingType(1)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/face.png" alt="人脸检测" :style="existenceBundingType(1)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人脸检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(2)?'always':'hover'" @click.native="bundingType(2)"
          :style="existenceBundingType(2)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/facecomparison.png" alt="人脸识别" :style="existenceBundingType(2)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人脸识别</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(3)?'always':'hover'" @click.native="bundingType(3)"
          :style="existenceBundingType(3)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/face68keys.png" alt="人脸68关键点" :style="existenceBundingType(3)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人脸68关键点</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(4)?'always':'hover'" @click.native="bundingType(4)"
          :style="existenceBundingType(4)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/head.png" alt="人头检测" :style="existenceBundingType(4)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人头检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(5)?'always':'hover'" @click.native="bundingType(5)"
          :style="existenceBundingType(5)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/humanbody.png" alt="人员检测" :style="existenceBundingType(5)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人员检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(6)?'always':'hover'" @click.native="bundingType(6)"
          :style="existenceBundingType(6)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/hand.png" alt="人手检测" :style="existenceBundingType(6)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人手检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(7)?'always':'hover'" @click.native="bundingType(7)"
          :style="existenceBundingType(7)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/safetyhat.png" alt="安全帽识别" :style="existenceBundingType(7)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>安全帽识别</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(8)?'always':'hover'" @click.native="bundingType(8)"
          :style="existenceBundingType(8)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/smoke.png" alt="吸烟检测" :style="existenceBundingType(8)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>吸烟检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(9)?'always':'hover'" @click.native="bundingType(9)"
          :style="existenceBundingType(9)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/call.png" alt="打电话检测" :style="existenceBundingType(9)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>打电话检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(10)?'always':'hover'" @click.native="bundingType(10)"
          :style="existenceBundingType(10)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/flame.png" alt="火焰检测" :style="existenceBundingType(10)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>火焰检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(11)?'always':'hover'" @click.native="bundingType(11)"
          :style="existenceBundingType(11)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/vehicledetection.png" alt="车辆检测" :style="existenceBundingType(11)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>车辆检测</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(12)?'always':'hover'" @click.native="bundingType(12)"
          :style="existenceBundingType(12)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/facepose.png" alt="人脸姿态估计" :style="existenceBundingType(12)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>人脸姿态估计</b>
          </div>
        </el-card>
      </el-col>
      <el-col style="width: 25%;padding: 7.5px;">
        <el-card class="project-list-item" :shadow="existenceBundingType(13)?'always':'hover'" @click.native="bundingType(13)"
          :style="existenceBundingType(13)?bundingStyle:noBundingStyle">
          <div class="project-list-cover">
            <img src="../../../../assets/electric.png" alt="电动车检测" :style="existenceBundingType(13)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body">
            <b>电动车检测</b>
          </div>
        </el-card>
      </el-col>
      -->
      <el-col v-for="item in AlarmTypes" :key="item.typeindex" style="width: 25%;">
        <el-card   class="project-list-item grid-content" :shadow="existenceBundingType(item.typeindex)?'always':'hover'"
                    @click.native="bundingType(item.typeindex)" v-show="isImgShow(item.name)"
                    
                    :style="existenceBundingType(item.typeindex)?bundingStyle:noBundingStyle">
          <div class="project-list-cover" >
            <img :src="item.src" :alt="item.label" 
              :style="existenceBundingType(item.typeindex)?'':nobundingimgStyle" />
          </div>
          <div class="project-list-body" >
            <b>{{item.label}}</b>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </el-dialog>
</template>

<script>
  import {
    aigetconfig,
    aisetconfig,
    aiGetAlgorithm
  } from '@/api/config/channel_config';
  const DEFAULT_FORM = {
    Cam_Id: null,
    Cam_name: '',
    Cam_path: '',
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
      dictId: String,
    },
    data() {
      return {
        url:require('@/assets/smoke.png'),
        AlarmTypes: [],
        bundingTypes: [],
        aiRect: [],
        noBundingStyle: {
          'text-align': 'center',
          'background-color': 'ghostwhite',
          border: '2px solid #CCCCCC',
          color: '#AAAAAA'
        },
        bundingStyle: {
          'text-align': 'center',
          'background-color': 'ghostwhite',
          border: '2px solid #347dff',
          color: '#2d90cf'
        },
        nobundingimgStyle: {
          "-webkit-filter": "grayscale(100%)",
          filter: "grayscale(100%)"
        },
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
        },
        // 提交状态
        loading: false,
        // 是否是修改
        isUpdate: false
      };
    },
    mounted() {
        aiGetAlgorithm()
            .then((msg) => {
              this.loading = false;
              this.AlarmTypes = msg.list;
              console.log(msg);
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
    },
    methods: {
      isImgShow(src){
        return src.indexOf("NULL")==0?false:true;
      },
      /* 保存编辑 */
      save() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          // const saveOrUpdate = this.isUpdate ?
          //   updateDevices :
          //   addDevices;
          aisetconfig({
              device: this.form,
              aiType: this.bundingTypes.join(','),
              aiRect: this.aiRect
            })
            .then((msg) => {
              this.loading = false;
              this.$message.success(msg);
              this.updateVisible(false);
              //this.$emit('done');
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
        });
      },
      bundingType(type){
        console.log(this.form)
        if(this.bundingTypes.indexOf(type)>-1){
          this.bundingTypes.splice(this.bundingTypes.indexOf(type),1)
        }else{
          this.bundingTypes.push(type)
        }
      },
      existenceBundingType(type){
        return this.bundingTypes.indexOf(type)>-1;
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
        this.$emit('done');
      }
    },
    watch: {
      visible(visible) {
        if (visible) {

          console.log()

          this.loading = true;
          aigetconfig({device: this.data})
            .then((res) => {
              this.loading = false;
              //this.$message.success();
              if(res.aiType){
                this.bundingTypes = res.aiType.split(',').map(Number)
              }
              this.aiRect = res.aiRect
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });

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
          this.bundingTypes=[]
          this.aiRect = []
        }
      }
    }
  };
</script>

<style scoped>
  .grid-content {
    margin-bottom: 7.5px;
  }
</style>
