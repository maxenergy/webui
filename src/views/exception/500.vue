<template>
  <ele-exception
    title="500"
    description="抱歉，服务器出错了"
    style="margin: 145px 0"
  >
    <template slot="icon">
      <img
        alt=""
        src="@/assets/ic-500.svg"
        style="width: 400px; height: 185px"
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
    name: 'Exception500',
    components: { EleException }
  };
</script>

<style scoped></style>
