<template>


  <div class="ele-body" style="padding: 10px;">
    <el-card shadow="never" style="padding-bottom: 0;box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);">

      <img id="testimg" src="../../../assets/test.png" style="display: none;" />
      <img id="errorimg" src="../../../assets/errorimg.jpg" style="display: none;" />

      <el-row :gutter="15" style='height:calc(100vh - 117px);'>
        <el-col :lg="16" :md="16" :xl="16" :sm="16" style="height: 100%;padding-bottom: 2px;">

          <div class="buttondiv">
            <!-- <el-button @click="rectLable">矩形</el-button> -->
            <el-button @click="polygonLable">多边形</el-button>
            <el-button @click="rectFullLable">铺满全屏</el-button>
            <el-button @click="deleteLable">删除</el-button>
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
                <el-col style="width: 25%;padding: 7.5px;min-width: 125px;display: none;">
                  <el-card class="project-list-item" :shadow="existenceBundingType(0)?'always':'hover'" @click.native="bundingType(0)"
                    :style="existenceBundingType(0)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img src="../../../assets/smoke.png" alt="吸烟检测" :style="existenceBundingType(0)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body">
                      <b>吸烟检测</b>
                    </div>
                  </el-card>
                </el-col>
                <el-col style="width: 25%;padding: 7.5px;min-width: 125px;display: none;">
                  <el-card class="project-list-item" :shadow="existenceBundingType(1)?'always':'hover'" @click.native="bundingType(1)"
                    :style="existenceBundingType(1)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img src="../../../assets/call.png" alt="打电话检测" :style="existenceBundingType(1)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body">
                      <b>打电话检测</b>
                    </div>
                  </el-card>
                </el-col>
                <el-col style="width: 25%;padding: 7.5px;min-width: 125px;display: none;">
                  <el-card class="project-list-item" :shadow="existenceBundingType(2)?'always':'hover'" @click.native="bundingType(2)"
                    :style="existenceBundingType(2)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img src="../../../assets/flame.png" alt="烟火检测" :style="existenceBundingType(2)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body">
                      <b>烟火检测</b>
                    </div>
                  </el-card>
                </el-col>
                <el-col style="width: 25%;padding: 7.5px;min-width: 125px;display: none;">
                  <el-card class="project-list-item" :shadow="existenceBundingType(3)?'always':'hover'" @click.native="bundingType(3)"
                    :style="existenceBundingType(3)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img src="../../../assets/reflective.png" alt="反光衣检测" :style="existenceBundingType(3)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body">
                      <b>反光衣检测</b>
                    </div>
                  </el-card>
                </el-col>
                <el-col style="width: 25%;padding: 7.5px;min-width: 125px;display: none;">
                  <el-card class="project-list-item" :shadow="existenceBundingType(4)?'always':'hover'" @click.native="bundingType(4)"
                    :style="existenceBundingType(4)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img src="../../../assets/safetyhat.png" alt="安全帽检测" :style="existenceBundingType(4)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body">
                      <b>安全帽识别</b>
                    </div>
                  </el-card>
                </el-col>
                <el-col style="width: 25%;padding: 7.5px;">
                  <el-card class="project-list-item" :shadow="existenceBundingType(5)?'always':'hover'" @click.native="bundingType(5)"
                    :style="existenceBundingType(5)?bundingStyle:noBundingStyle">
                    <div class="project-list-cover">
                      <img src="@/assets/inside.png" alt="人员闯入" :style="existenceBundingType(5)?'':nobundingimgStyle" />
                    </div>
                    <div class="project-list-body">
                      <b>人员闯入</b>
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
    aisetconfig
  } from '@/api/config/channel_config';
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
        target:null,
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
      }
    },
    mounted() {
      let that = this
      that.$nextTick(function() {
        loadallDevices().then((res) => {
          that.options = res.list
          for (let i = 0; i < res.list.length; i++) {
            that.options[i].src = window.location.protocol+"//"+window.location.hostname+":"+(res.list[i].Cam_http);
            // that.options[i].src = "http://192.168.49.122:" + (res.list[i].Cam_http);
            aigetconfig({device: res.list[i]})
              .then((res1) => {
                that.options[i].bundingTypes = res1.aiType.split(',').map(Number)
                that.options[i].aiRect = res1.aiRect
                if(i==0){
                  that.camselect = that.options[0].src
                  that.bundingTypes = that.options[0].bundingTypes
                  if(res1.aiRect&&res1.aiRect.length>0){
                    let shape = that.labelImg.createShape("polygon", {positions: res1.aiRect})
                    that.labelImg.addShape(shape)
                  }
                }
              })
          }


          let containerpdiv = document.getElementById('containerpdiv');
          let container = document.getElementById('container');

          let canWidth = containerpdiv.offsetWidth-2
          let canHeight = (containerpdiv.offsetWidth-2)/1280*720
          container.style.width = canWidth+'px'
          container.style.height = canHeight+'px'
          console.log(window.screen.availWidth,window.screen.availHeight)

          that.labelImg = new LabelImg(document.getElementById('container'),{
            width: canWidth,
            height: canHeight,
            bgColor: `rgba(0,0,0,0)`, // 背景色
            imagePlacement: "default", // default | center
          })

          that.labelImg.register("polygon", {
            type: "Polygon",
            tag: "多边形",
            min: 100,
            style: {
              normal:{
                dotRadius: canWidth/1280*8,//点的大小
              },
              active:{
                dotRadius: canWidth/1280*10,//点的大小
              }
            }
          })
          that.labelImg.register("rect", {
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
          })

          that.labelImg.setTagShow(false)
          that.labelImg.load(document.getElementById('testimg').src)

          that.labelImg.emitter.on("create", () => {
            that.islable = false
          })

          let canvas = container.getElementsByTagName('canvas')[0]

          canvas.style.background = 'url('+that.options[0].src+') no-repeat center'
          console.log(that.options)
          canvas.style.backgroundSize = "100% 100%"
          that.bgwidth = canWidth
          that.bgheight = canHeight

          that.initTimer()

        })

      })
    },
    beforeDestroy(){
      window.clearInterval(this.timer);
      window.stop()
    },
    methods: {
      initTimer(){
        let that = this
        if (that.timer == null) {
          that.timer = window.setInterval(() => {
            setTimeout(() => {

              let containerpdiv = document.getElementById('containerpdiv');
              let container = document.getElementById('container');
              container.style.width = (containerpdiv.offsetWidth-2)+'px'
              container.style.height = ((containerpdiv.offsetWidth-2)/1280*720)+'px'

              let canvas = container.getElementsByTagName('canvas')[0]

              canvas.style.height = container.offsetHeight+'px'
              canvas.style.width = container.offsetWidth+'px'

              let canWidth = parseInt(container.offsetWidth)
              let canHeight = parseInt(((container.offsetWidth)/1280)*720)
              that.bgwidth = canWidth
              that.bgheight = canHeight
              canvas.style.backgroundSize = "100% 100%"
              that.labelImg.forceRender()
            }, 0)
          }, 3000)
        }
      },
      renderList(str, list, target){
        console.log(str,list,target)
      },
      changeCamPath(data){
        let canvas = document.getElementById('container').getElementsByTagName('canvas')[0]
        canvas.style.background = 'url('+data+') no-repeat center'
        canvas.style.backgroundSize = "100% 100%"
        let that = this
        that.options.map((e)=>{
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
        })

      },
      bundingType(type){
        if(this.bundingTypes.indexOf(type)>-1){
          this.bundingTypes.splice(this.bundingTypes.indexOf(type),1)
        }else{
          this.bundingTypes.push(type)
        }
      },
      existenceBundingType(type){
        return this.bundingTypes.indexOf(type)>-1;
      },
      rectLable(){
        let that = this
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          that.labelImg.remove(e)
        })
        this.labelImg.label('rect')
        that.islable = true
      },
      polygonLable(){
        let that = this
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          that.labelImg.remove(e)
        })
        this.labelImg.label('polygon')
        that.islable = true
      },
      rectFullLable(){
        let that = this
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          that.labelImg.remove(e)
        })
        // let height = document.getElementsByTagName('canvas')[0].height
        // let width = document.getElementsByTagName("canvas")[0].width
        let shape = that.labelImg.createShape("polygon", {positions: [[0,0],[0,720],[1280,720],[1280,0]]})
        that.labelImg.addShape(shape)
      },
      deleteLable(){
        this.labelImg.labelOff()
        this.labelImg.getShapeList().map((e) => {
          this.labelImg.remove(e)
        })
        this.islable = false
      },
      submitLable(){
        let that = this
        that.options.map((e)=>{
          if(that.camselect==e.src){
            console.log(that.camselect,e)

            if(that.islable){
              that.$message.error("边界框时需要首尾相接才算完成");
              return false
            }

            let ShapeList = that.labelImg.getShapeList();
            let positions = []
            if(ShapeList.length>0){
              positions = ShapeList[0].getPositions()
              for (let i = 0; i < positions.length; i++) {
                positions[i][0] = parseInt(positions[i][0])
                positions[i][1] = parseInt(positions[i][1])
              }
            }

            console.log(positions)

            let body = {
              device: {
                Cam_Id: e.Cam_Id,
                Cam_comments: e.Cam_comments,
                Cam_name: e.Cam_name,
                Cam_path: e.Cam_path,
              },
              aiType: e.bundingTypes.join(','),
              aiRect: positions
            }
            aisetconfig(body).then((msg) => {
              this.$message.success(msg);
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
.buttondiv{
  background-color: #fafafa;
  height: 58px;
  border: 1px solid gainsboro;
  border-bottom-width: 0;
  line-height: 58px;
  padding-left: 10px;
}
#containerpdiv{
  overflow-x: auto;
  border: #dcdcdc solid 1px;
  height:calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
