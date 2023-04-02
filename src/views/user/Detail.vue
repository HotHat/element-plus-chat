<template>
    <div class="container bg-white">
        <div class="ct">
            <div class="lft">
                <el-text>用户ID: <el-text type="primary">Title</el-text></el-text>
                <el-divider direction="vertical" content-position="center" style="height:2em " />
                <el-text>邮箱: <el-text type="primary"> 288283@mail.com</el-text></el-text>
            </div>

            <div class="rgt">
                <el-button size="large">编辑</el-button>
                <el-button size="large" type="warning" class="ml-2" @click="showForm">过期</el-button>
                <el-button size="large" type="primary" class="ml-2" @click="showForm">添加服务器</el-button>
            </div>
        </div>

        <div class="mt-10">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="host" label="主机" width="180" />
                <el-table-column prop="uuid" label="UUID"  />
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
                <el-form-item label="主机" prop="flow">
                        <el-select-v2
                            v-model="ruleForm.count"
                            placeholder="流量"
                            :options="flowOptions"
                        />
                </el-form-item>
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
    host: '172.82.23.18',
    uuid: 'Tom',
  },
  {
    host: '2016-05-03',
    uuid: 'Tom',
  },
  {
    host: '2016-05-03',
    uuid: 'Tom',
  },
]

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

const modal = reactive({
    title: '这里是标题',
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
