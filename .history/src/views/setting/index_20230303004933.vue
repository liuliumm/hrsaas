// 公司设置
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="角色名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteRole(row.id)"
                  >删除</el-button
                >
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                :total="total"
                layout="prev,pager,next"
                :current-page="page"
                :page-sizes="pagesize"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="formData.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  v-model="formData.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getRoleList, deleteRole } from "@/api/setting";
export default {
  data() {
    return {
      list: [], // 承接数组
      page: 1,
      pagesize: [10],
      total: 0,
      // page: {
      //   // 放置页码及相关数据
      //   page: 1, // 也有团队第1页的页码是0
      //   pagesize: 10,
      //   total: 0 // 记录总数
      // }
    };
  },
  created() {
    this.getRoleLists(); // 获取角色列表
  },
  methods: {
    async deleteRole(id) {
      //  提示
      try {
        await this.$confirm("确认删除该角色吗");
        // 只有点击了确定 才能进入到下方
        await deleteRole(id); // 调用删除接口
        this.$message.success("删除角色成功");
        this.getRoleList(); // 重新加载数据
      } catch (error) {
        console.log(error);
      }
    },
    async getRoleLists() {
      const { total, rows } = await getRoleList({
        page: this.page,
        pagesize: this.pagesize,
      });
      this.total = total;
      this.list = rows;
      // console.log(total);
      // console.log(rows);
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page = newPage; // 将当前页码赋值给当前的最新页码
      this.getRoleLists();
    },
  },
};
</script>

<style>
</style>