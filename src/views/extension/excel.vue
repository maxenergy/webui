<template>
  <div class="ele-body">
    <el-card shadow="never" header="导出excel">
      <ele-pro-table
        :datasource="users"
        :columns="columns"
        :selection.sync="select"
        :need-page="false"
        tools-theme="none"
        size="mini"
        tool-class="ele-toolbar-actions"
        :toolkit="['size', 'columns', 'fullscreen']"
      >
        <template slot="toolbar">
          <el-button size="small" @click="exportBas">导出excel</el-button>
          <el-button size="small" @click="exportAdv">
            导出带单元格合并
          </el-button>
          <el-button size="small" @click="exportSel">导出选中</el-button>
        </template>
      </ele-pro-table>
    </el-card>
    <el-card shadow="never" header="导入excel">
      <!-- 操作按钮 -->
      <div class="ele-table-tool ele-action-group">
        <el-upload
          action=""
          :before-upload="importFile"
          :show-file-list="false"
          class="ele-action"
          accept=".xls,.xlsx,.csv"
        >
          <el-button size="small" class="hidden-xs-only">导入excel</el-button>
        </el-upload>
        <el-upload
          action=""
          :before-upload="importFile2"
          :show-file-list="false"
          class="ele-action"
          accept=".xls,.xlsx,.csv"
        >
          <el-button size="small">导入自动拆分合并</el-button>
        </el-upload>
        <el-upload
          action=""
          :before-upload="importFile3"
          :show-file-list="false"
          class="ele-action"
          accept=".xls,.xlsx,.csv"
        >
          <el-button size="small">导入保持合并样式</el-button>
        </el-upload>
      </div>
      <!-- 数据表格 -->
      <el-table
        :data="importData"
        :span-method="spanMethod"
        size="mini"
        border
        style="width: 100%"
      >
        <el-table-column type="index" width="45" align="center" />
        <el-table-column
          v-for="(key, index) in importTitle"
          :key="index"
          :prop="key"
          :label="key"
          align="center"
          show-overflow-tooltip
        />
      </el-table>
      <el-row :gutter="30">
        <el-col :md="12">
          <div style="padding: 15px 0">二维数组格式数据：</div>
          <pre style="max-height: 300px; overflow: auto">{{
            JSON.stringify(importDataAoa, null, 4)
          }}</pre>
        </el-col>
        <el-col :md="12">
          <div style="padding: 15px 0">JSON格式数据：</div>
          <pre style="max-height: 300px; overflow: auto">{{
            JSON.stringify(importData, null, 4)
          }}</pre>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import XLSX from 'xlsx';

  export default {
    name: 'ExtensionExcel',
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center'
          },
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center'
          },
          {
            prop: 'username',
            label: '用户名',
            align: 'center',
            showOverflowTooltip: true
          },
          {
            prop: 'addressGroup',
            label: '地址',
            align: 'center',
            showOverflowTooltip: true,
            children: [
              {
                prop: 'province',
                label: '省',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'city',
                label: '市',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'zone',
                label: '区',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'street',
                label: '街道',
                align: 'center',
                showOverflowTooltip: true
              },
              {
                prop: 'address',
                label: '详细地址',
                align: 'center',
                showOverflowTooltip: true
              }
            ]
          },
          {
            prop: 'amount',
            label: '金额',
            align: 'center',
            showOverflowTooltip: true
          }
        ],
        // 表格数据
        users: [
          {
            key: 1,
            username: '张小三',
            amount: 18,
            province: '浙江',
            city: '杭州',
            zone: '西湖区',
            street: '西溪街道',
            address: '西溪花园30栋1单元'
          },
          {
            key: 2,
            username: '李小四',
            amount: 39,
            province: '江苏',
            city: '苏州',
            zone: '姑苏区',
            street: '丝绸路',
            address: '天墅之城9幢2单元'
          },
          {
            key: 3,
            username: '王小五',
            amount: 8,
            province: '江西',
            city: '南昌',
            zone: '青山湖区',
            street: '艾溪湖办事处',
            address: '中兴和园1幢3单元'
          },
          {
            key: 4,
            username: '赵小六',
            amount: 16,
            province: '福建',
            city: '泉州',
            zone: '丰泽区',
            street: '南洋街道',
            address: '南洋村6幢1单元'
          },
          {
            key: 5,
            username: '孙小七',
            amount: 12,
            province: '湖北',
            city: '武汉',
            zone: '武昌区',
            street: '武昌大道',
            address: '两湖花园16幢2单元'
          },
          {
            key: 6,
            username: '周小八',
            amount: 11,
            province: '安徽',
            city: '黄山',
            zone: '黄山区',
            street: '汤口镇',
            address: '温泉村21号'
          }
        ],
        // 选中数据
        select: [],
        // 导入数据
        importData: [],
        // 导入数据的列
        importTitle: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        // 导入数据二维数组形式
        importDataAoa: []
      };
    },
    methods: {
      /* 导出excel */
      exportBas() {
        const array = [
          ['用户名', '省', '市', '区', '街道', '详细地址', '金额']
        ];
        this.users.forEach((d) => {
          array.push([
            d.username,
            d.province,
            d.city,
            d.zone,
            d.street,
            d.address,
            d.amount
          ]);
        });
        this.$util.exportSheet(XLSX, array, '用户数据');
      },
      /* 导出带单元格合并 */
      exportAdv() {
        const array = [
          ['用户名', '地址', null, null, null, null, '金额'],
          [null, '省', '市', '区', '街道', '详细地址', null]
        ];
        this.users.forEach((d) => {
          array.push([
            d.username,
            d.province,
            d.city,
            d.zone,
            d.street,
            d.address,
            d.amount
          ]);
        });
        const sheet = XLSX.utils.aoa_to_sheet(array);
        sheet['!merges'] = [
          { s: { r: 0, c: 1 }, e: { r: 0, c: 5 } }, // 合并第0行第1列到第0行第5列
          { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // 合并第0行第0列到第1行第0列
          { s: { r: 0, c: 6 }, e: { r: 1, c: 6 } } // 合并第0行第6列到第1行第6列
        ];
        this.$util.exportSheet(XLSX, sheet, '用户数据');
      },
      /* 导出选中数据 */
      exportSel() {
        if (this.select.length === 0) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        const array = [
          ['用户名', '省', '市', '区', '街道', '详细地址', '金额']
        ];
        this.select.forEach((d) => {
          array.push([
            d.username,
            d.province,
            d.city,
            d.zone,
            d.street,
            d.address,
            d.amount
          ]);
        });
        this.$util.exportSheet(XLSX, array, '用户数据');
      },
      /* 导入本地excel文件 */
      importFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const worksheet = workbook.Sheets[sheetNames[0]];
          // 解析成二维数组
          const aoa = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          // 生成表格需要的数据
          const list = [];
          let maxCols = 0;
          const title = [];
          aoa.forEach((d) => {
            if (d.length > maxCols) {
              maxCols = d.length;
            }
            const row = {};
            for (let i = 0; i < d.length; i++) {
              row[this.getCharByIndex(i)] = d[i];
            }
            list.push(row);
          });
          for (let i = 0; i < maxCols; i++) {
            title.push(this.getCharByIndex(i));
          }
          this.importTitle = title;
          this.importData = list;
          this.importDataAoa = aoa;
        };
        reader.readAsArrayBuffer(file);
        return false;
      },
      /* 导入本地excel文件 */
      importFile2(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const worksheet = workbook.Sheets[sheetNames[0]];
          // 解析成二维数组
          const aoa = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          // 拆分合并单元格
          if (worksheet['!merges']) {
            worksheet['!merges'].forEach((m) => {
              for (let r = m.s.r; r <= m.e.r; r++) {
                for (let c = m.s.c; c <= m.e.c; c++) {
                  aoa[r][c] = aoa[m.s.r][m.s.c];
                }
              }
            });
          }
          // 生成表格需要的数据
          const list = [];
          let maxCols = 0;
          const title = [];
          aoa.forEach((d) => {
            if (d.length > maxCols) {
              maxCols = d.length;
            }
            const row = {};
            for (let i = 0; i < d.length; i++) {
              row[this.getCharByIndex(i)] = d[i];
            }
            list.push(row);
          });
          for (let i = 0; i < maxCols; i++) {
            title.push(this.getCharByIndex(i));
          }
          this.importTitle = title;
          this.importData = list;
          this.importDataAoa = aoa;
        };
        reader.readAsArrayBuffer(file);
        return false;
      },
      /* 导入本地excel文件 */
      importFile3(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const worksheet = workbook.Sheets[sheetNames[0]];
          // 解析成二维数组
          const aoa = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          // 生成表格需要的数据
          const list = [];
          let maxCols = 0;
          const title = [];
          aoa.forEach((d) => {
            if (d.length > maxCols) {
              maxCols = d.length;
            }
            const row = {};
            for (let i = 0; i < d.length; i++) {
              row[this.getCharByIndex(i)] = d[i];
            }
            list.push(row);
          });
          for (let i = 0; i < maxCols; i++) {
            title.push(this.getCharByIndex(i));
          }
          // 记录合并单元格
          if (worksheet['!merges']) {
            worksheet['!merges'].forEach((m) => {
              for (let r = m.s.r; r <= m.e.r; r++) {
                for (let c = m.s.c; c <= m.e.c; c++) {
                  const cc = this.getCharByIndex(c);
                  list[r]['__colspan__' + cc] = 0;
                  list[r]['__rowspan__' + cc] = 0;
                }
              }
              const char = this.getCharByIndex(m.s.c);
              list[m.s.r]['__colspan__' + char] = m.e.c - m.s.c + 1;
              list[m.s.r]['__rowspan__' + char] = m.e.r - m.s.r + 1;
            });
          }
          this.importTitle = title;
          this.importData = list;
          this.importDataAoa = aoa;
        };
        reader.readAsArrayBuffer(file);
        return false;
      },
      /* 生成Excel列字母序号 */
      getCharByIndex(index) {
        let chars = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ];
        if (index < chars.length) {
          return chars[index];
        }
        const n = parseInt(index / chars.length),
          m = index % chars.length;
        return chars[n] + chars[m];
      },
      /* 合并表格单元格 */
      spanMethod({ row, column }) {
        if (!column.label) {
          return [1, 1];
        }
        const r = row['__rowspan__' + column.label],
          c = row['__colspan__' + column.label];
        return [r === undefined ? 1 : r, c === undefined ? 1 : c];
      }
    }
  };
</script>

<style scoped></style>
