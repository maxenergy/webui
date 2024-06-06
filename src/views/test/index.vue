<template>

  <div style="width: 100%;height: 100%;">
    <video id="show4_video1" autoplay controls="controls"></video>
    <a>{{testmsg1}}</a>
  </div>
</template>

<script>

  import axios from 'axios';
  import {
    loadRecord,
  } from '@/api/list/basic';

  export default {
    name: 'WarnCenterListData',
    components: {},
    props: {
      // 字典id
      loadallDevices: Array,
      Cam_showcount: String,
      current: Object
    },
    data() {
      return {
        testmsg1: '3',
        videoindex: 0,
        videoindexshow: false,
        loadallDevices1: '',
        loadallDevices2: '',
        loadallDevices3: '',
        loadallDevices4: '',
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

        config: {
          iceServers: [{
            urls: ["stun:stun.l.google.com:19302"]
          }]
        },

      }
    },
    beforeDestroy() {
      window.stop()
      this.loadallDevices1 = null;
      this.loadallDevices2 = null;
      this.loadallDevices3 = null;
      this.loadallDevices4 = null;
    },
    mounted() {
      let that = this
      that.$nextTick(() => {
        setTimeout(async () => {
          //默认一路
          that.rtspPath = "desktop"
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
    methods: {
      /** 验证是否有添加指定视频流 */
      async verifyVideoHasAdded(showCount,index){
        let that = this;
        let videoInfo = that.getVideoInfo(showCount,index);
        console.log(showCount,index,videoInfo)
        //验证是否有添加指定视频流
        const res = await axios({
          url: 'http://'+window.location.hostname+':18083/stream/codec/'+videoInfo.suuid,
          method: 'GET'
        });
        that.testmsg1 = res.data
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
        let res = await axios({
          url: "http://"+window.location.hostname+":18083/stream",
          method: 'POST',
          data:data
        });
        this.testmsg1 = res.data
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
          url: "http://"+window.location.hostname+":18083/stream/receiver/"+videoInfo.suuid,
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
          default:
            res.pc = that.pc
            res.suuid = that.suuid
            res.stream = that.stream
            res.rtspPath = that.rtspPath
            res.videoDocument = document.getElementById("show4_video1")
            break;
        }

        return res;
      },
      /** 获取视频相关信息 */
      setVideoDocumentStream (showCount,index,stream){
        switch (parseInt(showCount)){
          case 4:
            switch (parseInt(index)){
              case 2:
                document.getElementById("show4_video2").srcObject = stream;
                return;
              case 3:
                document.getElementById("show4_video3").srcObject = stream;
                return;
              case 4:
                document.getElementById("show4_video4").srcObject = stream;
                return;
              default:
                document.getElementById("show4_video1").srcObject = stream;
                return;
            }
          default:
            document.getElementById("show1_video1").srcObject = stream;
            return;
        }
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
            }
          }
          //this.dickrecords = data.list
        });
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
