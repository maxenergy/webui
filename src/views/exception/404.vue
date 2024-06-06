<template>
  <ele-exception
    title="404"
    description="抱歉，你访问的页面不存在"
    style="margin: 145px 0"
  >
    <template slot="icon">
      <img
        alt=""
        src="@/assets/ic-404.svg"
        style="width: 305px; height: 245px"
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
    name: 'Exception404',
    components: { EleException }
  };
</script>

<style scoped></style>
