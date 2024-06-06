<template>
  <div class="ele-body">
    <el-alert
      show-icon
      type="info"
      :title="tips"
      :closable="true"
      class="ele-alert-border"
      style="margin-bottom: 10px"
    />
    <el-card shadow="never" body-style="padding: 0;" style="overflow: visible">
      <div class="demo-icon-header ele-bg-white">
        <el-tabs
          :value="active"
          class="demo-icon-tabs"
          @tab-click="onTabChange"
        >
          <el-tab-pane
            v-for="(item, index) in data"
            :key="index"
            :label="item.title"
            :name="String(index)"
          />
          <el-tab-pane label="图标选择" name="picker" />
        </el-tabs>
        <div class="demo-icon-search">
          <el-input
            clearable
            size="small"
            v-model="keywords"
            suffix-icon="el-icon-search"
            placeholder="输入关键词搜索"
            @input="onSearchChange"
          />
        </div>
      </div>
      <div style="padding: 15px">
        <el-row v-if="result.length" class="demo-icon">
          <el-col
            v-for="(d, i) in result"
            :key="i"
            :xs="8"
            :sm="6"
            :md="4"
            class="demo-icon-item"
            v-clipboard:copy="d"
            v-clipboard:error="onError"
            v-clipboard:success="onCopy"
          >
            <div class="demo-icon-content">
              <i :class="d"></i>
            </div>
            <div class="demo-icon-text ele-text-secondary">{{ d }}</div>
            <div class="demo-icon-tip ele-bg-primary">点击复制</div>
          </el-col>
        </el-row>
        <ele-empty v-else />
      </div>
    </el-card>
    <el-dialog
      width="360px"
      title="图标选择器"
      :visible.sync="visible"
      custom-class="ele-dialog-form"
    >
      <el-form label-width="68px">
        <el-form-item label="风格一">
          <ele-icon-picker v-model="icon" placeholder="请选择图标" />
        </el-form-item>
        <el-form-item label="风格二">
          <ele-icon-picker
            v-model="icon"
            theme="style2"
            :readonly="false"
            placeholder="请选择图标"
          />
        </el-form-item>
        <el-form-item label="风格三">
          <ele-icon-picker
            v-model="icon"
            theme="style3"
            placeholder="请选择图标"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import EleIconPicker from 'ele-admin/packages/ele-icon-picker';

  export default {
    name: 'ExtensionIcon',
    components: { EleIconPicker },
    data() {
      const icons = EleIconPicker.defaultIcons;
      let elNum = 0;
      let eleNum = 0;
      icons.forEach((item) => {
        item.icons.forEach((d) => {
          if (d.indexOf('el-icon-_') === 0) {
            eleNum++;
          } else {
            elNum++;
          }
        });
      });
      const total = elNum + eleNum;
      return {
        // 图标数据
        data: icons,
        // 搜索关键字
        keywords: '',
        // 当前显示的图标
        result: icons[0]?.icons,
        // 页签选中
        active: '0',
        // 弹窗是否显示
        visible: false,
        // 图标
        icon: 'el-icon-_heart',
        // 提示文字
        tips: `新增 ${eleNum} 个图标 + Element UI ${elNum} 个图标, 共计 ${total} 个图标`
      };
    },
    methods: {
      /* 页签切换事件 */
      onTabChange(obj) {
        if (obj.name == 'picker') {
          this.visible = true;
          const t = this.active;
          this.active = '';
          this.$nextTick(() => {
            this.active = t;
          });
          return;
        }
        if (this.active !== obj.name) {
          this.active = obj.name;
          const temp = this.data[this.active].icons;
          if (this.keywords) {
            this.result = temp.filter((d) => d.includes(this.keywords));
          } else {
            this.result = temp;
          }
        }
      },
      /* 输入框改变事件 */
      onSearchChange() {
        for (let i = 0; i < this.data.length; i++) {
          const temp = this.data[i].icons;
          const result = temp.filter((d) => d.includes(this.keywords));
          if (result.length) {
            this.active = String(i);
            this.result = result;
            return;
          }
        }
        this.result = [];
      },
      /* 复制成功 */
      onCopy() {
        this.$message.success('复制成功');
      },
      /* 复制失败 */
      onError() {
        this.$message.error('复制失败');
      }
    }
  };
</script>

<style scoped>
  .demo-icon-header {
    position: sticky;
    top: 0;
    border-radius: 4px;
    z-index: 1;
  }

  /* 选项卡 */
  .demo-icon-tabs ::v-deep .el-tabs__nav-scroll {
    padding: 0 0 0 30px;
  }

  .demo-icon-tabs ::v-deep .el-tabs__item {
    height: 48px;
    line-height: 48px;
    padding: 0 30px 0 0 !important;
  }

  .demo-icon-tabs
    ::v-deep
    .el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: none;
  }

  /* 搜索框 */
  .demo-icon-search {
    position: absolute;
    top: 8px;
    right: 15px;
    width: 180px;
    z-index: 1;
  }

  @media screen and (max-width: 660px) {
    .demo-icon-search {
      width: auto;
      position: static;
      margin: 10px 10px 0 10px;
    }
  }

  /* 图标 */
  .demo-icon {
    border-top: 1px solid hsla(0, 0%, 60%, 0.15);
    border-left: 1px solid hsla(0, 0%, 60%, 0.15);
  }

  .demo-icon-item {
    text-align: center;
    padding: 24px 0;
    border-right: 1px solid hsla(0, 0%, 60%, 0.15);
    border-bottom: 1px solid hsla(0, 0%, 60%, 0.15);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .demo-icon-item > .demo-icon-content > i {
    font-size: 38px;
  }

  .demo-icon-item > .demo-icon-text {
    padding: 0 5px;
    font-size: 14px;
    margin-top: 8px;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .demo-icon-item > .demo-icon-tip {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -30px;
    color: #fff;
    padding: 4px 0;
    font-size: 12px;
    transition: bottom 0.2s;
  }

  .demo-icon-item:hover > .demo-icon-tip {
    bottom: 0;
  }
</style>
