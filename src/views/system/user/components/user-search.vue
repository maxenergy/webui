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
        <el-form-item label="用户名:">
          <el-input clearable v-model="where.nickname" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-form-item label="性别:">
          <el-select
            clearable
            v-model="where.sex"
            placeholder="请选择"
            class="ele-fluid"
          >
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
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
    nickname: '',
    sex: undefined
  };

  export default {
    name: 'UserSearch',
    data() {
      return {
        // 表单数据
        where: { ...DEFAULT_WHERE }
      };
    },
    methods: {
      /* 搜索 */
      search() {
        this.$emit('search', this.where);
      },
      /*  重置 */
      reset() {
        this.where = { ...DEFAULT_WHERE };
        this.search();
      }
    }
  };
</script>

<style scoped></style>
