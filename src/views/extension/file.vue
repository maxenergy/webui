<template>
  <div class="ele-body">
    <el-card shadow="never" body-style="padding: 0;" style="overflow: visible">
      <div style="padding: 15px 15px 0 15px">
        <!-- 工具栏 -->
        <div class="ele-table-tool">
          <div class="ele-table-tool-title">
            <el-button
              size="small"
              type="primary"
              class="ele-btn-icon"
              icon="el-icon-upload2"
            >
              上传
            </el-button>
            <el-button
              size="small"
              class="ele-btn-icon"
              icon="el-icon-folder-add"
            >
              新建文件夹
            </el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon hidden-xs-only"
              :disabled="!checked.length"
            >
              删除
            </el-button>
          </div>
          <div class="ele-table-tool-right">
            <!-- 搜索框 -->
            <div class="ele-file-tool-search hidden-xs-only">
              <el-input
                size="small"
                v-model="search"
                placeholder="搜索您的文件"
              >
                <el-button slot="append" icon="el-icon-search" />
              </el-input>
            </div>
            <!-- 排序方式切换 -->
            <el-dropdown @command="onSortClick">
              <i class="el-icon-_filter ele-file-tool-btn" title="排序方式"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="name">
                  <span :class="nameSortClass">
                    <i :class="nameSortIconClass"></i>
                    <span>文件名</span>
                  </span>
                </el-dropdown-item>
                <el-dropdown-item command="length">
                  <span :class="lengthSortClass">
                    <i :class="lengthSortIconClass"></i>
                    <span>大小</span>
                  </span>
                </el-dropdown-item>
                <el-dropdown-item command="updateTime">
                  <span :class="updateTimeSortClass">
                    <i :class="updateTimeSortIconClass"></i>
                    <span>修改日期</span>
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 显示方式切换 -->
            <i
              title="显示方式"
              :class="typeIconClass"
              @click="grid = !grid"
            ></i>
          </div>
        </div>
        <!-- 文件目录面包屑 -->
        <div class="ele-file-breadcrumb-group ele-cell">
          <div class="ele-cell-content ele-cell">
            <div
              v-if="directory.length"
              class="ele-file-breadcrumb-back ele-text-primary"
              @click="back"
            >
              返回上一级
            </div>
            <div class="ele-file-breadcrumb-list ele-cell-content ele-cell">
              <div :class="allTextClass" @click="listAll">
                <div class="ele-file-breadcrumb-item-title">全部文件</div>
                <i
                  v-if="directory.length"
                  class="el-icon-arrow-right ele-text-secondary"
                ></i>
              </div>
              <div
                v-for="(item, index) in directory"
                :key="index"
                :class="[
                  'ele-file-breadcrumb-item ele-cell',
                  { 'ele-text-primary': index !== directory.length - 1 }
                ]"
                @click="listDir(index)"
              >
                <div class="ele-file-breadcrumb-item-title">{{ item }}</div>
                <i
                  v-if="index !== directory.length - 1"
                  class="el-icon-arrow-right ele-text-secondary"
                ></i>
              </div>
            </div>
          </div>
          <div class="hidden-xs-only">已全部加载，共{{ data.length }}个</div>
        </div>
      </div>
      <!-- 文件列表 -->
      <div v-loading="loading" style="min-height: 400px">
        <ele-file-list
          :data="data"
          :grid="grid"
          :sort="sort"
          :order="order"
          :checked.sync="checked"
          @item-click="onItemClick"
          @sort-change="onSortChange"
        >
          <template slot="tool" slot-scope="{ item }">
            <i
              title="下载"
              class="el-icon-download ele-file-list-item-tool ele-text-primary"
              @click.stop="download(item)"
            >
            </i>
            <i
              title="分享"
              class="el-icon-share ele-file-list-item-tool ele-text-primary"
            >
            </i>
            <i
              title="删除"
              class="el-icon-delete ele-file-list-item-tool ele-text-primary"
            >
            </i>
          </template>
        </ele-file-list>
      </div>
    </el-card>
    <!-- 用于图片预览 -->
    <el-image
      ref="previewImage"
      v-if="currentImage"
      :src="currentImage"
      class="ele-file-image-preview"
      :preview-src-list="previewList"
    >
    </el-image>
  </div>
</template>

<script>
  import EleFileList from 'ele-admin/packages/ele-file-list';
  import { getFileList } from '@/api/extension/file';

  export default {
    name: 'ExtensionFile',
    components: { EleFileList },
    data() {
      return {
        // 加载状态
        loading: true,
        // 是否网格展示
        grid: true,
        // 文件列表数据
        data: [],
        // 选中数据
        checked: [],
        // 文件目录面包屑数据
        directory: [],
        // 图片预览文件
        currentImage: '',
        // 搜索
        search: '',
        // 排序字段
        sort: '',
        // 排序方式
        order: ''
      };
    },
    computed: {
      // 名称排序class
      nameSortClass() {
        return [
          'ele-file-sort-item ele-text-primary',
          { active: this.sort === 'name' }
        ];
      },
      // 名称排序icon class
      nameSortIconClass() {
        return [
          'ele-file-sort-item-icon',
          { 'el-icon-top': this.order === 'asc' },
          { 'el-icon-bottom': this.order === 'desc' }
        ];
      },
      // 大小排序class
      lengthSortClass() {
        return [
          'ele-file-sort-item ele-text-primary',
          { active: this.sort === 'length' }
        ];
      },
      // 大小排序icon class
      lengthSortIconClass() {
        return [
          'ele-file-sort-item-icon',
          { 'el-icon-top': this.order === 'asc' },
          { 'el-icon-bottom': this.order === 'desc' }
        ];
      },
      // 事件排序class
      updateTimeSortClass() {
        return [
          'ele-file-sort-item ele-text-primary',
          { active: this.sort === 'updateTime' }
        ];
      },
      // 事件排序icon class
      updateTimeSortIconClass() {
        return [
          'ele-file-sort-item-icon',
          { 'el-icon-top': this.order === 'asc' },
          { 'el-icon-bottom': this.order === 'desc' }
        ];
      },
      // 显示方式图标class
      typeIconClass() {
        return [
          'ele-file-tool-btn',
          { 'el-icon-_menu': !this.grid },
          { 'el-icon-_nav': this.grid }
        ];
      },
      // 全部文件文本class
      allTextClass() {
        return [
          'ele-file-breadcrumb-item ele-cell',
          { 'ele-text-primary': this.directory.length }
        ];
      },
      // 图片预览列表
      previewList() {
        return this.data.filter((d) => d.thumbnail).map((d) => d.url);
      }
    },
    created() {
      this.query();
    },
    methods: {
      /* 查询文件列表 */
      query() {
        this.data = [];
        this.checked = [];
        this.loading = true;
        getFileList({
          sort: this.sort,
          order: this.order,
          directory: this.directory.join('/')
        })
          .then((data) => {
            this.loading = false;
            this.data = data;
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      },
      /* item点击事件 */
      onItemClick(item) {
        if (item.isDirectory) {
          // 文件夹
          this.directory.push(item.name);
          this.query();
        } else if (item.thumbnail) {
          // 图片
          this.currentImage = item.url;
          this.$nextTick(() => {
            if (this.$refs.previewImage) {
              this.$refs.previewImage.showViewer = true;
            }
          });
        } else {
          this.$confirm('此文件可能不支持预览, 是否在浏览器中打开?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              window.open(item.url);
            })
            .catch(() => {});
        }
      },
      /* 返回上级 */
      back() {
        this.directory.splice(this.directory.length - 1, 1);
        this.query();
      },
      /* 全部文件 */
      listAll() {
        if (!this.directory.length) {
          return;
        }
        this.directory = [];
        this.query();
      },
      /* 回到指定目录 */
      listDir(index) {
        if (index === this.directory.length - 1) {
          return;
        }
        this.directory.splice(index + 1, this.directory.length - index - 1);
        this.query();
      },
      /* 排序方式切换 */
      onSortClick(command) {
        if (this.sort === command && this.order) {
          this.order = { asc: 'desc', desc: 'asc' }[this.order];
        } else {
          this.order = 'asc';
          this.sort = command;
        }
        this.query();
      },
      /* 文件列表排序方式改变 */
      onSortChange(obj) {
        this.order = obj.order;
        this.sort = obj.sort;
        this.query();
      },
      /* 下载 */
      download(item) {
        window.open(item.url);
      }
    }
  };
</script>

<style scoped>
  /** 文件目录面包屑 */
  .ele-file-breadcrumb-group {
    font-size: 13px;
    padding: 2px 0 6px 0;
    line-height: 1;
  }

  .ele-file-breadcrumb-back {
    padding-right: 10px;
    border-right: 2px solid hsla(0, 0%, 60%, 0.2);
  }

  .ele-file-breadcrumb-back:hover,
  .ele-file-breadcrumb-item.ele-text-primary:hover
    > .ele-file-breadcrumb-item-title {
    text-decoration: underline;
    cursor: pointer;
  }

  /* 图片预览组件 */
  .ele-file-image-preview ::v-deep img.el-image__inner {
    display: none;
  }

  .ele-file-image-preview ::v-deep .el-image__error {
    display: none;
  }

  /* 图标按钮 */
  .ele-file-tool-btn {
    cursor: pointer;
    font-size: 22px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
  }

  /* 搜索框 */
  .ele-file-tool-search {
    display: inline-block;
    vertical-align: middle;
    background-color: hsla(0, 0%, 60%, 0.15);
    border-radius: 32px;
  }

  .ele-file-tool-search ::v-deep .el-input-group__append,
  .ele-file-tool-search ::v-deep .el-input__inner {
    background-color: transparent;
    border: none;
  }

  .ele-file-tool-search ::v-deep .el-input-group__append {
    padding: 0;
  }

  .ele-file-tool-search ::v-deep .el-input-group__append .el-button {
    margin: 0;
    padding: 7px 16px 7px 10px;
    border: none;
  }

  .ele-file-tool-search ::v-deep .el-input-group__append .el-button > i {
    font-size: 16px;
    font-weight: 600;
  }

  .ele-file-tool-search ::v-deep .el-input__inner {
    width: 200px;
    padding-right: 0;
    box-sizing: border-box;
  }

  /* 排序下拉 */
  .ele-file-sort-item:not(.active) .ele-file-sort-item-icon {
    visibility: hidden;
  }

  .ele-file-sort-item .ele-file-sort-item-icon {
    font-weight: 600;
  }

  .ele-file-sort-item:not(.active) {
    color: inherit;
  }
</style>
