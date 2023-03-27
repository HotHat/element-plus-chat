<template>
		<div class="container page bg-white">
				<el-form :model="formInline" class="demo-form-inline" :size="formSize">
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="标题1">
								<el-input v-model="formInline.user" placeholder="Approved by" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="标题2">
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
					<el-table-column prop="date" label="Date" width="180" />
					<el-table-column prop="name" label="Name" width="180" />
					<el-table-column prop="address" label="Address" />
				</el-table>

				<el-dialog v-model="modal.show" :title="modal.title" width="30%" align-center>

						<el-form
							ref="ruleFormRef"
							:model="ruleForm"
							:rules="rules"
							label-width="120px"
							class="demo-ruleForm"
							:size="formSize"
							status-icon
						>
							<el-form-item label="标注" prop="name">
								<el-input v-model="ruleForm.name" />
							</el-form-item>
							<el-form-item label="地址" prop="region">
								<el-input v-model="ruleForm.name" />
							</el-form-item>
							<el-form-item label="端口" prop="count">
								<el-input v-model="ruleForm.name" />
							</el-form-item>
							<el-form-item label="ID" required>
								<el-col :span="19">
									<el-form-item prop="date1">
										<el-input v-model="ruleForm.name" />
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-form-item prop="date2">
										<el-button >生成</el-button>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="最大流量" prop="flow">
									<el-select-v2
										v-model="ruleForm.count"
										placeholder="流量"
										:options="flowOptions"
									/>
							</el-form-item>
							
						</el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button class="el-button--large" @click="modal.show = false">取消</el-button>
                    <el-button class="el-button--large" type="primary" @click="">添加</el-button>
                </span>
            </template>
        </el-dialog>
  </div>
</template>
<style scoped>
	.el-select {
		width: 100%;
	}
	.el-select-v2__placeholder {
		text-align: left;
	}
</style>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'


export default defineComponent({
	setup() {
		const onSubmit = () => {
			console.log('submit!')
		}
		const formInline = ref({
			user: '',
			region: '',
		})
		const tableData = [
			{
				date: '2016-05-03',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
			{
				date: '2016-05-02',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
			{
				date: '2016-05-04',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
			{
				date: '2016-05-01',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
		]

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

		return {
			onSubmit,
			formInline,
			tableData,
			formSize,
			onAdd,
			modal,
			ruleForm,
			rules,
			flowOptions
		}
	},
})
</script>
