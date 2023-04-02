<template>
    <div class="container bg-white">
        <div class="ct">
            <div class="lft">

            </div>

            <div class="rgt">
                <el-button size="large" type="primary" class="ml-2" @click="showForm">添加站点</el-button>
            </div>
        </div>

        <div class="mt-10">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="host" label="代理站点" width="280" />
                <el-table-column prop="url" label="URL"  />
                <el-table-column fixed="right" label="操作" width="180">
					<template #default="scope">
                        <el-popconfirm
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            :icon="InfoFilled"
                            icon-color="#626AEF"
                            :title="scope.row.status == '启用' ? '确认停用?' : '确认启用?'"
                            @confirm="changeStatus(scope.row.id)"
                        >
                            <template #reference>
                                <el-button link type="primary" size="small">{{ scope.row.status == '启用' ? '停用' : '启用'  }}</el-button >
                            </template>
                        </el-popconfirm>
					</template>
				</el-table-column>
            </el-table>

        </div>
        <el-dialog v-model="modal.show" :title="modal.title" width="30%" align-center>

            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                size="large"
                status-icon
            >
                <el-form-item label="代理站点" prop="host">
                    <el-input v-model="ruleForm.host" />
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input v-model="ruleForm.url" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                <el-button class="el-button--large" @click="modal.show = false">取消</el-button>
                <el-button class="el-button--large" type="primary" @click="addVmess">添加</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
<style lang="scss" scoped>
.ct { display: flex;  justify-content: space-around;}
.lft { display: flex; justify-content: left; flex: 1;}
.rgt { display: flex; justify-content: end;}
.el-select-v2__placeholder { text-align: left; }
</style>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

const tableData = [
  {
    host: '站点AAAA',
    url: 'https://xx.bb.com',
  },
  {
    host: '站点BBBB',
    url: 'https://xx.bb.com',
  },
  {
    host: '站点CCCC',
    url: 'https://xx.bb.com',
  },
]

const ruleForm = reactive({
    host: '',
    url: '',
})

const rules = reactive<FormRules>({
    host: [
        { required: true, message: '请输入代理名称', trigger: 'blur' },
        { min: 3, message: '代理名称最少3个字符', trigger: 'blur' },
    ],
    url: [
        {
            required: true,
            message: '请输入代理url',
            trigger: 'blur',
        },
    ],
})


const modal = reactive({
    title: '添加代理站点',
    content: '好长的内容哦~~~',
    show: false
})

const showForm = () => {
    modal.show = true
}

const addVmess = () => {
    console.log('add vmess')
}

const changeStatus= (id: number) => {
    console.log('add vmess')
}



</script>
