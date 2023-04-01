<template>
	<div class="container page bg-white">
			<el-form :model="params" class="demo-form-inline" :size="formSize">
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="邮箱">
							<el-input v-model="params.email" placeholder="" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="昵称">
							<el-input v-model="params.name" placeholder="" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item>
							<el-button type="primary" @click="onSubmit">搜索</el-button>
							<el-button type="primary" @click="onAdd">添加</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="昵称" width="180" />
				<el-table-column prop="email" label="邮箱" width="180" />
				<el-table-column prop="loginAt" label="最近登录" />
				<el-table-column prop="loginIp" label="最近登录IP" />
				<el-table-column  label="状态" >
					<template #default="scope">
						<el-text :type="scope.row.status == '启用' ? 'primary' : 'danger'">{{  scope.row.status }}</el-text>
					</template>
				</el-table-column>

				<el-table-column prop="createdAt" label="创建时间" />
				
				<el-table-column fixed="right" label="操作" width="180">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="toDetail(scope.row)">详情</el-button >
						<el-button link type="primary" size="small" @click="changePassword(scope.row)">修改密码</el-button >
							<el-popconfirm
								confirm-button-text="确认"
								cancel-button-text="取消"
								:icon="InfoFilled"
								icon-color="#626AEF"
								:title="scope.row.status == '启用' ? '确认停用?' : '确认启用?'"
								@confirm="changeStatus(scope.row)"
							>
								<template #reference>
									<el-button link type="primary" size="small">{{ scope.row.status == '启用' ? '停用' : '启用'  }}</el-button >
								</template>
							</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination class="mt fl"
            v-model:current-page="page.current_page"
            background
            :page-size="page.page_size"
            layout="prev, pager, next"
            :total="page.total"
            @current-change="handleCurrentChange"
        />

			<el-dialog v-model="modal.show" :title="modal.title" width="30%" align-center>
				<el-form
					ref="ruleFormRef"
					:model="userForm"
					:rules="rules"
					class="demo-ruleForm"
					size="large"
					status-icon
				>
					<el-form-item label="昵称" prop="name">
						<el-input v-model="userForm.name" />
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="userForm.email" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="userForm.password" />
					</el-form-item>
				</el-form>

				<template #footer>
						<span class="dialog-footer">
								<el-button class="el-button--large" @click="resetForm(ruleFormRef)">取消</el-button>
								<el-button class="el-button--large" type="primary" @click="addUser(ruleFormRef)">添加</el-button>
						</span>
				</template>
				</el-dialog>	
</div>
</template>
<style lang="scss" scoped>
.el-select {
	width: 100%;
}
.el-select-v2__placeholder {
	text-align: left;
}
.mt {margin-top:0.5em}
.fl { display: flex; justify-content: end;}
.status-on { color: var(--el-color-primary) }
.status-off { color: var(--el-color-danger) }
</style>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import Axios from '~/api/axios'
import router from '~/router'


export default defineComponent({
components: {
	InfoFilled
},
setup() {
	

	const formInline = ref({
		email: '',
		name: '',
	})
	const tableData = ref([])
	const page = ref({
		current_page: 1
	})
	const formSize = "large"

	const modal = reactive({
		title: '添加会员',
		content: '好长的内容哦~~~',
		show: false
	})

	const onAdd = () => {
		  console.log('dialog show')
			modal.show = true
	}

	const ruleFormRef = ref<FormInstance>()
	const userForm = reactive({
		name: "",
		email: "",
		password: ""
	})
	const rules = reactive<FormRules>({
		name: [
			{ required: true, message: '请输入会员昵称', trigger: 'blur' },
			{ min: 3, max: 15, message: '3到15个字', trigger: 'blur' },
		],
		email: [
			{
				required: true,
				message: '请输入邮箱',
				trigger: 'blur',
			},
			{
				type: 'email',
				message: '请输入正确邮箱',
				trigger: 'blur',
			},
		],
		password: [
			{ required: true, message: '请输入密码', trigger: 'change' },
			{ min: 6, message: '至少6个字符', trigger: 'change' },
		]
	})
	const flowOptions = ref([

		{
			value: 20,
			label: '20G'
		},
		{
			value: 50,
			label: '50G'
		}
	])

	const params = reactive({
		page: 1,
		name: "",
		email: ""
	})
	let loading = false
	const fetchData = () => {
		if (loading) return 

		loading = true
		Axios.get('/api/panel/user/list', {
			params: params
		}).then((res: any) => {
			loading = false

			let lst = res.data.list
			tableData.value = lst
			page.value = res.data.page
		}).catch((err) => {
			loading = false
		})
	}

	const onSubmit = () => {
		console.log('submit!')
		fetchData();
	}

	const changePassword = (user: any) => {
		if (loading) return 
		loading = true

		ElMessageBox.prompt('', '修改密码', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
		})
		.then(({ value }) => {
			Axios.post('/api/panel/user/change/password', {
				id: user.id || '',
				password: value
			}).then((res: any) => {
				loading = false

				ElMessage({
					message: '修改成功',
					type: 'success'
				})

			}).catch((err) => {
				loading = false
			})
			
		})
		.catch(() => {
			loading = false
		})
	}

	const changeStatus = (user: any) => {
		if (loading) return 
		loading = true

		Axios.post('/api/panel/user/change/status', {
				id: user.id || '',
			}).then((res: any) => {
				loading = false

				ElMessage({
					message: '修改成功',
					type: 'success'
				})

				fetchData()

			}).catch((err) => {
				loading = false
			})

	}

	const resetForm = (formRef: FormInstance | undefined) => {
		if (!formRef) return
		formRef.resetFields()
		modal.show = false
	}

	const addUser = async (formRef: FormInstance | undefined) => {
		if (!formRef) return
		if (loading) return
		loading = true

		await formRef.validate((valid, fields) => {

			if (!valid) {
				console.log(fields)
				ElMessage({
					message: '表单验证失败',
					type: 'error'
				})
				loading = false
				return
			}

			Axios.post('/api/panel/user/add', {
				name: userForm.name,
				email: userForm.email,
				password: userForm.password,
			}).then((res: any) => {
				loading = false

				ElMessage({
					message: '添加成功',
					type: 'success'
				})

				modal.show = false
				userForm.name = ""
				userForm.email = ""
				userForm.password = ""

			}).catch((err) => {
				loading = false
			})

		})


	}

	const handleCurrentChange = (val: number) => {
		params.page = val
		fetchData()
	}

	const handleClick = (val: any) => {
		console.log(val)
		console.log(val.value)
		console.log(val.id)
	}
	const toDetail = (user: any) => {
		router.push({ name: "UserDetail", query: { id: user.id }})
	}

	fetchData()

	return {
		onSubmit,
		formInline,
		tableData,
		formSize,
		onAdd,
		modal,
		userForm,
		rules,
		flowOptions,
		page,
		params,
		handleCurrentChange,
		handleClick,
		addUser,
		resetForm,
		ruleFormRef,
		changePassword,
		changeStatus,
		toDetail,
	}
},
})
</script>
