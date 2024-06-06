<!-- 搜索表单 -->
<template>
  <el-form
    size="small"
    class="ele-form-search"
    @keyup.enter.native="search"
    @submit.native.prevent
  >
    <el-row :gutter="10">
      <el-col :md="8">
        <el-form-item>
          <el-input
            clearable
            size="small"
            v-model="where.keywords"
            placeholder="输入关键字搜索"
          />
        </el-form-item>
      </el-col>
      <el-col :md="16">
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            class="ele-btn-icon"
            @click="search"
          >
            查询
          </el-button>
          <slot />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  const DEFAULT_WHERE = {
    keywords: ''
  };

  export default {
    name: 'DictDataSearch',
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
