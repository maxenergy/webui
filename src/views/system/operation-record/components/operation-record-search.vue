<!-- 搜索表单 -->
<template>
  <el-form
    label-width="77px"
    class="ele-form-search"
    @keyup.enter.native="search"
    @submit.native.prevent
  >
    <el-row :gutter="15">
      <el-col :lg="6" :md="12">
        <el-form-item label="用户账号:">
          <el-input clearable v-model="where.username" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-form-item label="操作模块:">
          <el-input clearable v-model="where.module" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-form-item label="操作时间:">
          <el-date-picker
            unlink-panels
            v-model="dateRange"
            range-separator="-"
            type="datetimerange"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="ele-fluid"
          />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <div class="ele-form-actions">
          <el-button
            type="primary"
            icon="el-icon-search"
            class="ele-btn-icon"
            @click="search"
          >
            查询
          </el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  const DEFAULT_WHERE = {
    username: '',
    module: ''
  };

  export default {
    name: 'OperationRecordSearch',
    data() {
      return {
        // 表单数据
        where: { ...DEFAULT_WHERE },
        // 日期范围选择
        dateRange: [],
        // 日期时间选择器快捷项
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        }
      };
    },
    methods: {
      /* 搜索 */
      search() {
        const [createTimeStart, createTimeEnd] = this.dateRange;
        this.$emit('search', {
          ...this.where,
          createTimeStart,
          createTimeEnd
        });
      },
      /*  重置 */
      reset() {
        this.where = { ...DEFAULT_WHERE };
        this.dateRange = [];
        this.search();
      }
    }
  };
</script>

<style scoped></style>
