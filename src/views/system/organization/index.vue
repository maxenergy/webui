<template>
  <div class="ele-body">
    <el-card shadow="never" v-loading="loading" body-style="padding-bottom: 0;">
      <el-row :gutter="15">
        <el-col :lg="6" style="margin-bottom: 15px">
          <!-- 操作按钮 -->
          <ele-toolbar class="ele-toolbar-actions">
            <div style="margin: 5px 0">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                class="ele-btn-icon"
                @click="openEdit()"
              >
                添加
              </el-button>
              <el-button
                size="small"
                type="warning"
                icon="el-icon-edit"
                class="ele-btn-icon"
                :disabled="!current"
                @click="openEdit(current)"
              >
                修改
              </el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                class="ele-btn-icon"
                :disabled="!current"
                @click="remove"
              >
                删除
              </el-button>
            </div>
          </ele-toolbar>
          <!-- 机构列表 -->
          <div class="org-tree-group">
            <el-tree
              ref="tree"
              :data="data"
              highlight-current
              node-key="organizationId"
              :props="{ label: 'organizationName' }"
              :expand-on-click-node="false"
              :default-expand-all="true"
              @node-click="onNodeClick"
            />
          </div>
        </el-col>
        <!-- 用户列表 -->
        <el-col :lg="18" style="margin-bottom: 15px">
          <org-user-list
            v-if="current"
            :organization-list="data"
            :organization-id="current.organizationId"
          />
        </el-col>
      </el-row>
    </el-card>
    <!-- 编辑弹窗 -->
    <org-edit
      :visible.sync="showEdit"
      :data="editData"
      :parent-id="parentId"
      :organization-list="data"
      @done="query"
    />
  </div>
</template>

<script>
  import OrgUserList from './components/org-user-list';
  import OrgEdit from './components/org-edit';
  import {
    listOrganizations,
    removeOrganization
  } from '@/api/system/organization';

  export default {
    name: 'SystemOrganization',
    components: { OrgUserList, OrgEdit },
    data() {
      return {
        // 加载状态
        loading: true,
        // 列表数据
        data: [],
        // 选中数据
        current: null,
        // 是否显示表单弹窗
        showEdit: false,
        // 编辑回显数据
        editData: null,
        // 上级id
        parentId: null
      };
    },
    created() {
      this.query();
    },
    methods: {
      /* 查询 */
      query() {
        this.loading = true;
        listOrganizations()
          .then((list) => {
            this.loading = false;
            this.data = this.$util.toTreeData({
              data: list,
              idField: 'organizationId',
              parentIdField: 'parentId'
            });
            this.$nextTick(() => {
              this.onNodeClick(this.data[0]);
            });
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
      },
      /* 选择数据 */
      onNodeClick(row) {
        if (row) {
          this.current = row;
          this.parentId = row.organizationId;
          this.$refs.tree.setCurrentKey(row.organizationId);
        } else {
          this.current = null;
          this.parentId = null;
        }
      },
      /* 显示编辑 */
      openEdit(item) {
        this.editData = item;
        this.showEdit = true;
      },
      /* 删除 */
      remove() {
        this.$confirm('确定要删除选中的机构吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            removeOrganization(this.current.organizationId)
              .then((msg) => {
                loading.close();
                this.$message.success(msg);
                this.query();
              })
              .catch((e) => {
                loading.close();
                this.$message.error(e.message);
              });
          })
          .catch(() => {});
      }
    }
  };
</script>

<style scoped>
  .org-tree-group {
    border: 1px solid hsla(0, 0%, 60%, 0.15);
    height: calc(100vh - 262px);
    box-sizing: border-box;
    overflow: auto;
  }

  .org-tree-group ::v-deep .el-tree-node__content {
    height: 40px;
  }

  .org-tree-group ::v-deep .el-tree-node__content > .el-tree-node__expand-icon {
    margin-left: 10px;
  }
</style>
