<template>

  <div style="width: 100%;height: 100%;">

    <div style="border: gainsboro 1px solid;text-align: center;">
      <video autoplay controls width="auto" :height="clientHeight" id="videoElement"></video>
      <!-- <el-row>
        <el-col :span="12">
          <div><video autoplay controls width="auto" :height="clientHeight/2" id="videoElement"></video></div>
        </el-col>
        <el-col :span="12">
          <div><video autoplay controls width="auto" :height="clientHeight/2" id="videoElement2"></video></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div><video autoplay controls width="auto" :height="clientHeight/2" id="videoElement3"></video></div>
        </el-col>
        <el-col :span="12">
          <div><video autoplay controls width="auto" :height="clientHeight/2" id="videoElement4"></video></div>
        </el-col>
      </el-row> -->
    </div>

    <div
      style="border: 1px gainsboro solid;padding: 10px;white-space: nowrap;overflow-x: auto;-webkit-overflow-scrolling:touch;">
      <div v-for="item in dickrecords" v-bind:key="item" style="display: inline-block;margin: 10px 10px 0 0;">
        <div class="dickrecord images" v-viewer>
          <img :src="'/api/'+item.image_path" />
          <div><span class="dickrecordtype">{{item.label}}</span></div>
          <div><span>{{ $util.toDateString(item.time/1) }}</span></div>
        </div>
      </div>
      <div style="display: inline-block;margin: 10px 10px 0 0;height: 140px;">
      </div>
    </div>

  </div>
</template>

<script>
  import flvjs from 'flv.js'
  import axios from 'axios'
  import {
    loadRecord,
  } from '@/api/list/basic';
  // import {
  //   loadRecord,
  //   aistartrtsp,
  //   aistoprtsp
  // } from '@/api/list/basic';

  export default {
    name: 'WarnCenterListData',
    components: {},
    props: {
      // 字典id
      loadallDevices: Array
    },
    data() {
      return {
        dickrecords: [],
        startTime: 1,
        timer: null,
        flvPlayer: Object,
        clientHeight: document.documentElement.clientHeight - 330,
      }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.createVideo(0)
        //4路测试
          //this.createVideo1()
          //this.createVideo2()
          // this.createVideo3()
          // this.createVideo4()
        }, 1500)

        if (this.timer == null) {
          this.timer = window.setInterval(() => {
            setTimeout(() => {
              this.datasource()
              this.clientHeight = document.documentElement.clientHeight - 330
            }, 0)
          }, 3000)
        }
      })
    },
    destroyed() {
      window.clearInterval(this.timer);
      this.timer = null;
      this.flvPlayer.pause();
      this.flvPlayer.unload();
      this.flvPlayer.detachMediaElement();
      this.flvPlayer.destroy();
      this.flvPlayer = null;
      //aistoprtsp(this.loadallDevices).then(() => {});
      axios({
        url: 'http://127.0.0.1:8891/stop',
      })
    },
    methods: {
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
              this.dickrecords.unshift(data.list[i])
            }
          }
          //this.dickrecords = data.list
        });
      },
      createVideo() {

        console.log(this.loadallDevices)

        /* aistartrtsp(this.loadallDevices).then(() => {
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement');
            // this.flvPlayer = flvjs.createPlayer({
            //   type: 'flv',
            //   isLive: true,
            //   url: 'http://1011.hlsplay.aodianyun.com/demo/game.flv' //你的url地址
            // });
            let url = 'http://' + window.location.hostname +
              ':8092/live?port=1985&app=live&stream=mystream' //你的url地址
            this.flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: url
            });
            this.flvPlayer.attachMediaElement(videoElement);
            this.flvPlayer.load();
            this.flvPlayer.play();
          }
        }).catch((e) => {
          this.$message.error(e.message);
        }); */
        axios({
          url: 'http://127.0.0.1:8891/start',
          method: 'post',
          params: {rtsp: this.loadallDevices[0].Cam_path},
        }).then((result) => {
          console.log(result)
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement');
            let url = 'http://127.0.0.1' +
              ':8092/live?port=1935&app=live&stream=mystream' //你的url地址
            this.flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: url
            });
            this.flvPlayer.attachMediaElement(videoElement);
            this.flvPlayer.load();
            this.flvPlayer.play();
          }
        })
      },
      createVideo1(){
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement');
          let url = 'http://127.0.0.1' +
            ':8092/live?port=1985&app=live&stream=mystream1' //你的url地址
          var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: url
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      },
      createVideo2(){
        // if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement2');
          let url = 'http://127.0.0.1' +
            ':8092/live?port=1985&app=live&stream=mystream2' //你的url地址
          var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: url
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        // }
      },
      createVideo3(){
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement3');
          let url = 'http://127.0.0.1' +
            ':8092/live?port=1985&app=live&stream=mystream3' //你的url地址
          var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: url
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      },
      createVideo4(){
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById('videoElement4');
          let url = 'http://127.0.0.1' +
            ':8092/live?port=1985&app=live&stream=mystream4' //你的url地址
          var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: url
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      }
    },
    watch: {
      // 监听字典id变化
      loadallDevices() {
        //aistartrtsp(this.loadallDevices).then(() => {})
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = null;
        this.createVideo(1)

        // axios({
        //   url: 'http://127.0.0.1:8891/start',
        //   method: 'post',
        //   params: {rtsp: this.loadallDevices[1].Cam_path},
        // }).then((result) => {
        //   console.log(result)

        // })
      }
    }
  };
</script>

<style scoped>
  .dickrecord {
    border: red 1px dashed;
    width: 120px;
    height: 120px;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    padding: 5px;
  }

  .dickrecord img {
    width: 100%;
    max-height: 120px;
  }

  .dickrecord span {
    font-weight: bold;
  }
</style>
