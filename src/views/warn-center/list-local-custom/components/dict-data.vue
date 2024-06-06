<template>

  <div style="width: 100%;height: 100%;">


    <div v-if="Cam_showcount=='16'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="6" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video1" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video2" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video3" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video4" autoplay ></video>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==5?'border: red solid 1px;':''" @click="selectvideoindex(5)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video5" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==6?'border: red solid 1px;':''" @click="selectvideoindex(6)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video6" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==7?'border: red solid 1px;':''" @click="selectvideoindex(7)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video7" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==8?'border: red solid 1px;':''" @click="selectvideoindex(8)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video8" autoplay ></video>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==9?'border: red solid 1px;':''" @click="selectvideoindex(9)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video9" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==10?'border: red solid 1px;':''" @click="selectvideoindex(10)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video10" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==11?'border: red solid 1px;':''" @click="selectvideoindex(11)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video11" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==12?'border: red solid 1px;':''" @click="selectvideoindex(12)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video12" autoplay ></video>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==13?'border: red solid 1px;':''" @click="selectvideoindex(13)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video13" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==14?'border: red solid 1px;':''" @click="selectvideoindex(14)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video14" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==15?'border: red solid 1px;':''" @click="selectvideoindex(15)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video15" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="6">
          <div :style="videoindexshow&&videoindex==16?'border: red solid 1px;':''" @click="selectvideoindex(16)">
            <video :height="clientHeight/4" :width="clientWeight/4*2" id="show16_video16" autoplay ></video>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="Cam_showcount=='9'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="8" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video1" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video2" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video3" autoplay ></video>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video4" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==5?'border: red solid 1px;':''" @click="selectvideoindex(5)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video5" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==6?'border: red solid 1px;':''" @click="selectvideoindex(6)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video6" autoplay ></video>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==7?'border: red solid 1px;':''" @click="selectvideoindex(7)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video7" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==8?'border: red solid 1px;':''" @click="selectvideoindex(8)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video8" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="8">
          <div :style="videoindexshow&&videoindex==9?'border: red solid 1px;':''" @click="selectvideoindex(9)">
            <video :height="clientHeight/3" :width="clientWeight/3*2" id="show9_video9" autoplay ></video>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="Cam_showcount=='4'" style="border: gainsboro 1px solid;text-align: center;">
      <el-row>
        <el-col :span="12" >
          <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)">
            <video :height="clientHeight/2" :width="clientWeight" id="show4_video1" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==2?'border: red solid 1px;':''" @click="selectvideoindex(2)">
            <video :height="clientHeight/2" :width="clientWeight" id="show4_video2" autoplay ></video>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==3?'border: red solid 1px;':''" @click="selectvideoindex(3)">
            <video :height="clientHeight/2" :width="clientWeight" id="show4_video3" autoplay ></video>
          </div>
        </el-col>
        <el-col :span="12">
          <div :style="videoindexshow&&videoindex==4?'border: red solid 1px;':''" @click="selectvideoindex(4)">
            <video :height="clientHeight/2" :width="clientWeight" id="show4_video4" autoplay ></video>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="Cam_showcount1" v-if="Cam_showcount=='1'" style="border: gainsboro 1px solid;text-align: center;">
      <div :style="videoindexshow&&videoindex==1?'border: red solid 1px;':''" @click="selectvideoindex(1)" style="overflow-x: auto;">
        <video :height="clientHeight" :width="clientWeight*2" id="show1_video1" autoplay ></video>
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
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  import {
    loadRecord,
  } from '@/api/list/basic';
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
        dickrecords: [],
        startTime: 1,
        timer: null,
        flvPlayer: Object,
        clientHeight: parseInt(document.documentElement.clientHeight - 330) ,
        clientWeight: parseInt(((document.documentElement.clientHeight - 330)/2/720)*1280),

        pc: null,
        suuid: '',
        stream: new MediaStream(),
        rtspPath: '',
        videoDocument: null,

        pc1: null,
        suuid1: '',
        stream1: new MediaStream(),
        rtspPath1: '',
        videoDocument1: null,

        pc2: null,
        suuid2: '',
        stream2: new MediaStream(),
        rtspPath2: '',
        videoDocument2: null,

        pc3: null,
        suuid3: '',
        stream3: new MediaStream(),
        rtspPath3: '',
        videoDocument3: null,

        pc4: null,
        suuid4: '',
        stream4: new MediaStream(),
        rtspPath4: '',
        videoDocument4: null,

        pc91: null,
        suuid91: '',
        stream91: new MediaStream(),
        rtspPath91: '',
        videoDocument91: null,

        pc92: null,
        suuid92: '',
        stream92: new MediaStream(),
        rtspPath92: '',
        videoDocument92: null,

        pc93: null,
        suuid93: '',
        stream93: new MediaStream(),
        rtspPath93: '',
        videoDocument93: null,

        pc94: null,
        suuid94: '',
        stream94: new MediaStream(),
        rtspPath94: '',
        videoDocument94: null,

        pc95: null,
        suuid95: '',
        stream95: new MediaStream(),
        rtspPath95: '',
        videoDocument95: null,

        pc96: null,
        suuid96: '',
        stream96: new MediaStream(),
        rtspPath96: '',
        videoDocument96: null,

        pc97: null,
        suuid97: '',
        stream97: new MediaStream(),
        rtspPath97: '',
        videoDocument97: null,

        pc98: null,
        suuid98: '',
        stream98: new MediaStream(),
        rtspPath98: '',
        videoDocument98: null,

        pc99: null,
        suuid99: '',
        stream99: new MediaStream(),
        rtspPath99: '',
        videoDocument99: null,

        pc161: null,
        suuid161: '',
        stream161: new MediaStream(),
        rtspPath161: '',
        videoDocument161: null,

        pc162: null,
        suuid162: '',
        stream162: new MediaStream(),
        rtspPath162: '',
        videoDocument162: null,

        pc163: null,
        suuid163: '',
        stream163: new MediaStream(),
        rtspPath163: '',
        videoDocument163: null,

        pc164: null,
        suuid164: '',
        stream164: new MediaStream(),
        rtspPath164: '',
        videoDocument164: null,

        pc165: null,
        suuid165: '',
        stream165: new MediaStream(),
        rtspPath165: '',
        videoDocument165: null,

        pc166: null,
        suuid166: '',
        stream166: new MediaStream(),
        rtspPath166: '',
        videoDocument166: null,

        pc167: null,
        suuid167: '',
        stream167: new MediaStream(),
        rtspPath167: '',
        videoDocument167: null,

        pc168: null,
        suuid168: '',
        stream168: new MediaStream(),
        rtspPath168: '',
        videoDocument168: null,

        pc169: null,
        suuid169: '',
        stream169: new MediaStream(),
        rtspPath169: '',
        videoDocument169: null,

        pc1610: null,
        suuid1610: '',
        stream1610: new MediaStream(),
        rtspPath1610: '',
        videoDocument1610: null,

        pc1611: null,
        suuid1611: '',
        stream1611: new MediaStream(),
        rtspPath1611: '',
        videoDocument1611: null,

        pc1612: null,
        suuid1612: '',
        stream1612: new MediaStream(),
        rtspPath1612: '',
        videoDocument1612: null,

        pc1613: null,
        suuid1613: '',
        stream1613: new MediaStream(),
        rtspPath1613: '',
        videoDocument1613: null,

        pc1614: null,
        suuid1614: '',
        stream1614: new MediaStream(),
        rtspPath1614: '',
        videoDocument1614: null,

        pc1615: null,
        suuid1615: '',
        stream1615: new MediaStream(),
        rtspPath1615: '',
        videoDocument1615: null,

        pc1616: null,
        suuid1616: '',
        stream1616: new MediaStream(),
        rtspPath1616: '',
        videoDocument1616: null,

        config: {
          iceServers: [{
            urls: ["stun:stun.l.google.com:19302"]
          }]
        },

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
          {
            labal: '电动车检测',
            name: 'electric',
            src: require('@/assets/electric.png'),
            typeindex: 18,
            normalColor: 'rgba(85, 170, 255, 0.7)',
            activeColor: 'rgba(85, 170, 255, 1.0)',
          }
        ],

      }
    },
    beforeDestroy() {
      window.stop()
    },
    mounted() {
      let that = this
      that.$nextTick(() => {
        setTimeout(async () => {
          //默认一路
          that.rtspPath = that.loadallDevices[0].Cam_path
          that.suuid = that.rtspPath.replace(/\s|:|\.|\/|@|\?|=|&/g,"");
          //验证
          let resTypes = await that.verifyVideoHasAdded(1,1)
          await that.playVideoStream(1,1,resTypes)
        }, 1500)

        if (that.timer == null) {
          that.timer = window.setInterval(() => {
            setTimeout(() => {
              that.datasource()
              let clientHeight = parseInt(document.documentElement.clientHeight - 330)
              let clientWeight =  parseInt(((document.documentElement.clientHeight - 330)/2/720)*1280)
              that.clientHeight = clientHeight
              that.clientWeight = clientWeight
            }, 0)
          }, 3000)
        }
      })
    },
    destroyed() {
      window.clearInterval(this.timer);
      try{
        this.pc.close();
        this.pc = null
      }catch(e){e}

      try{
        this.pc1.close();
        this.pc1 = null
      }catch(e){e}
      try{
        this.pc2.close();
        this.pc2 = null
      }catch(e){e}
      try{
        this.pc3.close();
        this.pc3 = null
      }catch(e){e}
      try{
        this.pc4.close();
        this.pc4 = null
      }catch(e){e}

      try{
        this.pc91.close();
        this.pc91 = null
      }catch(e){e}
      try{
        this.pc92.close();
        this.pc92 = null
      }catch(e){e}
      try{
        this.pc93.close();
        this.pc93 = null
      }catch(e){e}
      try{
        this.pc94.close();
        this.pc94 = null
      }catch(e){e}
      try{
        this.pc95.close();
        this.pc95 = null
      }catch(e){e}
      try{
        this.pc96.close();
        this.pc96 = null
      }catch(e){e}
      try{
        this.pc97.close();
        this.pc97 = null
      }catch(e){e}
      try{
        this.pc98.close();
        this.pc98 = null
      }catch(e){e}
      try{
        this.pc99.close();
        this.pc99 = null
      }catch(e){e}

      try{
        this.pc161.close();
        this.pc161 = null
      }catch(e){e}
      try{
        this.pc162.close();
        this.pc162 = null
      }catch(e){e}
      try{
        this.pc163.close();
        this.pc163 = null
      }catch(e){e}
      try{
        this.pc164.close();
        this.pc164 = null
      }catch(e){e}
      try{
        this.pc165.close();
        this.pc165 = null
      }catch(e){e}
      try{
        this.pc166.close();
        this.pc166 = null
      }catch(e){e}
      try{
        this.pc167.close();
        this.pc167 = null
      }catch(e){e}
      try{
        this.pc168.close();
        this.pc168 = null
      }catch(e){e}
      try{
        this.pc169.close();
        this.pc169 = null
      }catch(e){e}
      try{
        this.pc1610.close();
        this.pc1610 = null
      }catch(e){e}
      try{
        this.pc1611.close();
        this.pc1611 = null
      }catch(e){e}
      try{
        this.pc1612.close();
        this.pc1612 = null
      }catch(e){e}
      try{
        this.pc1613.close();
        this.pc1613 = null
      }catch(e){e}
      try{
        this.pc1614.close();
        this.pc1614 = null
      }catch(e){e}
      try{
        this.pc1615.close();
        this.pc1615 = null
      }catch(e){e}
      try{
        this.pc1616.close();
        this.pc1616 = null
      }catch(e){e}

      window.stop()

    },
    methods: {
      /** 验证是否有添加指定视频流 */
      async verifyVideoHasAdded(showCount,index){
        let that = this;
        let videoInfo = that.getVideoInfo(showCount,index);
        console.log(showCount,index,videoInfo)
        //验证是否有添加指定视频流
        const res = await axios({
          url: 'http://127.0.0.1:18083/stream/codec/'+videoInfo.suuid,
          method: 'GET'
        });
        //不存在就添加视频流解析
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].Type=='non-existent'){
            that.addVideoStream(videoInfo);
            return that.verifyVideoHasAdded(showCount,index)
          }
        }
        return res.data;
      },
      /** 播放指定视频 */
      async playVideoStream(showCount,index,resTypes){
        let that = this;
        let videoInfo = that.getVideoInfo(showCount,index);

        videoInfo.pc = new RTCPeerConnection(that.config)

        for (let i = 0; i < resTypes.length; i++) {
          videoInfo.pc.addTransceiver(resTypes[i].Type, {
            'direction': 'sendrecv'
          })
        }
        videoInfo.pc.onnegotiationneeded = that.handleNegotiationNeededEvent(videoInfo);
        videoInfo.pc.ontrack = function(event) {
          videoInfo.stream.addTrack(event.track);
          videoInfo.videoDocument.srcObject = videoInfo.stream;
          console.log(event.streams.length + ' track is delivered')
        }
        videoInfo.pc.oniceconnectionstatechange = () => console.log(videoInfo.pc.iceConnectionState)
        that.setVideoInfo(showCount,index,videoInfo)
      },
      async rePlayVideoStream(videoindex,val){

        let that = this
        //获取当前视频信息
        let videoInfo =that.getVideoInfo(that.Cam_showcount,videoindex)


        //停止当前视频信息
        try{
          videoInfo.pc.close()
          videoInfo.pc = null
        }catch(e){e}
        //切换显示框
        that.videoindexshow = true
        setTimeout(function(){
          that.videoindexshow = false
        },5000)

        videoInfo = {
          pc: null,
          suuid: val.Cam_path.replace(/\s|:|\.|\/|@|\?|=|&/g,""),
          stream: new MediaStream(),
          rtspPath: val.Cam_path,
          videoDocument: null,
        }
        console.log(that.Cam_showcount,videoindex,videoInfo)
        that.setVideoInfo(that.Cam_showcount,videoindex,videoInfo)

        //验证
        let resTypes = await that.verifyVideoHasAdded(that.Cam_showcount,videoindex)


        await that.playVideoStream(that.Cam_showcount,videoindex,resTypes)

      },
      /** 添加指定视频流 */
      async addVideoStream(videoInfo){
        let data = new FormData()
        data.append("name",videoInfo.suuid)
        data.append("url",videoInfo.rtspPath)
        await axios({
          url: "http://127.0.0.1:18083/stream",
          method: 'POST',
          data:data
        });

      },
      /** 设置链接条件 */
      async handleNegotiationNeededEvent(videoInfo){
        let that = this
        let offer = await videoInfo.pc.createOffer();
        await videoInfo.pc.setLocalDescription(offer);
        that.getRemoteSdp(videoInfo);
      },
      /** 获取远程链接地址 */
      async getRemoteSdp(videoInfo){
        var data = new FormData();
        data.append('suuid', videoInfo.suuid);
        data.append('data', btoa(videoInfo.pc.localDescription.sdp));

        let res = await axios({
          url: "http://127.0.0.1:18083/stream/receiver/"+videoInfo.suuid,
          method: 'POST',
          data:data
        });
        videoInfo.pc.setRemoteDescription(new RTCSessionDescription({
          type: 'answer',
          sdp: atob(res.data)
        }))
      },
      /** 获取视频相关信息 */
      getVideoInfo(showCount,index){
        let that = this
        let res = new Object;
        switch (parseInt(showCount)){
          case 4:
            switch (parseInt(index)){
              case 2:
                res.pc = that.pc2
                res.suuid = that.suuid2
                res.stream = that.stream2
                res.rtspPath = that.rtspPath2
                res.videoDocument = document.getElementById("show4_video2")
                break;
              case 3:
                res.pc = that.pc3
                res.suuid = that.suuid3
                res.stream = that.stream3
                res.rtspPath = that.rtspPath3
                res.videoDocument = document.getElementById("show4_video3")
                break;
              case 4:
                res.pc = that.pc4
                res.suuid = that.suuid4
                res.stream = that.stream4
                res.rtspPath = that.rtspPath4
                res.videoDocument = document.getElementById("show4_video4")
                break;
              default:
                res.pc = that.pc1
                res.suuid = that.suuid1
                res.stream = that.stream1
                res.rtspPath = that.rtspPath1
                res.videoDocument = document.getElementById("show4_video1")
                break;
            }
            break;
          case 9:
            switch (parseInt(index)){
              case 2:
                res.pc = that.pc92
                res.suuid = that.suuid92
                res.stream = that.stream92
                res.rtspPath = that.rtspPath92
                res.videoDocument = document.getElementById("show9_video2")
                break;
              case 3:
                res.pc = that.pc93
                res.suuid = that.suuid93
                res.stream = that.stream93
                res.rtspPath = that.rtspPath93
                res.videoDocument = document.getElementById("show9_video3")
                break;
              case 4:
                res.pc = that.pc94
                res.suuid = that.suuid94
                res.stream = that.stream94
                res.rtspPath = that.rtspPath94
                res.videoDocument = document.getElementById("show9_video4")
                break;
              case 5:
                res.pc = that.pc95
                res.suuid = that.suuid95
                res.stream = that.stream95
                res.rtspPath = that.rtspPath95
                res.videoDocument = document.getElementById("show9_video5")
                break;
              case 6:
                res.pc = that.pc96
                res.suuid = that.suuid96
                res.stream = that.stream96
                res.rtspPath = that.rtspPath96
                res.videoDocument = document.getElementById("show9_video6")
                break;
              case 7:
                res.pc = that.pc97
                res.suuid = that.suuid97
                res.stream = that.stream97
                res.rtspPath = that.rtspPath97
                res.videoDocument = document.getElementById("show9_video7")
                break;
              case 8:
                res.pc = that.pc98
                res.suuid = that.suuid98
                res.stream = that.stream98
                res.rtspPath = that.rtspPath98
                res.videoDocument = document.getElementById("show9_video8")
                break;
              case 9:
                res.pc = that.pc99
                res.suuid = that.suuid99
                res.stream = that.stream99
                res.rtspPath = that.rtspPath99
                res.videoDocument = document.getElementById("show9_video9")
                break;
              default:
                res.pc = that.pc91
                res.suuid = that.suuid91
                res.stream = that.stream91
                res.rtspPath = that.rtspPath91
                res.videoDocument = document.getElementById("show9_video1")
                break;
            }
            break;
          case 16:
            switch (parseInt(index)){
              case 2:
                res.pc = that.pc162
                res.suuid = that.suuid162
                res.stream = that.stream162
                res.rtspPath = that.rtspPath162
                res.videoDocument = document.getElementById("show16_video2")
                break;
              case 3:
                res.pc = that.pc163
                res.suuid = that.suuid163
                res.stream = that.stream163
                res.rtspPath = that.rtspPath163
                res.videoDocument = document.getElementById("show16_video3")
                break;
              case 4:
                res.pc = that.pc164
                res.suuid = that.suuid164
                res.stream = that.stream164
                res.rtspPath = that.rtspPath164
                res.videoDocument = document.getElementById("show16_video4")
                break;
              case 5:
                res.pc = that.pc165
                res.suuid = that.suuid165
                res.stream = that.stream165
                res.rtspPath = that.rtspPath165
                res.videoDocument = document.getElementById("show16_video5")
                break;
              case 6:
                res.pc = that.pc166
                res.suuid = that.suuid166
                res.stream = that.stream166
                res.rtspPath = that.rtspPath166
                res.videoDocument = document.getElementById("show16_video6")
                break;
              case 7:
                res.pc = that.pc167
                res.suuid = that.suuid167
                res.stream = that.stream167
                res.rtspPath = that.rtspPath167
                res.videoDocument = document.getElementById("show16_video7")
                break;
              case 8:
                res.pc = that.pc168
                res.suuid = that.suuid168
                res.stream = that.stream168
                res.rtspPath = that.rtspPath168
                res.videoDocument = document.getElementById("show16_video8")
                break;
              case 9:
                res.pc = that.pc169
                res.suuid = that.suuid169
                res.stream = that.stream169
                res.rtspPath = that.rtspPath169
                res.videoDocument = document.getElementById("show16_video9")
                break;
              case 10:
                res.pc = that.pc1610
                res.suuid = that.suuid1610
                res.stream = that.stream1610
                res.rtspPath = that.rtspPath1610
                res.videoDocument = document.getElementById("show16_video10")
                break;
              case 11:
                res.pc = that.pc1611
                res.suuid = that.suuid1611
                res.stream = that.stream1611
                res.rtspPath = that.rtspPath1611
                res.videoDocument = document.getElementById("show16_video11")
                break;
              case 12:
                res.pc = that.pc1612
                res.suuid = that.suuid1612
                res.stream = that.stream1612
                res.rtspPath = that.rtspPath1612
                res.videoDocument = document.getElementById("show16_video12")
                break;
              case 13:
                res.pc = that.pc1613
                res.suuid = that.suuid1613
                res.stream = that.stream1613
                res.rtspPath = that.rtspPath1613
                res.videoDocument = document.getElementById("show16_video13")
                break;
              case 14:
                res.pc = that.pc1614
                res.suuid = that.suuid1614
                res.stream = that.stream1614
                res.rtspPath = that.rtspPath1614
                res.videoDocument = document.getElementById("show16_video14")
                break;
              case 15:
                res.pc = that.pc1615
                res.suuid = that.suuid1615
                res.stream = that.stream1615
                res.rtspPath = that.rtspPath1615
                res.videoDocument = document.getElementById("show16_video15")
                break;
              case 16:
                res.pc = that.pc1616
                res.suuid = that.suuid1616
                res.stream = that.stream1616
                res.rtspPath = that.rtspPath1616
                res.videoDocument = document.getElementById("show16_video16")
                break;
              default:
                res.pc = that.pc161
                res.suuid = that.suuid161
                res.stream = that.stream161
                res.rtspPath = that.rtspPath161
                res.videoDocument = document.getElementById("show16_video1")
                break;
            }
            break;
          default:
            res.pc = that.pc
            res.suuid = that.suuid
            res.stream = that.stream
            res.rtspPath = that.rtspPath
            res.videoDocument = document.getElementById("show1_video1")
            break;
        }
        return res;
      },

      /** 设置回去 */
      setVideoInfo(showCount,index,videoInfo){
        let that = this
        switch (parseInt(showCount)){
          case 4:
            switch (parseInt(index)){
              case 2:
                that.pc2 = videoInfo.pc
                that.suuid2 = videoInfo.suuid
                that.stream2 = videoInfo.stream
                that.rtspPath2 = videoInfo.rtspPath
                that.videoDocument2 = videoInfo.videoDocument
                return;
              case 3:
                that.pc3 = videoInfo.pc
                that.suuid3 = videoInfo.suuid
                that.stream3 = videoInfo.stream
                that.rtspPath3 = videoInfo.rtspPath
                that.videoDocument3 = videoInfo.videoDocument
                return;
              case 4:
                that.pc4 = videoInfo.pc
                that.suuid4 = videoInfo.suuid
                that.stream4 = videoInfo.stream
                that.rtspPath4 = videoInfo.rtspPath
                that.videoDocument4 = videoInfo.videoDocument
                return;
              default:
                that.pc1 = videoInfo.pc
                that.suuid1 = videoInfo.suuid
                that.stream1 = videoInfo.stream
                that.rtspPath1 = videoInfo.rtspPath
                that.videoDocument1 = videoInfo.videoDocument
                return;
            }
          case 9:
            switch (parseInt(index)){
              case 2:
                that.pc92 = videoInfo.pc
                that.suuid92 = videoInfo.suuid
                that.stream92 = videoInfo.stream
                that.rtspPath92 = videoInfo.rtspPath
                that.videoDocument92 = videoInfo.videoDocument
                return;
              case 3:
                that.pc93 = videoInfo.pc
                that.suuid93 = videoInfo.suuid
                that.stream93 = videoInfo.stream
                that.rtspPath93 = videoInfo.rtspPath
                that.videoDocument93 = videoInfo.videoDocument
                return;
              case 4:
                that.pc94 = videoInfo.pc
                that.suuid94 = videoInfo.suuid
                that.stream94 = videoInfo.stream
                that.rtspPath94 = videoInfo.rtspPath
                that.videoDocument94 = videoInfo.videoDocument
                return;
              case 5:
                that.pc95 = videoInfo.pc
                that.suuid95 = videoInfo.suuid
                that.stream95 = videoInfo.stream
                that.rtspPath95 = videoInfo.rtspPath
                that.videoDocument95 = videoInfo.videoDocument
                return;
              case 6:
                that.pc96 = videoInfo.pc
                that.suuid96 = videoInfo.suuid
                that.stream96 = videoInfo.stream
                that.rtspPath96 = videoInfo.rtspPath
                that.videoDocument96 = videoInfo.videoDocument
                return;
              case 7:
                that.pc97 = videoInfo.pc
                that.suuid97 = videoInfo.suuid
                that.stream97 = videoInfo.stream
                that.rtspPath97 = videoInfo.rtspPath
                that.videoDocument97 = videoInfo.videoDocument
                return;
              case 8:
                that.pc98 = videoInfo.pc
                that.suuid98 = videoInfo.suuid
                that.stream98 = videoInfo.stream
                that.rtspPath98 = videoInfo.rtspPath
                that.videoDocument98 = videoInfo.videoDocument
                return;
              case 9:
                that.pc99 = videoInfo.pc
                that.suuid99 = videoInfo.suuid
                that.stream99 = videoInfo.stream
                that.rtspPath99 = videoInfo.rtspPath
                that.videoDocument99 = videoInfo.videoDocument
                return;
              default:
                that.pc91 = videoInfo.pc
                that.suuid91 = videoInfo.suuid
                that.stream91 = videoInfo.stream
                that.rtspPath91 = videoInfo.rtspPath
                that.videoDocument91 = videoInfo.videoDocument
                return;
            }
          case 16:
            switch (parseInt(index)){
              case 2:
                that.pc162 = videoInfo.pc
                that.suuid162 = videoInfo.suuid
                that.stream162 = videoInfo.stream
                that.rtspPath162 = videoInfo.rtspPath
                that.videoDocument162 = videoInfo.videoDocument
                return;
              case 3:
                that.pc163 = videoInfo.pc
                that.suuid163 = videoInfo.suuid
                that.stream163 = videoInfo.stream
                that.rtspPath163 = videoInfo.rtspPath
                that.videoDocument163 = videoInfo.videoDocument
                return;
              case 4:
                that.pc164 = videoInfo.pc
                that.suuid164 = videoInfo.suuid
                that.stream164 = videoInfo.stream
                that.rtspPath164 = videoInfo.rtspPath
                that.videoDocument164 = videoInfo.videoDocument
                return;
              case 5:
                that.pc165 = videoInfo.pc
                that.suuid165 = videoInfo.suuid
                that.stream165 = videoInfo.stream
                that.rtspPath165 = videoInfo.rtspPath
                that.videoDocument165 = videoInfo.videoDocument
                return;
              case 6:
                that.pc166 = videoInfo.pc
                that.suuid166 = videoInfo.suuid
                that.stream166 = videoInfo.stream
                that.rtspPath166 = videoInfo.rtspPath
                that.videoDocument166 = videoInfo.videoDocument
                return;
              case 7:
                that.pc167 = videoInfo.pc
                that.suuid167 = videoInfo.suuid
                that.stream167 = videoInfo.stream
                that.rtspPath167 = videoInfo.rtspPath
                that.videoDocument167 = videoInfo.videoDocument
                return;
              case 8:
                that.pc168 = videoInfo.pc
                that.suuid168 = videoInfo.suuid
                that.stream168 = videoInfo.stream
                that.rtspPath168 = videoInfo.rtspPath
                that.videoDocument168 = videoInfo.videoDocument
                return;
              case 9:
                that.pc169 = videoInfo.pc
                that.suuid169 = videoInfo.suuid
                that.stream169 = videoInfo.stream
                that.rtspPath169 = videoInfo.rtspPath
                that.videoDocument169 = videoInfo.videoDocument
                return;
              case 10:
                that.pc1610 = videoInfo.pc
                that.suuid1610 = videoInfo.suuid
                that.stream1610 = videoInfo.stream
                that.rtspPath1610 = videoInfo.rtspPath
                that.videoDocument1610 = videoInfo.videoDocument
                return;
              case 11:
                that.pc1611 = videoInfo.pc
                that.suuid1611 = videoInfo.suuid
                that.stream1611 = videoInfo.stream
                that.rtspPath1611 = videoInfo.rtspPath
                that.videoDocument1611 = videoInfo.videoDocument
                return;
              case 12:
                that.pc1612 = videoInfo.pc
                that.suuid1612 = videoInfo.suuid
                that.stream1612 = videoInfo.stream
                that.rtspPath1612 = videoInfo.rtspPath
                that.videoDocument1612 = videoInfo.videoDocument
                return;
              case 13:
                that.pc1613 = videoInfo.pc
                that.suuid1613 = videoInfo.suuid
                that.stream1613 = videoInfo.stream
                that.rtspPath1613 = videoInfo.rtspPath
                that.videoDocument1613 = videoInfo.videoDocument
                return;
              case 14:
                that.pc1614 = videoInfo.pc
                that.suuid1614 = videoInfo.suuid
                that.stream1614 = videoInfo.stream
                that.rtspPath1614 = videoInfo.rtspPath
                that.videoDocument1614 = videoInfo.videoDocument
                return;
              case 15:
                that.pc1615 = videoInfo.pc
                that.suuid1615 = videoInfo.suuid
                that.stream1615 = videoInfo.stream
                that.rtspPath1615 = videoInfo.rtspPath
                that.videoDocument1615 = videoInfo.videoDocument
                return;
              case 16:
                that.pc1616 = videoInfo.pc
                that.suuid1616 = videoInfo.suuid
                that.stream1616 = videoInfo.stream
                that.rtspPath1616 = videoInfo.rtspPath
                that.videoDocument1616 = videoInfo.videoDocument
                return;
              default:
                that.pc161 = videoInfo.pc
                that.suuid161 = videoInfo.suuid
                that.stream161 = videoInfo.stream
                that.rtspPath161 = videoInfo.rtspPath
                that.videoDocument161 = videoInfo.videoDocument
                return;
            }
          default:
            that.pc = videoInfo.pc
            that.suuid = videoInfo.suuid
            that.stream = videoInfo.stream
            that.rtspPath = videoInfo.rtspPath
            that.videoDocument = videoInfo.videoDocument
            return;
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
          msg.text = this.getAlarmTypesByTypeIndex(data.type).labal;     // 文字内容
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
      getAlarmTypesByTypeIndex(key){
        for (let i = 0; i < this.AlarmTypes.length; i++) {
          if(this.AlarmTypes[i].typeindex==key){
            return this.AlarmTypes[i];
          }
        }
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
      }
    },
    watch: {
      // 监听字典id变化
      loadallDevices() {

      },
      async Cam_showcount(val){
        try{
          this.pc.close();
          this.pc = null
        }catch(e){e}
        try{
          this.pc1.close();
          this.pc1 = null
        }catch(e){e}
        try{
          this.pc2.close();
          this.pc2 = null
        }catch(e){e}
        try{
          this.pc3.close();
          this.pc3 = null
        }catch(e){e}
        try{
          this.pc4.close();
          this.pc4 = null
        }catch(e){e}
        this.selectvideoindex(1)
        let that = this;
        let end = val>that.loadallDevices.length?that.loadallDevices.length:val
        for (let videoindex = 1; videoindex <= end; videoindex++) {
          await that.rePlayVideoStream(videoindex,that.loadallDevices[videoindex-1])
        }
      },
      async current(val){
        let that = this;
        if(val==null){
          return
        }
        let videoindex = that.videoindex>0?that.videoindex:that.videoindex;
        await that.rePlayVideoStream(videoindex,val)
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

  video{
    background: url(errorimg.jpg) no-repeat ;
    background-size:100% 100%;
  }

</style>
