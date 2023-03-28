<template>
  <div class="login">
    <el-card>
      <h2>登录</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="formRef"
        size="large"
        @keyup.enter="onSubmit"
      >
        <el-form-item prop="email">
          <el-input v-model="model.email" placeholder="请输入邮箱">
						<template #prefix>
							<el-icon class="el-input__icon"><Message /></el-icon>
						</template>
					</el-input>
        </el-form-item>
        <el-form-item prop="captchaCode">
          <el-input v-model="model.captchaCode" placeholder="请输入验证码" type="text">
            <template #prefix>
              <el-icon class="el-input__icon"><Picture /></el-icon>
            </template>
						<template #suffix>
              <el-image :src="captcha.img" style="width: 80px;height:80%" @click="getCaptcha">
                  <template #error>
                    <div class="flex-center" style="height:100%;background-color: #E6E8EB">
                        <el-icon class="el-input__icon"><Picture /></el-icon>
                    </div>
                  </template>
              </el-image>
						</template>

          </el-input>
        </el-form-item>


        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="请输入密码"
            type="password"
          >
						<template #prefix>
							<el-icon class="el-input__icon"><Lock /></el-icon>
						</template>

				</el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            @click="onSubmit(formRef) "
            block
          >登录</el-button>
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/">忘记密码</a>
				<router-link to="/sign-up">注册</router-link>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { User, Lock, Message, Picture } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'
import Axios from '~/api/axios'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    User, Lock, Message, Picture
  },
  setup() {
    const router = useRouter()

    const model = ref({
        email: "",
        password: "",
        captchaCode: ""
    })

    const captcha = ref({
      img: ""
    })

    const rules = ref({
      email : [ 
        { required: true, message: "邮件不能为空", trigger: "blur" },  
        { type: 'email', message: "请输入邮件", trigger: "blur" },  
        ], 
      captchaCode: [{ required: true, message: "验证码不能为空", trigger: "blur" }], 
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    })

    const loading = ref(false)

    const getCaptcha = () => {
      console.log('------------')
      Axios.get('/api/panel/captcha').then((res: any) => {
        captcha.value.img = res.data.url
      })
    }

    const onSubmit = (formEl: FormInstance | undefined) => {
      let params = {
        email: model.value.email,
        captcha: model.value.captchaCode,
        password: model.value.password,
      }
      Axios.post('/api/panel/login', params).then((res: any) => {
        console.log(res)
        if (res.code != 200) {
          ElMessage({
            message: res.message,
            type: 'error'
          })
        } else {
          // 登录跳转
          localStorage.setItem('userInfo', JSON.stringify({
            id: res.data.id,
            email: res.data.email,
          }))
          router.replace('/')

        }
      })
    }

    // init
    getCaptcha()

    return {
      model,
      captcha,
      loading,
      rules,
      getCaptcha,
      onSubmit,
    }
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 20px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
	margin-right:50px
}
.sign-up {
  margin-top: 10px;
	margin-left:50px
}
</style>
<style lang="scss">
$teal: rgb(64, 158, 255);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
