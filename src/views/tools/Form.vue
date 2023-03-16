<template>
		<div class="container page bg-white">
				<el-form :model="formInline" class="demo-form-inline" :size="formSize">
					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="Approved by">
								<el-input v-model="formInline.user" placeholder="Approved by" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="Activity zone">
								<el-select v-model="formInline.region" placeholder="Activity zone">
									<el-option label="Zone one" value="shanghai" />
									<el-option label="Zone two" value="beijing" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item>
								<el-button type="primary" @click="onSubmit">Query</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="date" label="Date" width="180" />
					<el-table-column prop="name" label="Name" width="180" />
					<el-table-column prop="address" label="Address" />
				</el-table>
  </div>
</template>
<style scoped>

</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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

		return {
			onSubmit,
			formInline,
			tableData,
			formSize
		}
	},
})
</script>
