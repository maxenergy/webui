<template>
  <div>
    <el-card style="margin: 10px;" v-loading='delloading'>

    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      :columns="columns"
      :datasource="datasource"
      :need-page="false"
      :selection.sync="selection"
      :toolkit ="['reload', 'fullscreen']"
      height="calc(100vh - 170px)"
      tool-class="ele-toolbar-form"
    >
      <!-- 表头工具栏 -->
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
        <el-button
          size="small"
          type="primary"
          class="ele-btn-icon"
          @click="reload()"
        >
          刷新状态
        </el-button>
        <!-- <el-button
          size="small"
          type="danger"
          icon="el-icon-delete"
          class="ele-btn-icon"
          @click="removeBatch"
        >
          批量删除
        </el-button> -->
        <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh"
          class="ele-btn-icon"
          @click="reboot()"
        >
          服务重启
        </el-button>
      </template>
      <!-- 操作列 -->
      <template slot="action" slot-scope="{ row }">
        <el-link
          type="primary"
          :underline="false"
          @click="openEdit(row)"
        >
          通道名称修改
        </el-link>
        <el-link
          type="danger"
          :underline="false"
          @click="remove(row)"
        >
          删除
        </el-link>
        <el-link
          type="primary"
          :underline="false"
          @click="openTypeEdit(row)"
        >
          算法配置
        </el-link>
      </template>
      <template slot="Cam_state" slot-scope="{ row }">
        <template v-if="row.Cam_state=='on'">
          <el-tag size="mini" type="success">在线</el-tag>
        </template>
        <template v-if="row.Cam_state=='off'">
           <el-tag size="mini" type="danger">离线</el-tag>
        </template>
      </template>
      <!-- 状态列 -->
      <template slot="status" slot-scope="{ row }">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          v-model="row.detect_status"
          @change="editStatus(row)"
        />
      </template>
    </ele-pro-table>

    </el-card>
    <!-- 编辑弹窗 -->
    <dict-data-edit
      :visible.sync="showEdit"
      :data="current"
      :dict-id="Cam_Id"
      @done="reload"
    />
    <dict-data-type-edit
      :visible.sync="showTypeEdit"
      :data="current"
      :dict-id="Cam_Id"
      @done="reload"
    />

  </div>
</template>

<script>
  import DictDataEdit from './components/dict-data-edit';
  import DictDataTypeEdit from './components/dict-data-type-edit';
  import {
    loadallDevices,
    deleteDevices,
    updateDeviceStatus,
    devicereboot,
  } from '@/api/config/channel_config';


  export default {
    name: 'DictDatass',
    components: { DictDataEdit, DictDataTypeEdit },
    props: {
      // 字典id
      dictId: Number
    },
    data() {
      return {
        // 表格列配置
        dialogVisible: false,
        columns: [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center'
          },
          {
            columnKey: 'id',
            label: '通道号',
            type: 'index',
            width: 75,
            align: 'center',
            showOverflowTooltip: true
          },
          {
            prop: 'Cam_name',
            label: '通道名称',
            align: 'center',
          },
          {
            prop: 'Cam_path',
            label: '通道地址',
            align: 'center',
          },
          {
            prop: 'Cam_state',
            label: '摄像头在线状态',
            align: 'center',
            slot: 'Cam_state'
          },
          // {
          //   prop: 'status',
          //   label: '算法启动状态',
          //   align: 'center',
          //   minWidth: 80,
          //   resizable: false,
          //   slot: 'status'
          // },
          {
            prop: 'Cam_time',
            label: '最后在线时间',
            align: 'center',
            formatter: (row, column, cellValue) => {
              return this.$util.toDateString(cellValue);
            }
          },
          {
            columnKey: 'action',
            fixed: 'right',
            label: '操作',
            width: 180,
            align: 'center',
            resizable: false,
            slot: 'action'
          }
        ],
        // 表格选中数据
        selection: [],
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: false,
        showTypeEdit: false,
        delloading:false
      };
    },
    methods: {
      /* 表格数据源 */
      datasource() {
        return loadallDevices();
      },
      /* 刷新表格 */
      reload() {
        this.$refs.table.reload();
      },
      reboot(){
        this.$confirm('服务重启确认', '提示', {
          type: 'warning'
        }).then(() => {
            devicereboot()
        })
      },
      /* 更改状态 */
      editStatus(row) {
        updateDeviceStatus(row)
          .then((msg) => {
            this.$message.success(msg);
          })
          .catch((e) => {
            row.status = !row.status ? 1 : 0;
            this.$message.error(e.message);
          });
      },
      /* 显示编辑 */
      openEdit(row) {
        this.current = row;
        this.showEdit = true;
      },
      /* 显示编辑 */
      openTypeEdit(row) {
        this.current = row;
        this.showTypeEdit = true;
      },
      /* 删除 */
      remove(row) {
        this.$confirm('确定要删除选中的视频通道吗?', '提示', {
          type: 'warning'
        }).then(()=>{
          this.delloading=true
          deleteDevices(row)
            .then((msg) => {
              let that = this;
              that.$message.success('视频通道资源释放');
              that.reload();
              setTimeout(function(){
                that.delloading=false
                that.$message.success(msg);
              },3000)
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        })
      },
      /* 批量删除 */
      removeBatch() {
        if (!this.selection.length) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        this.$confirm('确定要删除选中的视频通道吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            // removeDictionaryDataBatch(this.selection.map((d) => d.dictDataId))
            //   .then((msg) => {
            //     loading.close();
            //     this.$message.success(msg);
            //     this.reload();
            //   })
            //   .catch((e) => {
            //     this.$message.error(e.message);
            //   });
          })
          .catch(() => {});
      }
    },
    watch: {
      // 监听字典id变化
      dictId() {
        this.reload();
      }
    }
  };
</script>

<style scoped></style>
