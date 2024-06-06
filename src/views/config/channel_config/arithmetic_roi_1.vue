<template>


  <div class="ele-body" style="padding: 10px;">
    <el-card shadow="never" style="padding-bottom: 0;box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);">

      <img id="testimg" src="../../../assets/test.png" style="display: none;" />
      <img id="errorimg" src="../../../assets/errorimg.jpg" style="display: none;" />

      <el-row :gutter="15" style='height:calc(100vh - 117px);'>
        <el-col :lg="16" :md="16" :xl="16" :sm="16" style="height: 100%;padding-bottom: 2px;">

          <div class="buttondiv">
            <!-- <el-button @click="rectLable">矩形</el-button> -->
            <!-- <el-button @click="polygonLable">多边形</el-button> -->
            <!-- <el-button @click="rectFullLable">铺满全屏</el-button> -->
            <el-button @click="deleteLable">删除</el-button>
            <el-button @click="deleteAllLable">清空</el-button>
          </div>

          <div id="containerpdiv">

            <div id="container" style="width: 100%;height: 100%;">


            </div>
          </div>
          <span style="float: right;color: red;margin-top: -20px;">注意: 画边界框时需要首尾相接才算完成</span>
        </el-col>
        <el-col :lg="8" :md="8" :xl="8" :sm="8" style="height: 100%;padding-left: 10px;padding-bottom: 2px;">
          <!-- 数据表格 -->
          <div style="height: 100%;border: 1px solid gainsboro;">
            <div style="background-color: #fafafa;height: 58px;border-bottom: gainsboro solid 1px;">
              <el-row :gutter="15">
                <el-col :lg="16" :md="16" :xl="16" :sm="16" style="height: 100%;padding-bottom: 2px;max-width: 300px;">
                  <el-select v-model="camselect" @change="changeCamPath" placeholder="请选择要配置摄像头"
                    style="line-height: 58px;margin-left: 15px;width: 100%;">
                    <el-option v-for="item in options" :key="item.Cam_path" :label="item.Cam_name" :value="item.src">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :lg="7" :md="7" :xl="7" :sm="7" style="line-height: 58px;margin-left: 10px;">
                  <el-button @click="submitLable" type="primary">保存</el-button>
                </el-col>


              </el-row>
              <el-row :gutter="15" style="padding: 0px 10px;height:calc(100vh - 180px); overflow-y: auto;">
                <el-col v-for="item in AlarmTypes" :key="item.typeindex" style="width: 120px;">
                  <el-card class="project-list-item grid-content" :shadow="existenceBundingType(item.typeindex)?'always':'hover'"
                    @click.native="bundingType(item.typeindex)" v-if="isImgShow(item.name)"
                    :style="existenceBundingType(item.typeindex)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img :src="item.src" :alt="item.label"
                        :style="existenceBundingType(item.typeindex)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body" >
                      <b>{{item.label}}</b>
                    </div>
                  </el-card>
                </el-col>

              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {
    loadallDevices,
    aigetconfig,
    aisetconfig,
    aiGetAlgorithm
  } from '@/api/config/channel_config';
  import {
    reloadPageTab
  } from '@/utils/page-tab-util';
  import LabelImg from 'label-img';
  //const Shape = LabelImg.Shape

  export default {
    name: 'arithmetic_roi',
    components: {},
    props: {
      imageData: null,
    },
    data() {
      return {
        camselect: '',
        bgwidth: 1280,
        bgheight: 720,
        options: [],
        timer: null,

        labelImg: null,
        emitter: null,
        target: null,
        list: null,
        ShapeSelect: null,
        ShapeSelectOption: null,

        bundingTypes: [],
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
        AlarmTypes: [],
        CurrentHeight: 0,
        CurrentWidth: 0,
      }
    },
    mounted() {
      let that = this
      let current = this.$route.query.data?this.$route.query.data:0
      aiGetAlgorithm()
            .then((msg) => {
              this.loading = false;
              this.AlarmTypes = msg.list;
              console.log(msg);
                 that.$nextTick(function() {
        loadallDevices().then((res) => {
          that.options = res.list
          for (let i = 0; i < res.list.length; i++) {
             that.options[i].src = window.location.protocol + "//" + window.location.hostname + ":" + (res.list[i].Cam_http);
            // that.options[i].src = window.location.protocol + "//" + window.location.hostname + ":" + (res.list[i].Cam_http)+"?time="+Math.random();
            //that.options[i].src = window.location.protocol + "//192.168.2.168:" + (res.list[i].Cam_http)+"?time="+Math.random();
            aigetconfig({
                device: res.list[i]
              })
              .then((res1) => {
                that.options[i].bundingTypes = res1.aiType?res1.aiType.split(',').map(Number):[]
                that.options[i].aiRect = res1.aiRect
                if (i == current) {
                  that.camselect = that.options[current].src
                  if (res1.aiRect != null) {
                    for (let val in res1.aiRect) {
                      let aiRect = res1.aiRect[val]
                      if (aiRect != null && aiRect.length > 0) {
                        aiRect.map((e) => {
                          that.AlarmTypes.map((alarmType) => {
                            if (alarmType.typeindex == parseInt(val)) {
                              let shape = that.labelImg.createShape(alarmType.name, {
                                positions: e
                              })
                              that.labelImg.addShape(shape)
                            }
                          })
                        })
                      }
                    }
                  }
                }
              })
          }

          let containerpdiv = document.getElementById('containerpdiv');
          let container = document.getElementById('container');

          let canWidth = containerpdiv.offsetWidth - 2
          let canHeight = (containerpdiv.offsetWidth - 2) / 1280 * 720
          container.style.width = canWidth + 'px'
          container.style.height = canHeight + 'px'
          console.log(window.screen.availWidth, window.screen.availHeight)
          that.CurrentWidth = canWidth
          that.CurrentHeight = canHeight
          that.labelImg = new LabelImg(document.getElementById('container'), {
            width: canWidth,
            height: canHeight,
            bgColor: `rgba(0,0,0,0)`, // 背景色
            imagePlacement: "default", // default | center
          })


          that.AlarmTypes.map((alarmType) => {
            // console.log(alarmType.name)
            that.labelImg.register(alarmType.name, {
              type: "Polygon",
              tag: alarmType.label,
              min: 100,
              style: {
                normal: {
                  lineColor: alarmType.activeColor,
                  fillColor: alarmType.normalColor,
                  dotColor: alarmType.activeColor,
                  dotRadius: canWidth / 1280 * 8, //点的大小
                },
                active: {
                  lineColor: alarmType.activeColor,
                  fillColor: alarmType.activeColor,
                  dotColor: alarmType.activeColor,
                  dotRadius: canWidth / 1280 * 10, //点的大小
                }
              }
            })

          })


          /* that.labelImg.register("rect", {
            type: "Rect",
            tag: "矩形",
            min: 100,
            style: {
              normal:{
                lineColor: 'rgba(247, 206, 211, 1)',
                fillColor: 'rgba(247, 206, 211, 0.8)',
                dotColor: 'rgba(247, 206, 211, 1)',
                dotRadius: canWidth/1280*8,//点的大小
              },
              active:{
                lineColor: 'rgba(247, 206, 211, 1)',
                fillColor: 'rgba(247, 206, 211, 0.8)',
                dotColor: 'rgba(247, 206, 211, 1)',
                dotRadius: canWidth/1280*10,//点的大小
              }
            }
          }) */

          that.labelImg.load(document.getElementById('testimg').src)

          that.labelImg.emitter.on("create", () => {
            this.bundingTypes = []
            that.islable = false
          })
          that.labelImg.emitter.on("select", (e) => {
            that.ShapeSelect = e
          })

          let canvas = container.getElementsByTagName('canvas')[0]

          canvas.style.background = 'url(' + that.options[0].src + ') no-repeat center'
          console.log(that.options)
          canvas.style.backgroundSize = "100% 100%"
          that.bgwidth = canWidth
          that.bgheight = canHeight

          that.initTimer()

        })

      })
            })
            .catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });

   
    },
    beforeDestroy() {
      window.clearInterval(this.timer);
      window.stop()
    },
    methods: {
      isImgShow(src){
        return src.indexOf("NULL")==0?false:true;
      },
      initTimer() {
        let that = this
        if (that.timer == null) {
          that.timer = window.setInterval(() => {
            setTimeout(() => {
              let containerpdiv = document.getElementById('containerpdiv');
              let container = document.getElementById('container');
              container.style.width = (containerpdiv.offsetWidth - 2) + 'px'
              container.style.height = ((containerpdiv.offsetWidth - 2) / 1280 * 720) + 'px'

              let canvas = container.getElementsByTagName('canvas')[0]

              canvas.style.height = container.offsetHeight + 'px'
              canvas.style.width = container.offsetWidth + 'px'

              let canWidth = containerpdiv.offsetWidth - 2
              let canHeight = (containerpdiv.offsetWidth - 2) / 1280 * 720

              if(that.CurrentWidth != canWidth||that.CurrentHeight != canHeight){

                for (let i = 0; i < that.options.length; i++) {
                  if(that.options[i].src == that.camselect){
                    reloadPageTab(i)
                  }
                }
              }


               /*that.bgwidth = canWidth
              that.bgheight = canHeight
              canvas.style.backgroundSize = "100% 100%"

              that.labelImg.render() */

            }, 0)
          }, 3000)
        }
      },
      renderList(str, list, target) {
        console.log(str, list, target)
      },
      changeCamPath(data) {
        let canvas = document.getElementById('container').getElementsByTagName('canvas')[0]
        canvas.style.background = 'url(' + data + ') no-repeat center'
        canvas.style.backgroundSize = "100% 100%"
        let that = this

        that.options.map((res1) => {
          if (data == res1.src) {
            that.bundingTypes = []
            that.deleteAllLable()
            if (res1.aiRect != null) {
              for (let val in res1.aiRect) {
                let aiRect = res1.aiRect[val]
                if (aiRect != null && aiRect.length > 0) {
                  aiRect.map((e) => {
                    that.AlarmTypes.map((alarmType) => {
                      if (alarmType.typeindex == parseInt(val)) {
                        let shape = that.labelImg.createShape(alarmType.name, {
                          positions: e
                        })
                        that.labelImg.addShape(shape)
                      }
                    })
                  })
                }
              }
            }
          }
        })
        /* that.options.map((e)=>{
          if(data==e.src){
            console.log(e)
            that.bundingTypes = e.bundingTypes
            that.labelImg.getShapeList().map((e) => {
              that.labelImg.remove(e)
            })
            if(e.aiRect){
              let shape = that.labelImg.createShape("polygon", {positions: e.aiRect})
              that.labelImg.addShape(shape)
            }
          }
        }) */

      },
      bundingType(type) {
        this.bundingTypes = []
        this.labelImg.labelOff()
        this.AlarmTypes.map((alarmTypes) => {
          if (alarmTypes.typeindex == type) {
            if (this.bundingTypes.indexOf(type) > -1) {
              this.labelImg.labelOff()
              this.bundingTypes.splice(this.bundingTypes.indexOf(type), 1)
            } else {
              this.labelImg.label(alarmTypes.name)
              this.bundingTypes.push(type)
            }
          }
        })
      },
      existenceBundingType(type) {
        return this.bundingTypes.indexOf(type) > -1;
      },
      rectLable() {
        let that = this
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          that.labelImg.remove(e)
        })
        this.labelImg.label('rect')
        that.islable = true
      },
      polygonLable() {
        let that = this
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          that.labelImg.remove(e)
        })
        this.labelImg.label(this.AlarmTypes[0].name)
        that.islable = true
      },
      rectFullLable() {
        let that = this
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          that.labelImg.remove(e)
        })
        // let height = document.getElementsByTagName('canvas')[0].height
        // let width = document.getElementsByTagName("canvas")[0].width
        let shape = that.labelImg.createShape("polygon", {
          positions: [
            [0, 0],
            [0, 720],
            [1280, 720],
            [1280, 0]
          ]
        })
        that.labelImg.addShape(shape)
      },
      deleteLable() {
        this.labelImg.labelOff()
        this.islable = false
        if (this.ShapeSelect) {
          this.labelImg.remove(this.ShapeSelect)
          this.ShapeSelect = null
        }
      },
      deleteAllLable() {
        let length = this.labelImg.getShapeList().length;
        for (let i = 0; i < length; i++) {
          this.labelImg.remove(this.labelImg.getShapeList()[0])
        }
      },
      submitLable() {
        let that = this
        that.options.map((e) => {
          if (that.camselect == e.src) {
            console.log(that.camselect, e)
            if (that.islable) {
              that.$message.error("边界框时需要首尾相接才算完成");
              return false
            }
            let ShapeList = that.labelImg.getShapeList();
            let aiRectBody = new Object();
            for (let i = 0; i < that.AlarmTypes.length; i++) {
              let alarmType = that.AlarmTypes[i];
              aiRectBody[alarmType.typeindex] = new Array();
              for (let j = 0; j < ShapeList.length; j++) {
                let shape = ShapeList[j]
                if (alarmType.name == shape.registerID) {
                  let positions = shape.getPositions()
                  for (let k = 0; k < positions.length; k++) {
                    positions[k][0] = parseInt(positions[k][0])
                    positions[k][1] = parseInt(positions[k][1])
                  }
                  aiRectBody[alarmType.typeindex].push(positions)
                }
              }
            }

            let body = {
              device: {
                Cam_Id: e.Cam_Id,
                Cam_comments: e.Cam_comments,
                Cam_name: e.Cam_name,
                Cam_path: e.Cam_path,
              },
              aiType: e.bundingTypes.join(','),
              aiRect: aiRectBody
            }
            aisetconfig(body).then((msg) => {
              this.$message.success(msg);

              for (let i = 0; i < that.options.length; i++) {
                if(that.options[i].Cam_path==e.Cam_path){
                  that.options[i].aiRect = aiRectBody
                }
              }

              //this.updateVisible(false);
              //this.$emit('done');
            })
          }
        })
      }
    },
  };
</script>

<style scoped>
  .buttondiv {
    background-color: #fafafa;
    height: 58px;
    border: 1px solid gainsboro;
    border-bottom-width: 0;
    line-height: 58px;
    padding-left: 10px;
  }

  #containerpdiv {
    overflow-x: auto;
    border: #dcdcdc solid 1px;
    height: calc(100vh - 180px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .grid-content {
    margin-bottom: 7.5px;
  }
</style>
