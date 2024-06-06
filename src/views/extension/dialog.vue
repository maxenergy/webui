<template>
  <div class="ele-body">
    <el-card shadow="never" header="可拖拽、拉伸、全屏弹窗">
      <div style="padding: 10px 0" class="ele-action-group">
        <el-button @click="openDialog">可拖拽弹窗</el-button>
        <el-button @click="openMoveOutDialog">允许拖出边界</el-button>
        <el-button @click="openHideModalDialog" class="hidden-xs-only">
          不要遮罩层
        </el-button>
      </div>
      <div class="hidden-sm-and-up ele-action-group">
        <el-button @click="openHideModalDialog">不要遮罩层</el-button>
      </div>
      <div style="padding: 10px 2px">
        拖拽、拉伸、全屏切换都是通过自定义指令实现的，对el-dialog无侵入扩展，使用非常方便。
      </div>
    </el-card>
    <el-card shadow="never" header="更多操作">
      <div style="padding: 10px 0" class="ele-action-group">
        <el-button @click="openFullDialog">默认全屏打开</el-button>
        <el-button @click="openMoreDialog">默认右下角打开</el-button>
      </div>
      <div style="padding: 10px 2px">
        还支持同时打开多个弹窗，并且当点击某个弹窗时，该弹窗就会自动更新z-index，置顶在最上面。
      </div>
    </el-card>
    <!-- 弹窗1 -->
    <el-dialog
      width="400px"
      :modal="modal"
      title="拖拽弹窗"
      :style="dialogStyle"
      :lock-scroll="false"
      :visible.sync="visible"
      :close-on-click-modal="false"
      v-dialog-movable="moveOut"
      v-dialog-maximizable
      v-dialog-resizable
      v-dialog-set-top
      @closed="onClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="82px">
        <el-form-item label="用户名:" prop="nickname">
          <el-input
            clearable
            v-model="form.nickname"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select
            clearable
            class="ele-fluid"
            v-model="form.sex"
            placeholder="请选择性别"
            :popper-append-to-body="false"
          >
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input clearable v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input clearable v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="个人简介:">
          <el-input
            :rows="4"
            clearable
            type="textarea"
            v-model="form.introduction"
            placeholder="请输入个人简介"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗2 -->
    <el-dialog
      width="400px"
      :modal="false"
      title="默认全屏打开"
      :lock-scroll="false"
      :visible.sync="visible2"
      :close-on-click-modal="false"
      style="pointer-events: none"
      v-dialog-maximizable="true"
      v-dialog-resizable
      v-dialog-movable
      v-dialog-set-top
    >
      <div style="min-height: 66px">我是弹窗2</div>
    </el-dialog>
    <!-- 弹窗3 -->
    <el-dialog
      top="0"
      width="400px"
      :modal="false"
      title="默认右下角打开"
      :lock-scroll="false"
      :visible.sync="visible3"
      :close-on-click-modal="false"
      style="pointer-events: none"
      custom-class="demo-dialog-eg3"
      v-dialog-resizable
      v-dialog-movable
      v-dialog-set-top
    >
      <div style="min-height: 66px">我是弹窗3</div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ExtensionDialog',
    data() {
      return {
        // 弹窗是否打开
        visible: false,
        visible2: false,
        visible3: false,
        // 表单数据
        form: {},
        // 是否显示遮罩层
        modal: true,
        // 是否允许拖出边界
        moveOut: false,
        // 表单验证规则
        rules: {
          nickname: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          sex: [
            {
              required: true,
              message: '请选择性别',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    computed: {
      // 弹窗不显示遮罩层时样式
      dialogStyle() {
        return this.modal
          ? {}
          : {
              'pointer-events': 'none',
              overflow: 'hidden'
            };
      }
    },
    methods: {
      /* 打开弹窗 */
      openDialog() {
        if (!this.visible) {
          this.modal = true;
          this.moveOut = false;
          this.visible = true;
        }
      },
      /* 打开允许拖出边界弹窗 */
      openMoveOutDialog() {
        this.moveOut = true;
        if (!this.visible) {
          this.modal = true;
          this.visible = true;
        }
      },
      /* 打开无遮罩层弹窗 */
      openHideModalDialog() {
        this.moveOut = false;
        if (!this.visible) {
          this.modal = false;
          this.visible = true;
        }
      },
      /* 打开默认全屏弹窗 */
      openFullDialog() {
        if (!this.visible2) {
          this.visible2 = true;
        }
      },
      /* 打开弹窗3 */
      openMoreDialog() {
        if (!this.visible3) {
          this.visible3 = true;
        }
      },
      /* 弹窗关闭回调 */
      onClose() {
        this.form = {};
        this.$refs.form.clearValidate();
      },
      /* 关闭弹窗 */
      closeDialog() {
        this.visible = false;
      },
      /* 保存 */
      save() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$message.success('保存成功');
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped>
  ::v-deep .demo-dialog-eg3.el-dialog {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
  }
</style>
