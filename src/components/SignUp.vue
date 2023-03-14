<template>
  <div class="login">
    <el-card>
      <h2>注册</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="email">
          <el-input v-model="model.email" placeholder="邮箱" type="email">
						<template #prefix>
							<el-icon class="el-input__icon"><Message /></el-icon>
						</template>
					</el-input>
        </el-form-item>
        <el-form-item prop="confirm-code">
          <el-input  placeholder="" v-model="model.code">
            <template #prefix>
							<el-icon class="el-input__icon"><ChatSquare /></el-icon>
            </template>
						<template #suffix>
              <el-button class="code-btn" type="primary">发送验证</el-button>
						</template>
					</el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="密码"
            type="password"
          >
						<template #prefix>
							<el-icon class="el-input__icon"><Lock /></el-icon>
						</template>

				</el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-input
            v-model="model.confirm"
            placeholder="确认密码"
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
            native-type="submit"
            block
          >提交注册</el-button>
        </el-form-item>
				<router-link to="/login" class="back-login">登录</router-link>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { User, Lock, Message, ChatSquare } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import * as Api from '~/api/chat'


export default {
  name: "Login",
	components: {
		User,
		Lock,
		Message,
    ChatSquare
	},
  data() {
    return {
      validCredentials: {
        email: "lightscope",
        password: "lightscope"
      },
      model: {
        email: "",
        code: "",
        password: "",
        confirm: "",
      },
      loading: false,
      rules: {
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          {
            type: 'email',
            message: "必需为邮件地址",
            trigger: "blur",
          },
          {
            min: 4,
            message: "Email length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      // await this.simulateLogin();
			Api.login(this.model.email, this.model.password).then(function(response){
				console.log(response)
			}).catch(function(error) {
				ElMessage({
					showClose: true,
					message: error.message,
					type: 'error',
				})

			})



      this.loading = false;
      if (
        this.model.email=== this.validCredentials.email&&
        this.model.password === this.validCredentials.password
      ) {
				ElMessage({
					showClose: true,
					message: 'Congrats, this is a success message.',
					type: 'success',
				})
      } else {
				ElMessage({
					showClose: true,
					message: 'Oops, this is a error message.',
					type: 'error',
				})

      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.back-login {
  display: flex;
  justify-content: end;
  margin-right: 15px;
}
.code-btn {
  width: 40px;
  height: 24px;
}
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
<style lang="scss" scoped>
$teal: rgb(64, 158, 255);
.el-button--primary {
  background: $teal;
  background-color: $teal;
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
