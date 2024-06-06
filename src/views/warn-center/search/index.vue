<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="77px" class="ele-form-search" @keyup.enter.native="search" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :lg="5" :md="5" :sm="5" :xs="5">
            <el-input v-model="where.Cam_name" placeholder="请输入通道名称"></el-input>
          </el-col>
          <el-col :lg="5" :md="5" :sm="5" :xs="5">
            <el-select v-model="where.type" placeholder="请选择报警类型" class="ele-fluid">
              <!-- <el-option :value="1" label="人脸检测" />
              <el-option :value="2" label="人脸识别" />
              <el-option :value="3" label="人脸68关键点" />
              <el-option :value="4" label="人头检测" />
              <el-option :value="5" label="人员检测" />
              <el-option :value="6" label="人手检测" />
              <el-option :value="7" label="安全帽识别" />
              <el-option :value="8" label="吸烟检测" />
              <el-option :value="9" label="打电话检测" />
              <el-option :value="10" label="火焰检测" />
              <el-option :value="11" label="车辆检测" />
              <el-option :value="12" label="人脸姿态估计" />
              <el-option :value="13" label="电动车检测" /> -->
              <el-option :value="getIndex(-1)" label="请选择报警类型" />
              <!-- <el-option :value="0" label="抽烟检测" />
              <el-option :value="1" label="打电话检测" />
              <el-option :value="2" label="烟火检测" />
              <el-option :value="3" label="反光衣检测" />
              <el-option :value="4" label="安全帽检测" />
              <el-option :value="5" label="人员闯入检测" /> -->
              <el-option v-for="item in AlarmTypes" :key="item.typeindex" :value="getIndex(item.typeindex)" :label="item.label" v-show="isImgShow(item.name)"/>
            </el-select>
          </el-col>
          <el-col :lg="5" :md="5" :sm="5" :xs="5">
            <el-date-picker
              style="width: 100%;"
              v-model="where.startTime"
              value-format="timestamp"
               type="datetime"
               placeholder="选择开始时间">
             </el-date-picker>
          </el-col>
          <el-col :lg="5" :md="5" :sm="5" :xs="5">
            <el-date-picker
              style="width: 100%;"
              v-model="where.endTime"
              value-format="timestamp"
               type="datetime"
               placeholder="选择结束时间">
             </el-date-picker>
          </el-col>
          <el-col :lg="3" :md="3" :sm="3" :xs="3">
            <div class="ele-form-actions">
              <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="datasource()">
                查询
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <div :style="style">
      <el-row :gutter="15" v-viewer>
        <el-col v-for="(item, index) in data" :key="index" style="width: 20%;">
          <el-card class="project-list-item" shadow="hover">
            <div class="project-list-cover images" style="position: relative;width:100%;padding-top:56.2%;background: #c3e6c2;">
              <img :src="'/api/'+item.image_path" alt="" style="max-width:100%;max-height:100%;position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;"  />
              <!--  @click="changeimage" -->
            </div>
            <div class="project-list-body" style="padding-top: 5px; padding-bottom: 20px;">
              <h6 class="ele-elip">
                <b>{{ item.name }}</b>
              </h6>
              <div class="ele-elip">
                <b>{{ item.Cam_name?item.Cam_name:"&ensp;" }}</b>
              </div>
              <span style="float: left;">{{ $util.toDateString(item.time/1) }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination :current-page="page.page" :page-size="page.limit" :total="count" :background="true"
        @current-change="(d) => (page.page = d) && datasource()" prevText="上一页" nextText="下一页" :page-sizes="15"
        layout="total, prev, pager, next, jumper" class="ele-pagination-circle" />
    </div>

  </div>
</template>

<script>
  import {
    loadRecord
  } from '@/api/list/basic';
  import{
    aiGetAlgorithm
  } from '@/api/config/channel_config'
  //new Date(new Date().toLocaleDateString()).getTime()+""
  //
  // 默认搜索参数
  const DEFAULT_WHERE = {
    Cam_name: '',
    type: -1,
    startTime: '',
    endTime: new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1).getTime()+"",
  };

  export default {
    name: 'WarnCenterSearch',
    components: {},
    data() {
      return {
        select: '',
        showImg: false,
        // 列表搜索参数
        where: {
          ...DEFAULT_WHERE
        },
        style: {
          height: '800px',
          'backgroundColor': 'white',
        },
        // 分页参数
        page: {
          page: 1,
          limit: 15
        },
        // 数据总数
        count: 0,
        data: [],
        AlarmTypes:[],
      };
    },
    mounted: function() {
      //初始化数据
      aiGetAlgorithm()
            .then((msg) => {
              this.AlarmTypes = msg.list;
              console.log( this.AlarmTypes)
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
      this.datasource()
    },
    methods: {
      isImgShow(src){
        return src.indexOf("NULL")==0?false:true;
      },
      getIndex(i){
        return i;
      },
      /* 表格数据源 */
      datasource() {
        this.where.startTime+="";
        this.where.endTime+="";
        return loadRecord({
          ...this.where,
          ...this.page
        }).then((data) => {
          for (let i = 0; i < data.list.length; i++) {
            let labels = data.list[i].label.split('.')
            data.list[i].name = labels[0]
            data.list[i].label = labels[1]
          }
          this.data = data.list
          this.count = data.count

          this.style.height = data.count>0?'auto':'800px';
          this.style.backgroundColor = data.count>0?'#f0f2f5':'white';

        });
      },
    }
  };
</script>

<style scoped>
  .project-list-border {}

  .project-list-item {
    margin-bottom: 15px;
  }

  .project-list-item ::v-deep .el-card__body {
    padding: 0;
  }

  .project-list-cover>img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  .project-list-body {
    padding: 15px;
  }

  .project-list-desc {
    height: 44px;
    line-height: 22px;
    margin-top: 6px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .project-list-time {
    display: flex;
    margin-top: 6px;
    align-items: center;
  }

  .project-list-time-text {
    flex: 1;
  }
</style>
