<template>
  <div class="ele-body">
    <el-card shadow="never" body-style="padding-bottom: 0;">
      <el-row :gutter="15">

        <el-col :lg="18" :md="18" :xl="18" :sm="18" style="margin-bottom: 15px;height: 100%;">
          <!-- 数据字典项列表 -->
          <dict-data :if="loadallDevices" :loadall-devices="loadallDevices" :Cam_showcount="Cam_showcount" :current="current" @selectvideoindex="selectvideoindex" :audioAlarms="audioAlarms" style="height: 100%;" />
        </el-col>
        <el-col :lg="6" :md="6" :xl="6" :sm="6" style="margin-bottom: 15px">
          <!-- 数据表格 -->
          <ele-pro-table
            ref="table"
            :columns="columns"
            :datasource="datasource"
            highlight-current-row
            height="calc(100vh - 180px)"
            :need-page="false"
            :toolkit="[]"
            @row-click="rowClick"
            @done="done"
          >
          <template slot="Cam_state" slot-scope="{ row }">
            <template v-if="row.Cam_state=='on'">
              <el-tag size="mini" type="success">在线</el-tag>
            </template>
            <template v-if="row.Cam_state=='off'">
               <el-tag size="mini" type="danger">离线</el-tag>
            </template>
          </template>
          <!-- 表头工具栏 -->
          <template slot="toolbar">
            <!-- <div v-on:click="audioAlarsmStyle" style="display: inline-block;">
                <img id="audioAlarm" src="@/assets/0.png"  />
            </div>
            <div v-on:click="audioAlarsmStyle" style="display: inline-block;">
                <img id="audioAlarm" src="@/assets/1.png"  />
            </div>
            <div v-on:click="audioAlarsmStyle" style="display: inline-block;">
                <img id="audioAlarm" src="@/assets/4.png"  />
            </div>
            <div v-on:click="audioAlarsmStyle" style="display: inline-block;">
                <img id="audioAlarm" src="@/assets/9.png"  />
            </div>
            <div v-on:click="audioAlarsmStyle" style="display: inline-block;">
                <img id="audioAlarm" src="@/assets/16.png"  />
            </div> -->
            <el-select v-model="Cam_showcount" placeholder="请选择" style="width: 10vw;">
              <el-option key="1" label="一路视频" value="1"></el-option>
              <el-option key="4" label="四路视频" value="4"></el-option>
              <el-option key="9" label="九路视频" value="9"></el-option>
              <el-option key="16" label="十六路视频" value="16"></el-option>
            </el-select>


            <div style="position: fixed;top: 100px;right: 50px;" v-on:click="audioAlarsmStyle">
                <img id="audioAlarm" src="@/assets/alarm.png" :style="audioAlarms?'':nobundingimgStyle"/>
            </div>

          </template>
          </ele-pro-table>
        </el-col>
      </el-row>
    </el-card>
    <!-- 编辑弹窗 -->
    <dict-edit :visible.sync="showEdit" :data="editData" @done="reload" />
  </div>
</template>

<script>

  import DictData from './components/dict-data';
  import DictEdit from './components/dict-edit';
  import { aigetconfig,loadallDevices,getVoice,setVoice } from '@/api/config/channel_config';

  export default {
    name: 'ListlistCustom',
    components: { DictData, DictEdit },
    data() {
      return {
        // 表格列配置
        Cam_showcount: '1',
        videoindex: 1,
        columns: [
          {
            columnKey: 'index',
            type: 'index',
            label: '序号',
            width: 50,
            align: 'center',
            showOverflowTooltip: true,
          },
          {
            prop: 'Cam_name',
            label: '摄像头名称',
            showOverflowTooltip: true
          },
          {
            prop: 'Cam_state',
            label: '状态',
            width: 60,
            align: 'center',
            slot: 'Cam_state'
          },
        ],
        loadallDevices: null,
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: false,
        // 编辑回显数据
        editData: null,
        audioAlarms: false,
        nobundingimgStyle:{
          "-webkit-filter": "grayscale(100%)",
          filter: "grayscale(100%)"
        }
      };
    },
    mounted() {
      getVoice().then((res) => {
        this.audioAlarms = res.isVoice
      })
    },
    methods: {
      audioAlarsmStyle(){
        this.audioAlarms = !this.audioAlarms
        setVoice({isVoice: this.audioAlarms}).then((res)=>{
          console.log(res)
        })
      },
      selectvideoindex(val){
        this.current = null
        this.videoindex = val>0?val-1:1;
        console.log(val)
      },
      /* 表格数据源 */
      async datasource() {
        await loadallDevices().then((res)=>{
          this.loadallDevices = res.list
          for(let i = 0; i< res.list.length; i++){
						this.loadallDevices[i].src = window.location.protocol+"//"+window.location.hostname+":"+(res.list[i].Cam_http)+"?time="+Math.random();
            //this.loadallDevices[i].src = "http://192.168.2.168:"+(res.list[i].Cam_http)+"?time="+Math.random();
            aigetconfig({
                device: res.list[i]
              })
              .then((res1) => {
                this.loadallDevices[i].aiRect = res1.aiRect
                this.loadallDevices[i].aiType = res1.aiType
              })
          }
        })
        return loadallDevices();
      },
      /* 表格渲染完成回调 */
      done(res) {
        if (res.data?.length) {
          this.$refs.table.setCurrentRow(res.data[0]);
        }
      },
      /* 刷新表格 */
      reload() {
        this.$refs.table.reload();
      },
      rowClick(val){
        if(val.Cam_state=='on'){
          for (let i = 0; i < this.loadallDevices.length; i++) {
            if(val.Cam_path == this.loadallDevices[i].Cam_path){
              this.current = this.loadallDevices[i]
            }
          }
          return true
        }
        this.$message.error("设备已离线,无法播放");
        return false
      },
      /* currentChange(val){
        if(val.Cam_state=='on'){
          this.current = val
          return true
        }
        this.$message.error("设备已离线,无法播放");
        return false
      } */
    }
  };
</script>

<style scoped>

  .toolClass{
    border: red solid 1px;
  }

  .dict-table ::v-deep .el-table__row {
    cursor: pointer;
  }

  .dict-table ::v-deep .el-table__row > td:last-child:after {
    content: '\e6e0';
    font-family: element-icons !important;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -7px;
  }

  .ele-table-tool .ele-table-tool-default{
    height: 0px;
    margin: 0;
    padding: 0;
  }

  .dict-table ::v-deep .el-table__row > td:last-child .cell {
    padding-right: 20px;
  }
  #audioAlarm{
    height: 40px;
  }
</style>
