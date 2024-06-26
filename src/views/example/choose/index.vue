<template>
  <div class="ele-body" style="padding-bottom: 71px">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-card
        shadow="never"
        header="发布实训活动"
        body-style="padding: 22px 22px 3px 22px;"
      >
        <el-row :gutter="15">
          <el-col :md="8">
            <el-form-item label="实训名称:" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入实训名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="起止日期:" prop="datetime">
              <el-date-picker
                v-model="form.datetime"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="ele-fluid"
              />
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="实训地点:" prop="address">
              <el-select
                v-model="form.address"
                placeholder="请选择地点"
                class="ele-fluid"
                clearable
              >
                <el-option label="地点一" :value="1" />
                <el-option label="地点二" :value="2" />
                <el-option label="地点三" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24">
            <el-form-item label="实训内容:" prop="content">
              <el-input
                v-model="form.content"
                placeholder="请输入实训内容"
                :rows="4"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never" header="选择实训班级:">
        <el-row :gutter="15">
          <el-col :md="12">
            <!-- 未选择的班级数据表格 -->
            <ele-pro-table
              :datasource="unChooseClass"
              :columns="columns"
              sub-title="未选班级:"
              height="535px"
              emptyText="已全部选择"
              :toolkit="[]"
              layout="total, prev, pager, next, jumper"
            >
              <template slot="toolkit">
                <el-button size="mini" class="ele-btn-icon" @click="addAll">
                  全部添加
                </el-button>
              </template>
              <template slot="action" slot-scope="{ row }">
                <el-button size="mini" @click="add(row)">添加</el-button>
              </template>
            </ele-pro-table>
          </el-col>
          <el-col :md="12">
            <!-- 已选择的班级数据表格 -->
            <ele-pro-table
              :datasource="chooseClasses"
              :columns="columns"
              sub-title="已选班级:"
              height="535px"
              emptyText="未选择班级"
              :toolkit="[]"
              layout="total, prev, pager, next, jumper"
            >
              <template slot="toolkit">
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  class="ele-btn-icon"
                  @click="removeAll"
                >
                  全部移除
                </el-button>
              </template>
              <template slot="action" slot-scope="{ row }">
                <el-button type="danger" plain size="mini" @click="remove(row)">
                  移除
                </el-button>
              </template>
            </ele-pro-table>
          </el-col>
        </el-row>
      </el-card>
      <!-- 底部工具栏 -->
      <div class="ele-bottom-tool">
        <div class="ele-bottom-tool-actions">
          <el-button type="primary" :loading="loading" @click="submit">
            发布
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { getAllClasses } from '@/api/example/choose';

  export default {
    name: 'ExampleChoose',
    data() {
      return {
        // 加载状态
        loading: false,
        // 表单数据
        form: {},
        // 表单验证规则
        rules: {
          title: [
            {
              required: true,
              message: '请输入实训名称',
              trigger: 'blur'
            }
          ],
          datetime: [
            {
              required: true,
              message: '请选择起止日期',
              trigger: 'blur'
            }
          ],
          content: [
            {
              required: true,
              message: '请输入实训内容',
              trigger: 'blur'
            }
          ],
          address: [
            {
              required: true,
              message: '请选择实训地点',
              trigger: 'blur'
            }
          ]
        },
        // 全部实训班级
        classes: [],
        // 已选择的班级数据
        chooseClasses: [],
        // 表格列配置
        columns: [
          {
            columnKey: 'action',
            label: '操作',
            width: 100,
            align: 'center',
            slot: 'action'
          },
          {
            prop: 'classesName',
            label: '班级名称',
            showOverflowTooltip: true,
            minWidth: 110,
            sortable: 'custom'
          },
          {
            prop: 'major',
            label: '专业',
            showOverflowTooltip: true,
            minWidth: 110,
            sortable: 'custom'
          },
          {
            prop: 'college',
            label: '学院',
            showOverflowTooltip: true,
            minWidth: 110,
            sortable: 'custom'
          }
        ]
      };
    },
    computed: {
      /* 未选择的班级数据 */
      unChooseClass() {
        return this.classes.filter((d) => this.chooseClasses.indexOf(d) === -1);
      }
    },
    created() {
      this.query();
    },
    methods: {
      /* 获取全部实训班级 */
      query() {
        getAllClasses()
          .then((data) => {
            this.classes = data;
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      },
      /* 提交 */
      submit() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (!this.chooseClasses.length) {
            this.$message.error('请选择实训班级');
            return;
          }
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$message.success('发布成功');
          }, 1500);
        });
      },
      /* 添加 */
      add(row) {
        this.chooseClasses.push(row);
      },
      /* 移除 */
      remove(row) {
        this.chooseClasses.splice(this.chooseClasses.indexOf(row), 1);
      },
      /* 添加全部 */
      addAll() {
        this.unChooseClass.forEach((d) => {
          this.chooseClasses.push(d);
        });
      },
      /* 移除所有 */
      removeAll() {
        this.chooseClasses.splice(0, this.chooseClasses.length);
      }
    }
  };
</script>

<style scoped></style>
