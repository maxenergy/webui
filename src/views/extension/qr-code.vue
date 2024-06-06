<template>
  <div class="ele-body">
    <el-card shadow="never" header="二维码">
      <div style="padding-left: 20px">
        <vue-qr :text="text" :size="100" :margin="0" />
      </div>
      <div style="margin-top: 15px; max-width: 160px">
        <el-input v-model="text" size="mini" />
      </div>
    </el-card>
  </div>
</template>

<script>
  import VueQr from 'vue-qr';

  export default {
    name: 'ExtensionQrCode',
    components: { VueQr },
    data() {
      return {
        // 二维码内容
        text: 'https://eleadmin.com'
      };
    }
  };
</script>

<style scoped></style>
