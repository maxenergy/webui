<template>
  <div class="ele-body">
    <el-card
      shadow="never"
      style="margin-bottom: 15px"
      body-style="padding-bottom: 0;"
    >
      <div class="ele-table-tool">
        <div class="ele-table-tool-title">卡片列表</div>
      </div>
      <div class="top-search-group">
        <el-input placeholder="请输入内容" v-model="keyword" />
        <el-button type="primary">搜索</el-button>
      </div>
      <el-tabs v-model="active" class="top-card-tabs" @tab-click="tabChange">
        <el-tab-pane label="项目" name="/list/card/project" />
        <el-tab-pane label="应用" name="/list/card/application" />
        <el-tab-pane label="文章" name="/list/card/article" />
      </el-tabs>
    </el-card>
    <ele-empty-layout />
  </div>
</template>

<script>
  import EleEmptyLayout from 'ele-admin/packages/ele-empty-layout';

  export default {
    name: 'ListCard',
    components: { EleEmptyLayout },
    data() {
      return {
        keyword: ''
      };
    },
    computed: {
      active: {
        get() {
          return this.$route.path;
        },
        set() {}
      }
    },
    methods: {
      /* 切换tab */
      tabChange(tab) {
        if (this.$route.path !== tab.name) {
          this.$router.push(tab.name);
        }
      }
    }
  };
</script>

<style scoped>
  .top-search-group {
    max-width: 500px;
    margin: 0 auto 25px;
    display: flex;
  }

  .top-search-group ::v-deep .el-input input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-width: 0;
  }

  .top-search-group .el-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .top-card-tabs {
    margin-left: 5px;
  }

  .top-card-tabs ::v-deep .el-tabs__nav-wrap {
    margin-bottom: 0;
  }

  .top-card-tabs ::v-deep .el-tabs__nav-wrap:after {
    display: none;
  }
</style>
