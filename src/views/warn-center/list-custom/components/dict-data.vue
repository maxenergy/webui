<template>

  <div style="width: 100%;height: 100%;">

    <div v-if="Cam_showcount=='16'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="6" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <img :src="loadallDevices1" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video1" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <img :src="loadallDevices2" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video2" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <img :src="loadallDevices3" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video3" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6" >
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <img :src="loadallDevices4" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video4" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==5?'border: red solid 1px;':''" @click="selectvideoindex(5)">
            <img :src="loadallDevices5" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video5" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==6?'border: red solid 1px;':''" @click="selectvideoindex(6)">
            <img :src="loadallDevices6" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video6" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6" >
          <div :style="videoindexshow&&videoindex==7?'border: red solid 1px;':''" @click="selectvideoindex(7)">
            <img :src="loadallDevices7" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video7" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==8?'border: red solid 1px;':''" @click="selectvideoindex(8)">
            <img :src="loadallDevices8" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video8" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==9?'border: red solid 1px;':''" @click="selectvideoindex(9)">
            <img :src="loadallDevices9" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video9" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==10?'border: red solid 1px;':''" @click="selectvideoindex(10)">
            <img :src="loadallDevices10" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video10" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==11?'border: red solid 1px;':''" @click="selectvideoindex(11)">
            <img :src="loadallDevices11" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video11" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==12?'border: red solid 1px;':''" @click="selectvideoindex(12)">
            <img :src="loadallDevices12" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video12" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==13?'border: red solid 1px;':''" @click="selectvideoindex(13)">
            <img :src="loadallDevices13" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video13" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==14?'border: red solid 1px;':''" @click="selectvideoindex(14)">
            <img :src="loadallDevices14" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video14" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==15?'border: red solid 1px;':''" @click="selectvideoindex(15)">
            <img :src="loadallDevices15" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video15" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==16?'border: red solid 1px;':''" @click="selectvideoindex(16)">
            <img :src="loadallDevices16" @error="slnotimg" :height="clientHeight/4" :width="clientWeight/4*2" id="video16" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="Cam_showcount=='9'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="8" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <img :src="loadallDevices1" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video1" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <img :src="loadallDevices2" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video2" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <img :src="loadallDevices3" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video3" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" >
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <img :src="loadallDevices4" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video4" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==5?'border: red solid 1px;':''" @click="selectvideoindex(5)">
            <img :src="loadallDevices5" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video5" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==6?'border: red solid 1px;':''" @click="selectvideoindex(6)">
            <img :src="loadallDevices6" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video6" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" >
          <div :style="videoindexshow&&videoindex==7?'border: red solid 1px;':''" @click="selectvideoindex(7)">
            <img :src="loadallDevices7" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video7" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==8?'border: red solid 1px;':''" @click="selectvideoindex(8)">
            <img :src="loadallDevices8" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video8" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==9?'border: red solid 1px;':''" @click="selectvideoindex(9)">
            <img :src="loadallDevices9" @error="slnotimg" :height="clientHeight/3" :width="clientWeight/3*2" id="video9" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="Cam_showcount=='4'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="12" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <img :src="loadallDevices1" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video1" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <img :src="loadallDevices2" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video2" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <img :src="loadallDevices3" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video3" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <img :src="loadallDevices4" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video4" @dblclick="showFullVideoIndex(1)" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div id="Cam_showcount1" v-if="Cam_showcount=='1'" style="border: gainsboro 1px solid;text-align: center;">
      <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)" @dblclick="showFullVideoIndex(1)" style="overflow-x: auto;">
        <canvas id="Cam_showcount1Canvas1"
          :height="clientHeight"
          :width="clientWeight*2" ></canvas>
        <!-- <img mjpg :src="loadallDevices1" @error="slnotimg" :height="clientHeight" :width="clientWeight*2" id="video1" style="image-rendering: -webkit-optimize-contrast;" /> -->
      </div>
    </div>

    <div
      style="border: 1px gainsboro solid;padding: 10px;white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;" v-viewer>
      <div v-for="(item, index) in dickrecords" :key="index" style="display: inline-block;margin: 10px 10px 0 0;">
        <div class="dickrecord images" >
          <img :src="'/api/'+item.image_path" width="180"  height="100" style="width: 180;height: 100;image-rendering: -webkit-optimize-contrast;" />
          <div><span class="dickrecordtype">{{ item.name }}</span></div>
          <div><span>{{ $util.toDateString(item.time/1) }}</span></div>
        </div>
      </div>
      <div style="display: inline-block;margin: 10px 10px 0 0;height: 160px;">
      </div>
    </div>
  </div>
</template>

<script>
  //import axios from 'axios'
  import {
    loadRecord,
  } from '@/api/list/basic';
    import {
    aiGetAlgorithm
  } from '@/api/config/channel_config';
  // import {
  //   loadRecord,
  //   aistartrtsp,
  //   aistoprtsp
  // } from '@/api/list/basic';
const synth = window.speechSynthesis;

  export default {
    name: 'WarnCenterListData',
    components: {},
    props: {
      // 字典id
      loadallDevices: Array,
      Cam_showcount: String,
      current: Object,
      audioAlarms: Boolean
    },
    data() {
      return {
        videoindex: 0,
        videoindexshow: false,
        loadallDevices1: '',
        loadallDevices2: '',
        loadallDevices3: '',
        loadallDevices4: '',
        loadallDevices5: '',
        loadallDevices6: '',
        loadallDevices7: '',
        loadallDevices8: '',
        loadallDevices9: '',
        loadallDevices10: '',
        loadallDevices11: '',
        loadallDevices12: '',
        loadallDevices13: '',
        loadallDevices14: '',
        loadallDevices15: '',
        loadallDevices16: '',
        loadallDevices1AiRect: '',
        loadallDevices1BundingTypes: [],
        dickrecords: [],
        startTime: 1,
        timer: null,
        flvPlayer: Object,
        clientHeight: parseInt(document.documentElement.clientHeight - 330) ,
        clientWeight: parseInt(((document.documentElement.clientHeight - 330)/2/720)*1280),
        audioarc: '',
        AlarmTypes: [
        ],
        fullscreen: false
      }
    },
    beforeDestroy() {
      window.stop()
      this.loadallDevices1 = null;
      this.loadallDevices2 = null;
      this.loadallDevices3 = null;
      this.loadallDevices4 = null;
      this.loadallDevices5 = null;
      this.loadallDevices6 = null;
      this.loadallDevices7 = null;
      this.loadallDevices8 = null;
      this.loadallDevices9 = null;
      this.loadallDevices10 = null;
      this.loadallDevices11 = null;
      this.loadallDevices12 = null;
      this.loadallDevices13 = null;
      this.loadallDevices14 = null;
      this.loadallDevices15 = null;
      this.loadallDevices16 = null;
      this.loadallDevices1AiRect = []
      this.loadallDevices1BundingTypes = []
    },
    mounted() {
      aiGetAlgorithm()
            .then((msg) => {
              this.AlarmTypes = msg.list;
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
      this.$nextTick(() => {
        setTimeout(() => {
          this.createVideo()
          //默认4路的地址

          let index = 1;
          for (let i = 0; i < this.loadallDevices.length; i++) {
            if(this.loadallDevices[i].Cam_state=='on'){
              try{
                if(index == 1){

                  if(this.loadallDevices[i].aiType){
                    this.loadallDevices1BundingTypes = this.loadallDevices[i].aiType.split(',').map(Number)
                  }
                  this.loadallDevices1 = this.loadallDevices[i].src
                  this.loadallDevices1AiRect = this.loadallDevices[i].aiRect
                  this.initRoiContext(this.loadallDevices1BundingTypes,this.loadallDevices[i].aiRect,this.loadallDevices[i].src)
                  index++
                }else if(index == 2){
                  this.loadallDevices2 = this.loadallDevices[i].src
                  index++
                }else if(index == 3){
                  this.loadallDevices3 = this.loadallDevices[i].src
                  index++
                }else if(index == 4){
                  this.loadallDevices4 = this.loadallDevices[i].src
                  index++
                }else if(index == 5){
                  this.loadallDevices5 = this.loadallDevices[i].src
                  index++
                }else if(index == 6){
                  this.loadallDevices6 = this.loadallDevices[i].src
                  index++
                }else if(index == 7){
                  this.loadallDevices7 = this.loadallDevices[i].src
                  index++
                }else if(index == 8){
                  this.loadallDevices8 = this.loadallDevices[i].src
                  index++
                }else if(index == 9){
                  this.loadallDevices9 = this.loadallDevices[i].src
                  index++
                }else if(index == 10){
                  this.loadallDevices10 = this.loadallDevices[i].src
                  index++
                }else if(index == 11){
                  this.loadallDevices11 = this.loadallDevices[i].src
                  index++
                }else if(index == 12){
                  this.loadallDevices12 = this.loadallDevices[i].src
                  index++
                }else if(index == 13){
                  this.loadallDevices13 = this.loadallDevices[i].src
                  index++
                }else if(index == 14){
                  this.loadallDevices14 = this.loadallDevices[i].src
                  index++
                }else if(index == 15){
                  this.loadallDevices15 = this.loadallDevices[i].src
                  index++
                }else if(index == 16){
                  this.loadallDevices16 = this.loadallDevices[i].src
                  index++
                }
              }catch(e){e}
            }
          }
        }, 1500)

        if (this.timer == null) {
          this.timer = window.setInterval(() => {
            setTimeout(() => {
              this.datasource()
              let clientHeight = parseInt(document.documentElement.clientHeight - 330)
              let clientWeight =  parseInt(((document.documentElement.clientHeight - 330)/2/720)*1280)
              if(this.clientHeight != clientHeight||this.clientWeight != clientWeight){
                setTimeout(function(){
                  document.getElementById("Cam_showcount1Canvas1").click()
                },1500)
              }
              this.clientHeight = clientHeight
              this.clientWeight = clientWeight
            }, 0)
          }, 3000)
        }
      })
    },
    destroyed() {
      window.clearInterval(this.timer);
    },
    methods: {
      initRoiContext(aiType,aiRect,src){
        // 初始化ROI框
        let that = this
        //console.log(aiType,aiRect,src)
        let canvas = document.getElementById("Cam_showcount1Canvas1");
        if(!canvas){
          setTimeout(function(){
            that.initRoiContext(aiType,aiRect,src)
          },500)
          return
        }
        canvas.style.background='url(' + src + ') no-repeat center'
        canvas.style.backgroundSize='100% 100%'
        canvas.style.imageRendering='-webkit-optimize-contrast'
        let context = canvas.getContext("2d");
        context.clearRect(0,0,that.clientWeight*2,that.clientHeight)
        for(let key in aiRect){
          console.log(aiType,parseInt(key),aiType.indexOf(parseInt(key)))
          if(aiType.indexOf(parseInt(key))>-1){
            for (let k = 0; k < aiRect[key].length; k++) {
              for (let h = 0; h < aiRect[key][k].length; h++) {
                if(h == 0){
                  context.font="normal normal normal 15px Arial";
                  context.fillStyle=that.getAlarmTypesByTypeIndex(parseInt(key)).activeColor; //线条颜色
                  context.fillText(that.getAlarmTypesByTypeIndex(parseInt(key)).label,aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight);
                  context.beginPath(); //清除上一次的绘制参数 开始绘制
                  context.moveTo(aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight); //线条起点moveToX,moveToY
                }else if(h == aiRect[key][k].length-1){
                  context.lineTo(aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight);
                  context.closePath();//封闭多边形结束方法
                  context.lineWidth=2; //线条宽度
                  context.fillStyle=that.getAlarmTypesByTypeIndex(parseInt(key)).normalColor; //线条颜色
                  context.strokeStyle=that.getAlarmTypesByTypeIndex(parseInt(key)).activeColor;//多边形填充颜色
                  context.fill(); //多边形填充
                  context.stroke(); //结束绘制
                }else{
                  context.lineTo(aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight);
                }
              }
            }
          }
        }
      },
      getAlarmTypesByTypeIndex(key){
        for (let i = 0; i < this.AlarmTypes.length; i++) {
          if(this.AlarmTypes[i].typeindex==key){
            return this.AlarmTypes[i];
          }
        }
      },
      datasource() {
        let body = {
          page: 1,
          limit: 15,
          startTime: this.startTime + ''
        }

        return loadRecord(body).then((data) => {
          if (data.count > 0) {

            this.startTime = data.list[0].time / 1 + 1
            data.list.reverse()

            for (var i = 0; i < data.list.length; i++) {
              let labels = data.list[i].label.split('.')
              data.list[i].name = labels[0]
              data.list[i].label = labels[1]
              this.dickrecords.unshift(data.list[i])
              if(i==data.list.length-1){
                this.playaudioarc(data.list[i])
              }
            }
          }
          //this.dickrecords = data.list
        });
      },
      playaudioarc(data){
        if(data&&this.audioAlarms){
          console.log(data)
         let msg = new SpeechSynthesisUtterance();
          msg.text = this.AlarmTypes[data.type].label;     // 文字内容
          msg.lang = "zh-CN";  // 使用的语言:中文
          msg.volume = 1;      // 声音音量：0-1
          msg.rate = msg.text.length>=5?2:1.5;        // 语速：0-10
          msg.pitch = 1;       // 音高：0-1
          synth.speak(msg);    // 播放
        }

      },
      createVideo() {
        console.log(this.loadallDevices)
      },
      slnotimg(event){
        const img = event.srcElement
        img.src = require('@/assets/errorimg.jpg')
        img.onerror = null
      },
      selectvideoindex(val){
        this.videoindexshow = true
        let that = this;
        setTimeout(function(){
          that.videoindexshow = false
        },5000)
        this.videoindex = val
        this.$emit('selectvideoindex',val)
        if(val==1){
          this.initRoiContext(that.loadallDevices1BundingTypes,that.loadallDevices1AiRect,that.loadallDevices1)
        }
      },
      showFullVideoIndex(){
        let fullarea
        if(this.Cam_showcount==1){
          fullarea = document.getElementById('Cam_showcount1Canvas1')
        }else{
          fullarea = document.getElementById('video'+this.videoindex)
        }

        if (this.fullscreen) {       // 退出全屏
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {        // 进入全屏
          if (fullarea.requestFullscreen) {
            fullarea.requestFullscreen();
          } else if (fullarea.webkitRequestFullScreen) {
            fullarea.webkitRequestFullScreen();
          } else if (fullarea.mozRequestFullScreen) {
            fullarea.mozRequestFullScreen();
          } else if (fullarea.msRequestFullscreen) {
            // IE11
            fullarea.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;

      }
    },
    watch: {
      // 监听字典id变化
      loadallDevices() {

      },
      Cam_showcount(val){
        window.stop()
        if(1==val){
          this.selectvideoindex(1)
        }
        if(this.loadallDevices1){
          this.loadallDevices1+='1'
        }
        if(this.loadallDevices2){
          this.loadallDevices2+='2'
        }
        if(this.loadallDevices3){
          this.loadallDevices3+='3'
        }
        if(this.loadallDevices4){
          this.loadallDevices4+='4'
        }
        if(this.loadallDevices5){
          this.loadallDevices5+='5'
        }
        if(this.loadallDevices6){
          this.loadallDevices6+='6'
        }
        if(this.loadallDevices7){
          this.loadallDevices7+='7'
        }
        if(this.loadallDevices8){
          this.loadallDevices8+='8'
        }
        if(this.loadallDevices9){
          this.loadallDevices9+='9'
        }
        if(this.loadallDevices10){
          this.loadallDevices10+='10'
        }
        if(this.loadallDevices11){
          this.loadallDevices11+='11'
        }
        if(this.loadallDevices12){
          this.loadallDevices12+='12'
        }
        if(this.loadallDevices13){
          this.loadallDevices13+='13'
        }
        if(this.loadallDevices14){
          this.loadallDevices14+='14'
        }
        if(this.loadallDevices15){
          this.loadallDevices15+='15'
        }
        if(this.loadallDevices16){
          this.loadallDevices16+='16'
        }
      },
      current(val){
        console.log(val)
        if(val==null){
          return
        }
        if(this.loadallDevices1&&this.Cam_showcount=='1'){
          window.stop()
        }
        let videoindex = this.videoindex>0?this.videoindex:this.videoindex;
        this.videoindexshow = true
        let that = this;
        setTimeout(function(){
          that.videoindexshow = false
        },5000)
        val.src+='1'
				let src = val.src
        // that.$message(src)
        if((videoindex==0||videoindex==1)&&val.Cam_state=='on'){
          this.loadallDevices1 = src
          this.loadallDevices1AiRect = val.aiRect
          this.loadallDevices1BundingTypes = val.aiType?val.aiType.split(',').map(Number):[]
          this.initRoiContext(this.loadallDevices1BundingTypes,val.aiRect,val.src)
        }else if(videoindex==2&&val.Cam_state=='on'){
          this.loadallDevices2 = src
        }else if(videoindex==3&&val.Cam_state=='on'){
          this.loadallDevices3 = src
        }else if(videoindex==4&&val.Cam_state=='on'){
          this.loadallDevices4 = src
        }
      },
      audioAlarms(){

      }
    }
  };
</script>

<style scoped>
  .dickrecord {
    border: red 1px dashed;
    width: 180px;
    height: 100px;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    padding: 5px;
  }

  .dickrecord img {
    width: 100%;

  }

  .dickrecord span {
    font-weight: bold;
  }
  img{
    image-rendering: -webkit-optimize-contrast;
  }
</style>
