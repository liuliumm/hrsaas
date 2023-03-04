// 组织架构--department：部门
<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-tree :data="list" :props="defaultProps" default-expand-all>
          <!-- 用了一个行列布局 -->
          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width:100"
          > 
            <el-col>
              <span>{{ data.name }}</span>
              <!-- <span>江苏传智播客教育科技股份有限公司</span> -->
            </el-col>
            <!-- // span：跨度，span设置为4，说明这里一列占4份，一行默认是24份 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <!-- <el-col>负责人</el-col> -->
                <el-col>
                  <!-- 下拉菜单 element -->
                  <el-dropdown>
                    <!-- //这个span是下拉菜单默认显示的内容 -->
                    <!-- <span> -->
                      <!-- //i的class使用的是element的icon图标  -->
                      <!-- 操作 -->
                      <!-- <i class="el-icon-arrow-down" />
                    </span> --> 
                    <!-- dropdownmenu是具体的下拉菜单选项，通过具名插槽dropdown来指定 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- <el-dropdown-item>添加子部门</el-dropdown-item> -->
                    </el-dropdown-menu> 
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row> 
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        label: "", // 设置显示文本的字段名称
        children: "", //设置子节点的字段名称
      },
    };
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>