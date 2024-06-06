<!-- 描述列筛选组件 -->
<template>
  <div
    style="position: absolute;right: 8px;margin-top: -10px;top: 50%;"
    @click.stop=""
  >
    <el-popover
      :width="200"
      trigger="click"
      v-model="visible"
      placement="bottom"
      transition="el-zoom-in-top"
    >
      <i
        slot="reference"
        class="el-icon-_filter ele-text-secondary"
        style="font-weight: bold;"
      ></i>
      <div>
        <div>
          <el-input
            clearable
            size="mini"
            v-model="description"
            placeholder="请输入关键字"
          />
        </div>
        <div style="margin-top: 10px;">
          <el-button type="primary" size="mini" @click="search">
            搜索
          </el-button>
          <el-button size="mini" @click="close">
            关闭
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: 'DescFilter',
    data() {
      return {
        // popover是否显示
        visible: false,
        // 搜索关键字
        description: ''
      };
    },
    methods: {
      /* 关闭popover */
      close() {
        this.visible = false;
      },
      /* 搜索 */
      search() {
        this.close();
        this.$emit('search', this.description);
      }
    }
  };
</script>

<style scoped></style>
