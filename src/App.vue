<template>
  <el-config-provider namespace="el">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  components: {
  },
  setup() {
    
  },
})
</script>


<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}
</style>
