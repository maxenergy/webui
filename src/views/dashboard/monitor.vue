<template>
  <div class="ele-body ele-body-card">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="15">
      <el-col :md="6" :sm="12">
        <el-card shadow="never" class="monitor-count-card">
          <el-tag size="large" class="ele-tag-round">
            <i class="el-icon-s-custom"></i>
          </el-tag>
          <div class="monitor-count-card-num">21.2 k</div>
          <div class="monitor-count-card-text ele-text-secondary">
            总访问人数
          </div>
          <ele-avatar-list :data="visitUsers" :size="22" :max="4" />
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12">
        <el-card shadow="never" class="monitor-count-card">
          <el-tag size="large" type="warning" class="ele-tag-round">
            <i class="el-icon-_sent"></i>
          </el-tag>
          <div class="monitor-count-card-num">1.6 k</div>
          <div class="monitor-count-card-text ele-text-secondary">
            点击量（近30天）
          </div>
          <div class="monitor-count-card-trend ele-text-success">
            <i class="el-icon-arrow-up"></i>
            <span>110.5%</span>
          </div>
          <el-tooltip content="指标说明" placement="top">
            <i
              class="
                el-icon-_question
                ele-text-placeholder
                monitor-count-card-tips
              "
            ></i>
          </el-tooltip>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12">
        <el-card shadow="never" class="monitor-count-card">
          <el-tag size="large" type="danger" class="ele-tag-round">
            <i class="el-icon-s-flag"></i>
          </el-tag>
          <div class="monitor-count-card-num">826.0</div>
          <div class="monitor-count-card-text ele-text-secondary">
            到达量（近30天）
          </div>
          <div class="monitor-count-card-trend ele-text-danger">
            <i class="el-icon-arrow-down"></i>
            <span>15.5%</span>
          </div>
        </el-card>
      </el-col>
      <el-col :md="6" :sm="12">
        <el-card shadow="never" class="monitor-count-card">
          <el-tag size="large" type="success" class="ele-tag-round">
            <i class="el-icon-_flash-solid"></i>
          </el-tag>
          <div class="monitor-count-card-num">28.8 %</div>
          <div class="monitor-count-card-text">转化率（近30天）</div>
          <div class="monitor-count-card-trend ele-text-success">
            <i class="el-icon-arrow-up"></i>
            <span>65.8%</span>
          </div>
          <el-tooltip content="指标说明" placement="top">
            <i
              class="
                el-icon-_question
                ele-text-placeholder
                monitor-count-card-tips
              "
            ></i>
          </el-tooltip>
        </el-card>
      </el-col>
    </el-row>
    <!-- 用户分布、浏览器分布 -->
    <el-row :gutter="15">
      <el-col :lg="18">
        <el-card shadow="never" header="用户分布">
          <el-row>
            <el-col :sm="18">
              <v-chart
                ref="userCountMapChart"
                style="height: 438px"
                :option="userCountMapOption"
              />
            </el-col>
            <el-col :sm="6">
              <div style="padding: 10px 5px 0 0">
                <div
                  v-for="(item, index) in userCountDataRank"
                  :key="index"
                  class="monitor-user-count-item ele-cell"
                >
                  <div>{{ item.name }}</div>
                  <div class="ele-cell-content">
                    <el-progress
                      :stroke-width="10"
                      :show-text="false"
                      :percentage="item.percent"
                    />
                  </div>
                  <div>{{ item.value }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-row :gutter="15">
          <el-col :lg="24" :md="12" :sm="24">
            <el-card shadow="never" header="在线人数">
              <div class="monitor-online-num-card">
                <div class="monitor-online-num-text">{{ currentTime }}</div>
                <div class="monitor-online-num-title">
                  <vue-count-up :end-val="onlineNum" />
                </div>
                <div class="monitor-online-num-text">在线总人数</div>
                <ele-dot :text="updateTimeText" />
              </div>
            </el-card>
          </el-col>
          <el-col :lg="24" :md="12" :sm="24">
            <el-card
              shadow="never"
              header="浏览器分布"
              body-style="padding: 0 10px;"
            >
              <v-chart
                ref="browserChart"
                style="height: 240px"
                :option="browserChartOption"
              />
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never" header="用户评价">
          <div class="ele-cell ele-cell-align-bottom">
            <div style="font-size: 48px">4.5</div>
            <div class="ele-cell-content" style="padding-bottom: 8px">
              <el-rate
                v-model="userRate"
                disabled
                show-score
                text-color="#F7BA2A"
                score-template="很棒"
              />
            </div>
          </div>
          <div class="ele-cell" style="margin: 15px 0">
            <div style="font-size: 28px" class="ele-text-placeholder">-0%</div>
            <div class="ele-cell-content ele-text-small ele-text-secondary">
              当前没有评价波动
            </div>
          </div>
          <div class="ele-cell">
            <div class="ele-cell-content">
              <el-progress
                :percentage="60"
                :show-text="false"
                status="success"
              />
            </div>
            <div
              style="width: 80px; white-space: nowrap"
              class="ele-text-secondary"
            >
              <span><s /><i class="el-icon-star-on"></i></span>
              <span> 5 : 368人</span>
            </div>
          </div>
          <div class="ele-cell">
            <div class="ele-cell-content">
              <el-progress :percentage="40" :show-text="false" />
            </div>
            <div
              style="width: 80px; white-space: nowrap"
              class="ele-text-secondary"
            >
              <span><s /><i class="el-icon-star-on"></i></span>
              <span> 4 : 256人</span>
            </div>
          </div>
          <div class="ele-cell">
            <div class="ele-cell-content">
              <el-progress
                :percentage="20"
                :show-text="false"
                status="warning"
              />
            </div>
            <div
              style="width: 80px; white-space: nowrap"
              class="ele-text-secondary"
            >
              <span><s /><i class="el-icon-star-on"></i></span>
              <span> 3 : 49人</span>
            </div>
          </div>
          <div class="ele-cell">
            <div class="ele-cell-content">
              <el-progress
                :percentage="10"
                :show-text="false"
                status="exception"
              />
            </div>
            <div
              style="width: 80px; white-space: nowrap"
              class="ele-text-secondary"
            >
              <span><s /><i class="el-icon-star-on"></i></span>
              <span> 2 : 14人</span>
            </div>
          </div>
          <div class="ele-cell">
            <div class="ele-cell-content">
              <el-progress :percentage="0" :show-text="false" />
            </div>
            <div
              style="width: 80px; white-space: nowrap"
              class="ele-text-secondary"
            >
              <span><s /><i class="el-icon-star-on"></i></span>
              <span> 1 : 0人</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12">
        <el-card shadow="never" header="用户满意度">
          <div class="ele-cell" style="margin: 15px 0">
            <div
              class="ele-cell-content ele-text-center"
              style="font-size: 24px"
              >856</div
            >
            <div class="ele-cell-content ele-text-center">
              <div class="monitor-face-smile">
                <span></span>
              </div>
              <div class="ele-text-secondary" style="margin-top: 5px">
                正面评论
              </div>
            </div>
            <h2 class="ele-cell-content ele-text-success ele-text-center">
              82%
            </h2>
          </div>
          <el-divider />
          <div class="ele-cell" style="margin: 15px 0 12px 0">
            <div
              class="ele-cell-content ele-text-center"
              style="font-size: 24px"
            >
              60
            </div>
            <div class="ele-cell-content ele-text-center">
              <div class="monitor-face-cry">
                <span></span>
              </div>
              <div class="ele-text-secondary" style="margin-top: 5px">
                负面评论
              </div>
            </div>
            <h2 class="ele-cell-content ele-text-danger ele-text-center">9%</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12">
        <el-card shadow="never" header="用户活跃度">
          <div
            class="ele-cell"
            style="padding: 34px 0; justify-content: center"
          >
            <div class="monitor-progress-group">
              <el-progress
                type="circle"
                :percentage="70"
                status="success"
                :show-text="false"
                :width="140"
              />
              <el-progress
                type="circle"
                :percentage="60"
                :show-text="false"
                :width="115"
                :stroke-width="5"
              />
              <el-progress
                type="circle"
                :percentage="35"
                status="exception"
                :show-text="false"
                :width="90"
                :stroke-width="4"
              />
            </div>
            <div class="monitor-progress-legends" style="padding-left: 12px">
              <div class="ele-text-small">
                <ele-dot :ripple="false" text="活跃率: 70%" />
              </div>
              <div class="ele-text-small">
                <ele-dot type="success" :ripple="false" text="留存率: 60%" />
              </div>
              <div class="ele-text-small">
                <ele-dot type="danger" :ripple="false" text="跳出率: 35%" />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VueCountUp from 'vue-countup-v2';
  import { use, registerMap } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart, MapChart } from 'echarts/charts';
  import {
    VisualMapComponent,
    GeoComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components';
  import VChart, { THEME_KEY } from 'vue-echarts';
  import ChartTheme from 'ele-admin/packages/utils/chart-theme';
  import {
    getChinaMapData,
    getUserCountList,
    getBrowserCountList
  } from '@/api/dashboard/monitor';

  use([
    CanvasRenderer,
    PieChart,
    MapChart,
    VisualMapComponent,
    GeoComponent,
    TooltipComponent,
    LegendComponent
  ]);

  export default {
    name: 'DashboardMonitor',
    components: { VueCountUp, VChart },
    provide: {
      [THEME_KEY]: ChartTheme
    },
    data() {
      return {
        // 访问人数
        visitUsers: [
          {
            name: 'SunSmile',
            avatar:
              'https://cdn.eleadmin.com/20200609/c184eef391ae48dba87e3057e70238fb.jpg'
          },
          {
            name: '你的名字很好听',
            avatar:
              'https://cdn.eleadmin.com/20200609/b6a811873e704db49db994053a5019b2.jpg'
          },
          {
            name: '全村人的希望',
            avatar:
              'https://cdn.eleadmin.com/20200609/948344a2a77c47a7a7b332fe12ff749a.jpg'
          },
          {
            name: 'Jasmine',
            avatar:
              'https://cdn.eleadmin.com/20200609/f6bc05af944a4f738b54128717952107.jpg'
          },
          {
            name: '酷酷的大叔',
            avatar:
              'https://cdn.eleadmin.com/20200609/2d98970a51b34b6b859339c96b240dcd.jpg'
          },
          {
            name: '管理员',
            avatar: 'https://cdn.eleadmin.com/20200610/avatar.jpg'
          }
        ],
        // 在线总人数倒计时
        updateTime: 10,
        // 用户分布前10名
        userCountDataRank: [],
        // 当前时间
        currentTime: '20:58:22',
        // 在线人数
        onlineNum: 228,
        // 在线人数更新定时器
        onlineNumTimer: null,
        // 用户评分
        userRate: 4.5,
        // 用户分布地图配置
        userCountMapOption: {},
        // 浏览器分布饼图配置
        browserChartOption: {}
      };
    },
    computed: {
      // 在线人数倒计时文字
      updateTimeText() {
        return this.updateTime + ' 秒后更新';
      },
      // 内容区域宽度
      contentWidth() {
        return this.$store?.state?.theme?.contentWidth;
      }
    },
    created() {
      this.startUpdateOnlineNum();
      this.registerChinaMap();
      this.getBrowserCountData();
    },
    methods: {
      /* 在线人数更新倒计时 */
      startUpdateOnlineNum() {
        this.currentTime = this.$util.toDateString(new Date(), 'HH:mm:ss');
        this.onlineNumTimer = setInterval(() => {
          this.currentTime = this.$util.toDateString(new Date(), 'HH:mm:ss');
          if (this.updateTime === 1) {
            this.updateTime = 10;
            this.onlineNum = 100 + Math.round(Math.random() * 900);
          } else {
            this.updateTime--;
          }
        }, 1000);
      },
      /* 获取中国地图数据并注册地图 */
      registerChinaMap() {
        getChinaMapData()
          .then((data) => {
            registerMap('china', data);
            this.getUserCountData();
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 获取用户分布数据 */
      getUserCountData() {
        getUserCountList()
          .then((data) => {
            const temp = data.sort((a, b) => b.value - a.value);
            const min = temp[temp.length - 1].value || 0;
            const max = temp[0].value || 1;
            //
            const list = temp.length > 10 ? temp.slice(0, 15) : temp;
            this.userCountDataRank = list.map((d) => {
              return {
                name: d.name,
                value: d.value,
                percent: (d.value / max) * 100
              };
            });
            //
            this.userCountMapOption = {
              tooltip: {
                trigger: 'item'
              },
              visualMap: {
                min: min,
                max: max,
                text: ['高', '低'],
                calculable: true,
                color: ['#1890FF', '#EBF3FF']
              },
              series: [
                {
                  name: '用户数',
                  label: {
                    show: true
                  },
                  type: 'map',
                  map: 'china',
                  data: data
                }
              ]
            };
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 获取用户浏览器分布数据 */
      getBrowserCountData() {
        getBrowserCountList()
          .then((data) => {
            this.browserChartOption = {
              tooltip: {
                trigger: 'item'
              },
              legend: {
                bottom: 5,
                itemWidth: 10,
                itemHeight: 10,
                icon: 'circle',
                data: data.map((d) => d.name)
              },
              series: [
                {
                  type: 'pie',
                  radius: ['45%', '70%'],
                  center: ['50%', '43%'],
                  label: {
                    show: false
                  },
                  data: data
                }
              ]
            };
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 重置所有图表尺寸 */
      resizeCharts() {
        this.$refs.userCountMapChart?.resize();
        this.$refs.browserChart?.resize();
      }
    },
    beforeDestroy() {
      // 销毁定时器
      if (this.onlineNumTimer) {
        clearInterval(this.onlineNumTimer);
      }
    },
    activated() {
      this.resizeCharts();
    },
    watch: {
      contentWidth() {
        this.resizeCharts();
      }
    }
  };
</script>

<style scoped>
  /* 统计卡片 */
  .monitor-count-card ::v-deep .el-card__body {
    padding-top: 18px;
    text-align: center;
    position: relative;
  }

  .monitor-count-card ::v-deep .el-tag {
    border-color: transparent;
    font-size: 15px;
  }

  .monitor-count-card .monitor-count-card-num {
    font-weight: 500;
    font-size: 32px;
    margin-top: 12px;
  }

  .monitor-count-card .monitor-count-card-text {
    font-size: 12px;
    margin: 10px 0;
  }

  .monitor-count-card .monitor-count-card-trend {
    font-weight: 600;
    padding: 6px 0;
  }

  .monitor-count-card .monitor-count-card-trend > i {
    font-size: 12px;
    font-weight: 600;
    margin-right: 5px;
  }

  .monitor-count-card .monitor-count-card-tips {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  /* 人数分布 */
  .monitor-user-count-item {
    margin-bottom: 8px;
  }

  .monitor-user-count-item ::v-deep .el-progress-bar__outer {
    background: none;
  }

  .monitor-user-count-item .ele-cell-content {
    padding-right: 10px;
  }

  /* 当前在线人数卡片 */
  .monitor-online-num-card {
    text-align: center;
    padding: 5px 0;
  }

  .monitor-online-num-text {
    margin-bottom: 5px;
  }

  .monitor-online-num-title {
    font-size: 48px;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 1200px) {
    .monitor-online-num-card {
      padding: 42px 0;
    }
  }

  /* 笑脸、哭脸 */
  .monitor-face-smile,
  .monitor-face-cry {
    width: 50px;
    height: 50px;
    display: inline-block;
    background-color: #fbd971;
    border-radius: 50%;
    position: relative;
  }

  .monitor-face-smile > span,
  .monitor-face-smile:before,
  .monitor-face-smile:after,
  .monitor-face-cry > span,
  .monitor-face-cry:before,
  .monitor-face-cry:after {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transform: rotate(225deg);
    border: 3px solid #f0c419;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    position: absolute;
    bottom: 8px;
    left: 11px;
  }

  .monitor-face-smile:before,
  .monitor-face-smile:after,
  .monitor-face-cry:before,
  .monitor-face-cry:after {
    content: '';
    width: 6px;
    height: 6px;
    left: 8px;
    top: 14px;
    border-color: #f29c1f;
    transform: rotate(45deg);
  }

  .monitor-face-smile:after,
  .monitor-face-cry:after {
    left: auto;
    right: 8px;
  }

  .monitor-face-cry > span {
    transform: rotate(45deg);
    bottom: -6px;
  }

  /* 圆形进度条组合 */
  .monitor-progress-group {
    position: relative;
    display: inline-block;
  }

  .monitor-progress-group .el-progress:not(:first-child) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -1px;
  }

  .monitor-progress-legends > div + div {
    margin-top: 8px;
  }
</style>
