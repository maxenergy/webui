<template>
  <div class="ele-body">
    <!-- 地图位置选择弹窗 -->
    <ele-map-picker
      :need-city="true"
      :lock-scroll="false"
      :show.sync="showPicker"
      :dark-mode="darkMode"
      @done="onChoose"
    />
    <ele-map-picker
      :need-city="true"
      :search-type="1"
      :lock-scroll="false"
      :show.sync="showPicker2"
      :dark-mode="darkMode"
      @done="onChoose"
    />
    <el-card shadow="never" header="弹窗选择位置">
      <el-button size="small" class="ele-btn-icon" @click="showPicker = true">
        POI检索模式
      </el-button>
      <el-button size="small" class="ele-btn-icon" @click="showPicker2 = true">
        关键字检索模式
      </el-button>
      <div style="margin-top: 12px">选择位置: {{ form.location }}</div>
      <div style="margin-top: 12px">详细地址: {{ form.address }}</div>
      <div style="margin-top: 12px">经 纬 度 : {{ form.coordinate }}</div>
    </el-card>
    <el-card shadow="never" header="官网底部地图">
      <div ref="locationMap" style="max-width: 800px; height: 300px"></div>
    </el-card>
    <el-card shadow="never" header="轨迹展示及轨迹回放">
      <div ref="trackMap" style="max-width: 800px; height: 300px"></div>
      <div style="margin-top: 15px">
        <el-button size="small" @click="startTrackAnim">开始动画</el-button>
        <el-button size="small" @click="pauseTrackAnim">暂停动画</el-button>
        <el-button size="small" @click="resumeTrackAnim">继续动画</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import AMapLoader from '@amap/amap-jsapi-loader';
  import EleMapPicker from 'ele-admin/packages/ele-map-picker';

  export default {
    name: 'ExtensionMap',
    components: { EleMapPicker },
    data() {
      return {
        // 是否显示地图选择弹窗
        showPicker: false,
        // 是否显示地图选择弹窗2
        showPicker2: false,
        // 表单
        form: {
          location: '',
          address: '',
          coordinate: ''
        },
        // 官网底部地图的实例
        mapInsLocation: null,
        // 小车轨迹地图的实例
        mapInsTrack: null,
        // 小车的marker
        carMarker: null,
        // 轨迹路线
        lineData: [
          [116.478935, 39.997761],
          [116.478939, 39.997825],
          [116.478912, 39.998549],
          [116.478912, 39.998549],
          [116.478998, 39.998555],
          [116.478998, 39.998555],
          [116.479282, 39.99856],
          [116.479658, 39.998528],
          [116.480151, 39.998453],
          [116.480784, 39.998302],
          [116.480784, 39.998302],
          [116.481149, 39.998184],
          [116.481573, 39.997997],
          [116.481863, 39.997846],
          [116.482072, 39.997718],
          [116.482362, 39.997718],
          [116.483633, 39.998935],
          [116.48367, 39.998968],
          [116.484648, 39.999861]
        ]
      };
    },
    computed: {
      // 是否是暗黑模式
      darkMode() {
        return this.$store?.state?.theme?.darkMode;
      }
    },
    mounted() {
      this.renderLocationMap();
      this.renderTrackMap();
    },
    methods: {
      /* 地图选择后回调 */
      onChoose(location) {
        console.log(location);
        this.form = {
          location: [
            location.city.province,
            location.city.city,
            location.city.district
          ].join('/'),
          address: location.name + ' ' + location.address,
          coordinate: location.lng + ',' + location.lat
        };
        this.showPicker = false;
        this.showPicker2 = false;
      },
      /* 渲染官网底部地图 */
      renderLocationMap() {
        AMapLoader.load({
          key: '006d995d433058322319fa797f2876f5',
          version: '2.0',
          plugins: ['AMap.InfoWindow', 'AMap.Marker']
        })
          .then((AMap) => {
            // 渲染地图
            const option = {
              zoom: 13, // 初缩放级别
              center: [114.346084, 30.511215 + 0.005] // 初始中心点
            };
            if (this.darkMode) {
              option.mapStyle = 'amap://styles/dark';
            }
            this.mapInsLocation = new AMap.Map(this.$refs.locationMap, option);
            // 创建信息窗体
            const infoWindow = new AMap.InfoWindow({
              content: `
            <div style="color: #333;">
              <div style="padding: 5px;font-size: 16px;">武汉易云智科技有限公司</div>
              <div style="padding: 0 5px;">地址：湖北省武汉市洪山区雄楚大道222号</div>
              <div style="padding: 0 5px;">电话：020-123456789</div>
            </div>
            <a
              style="padding: 8px 5px 0;text-decoration: none;display: inline-block;"
              href="//uri.amap.com/marker?position=114.346084,30.511215&name=武汉易云智科技有限公司"
              class="ele-text-primary"
              target="_blank"
            >到这里去→</a>
          `
            });
            infoWindow.open(this.mapInsLocation, [114.346084, 30.511215]);
            const icon = new AMap.Icon({
              size: new AMap.Size(25, 34),
              image:
                '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
              imageSize: new AMap.Size(25, 34)
            });
            const marker = new AMap.Marker({
              icon: icon,
              position: [114.346084, 30.511215],
              offset: new AMap.Pixel(-12, -28)
            });
            marker.setMap(this.mapInsLocation);
            marker.on('click', () => {
              infoWindow.open(this.mapInsLocation);
            });
          })
          .catch((e) => {
            console.error(e);
          });
      },
      /* 渲染轨迹回放地图 */
      renderTrackMap() {
        AMapLoader.load({
          key: '006d995d433058322319fa797f2876f5',
          version: '2.0',
          plugins: ['AMap.MoveAnimation', 'AMap.Marker', 'AMap.Polyline']
        })
          .then((AMap) => {
            // 渲染地图
            const option = {
              zoom: 17,
              center: [116.478935, 39.997761]
            };
            if (this.darkMode) {
              option.mapStyle = 'amap://styles/dark';
            }
            this.mapInsTrack = new AMap.Map(this.$refs.trackMap, option);
            // 创建小车marker
            this.carMarker = new AMap.Marker({
              map: this.mapInsTrack,
              position: [116.478935, 39.997761],
              icon:
                'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
              offset: new AMap.Pixel(-13, -26)
            });
            // 绘制轨迹
            new AMap.Polyline({
              map: this.mapInsTrack,
              path: this.lineData,
              showDir: true,
              strokeColor: '#28F', // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 6 // 线宽
              //strokeStyle: 'solid'  // 线样式
            });
            // 通过的轨迹
            const passedPolyline = new AMap.Polyline({
              map: this.mapInsTrack,
              showDir: true,
              strokeColor: '#4B5', // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 6 // 线宽
            });
            // 小车移动回调
            this.carMarker.on('moving', function(e) {
              passedPolyline.setPath(e.passedPath);
            });
            // 地图自适应
            this.mapInsTrack.setFitView();
          })
          .catch((e) => {
            console.error(e);
          });
      },
      /* 开始轨迹回放动画 */
      startTrackAnim() {
        this.carMarker.stopMove();
        this.carMarker.moveAlong(this.lineData, {
          duration: 200,
          autoRotation: true
        });
      },
      /* 暂停轨迹回放动画 */
      pauseTrackAnim() {
        this.carMarker.pauseMove();
      },
      /* 继续开始轨迹回放动画 */
      resumeTrackAnim() {
        this.carMarker.resumeMove();
      }
    },
    watch: {
      darkMode(value) {
        if (this.mapInsLocation) {
          if (value) {
            this.mapInsLocation.setMapStyle('amap://styles/dark');
          } else {
            this.mapInsLocation.setMapStyle('amap://styles/normal');
          }
        }
        if (this.mapInsTrack) {
          if (value) {
            this.mapInsTrack.setMapStyle('amap://styles/dark');
          } else {
            this.mapInsTrack.setMapStyle('amap://styles/normal');
          }
        }
      }
    },
    unmounted() {
      if (this.mapInsLocation) {
        this.mapInsLocation.destroy();
      }
      if (this.mapInsTrack) {
        this.mapInsTrack.destroy();
      }
      this.carMarker = null;
    }
  };
</script>

<style scoped></style>
