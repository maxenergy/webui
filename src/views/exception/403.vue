<template>
  <ele-exception
    title="403"
    description="抱歉，你无权访问该页面"
    style="margin: 145px 0"
  >
    <template slot="icon">
      <img
        alt=""
        src="@/assets/ic-403.svg"
        style="width: 216px; height: 250px"
      />
    </template>
    <template slot="extra">
      <router-link to="/">
        <el-button type="primary">返回首页</el-button>
      </router-link>
    </template>
  </ele-exception>
</template>

<script>
  import EleException from 'ele-admin/packages/ele-exception';

  export default {
    name: 'Exception403',
    components: { EleException }
  };
</script>

<style scoped></style>
