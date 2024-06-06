<template>
  <div class="ele-body">
    <el-card shadow="never" header="基础用法">
      <div style="max-width: 260px">
        <ele-tree-select
          :data="data"
          v-model="value"
          :clearable="true"
          placeholder="请选择"
          :disabled="disabled"
          :default-expand-all="true"
        />
      </div>
      <div class="ele-cell" style="margin-top: 15px">
        <div style="line-height: 22px">&nbsp;禁用：</div>
        <div class="ele-cell-content">
          <el-radio-group v-model="disabled">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" header="多选">
      <div style="max-width: 260px">
        <ele-tree-select
          :data="data"
          v-model="value2"
          :multiple="true"
          :clearable="true"
          placeholder="请选择"
          :default-expand-all="true"
          :check-strictly="checkStrictly"
        />
      </div>
      <div class="ele-cell" style="margin-top: 15px">
        <div style="line-height: 22px">&nbsp;父子联动：</div>
        <div class="ele-cell-content">
          <el-radio-group v-model="checkStrictly">
            <el-radio :label="false">是</el-radio>
            <el-radio :label="true">否</el-radio>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" header="懒加载">
      <div style="max-width: 260px">
        <ele-tree-select
          v-model="value3"
          :multiple="true"
          :clearable="true"
          :lazy="true"
          placeholder="请选择"
          :load="loadNode"
        />
      </div>
    </el-card>
    <el-card shadow="never" header="可搜索">
      <div style="max-width: 260px">
        <ele-tree-select
          :data="data"
          v-model="value4"
          :multiple="true"
          :clearable="true"
          :filterable="true"
          placeholder="请选择"
          :default-expand-all="true"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionTreeSelect',
    data() {
      return {
        // 单选
        value: '',
        // 数据
        data: [
          {
            label: '系统管理',
            value: '1',
            children: [
              {
                label: '用户管理',
                value: '2',
                children: [
                  {
                    label: '添加用户',
                    value: '3'
                  },
                  {
                    label: '修改用户',
                    value: '4'
                  }
                ]
              },
              {
                label: '角色管理',
                value: '5',
                children: [
                  {
                    label: '添加角色',
                    value: '6',
                    disabled: false
                  },
                  {
                    label: '修改角色',
                    value: '7'
                  }
                ]
              }
            ]
          },
          {
            label: '日志管理',
            value: '8',
            children: [
              {
                label: '登录日志',
                value: '9'
              },
              {
                label: '操作日志',
                value: '10',
                disabled: false
              }
            ]
          },
          {
            label: '列表页面',
            value: '11',
            children: [
              {
                label: '基础列表',
                value: '12'
              },
              {
                label: '卡片列表',
                value: '13',
                children: [
                  {
                    label: '项目',
                    value: '14'
                  },
                  {
                    label: '应用',
                    value: '15'
                  },
                  {
                    label: '文章',
                    value: '16'
                  }
                ]
              }
            ]
          }
        ],
        // 禁用
        disabled: false,
        // 多选
        value2: [],
        // 关闭父子联动
        checkStrictly: false,
        // 懒加载
        value3: [],
        // 可搜索
        value4: []
      };
    },
    methods: {
      // 懒加载
      loadNode(node, resolve) {
        setTimeout(() => {
          if (!node.data) {
            resolve([
              {
                label: '系统管理',
                value: '1'
              },
              {
                label: '日志管理',
                value: '8'
              }
            ]);
          } else if (node.data.value === '1') {
            resolve([
              {
                label: '用户管理',
                value: '2'
              },
              {
                label: '角色管理',
                value: '5'
              }
            ]);
          } else if (node.data.value === '2') {
            resolve([
              {
                label: '添加用户',
                value: '3'
              },
              {
                label: '修改用户',
                value: '4'
              }
            ]);
          } else if (node.data.value === '5') {
            resolve([
              {
                label: '添加角色',
                value: '6'
              },
              {
                label: '修改角色',
                value: '7'
              }
            ]);
          } else if (node.data.value === '8') {
            resolve([
              {
                label: '登录日志',
                value: '9'
              },
              {
                label: '操作日志',
                value: '10'
              }
            ]);
            return;
          } else {
            resolve([]);
          }
        }, 500);
      }
    }
  };
</script>

<style scoped></style>
