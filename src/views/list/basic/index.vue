<template>
  <div class="ele-body">
    <el-card shadow="never" body-style="padding: 22px 22px 7px 22px;">
      <!-- 搜索表单 -->
      <el-form
        label-width="110px"
        class="ele-form-search"
        @keyup.enter.native="reload"
        @submit.native.prevent
      >
        <el-row :gutter="15">
          <el-col :lg="8" :md="12">
            <el-form-item label="规则名称:" prop="name">
              <el-input v-model="where.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="描述:" prop="desc">
              <el-input v-model="where.desc" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12" v-if="searchExpand">
            <el-form-item label="服务调用次数:" prop="callTimes">
              <el-input-number
                v-model="where.callTimes"
                placeholder="请输入"
                controls-position="right"
                class="ele-fluid ele-text-left"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12" v-if="searchExpand">
            <el-form-item label="上次调度时间:" prop="lastTime">
              <el-date-picker
                v-model="where.lastTime"
                type="datetime"
                placeholder="请选择"
                value-format="yyyy-MM-dd HH:mm:ss"
                class="ele-fluid"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12" v-if="searchExpand">
            <el-form-item label="状态:" prop="state">
              <el-select
                v-model="where.state"
                placeholder="请选择"
                clearable
                class="ele-fluid"
              >
                <el-option label="运行中" value="0" />
                <el-option label="已上线" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <div class="ele-form-actions">
              <el-button
                type="primary"
                icon="el-icon-search"
                class="ele-btn-icon"
                @click="reload"
              >
                查询
              </el-button>
              <el-button @click="reset">重置</el-button>
              <el-link type="primary" :underline="false" @click="toggleExpand">
                <template v-if="searchExpand">
                  收起<i class="el-icon-arrow-up"></i>
                </template>
                <template v-else>
                  展开<i class="el-icon-arrow-down"></i>
                </template>
              </el-link>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <!-- 提示信息 -->
      <el-alert
        type="info"
        :closable="false"
        class="ele-alert-border"
        style="margin-bottom: 15px"
      >
        <i class="el-icon-info ele-text-info"></i>
        <span class="ele-text">
          <span>
            已选择 <b class="ele-text-info">{{ selection.length }}</b> 项
          </span>
          <span>
            <em />服务调用次数总计 <b>{{ sumTimes }} 万</b><em />
          </span>
        </span>
        <el-link type="primary" :underline="false" @click="clearChoose">
          清空
        </el-link>
      </el-alert>
      <!-- 高级表格 -->
      <ele-pro-table
        ref="table"
        :columns="columns"
        :datasource="datasource"
        :row-click-checked="true"
        :selection.sync="selection"
        :row-click-checked-intelligent="false"
        :default-sort="{ prop: 'name', order: 'descending' }"
      >
        <template slot="toolbar">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            @click="openEdit()"
          >
            添加
          </el-button>
          <el-dropdown @command="dropClick">
            <el-button
              size="small"
              class="ele-btn-icon"
              :disabled="!selection.length"
            >
              <span>批量操作</span>
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="del">批量删除</el-dropdown-item>
              <el-dropdown-item command="check">批量审批</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="state" slot-scope="{ row }">
          <ele-dot
            :ripple="row.state === 0"
            :type="[null, 'success', 'danger', 'info'][row.state]"
            :text="['运行中', '已上线', '异常', '关闭'][row.state]"
          />
        </template>
        <template slot="descHeader" slot-scope="{ column }">
          <span :class="{ 'ele-text-primary': !!where.description }">{{
            column.label
          }}</span>
          <desc-filter @search="onDescFilter" />
        </template>
        <template slot="action" slot-scope="{ row }">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            @click.stop="openEdit(row)"
          >
            配置
          </el-link>
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-finished"
            @click.stop="doRSS(row)"
          >
            订阅警报
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog
      width="520px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :title="form.id ? '配置规则' : '新建规则'"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="82px">
        <el-form-item label="规则名称:" prop="name">
          <el-input
            clearable
            v-model="form.name"
            placeholder="请输入规则名称"
          />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input
            :rows="4"
            type="textarea"
            v-model="form.desc"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="save">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryList } from '@/api/list/basic';
  import DescFilter from './components/desc-filter.vue';
  // 默认搜索参数
  const DEFAULT_WHERE = {
    name: '',
    state: null,
    desc: '',
    lastTime: '',
    callTimes: undefined,
    description: ''
  };
  // 默认表单数据
  const DEFAULT_FORM = {
    id: null,
    name: '',
    desc: ''
  };

  export default {
    name: 'ListBasic',
    components: { DescFilter },
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center',
            fixed: 'left'
          },
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            prop: 'name',
            label: '规则名称',
            sortable: 'custom',
            minWidth: 110,
            showOverflowTooltip: true
          },
          {
            prop: 'desc',
            label: '描述',
            sortable: 'custom',
            minWidth: 110,
            showOverflowTooltip: true,
            headerSlot: 'descHeader'
          },
          {
            prop: 'callTimes',
            label: '服务调用次数',
            sortable: 'custom',
            minWidth: 135,
            showOverflowTooltip: true,
            formatter(row, column, cellValue) {
              return cellValue + ' 万';
            }
          },
          {
            prop: 'state',
            label: '状态',
            sortable: 'custom',
            minWidth: 110,
            showOverflowTooltip: true,
            slot: 'state',
            filters: [
              {
                text: '运行中',
                value: 0
              },
              {
                text: '已上线',
                value: 1
              },
              {
                text: '异常',
                value: 2
              },
              {
                text: '关闭',
                value: 3
              }
            ],
            filterMethod: (value, row) => {
              return row.state === value;
            }
          },
          {
            prop: 'lastTime',
            label: '上次调度时间',
            sortable: 'custom',
            minWidth: 135,
            showOverflowTooltip: true,
            show: false
          },
          {
            prop: 'action',
            label: '操作',
            width: 180,
            minWidth: 160,
            align: 'center',
            slot: 'action',
            fixed: 'right'
          }
        ],
        // 列表搜索参数
        where: { ...DEFAULT_WHERE },
        // 表格选中数据
        selection: [],
        // 编辑表单数据
        form: { ...DEFAULT_FORM },
        // 编辑表单验证规则
        rules: {
          name: [
            {
              required: true,
              message: '请输入规则名称',
              trigger: 'blur'
            }
          ]
        },
        // 是否显示编辑表单弹窗
        visible: false,
        // 表单提交状态
        loading: false,
        // 搜索表单是否展开
        searchExpand: false
      };
    },
    computed: {
      // 计算服务总调用次数
      sumTimes() {
        let sum = 0;
        this.selection.forEach((d) => {
          sum += d.callTimes;
        });
        return sum;
      }
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order, filters }) {
        return queryList({ ...where, ...filters, ...order, page, limit });
      },
      /* 清空选择 */
      clearChoose() {
        this.$refs.table.clearSelection();
      },
      /* 刷新表格 */
      reload() {
        this.$refs.table.reload({ page: 1, where: this.where });
      },
      /* 重置搜索 */
      reset() {
        this.where = { ...DEFAULT_WHERE };
        this.reload();
      },
      /* 保存编辑 */
      save() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.visible = false;
            this.$message.success('保存成功');
          }, 300);
        });
      },
      /* 编辑 */
      openEdit(row) {
        if (row) {
          this.$util.assignObject(this.form, row);
        } else {
          this.form = { ...DEFAULT_FORM };
        }
        this.visible = true;
        this.$refs['form']?.clearValidate();
      },
      /* 订阅 */
      doRSS(row) {
        console.log(row);
        this.$message.success('订阅成功');
      },
      /* 下拉按钮点击 */
      dropClick(command) {
        if (command === 'del') {
          this.$message.info('点击了批量删除');
          this.clearChoose();
        } else if (command === 'check') {
          this.$message.info('点击了批量审批');
        }
      },
      /* 搜索展开/收起 */
      toggleExpand() {
        this.searchExpand = !this.searchExpand;
      },
      /* 描述筛选 */
      onDescFilter(description) {
        this.where.description = description;
        this.reload(this.where);
      }
    }
  };
</script>

<style scoped></style>
