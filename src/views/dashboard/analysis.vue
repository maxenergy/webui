<template>
  <div class="ele-body ele-body-card">
    <!-- 顶部统计卡片 -->
    <el-row :gutter="15">
      <el-col :lg="6" :md="12">
        <el-card class="analysis-chart-card" shadow="never">
          <div slot="header" class="ele-cell">
            <div class="ele-cell-content">总销售额</div>
            <el-tooltip content="指标说明" placement="top">
              <i
                class="el-icon-_question ele-text-placeholder"
                style="cursor: pointer"
              >
              </i>
            </el-tooltip>
          </div>
          <div class="analysis-chart-card-num">¥ 126,560</div>
          <div class="analysis-chart-card-content" style="padding-top: 18px">
            <span class="ele-action">
              <span>周同比12%</span>
              <i class="el-icon-caret-top ele-text-danger"></i>
            </span>
            <span class="ele-action">
              <span>日同比11%</span>
              <i class="el-icon-caret-bottom ele-text-success"></i>
            </span>
          </div>
          <el-divider />
          <div class="analysis-chart-card-text">日销售额 ¥12,423</div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-card class="analysis-chart-card" shadow="never">
          <div slot="header" class="ele-cell">
            <div class="ele-cell-content">访问量</div>
            <el-tag size="mini" type="danger">日</el-tag>
          </div>
          <div class="analysis-chart-card-num">8,846</div>
          <div class="analysis-chart-card-content">
            <v-chart
              ref="visitChart"
              style="height: 40px"
              :option="visitChartOption"
            />
          </div>
          <el-divider />
          <div class="analysis-chart-card-text">日访问量 1,234</div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-card class="analysis-chart-card" shadow="never">
          <div slot="header" class="ele-cell">
            <div class="ele-cell-content">支付笔数</div>
            <el-tag size="mini">月</el-tag>
          </div>
          <div class="analysis-chart-card-num">6,560</div>
          <div class="analysis-chart-card-content">
            <v-chart
              ref="payNumChart"
              style="height: 40px"
              :option="payNumChartOption"
            />
          </div>
          <el-divider />
          <div class="analysis-chart-card-text">转化率 60%</div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-card class="analysis-chart-card" shadow="never">
          <div slot="header" class="ele-cell">
            <div class="ele-cell-content">运营活动效果</div>
            <el-tag size="mini" type="success">周</el-tag>
          </div>
          <div class="analysis-chart-card-num">78%</div>
          <div class="analysis-chart-card-content" style="padding-top: 25px">
            <el-progress
              :percentage="78"
              :show-text="false"
              :stroke-width="10"
              color="#13c2c2"
            />
          </div>
          <el-divider />
          <div class="analysis-chart-card-text">
            <span class="ele-action">
              <span>周同比12%</span>
              <i class="el-icon-caret-top ele-text-danger" />
            </span>
            <span class="ele-action">
              <span>日同比11%</span>
              <i class="el-icon-caret-bottom ele-text-success" />
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 销售额、访问量 -->
    <el-card shadow="never" body-style="padding: 0;">
      <div class="ele-cell demo-monitor-tool">
        <div class="ele-cell-content">
          <el-tabs
            v-model="saleSearch.type"
            class="demo-monitor-tabs"
            @tab-click="onSaleTypeChange"
          >
            <el-tab-pane label="销售额" name="saleroom" />
            <el-tab-pane label="访问量" name="visits" />
          </el-tabs>
        </div>
        <div class="ele-inline-block hidden-xs-only">
          <el-radio-group v-model="saleSearch.dateType" size="small">
            <el-radio-button :label="0">今天</el-radio-button>
            <el-radio-button :label="1">本周</el-radio-button>
            <el-radio-button :label="2">本月</el-radio-button>
            <el-radio-button :label="3">本年</el-radio-button>
          </el-radio-group>
        </div>
        <div class="ele-inline-block hidden-sm-and-down" style="width: 260px">
          <el-date-picker
            unlink-panels
            type="daterange"
            class="ele-fluid"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            v-model="saleSearch.datetime"
            range-separator="至"
            size="small"
          />
        </div>
      </div>
      <el-divider />
      <el-row>
        <el-col :lg="18" :md="16">
          <div class="demo-monitor-title">
            {{ { saleroom: '销售', visits: '访问量' }[saleSearch.type] }}趋势
          </div>
          <v-chart
            ref="saleChart"
            style="height: 285px"
            :option="saleChartOption"
          />
        </el-col>
        <el-col :lg="6" :md="8">
          <div class="demo-monitor-title" style="display: flex">
            <div>门店</div>
            <div>
              {{ { saleroom: '销售额', visits: '访问量' }[saleSearch.type] }}
            </div>
            <div>排名</div>
          </div>
          <div
            v-for="(item, index) in saleroomRankData"
            :key="index"
            class="demo-monitor-rank-item ele-cell"
          >
            <el-tag
              size="mini"
              type="info"
              :effect="index < 3 ? 'dark' : 'light'"
              :color="index < 3 ? '#314659' : 'hsla(0, 0%, 60%, .2)'"
              style="border-color: transparent"
              class="ele-tag-round"
            >
              {{ index + 1 }}
            </el-tag>
            <div class="ele-cell-content">{{ item.name }}</div>
            <div class="ele-text-secondary">{{ item.value }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 最近1小时访问情况 -->
    <el-row :gutter="15">
      <el-col :lg="18" :md="16">
        <el-card
          shadow="never"
          header="最近1小时访问情况"
          body-style="padding: 10px 5px 0 0;"
        >
          <v-chart
            ref="visitHourChart"
            style="height: 323px"
            :option="visitHourChartOption"
          />
        </el-card>
      </el-col>
      <el-col :lg="6" :md="8">
        <el-card shadow="never" header="热门搜索">
          <v-chart
            ref="hotSearchChart"
            style="height: 303px"
            :option="hotSearchChartOption"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart, BarChart } from 'echarts/charts';
  import {
    GridComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components';
  import VChart, { THEME_KEY } from 'vue-echarts';
  import 'echarts-wordcloud';
  import ChartTheme from 'ele-admin/packages/utils/chart-theme';
  import wordCloudColor from 'ele-admin/packages/utils/word-cloud-color';
  import {
    getPayNumList,
    getSaleroomList,
    getVisitHourList,
    getWordCloudList
  } from '@/api/dashboard/analysis';

  use([
    CanvasRenderer,
    LineChart,
    BarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
  ]);

  export default {
    name: 'DashboardAnalysis',
    components: { VChart },
    provide: {
      [THEME_KEY]: ChartTheme
    },
    data() {
      return {
        // 销售量搜索参数
        saleSearch: {
          type: 'saleroom',
          dateType: 0,
          datetime: ''
        },
        // 销售量趋势数据
        saleroomData1: [],
        // 访问量趋势数据
        saleroomData2: [],
        // 门店排名数据
        saleroomRankData: [
          { name: '工专路 1 号店', value: '323,234' },
          { name: '工专路 2 号店', value: '323,234' },
          { name: '工专路 3 号店', value: '323,234' },
          { name: '工专路 4 号店', value: '323,234' },
          { name: '工专路 5 号店', value: '323,234' },
          { name: '工专路 6 号店', value: '323,234' },
          { name: '工专路 7 号店', value: '323,234' }
        ],
        // 访问量折线图配置
        visitChartOption: {},
        // 支付笔数柱状图配置
        payNumChartOption: {},
        // 销售额柱状图配置
        saleChartOption: {},
        // 最近1小时访问情况折线图配置
        visitHourChartOption: {},
        // 词云图表配置
        hotSearchChartOption: {}
      };
    },
    computed: {
      // 内容区域宽度
      contentWidth() {
        return this.$store?.state?.theme?.contentWidth;
      }
    },
    created() {
      this.getPayNumData();
      this.getSaleroomData();
      this.getVisitHourData();
      this.getWordCloudData();
    },
    methods: {
      /* 获取支付笔数数据 */
      getPayNumData() {
        getPayNumList()
          .then((data) => {
            this.visitChartOption = {
              color: '#975fe5',
              tooltip: {
                trigger: 'axis',
                formatter:
                  '<i class="ele-chart-dot" style="background: #975fe5;"></i>{b0}: {c0}'
              },
              grid: {
                top: 10,
                bottom: 0,
                left: 0,
                right: 0
              },
              xAxis: [
                {
                  show: false,
                  type: 'category',
                  boundaryGap: false,
                  data: data.map((d) => d.date)
                }
              ],
              yAxis: [
                {
                  show: false,
                  type: 'value',
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  areaStyle: {
                    opacity: 0.5
                  },
                  data: data.map((d) => d.value)
                }
              ]
            };
            this.payNumChartOption = {
              tooltip: {
                trigger: 'axis',
                formatter:
                  '<i class="ele-chart-dot" style="background: #3aa1ff;"></i>{b0}: {c0}'
              },
              grid: {
                top: 10,
                bottom: 0,
                left: 0,
                right: 0
              },
              xAxis: [
                {
                  show: false,
                  type: 'category',
                  data: data.map((d) => d.date)
                }
              ],
              yAxis: [
                {
                  show: false,
                  type: 'value',
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  type: 'bar',
                  data: data.map((d) => d.value)
                }
              ]
            };
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 获取销售量数据 */
      getSaleroomData() {
        getSaleroomList()
          .then((data) => {
            this.saleroomData1 = data.list1;
            this.saleroomData2 = data.list2;
            this.onSaleTypeChange();
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 获取最近1小时访问情况数据 */
      getVisitHourData() {
        getVisitHourList()
          .then((data) => {
            this.visitHourChartOption = {
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['浏览量', '访问量'],
                right: 20
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: data.map((d) => d.time)
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '浏览量',
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  areaStyle: {
                    opacity: 0.5
                  },
                  data: data.map((d) => d.views)
                },
                {
                  name: '访问量',
                  type: 'line',
                  smooth: true,
                  symbol: 'none',
                  areaStyle: {
                    opacity: 0.5
                  },
                  data: data.map((d) => d.visits)
                }
              ]
            };
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 获取词云数据 */
      getWordCloudData() {
        getWordCloudList()
          .then((data) => {
            this.hotSearchChartOption = {
              tooltip: {
                show: true
              },
              series: [
                {
                  type: 'wordCloud',
                  width: '100%',
                  height: '100%',
                  sizeRange: [12, 24],
                  gridSize: 6,
                  textStyle: {
                    color: wordCloudColor
                  },
                  emphasis: {
                    textStyle: {
                      shadowBlur: 8,
                      shadowColor: 'rgba(0, 0, 0, .15)'
                    }
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
      /* 销售量tab选择改变事件 */
      onSaleTypeChange() {
        const isSale = this.saleSearch.type === 'saleroom';
        const data = isSale ? this.saleroomData1 : this.saleroomData2;
        this.saleChartOption = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              type: 'category',
              data: data.map((d) => d.month)
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'bar',
              data: data.map((d) => d.value)
            }
          ]
        };
      },
      /* 重置所有图表尺寸 */
      resizeCharts() {
        this.$refs.visitChart?.resize();
        this.$refs.payNumChart?.resize();
        this.$refs.saleChart?.resize();
        this.$refs.visitHourChart?.resize();
        this.$refs.hotSearchChart?.resize();
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
  .analysis-chart-card-num {
    font-size: 30px;
  }

  .analysis-chart-card-content {
    height: 40px;
    box-sizing: border-box;
    margin-bottom: 12px;
  }

  .analysis-chart-card-text {
    padding-top: 12px;
  }

  /* 销售额、访问量工具栏 */
  .demo-monitor-tool {
    padding: 0 20px;
  }

  .demo-monitor-tool ::v-deep .el-tabs__nav-wrap:after {
    display: none;
  }

  .demo-monitor-tool ::v-deep .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-size: 15px;
  }

  .demo-monitor-tool .el-date-editor {
    width: 256px;
    margin-left: 10px;
  }

  /* 小标题 */
  .demo-monitor-title {
    padding: 0 20px;
    margin: 15px 0 5px 0;
  }

  /* 排名item */
  .demo-monitor-rank-item {
    padding: 0 20px;
    line-height: 20px;
    margin-top: 18px;
  }
</style>
