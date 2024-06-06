<template>

  <div style="width: 100%;height: 100%;">

    <div v-if="Cam_showcount=='4'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="12" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <img :src="loadallDevices1" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video1" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <img :src="loadallDevices2" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video2" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <img :src="loadallDevices3" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video3" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <img :src="loadallDevices4" @error="slnotimg" :height="clientHeight/2" :width="clientWeight" id="video4" style="image-rendering: -webkit-optimize-contrast;" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="Cam_showcount1" v-if="Cam_showcount=='1'" style="border: gainsboro 1px solid;text-align: center;">
      <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)" style="overflow-x: auto;">
        <canvas id="Cam_showcount1Canvas1"
          :height="clientHeight"
          :width="clientWeight*2" ></canvas>
        <!-- <img mjpg :src="loadallDevices1" @error="slnotimg" :height="clientHeight" :width="clientWeight*2" id="video1" style="image-rendering: -webkit-optimize-contrast;" /> -->
      </div>
    </div>

    <div
      style="border: 1px gainsboro solid;padding: 10px;white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;" v-viewer>
      <div v-for="item in dickrecords" v-bind:key="item" style="display: inline-block;margin: 10px 10px 0 0;">
        <div class="dickrecord images" >
          <img :src="'/api/'+item.image_path" width="180"  height="100" style="width: 180;height: 100;image-rendering: -webkit-optimize-contrast;" />
          <div><span class="dickrecordtype">{{ item.name }}</span></div>
          <div><span>{{ $util.toDateString(item.time/1) }}</span></div>
        </div>
      </div>
      <div style="display: inline-block;margin: 10px 10px 0 0;height: 160px;">
      </div>
      <audio id="audiomp3" :src="audioarc" autoplay="autoplay" style="display: none;"></audio>
    </div>
  </div>
</template>

<script>
  //import axios from 'axios'
  import {
    loadRecord,
  } from '@/api/list/basic';
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
        loadallDevices1AiRect: '',
        loadallDevices1BundingTypes: [],
        dickrecords: [],
        startTime: 1,
        timer: null,
        flvPlayer: Object,
        clientHeight: parseInt(document.documentElement.clientHeight - 330) ,
        clientWeight: parseInt(((document.documentElement.clientHeight - 330)/2/720)*1280),
        audioarc: '',
        AlarmTypes: [{
            labal: '吸烟警报',
            name: 'smoke',
            src: require('@/assets/smoke.png'),
            audio: require('@/assets/mp3/smoke.mp3'),
            typeindex: 0,
            normalColor: 'rgba(224, 57, 151, 0.1)',
            activeColor: 'rgba(224, 57, 151, 1)',
          },
          {
            labal: '打电话警报',
            name: 'call',
            src: require('@/assets/call.png'),
            audio: require('@/assets/mp3/call.mp3'),
            typeindex: 1,
            normalColor: 'rgba(165, 103, 63, 0.1)',
            activeColor: 'rgba(165, 103, 63, 1)',
          },
          {
            labal: '烟火警报',
            name: 'flame',
            src: require('@/assets/flame.png'),
            audio: require('@/assets/mp3/flame.mp3'),
            typeindex: 2,
            normalColor: 'rgba(229, 77, 66, 0.1)',
            activeColor: 'rgba(229, 77, 66, 1)',
          },
          {
            labal: '反光衣警报',
            name: 'reflective',
            src: require('@/assets/reflective.png'),
            audio: require('@/assets/mp3/reflective.mp3'),
            typeindex: 3,
            normalColor: 'rgba(243, 123, 29, 0.1)',
            activeColor: 'rgba(243, 123, 29, 1)',
          },
          {
            labal: '安全帽警报',
            name: 'safetyhat',
            src: require('@/assets/safetyhat.png'),
            audio: require('@/assets/mp3/safetyhat.mp3'),
            typeindex: 4,
            normalColor: 'rgba(57, 181, 74, 0.1)',
            activeColor: 'rgba(57, 181, 74, 1)',
          },
          {
            labal: '人员闯入警报',
            name: 'inside',
            src: require('@/assets/inside1.png'),
            audio: require('@/assets/mp3/inside1.mp3'),
            typeindex: 5,
            normalColor: 'rgba(28, 187, 180, 0.1)',
            activeColor: 'rgba(28, 187, 180, 1)',
          },
        ],
      }
    },
    beforeDestroy() {
      window.stop()
      this.loadallDevices1 = null;
      this.loadallDevices2 = null;
      this.loadallDevices3 = null;
      this.loadallDevices4 = null;
      this.loadallDevices1AiRect = []
      this.loadallDevices1BundingTypes = []
    },
    mounted() {
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
        console.log(aiType,aiRect,src)
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
                  context.fillStyle=that.AlarmTypes[parseInt(key)].activeColor; //线条颜色
                  context.fillText(that.AlarmTypes[parseInt(key)].labal,aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight);
                  context.beginPath(); //清除上一次的绘制参数 开始绘制
                  context.moveTo(aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight); //线条起点moveToX,moveToY
                }else if(h == aiRect[key][k].length-1){
                  context.lineTo(aiRect[key][k][h][0]/1280*that.clientWeight*2+4,aiRect[key][k][h][1]/720*that.clientHeight);
                  context.closePath();//封闭多边形结束方法
                  context.lineWidth=2; //线条宽度
                  context.fillStyle=that.AlarmTypes[parseInt(key)].normalColor; //线条颜色
                  context.strokeStyle=that.AlarmTypes[parseInt(key)].activeColor;//多边形填充颜色
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
          msg.text = this.AlarmTypes[data.type].labal;     // 文字内容
          msg.lang = "zh-CN";  // 使用的语言:中文
          msg.volume = 1;      // 声音音量：0-1
          msg.rate = msg.text.length>=5?2:1.5;        // 语速：0-10
          msg.pitch = 1;       // 音高：0-1
          synth.speak(msg);    // 播放


          /* this.audioarc = ''
          this.audioarc = this.AlarmTypes[data.type].audio
          document.getElementById('audiomp3').load() */
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
				let src = window.location.protocol+"//"+window.location.hostname+":"+(val.Cam_http);
        // let src = "http://10.1.49.122:"+(val.Cam_http);
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
