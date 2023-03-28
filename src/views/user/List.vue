<template>
	<div class="container page bg-white">
			<el-form :model="formInline" class="demo-form-inline" :size="formSize">
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="邮箱">
							<el-input v-model="formInline.user" placeholder="Approved by" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户名">
							<el-select v-model="formInline.region" placeholder="Activity zone">
								<el-option label="Zone one" value="shanghai" />
								<el-option label="Zone two" value="beijing" />
							</el-select>
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
				<el-table-column prop="createdAt" label="创建时间" />
				<el-table-column fixed="right" label="操作" width="120">
					<template #default="scope">
						<el-button link type="primary" size="small" @click="handleClick(scope.row)">Detail</el-button
						>
						<el-button link type="primary" size="small">Edit</el-button>
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
</div>
</template>
<style scoped>
.el-select {
	width: 100%;
}
.el-select-v2__placeholder {
	text-align: left;
}
.mt {margin-top:0.5em}
.fl { display: flex; justify-content: end;}
</style>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import Axios from '~/api/axios'


export default defineComponent({
setup() {
	const onSubmit = () => {
		console.log('submit!')
	}
	const formInline = ref({
		user: '',
		region: '',
	})
	const tableData = ref([])
	const page = ref({
		current_page: 1
	})
	const formSize = "large"

	const modal = reactive({
		title: '这里是标题',
		content: '好长的内容哦~~~',
		show: false
	})

	const onAdd = () => {
			modal.show = true
	}
	const ruleFormRef = ref<FormInstance>()
	const ruleForm = reactive({
		name: 'Hello',
		region: '',
		count: '',
		date1: '',
		date2: '',
		delivery: false,
		type: [],
		resource: '',
		desc: '',
	})
	const rules = reactive<FormRules>({
		name: [
			{ required: true, message: 'Please input Activity name', trigger: 'blur' },
			{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
		],
		region: [
			{
				required: true,
				message: 'Please select Activity zone',
				trigger: 'change',
			},
		],
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
	})
	let loading = false
	const fetchData = () => {
		if (loading) return 

		loading = true
		Axios.get('/api/panel/user/list', {params}).then((res: any) => {
			loading = false

			if (res.code !== 200) {
				return
			}
			let lst = res.data.list
			tableData.value = lst
			page.value = res.data.page
		}).catch(() => {
			loading = false
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

	fetchData()

	return {
		onSubmit,
		formInline,
		tableData,
		formSize,
		onAdd,
		modal,
		ruleForm,
		rules,
		flowOptions,
		page,
		handleCurrentChange,
		handleClick
	}
},
})
</script>
