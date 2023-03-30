<template>
	<div class="container bg-white">
		<el-row justify="start">
			<el-col :span="20">
				<el-input class="filter" v-model="query" placeholder="" @input="onQueryChanged" />
			</el-col>
			<el-col :span="4">
				<el-button type="primary" class="tree-add">添加分类</el-button>
			</el-col>
		</el-row>
		<div class="tree-head">
			
		</div>
		<div class="tree-body">
			
			<el-tree
				ref="treeRef"
				:data="data"
				:props="props"
				default-expand-all
				:filter-node-method="filterMethod"
			>
					<template #default="{ node, data }">
						<span class="custom-tree-node">
							<span>{{ node.label }}</span>
							<span v-if="data.children === undefined">
								<a @click="append(node)" class="node-add"> 添加 </a>
								<a @click="edit(data)" class="node-edit"> 编辑 </a>
								<a class="node-remove"  @click="remove(node, data)">删除</a>
							</span>
						</span>
					</template>
			</el-tree>
		</div>
	</div>
  
</template>
<style lang="scss" scoped>
.filter {
	display: flex;
	width: 300px;
}
.tree-add {

}
.tree-head {
	padding: 20px;
	display: flex;
	justify-content: end;
	padding-left: 0;
}
.tree-body {
	width: 500px;
}
.node-add {
	color: var(--el-color-primary);
}
.node-edit {
	color: var(--el-color-warning);
}
.node-remove {
	color: var(--el-color-danger);
	margin-left: 8px
}
</style>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElTreeV2, ElTree } from 'element-plus'
import  Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): Tree[] => {
  let id = 0
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      }
    })
}

const query = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const data = createData(4, 5, 5)
const props = {
  value: 'id',
  label: 'label',
  children: 'children',
}

const onQueryChanged = (query: string) => {
  // TODO: fix typing when refactor tree-v2
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  treeRef.value!.filter(query)
}
const filterMethod = (query: string, node: Node) => {
  return node.label!.includes(query)
}

const append = (data: Tree) => {
	console.log(data)
}

const edit = (data: Tree) => {
	console.log(data)
}

const remove = (node: Node, data: Tree) => {
	console.log(node)
	console.log(data)
}


</script>
