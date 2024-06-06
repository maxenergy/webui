<template>
  <div class="ele-body">
    <el-card shadow="never" header="滚动数字">
      <h1 style="padding-left: 10px">
        <vue-count-up
          :delay="0"
          :end-val="countUpVal"
          :options="countUpOptions"
          @ready="onCountUpReady"
        />
      </h1>
      <div style="margin-top: 15px">
        <el-button size="mini" @click="startCountUp">重新开始</el-button>
        <el-button size="mini" @click="updateCountUp">更新数字</el-button>
      </div>
    </el-card>
    <el-card shadow="never" header="自动更新">
      <h1 style="padding: 20px 10px">
        <vue-count-up :end-val="countUpVal2" />
      </h1>
    </el-card>
  </div>
</template>

<script>
  import VueCountUp from 'vue-countup-v2';

  export default {
    name: 'ExtensionCountUp',
    components: { VueCountUp },
    data() {
      return {
        // countUp值
        countUpVal: 6317,
        // countUp配置
        countUpOptions: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        },
        // countUp实例
        countUpIns: null,
        //
        countUpVal2: 2345,
        //
        countUpTimer: null
      };
    },
    methods: {
      /* countUp渲染完成 */
      onCountUpReady(instance) {
        this.countUpIns = instance;
      },
      /* countUp重新开始 */
      startCountUp() {
        if (!this.countUpIns) {
          return;
        }
        this.countUpIns.reset();
        this.countUpIns.start();
      },
      /* countUp更新 */
      updateCountUp() {
        if (!this.countUpIns) {
          return;
        }
        this.countUpIns.update(1000 + Math.round(Math.random() * 9000));
      }
    },
    mounted() {
      this.countUpTimer = setInterval(() => {
        this.countUpVal2 += 10 + Math.round(Math.random() * 300);
      }, 4000);
    },
    beforeDestroy() {
      if (this.countUpTimer != null) {
        clearInterval(this.countUpTimer);
      }
    }
  };
</script>

<style scoped></style>
