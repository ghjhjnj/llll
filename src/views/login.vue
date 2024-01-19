<template>
  <div>
    <div class="box">
      <h2 style="text-align: center;">智慧园区-登录</h2>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script lang="ts" setup
  >
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router';
  const router = useRouter();
  import type { FormInstance, FormRules } from 'element-plus'
  import { loginApi } from '../api/api'
  interface RuleForm {
    username: string
    password: string
  }

  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    username: 'demo',
    password: 'zh@hm#23',
  })

  const rules = reactive<FormRules<RuleForm>>({
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change',
      },
    ],

  })

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        loginApi(ruleForm).then((res: any) => {
          console.log(res);
          if (res.data.code) {
            localStorage.setItem('token', res.data.data.token)
            router.push('/work')
          }
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  </script>
  
<style lang="scss" scoped>
.box {
  width: 400px;
  margin: 200px auto;
}
</style>