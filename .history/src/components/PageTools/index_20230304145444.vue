<template>
  <el-row type="flex" justify="space-between" align="middin">
    <el-col>
      <div class="before">
        <i class="el-icon-info" />
        <slot name="before" />
      </div>
    </el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <slot name="after" />
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
