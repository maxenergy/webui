<template>
  <div class="ele-body">
    <el-card shadow="never" header="基础用法">
      <div style="max-width: 260px">
        <ele-table-select
          v-model="value"
          :clearable="true"
          placeholder="请选择"
          :disabled="disabled"
          value-key="userId"
          label-key="nickname"
          :table-config="tableConfig1"
          :popper-width="580"
        >
          <!-- 角色列 -->
          <template slot="roles" slot-scope="{ row }">
            <el-tag
              v-for="item in row.roles"
              :key="row.userId + '-' + item.roleId"
              size="mini"
              type="primary"
              :disable-transitions="true"
            >
              {{ item.roleName }}
            </el-tag>
          </template>
        </ele-table-select>
      </div>
      <div class="ele-cell" style="margin-top: 15px">
        <div style="line-height: 22px">&nbsp;禁用：</div>
        <div class="ele-cell-content">
          <el-radio-group v-model="disabled">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" header="多选">
      <div style="max-width: 260px">
        <ele-table-select
          v-model="value2"
          :multiple="true"
          :clearable="true"
          placeholder="请选择"
          value-key="userId"
          label-key="nickname"
          :table-config="tableConfig2"
          :popper-width="580"
        >
          <!-- 角色列 -->
          <template slot="roles" slot-scope="{ row }">
            <el-tag
              v-for="item in row.roles"
              :key="item.roleId"
              size="mini"
              type="primary"
              :disable-transitions="true"
            >
              {{ item.roleName }}
            </el-tag>
          </template>
        </ele-table-select>
      </div>
    </el-card>
    <el-card shadow="never" header="可搜索">
      <div style="max-width: 260px">
        <ele-table-select
          ref="select"
          v-model="value3"
          :multiple="true"
          :clearable="true"
          placeholder="请选择"
          value-key="userId"
          label-key="nickname"
          :table-config="tableConfig3"
          :popper-width="580"
        >
          <!-- 角色列 -->
          <template slot="roles" slot-scope="{ row }">
            <el-tag
              v-for="item in row.roles"
              :key="item.roleId"
              size="mini"
              type="primary"
              :disable-transitions="true"
            >
              {{ item.roleName }}
            </el-tag>
          </template>
          <!-- 表头工具栏 -->
          <template slot="toolbar">
            <div style="max-width: 200px">
              <el-input
                clearable
                size="small"
                v-model="where.keywords"
                placeholder="输入关键字搜索"
                prefix-icon="el-icon-search"
                @change="search"
              />
            </div>
          </template>
        </ele-table-select>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { pageUsers } from '@/api/system/user';

  export default {
    name: 'ExtensionTableSelect',
    data() {
      return {
        // 单选
        value: '',
        // 单选表格配置
        tableConfig1: {
          datasource({ page, limit, where, order }) {
            return pageUsers({ ...where, ...order, page, limit });
          },
          columns: [
            {
              columnKey: 'index',
              type: 'index',
              width: 45,
              align: 'center',
              showOverflowTooltip: true
            },
            {
              prop: 'username',
              label: '用户账号',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 110
            },
            {
              prop: 'nickname',
              label: '用户名',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 110
            },
            {
              prop: 'sexName',
              label: '性别',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 80
            },
            {
              columnKey: 'roles',
              label: '角色',
              showOverflowTooltip: true,
              minWidth: 110,
              slot: 'roles'
            }
          ],
          toolbar: false,
          pageSize: 5,
          pageSizes: [5, 10, 15, 20]
        },
        // 禁用
        disabled: false,
        // 多选
        value2: [],
        // 多选表格配置
        tableConfig2: {
          datasource({ page, limit, where, order }) {
            return pageUsers({ ...where, ...order, page, limit });
          },
          columns: [
            {
              columnKey: 'selection',
              type: 'selection',
              width: 45,
              align: 'center',
              reserveSelection: true
            },
            {
              columnKey: 'index',
              type: 'index',
              width: 45,
              align: 'center',
              showOverflowTooltip: true
            },
            {
              prop: 'username',
              label: '用户账号',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 110
            },
            {
              prop: 'nickname',
              label: '用户名',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 110
            },
            {
              prop: 'sexName',
              label: '性别',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 80
            },
            {
              columnKey: 'roles',
              label: '角色',
              showOverflowTooltip: true,
              minWidth: 110,
              slot: 'roles'
            }
          ],
          toolbar: false,
          pageSize: 5,
          pageSizes: [5, 10, 15, 20],
          rowClickChecked: true,
          rowClickCheckedIntelligent: false
        },
        // 可搜索
        value3: [],
        // 可搜索表格配置
        tableConfig3: {
          datasource({ page, limit, where, order }) {
            return pageUsers({ ...where, ...order, page, limit });
          },
          columns: [
            {
              columnKey: 'selection',
              type: 'selection',
              width: 45,
              align: 'center',
              reserveSelection: true
            },
            {
              columnKey: 'index',
              type: 'index',
              width: 45,
              align: 'center',
              showOverflowTooltip: true
            },
            {
              prop: 'username',
              label: '用户账号',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 110
            },
            {
              prop: 'nickname',
              label: '用户名',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 110
            },
            {
              prop: 'sexName',
              label: '性别',
              sortable: 'custom',
              showOverflowTooltip: true,
              minWidth: 80
            },
            {
              columnKey: 'roles',
              label: '角色',
              showOverflowTooltip: true,
              minWidth: 110,
              slot: 'roles'
            }
          ],
          pageSize: 5,
          pageSizes: [5, 10, 15, 20],
          rowClickChecked: true,
          rowClickCheckedIntelligent: false,
          toolkit: ['reload', 'size', 'columns']
        },
        // 搜索表单
        where: {
          keywords: ''
        }
      };
    },
    methods: {
      // 搜索
      search() {
        this.$refs.select.reload({
          where: this.where,
          page: 1
        });
      }
    }
  };
</script>

<style scoped></style>
