<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <login-record-search @search="reload" />
      <!-- 数据表格 -->
      <ele-pro-table ref="table" :datasource="datasource" :columns="columns">
        <!-- 表头工具栏 -->
        <template slot="toolbar">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-download"
            class="ele-btn-icon"
            @click="exportData"
          >
            导出
          </el-button>
        </template>
        <!-- 操作类型列 -->
        <template slot="loginType" slot-scope="{ row }">
          <el-tag
            size="mini"
            :disable-transitions="true"
            :type="['success', 'danger', 'info', 'warning'][row.loginType]"
          >
            {{
              ['登录成功', '登录失败', '退出登录', '刷新TOKEN'][row.loginType]
            }}
          </el-tag>
        </template>
      </ele-pro-table>
    </el-card>
  </div>
</template>

<script>
  import XLSX from 'xlsx';
  import LoginRecordSearch from './components/login-record-search';
  import {
    pageLoginRecords,
    listLoginRecords
  } from '@/api/system/login-record';

  export default {
    name: 'SystemLoginRecord',
    components: { LoginRecordSearch },
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            prop: 'username',
            label: '账号',
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
            prop: 'ip',
            label: 'IP地址',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'device',
            label: '设备型号',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'os',
            label: '操作系统',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'browser',
            label: '浏览器',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'loginType',
            label: '操作类型',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            slot: 'loginType'
          },
          {
            prop: 'comments',
            label: '备注',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'createTime',
            label: '登录时间',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            formatter: (row, column, cellValue) => {
              return this.$util.toDateString(cellValue);
            }
          }
        ]
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order }) {
        return pageLoginRecords({ ...where, ...order, page, limit });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where: where });
      },
      /* 导出数据 */
      exportData() {
        const array = [
          [
            '账号',
            '用户名',
            'IP地址',
            '设备型号',
            '操作系统',
            '浏览器',
            '操作类型',
            '备注',
            '登录时间'
          ]
        ];
        const loading = this.$loading({ lock: true });
        listLoginRecords()
          .then((data) => {
            loading.close();
            data.forEach((d) => {
              array.push([
                d.username,
                d.nickname,
                d.ip,
                d.device,
                d.os,
                d.browser,
                ['登录成功', '登录失败', '退出登录', '刷新TOKEN'][d.loginType],
                d.comments,
                this.$util.toDateString(d.createTime)
              ]);
            });
            this.$util.exportSheet(XLSX, array, '登录日志');
          })
          .catch((e) => {
            loading.close();
            this.$message.error(e.message);
          });
      }
    }
  };
</script>

<style scoped></style>
