<template>
  <div class="ele-body">
    <el-card shadow="never" header="省市区级联选择">
      <div style="max-width: 280px">
        <el-cascader
          clearable
          v-model="city"
          class="ele-fluid"
          :options="cityData"
          placeholder="请选择省市区"
          popper-class="ele-pop-wrap-higher"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="省市级联选择">
      <div style="max-width: 280px">
        <el-cascader
          clearable
          class="ele-fluid"
          v-model="provinceCity"
          placeholder="请选择省市"
          :options="provinceCityData"
          popper-class="ele-pop-wrap-higher"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="省选择">
      <div style="max-width: 280px">
        <el-cascader
          clearable
          class="ele-fluid"
          v-model="province"
          placeholder="请选择省"
          :options="provinceData"
          popper-class="ele-pop-wrap-higher"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="可多选">
      <div style="max-width: 280px">
        <el-cascader
          clearable
          v-model="citys"
          class="ele-fluid"
          :options="cityData"
          placeholder="请选择省市区"
          :props="{ multiple: true }"
          popper-class="ele-pop-wrap-higher"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
  import {
    cityData,
    provinceCityData,
    provinceData
  } from 'ele-admin/packages/utils/regions';

  export default {
    name: 'ExtensionRegions',
    data() {
      return {
        cityData,
        provinceCityData,
        provinceData,
        city: [],
        provinceCity: [],
        province: [],
        citys: []
      };
    }
  };
</script>

<style scoped></style>
