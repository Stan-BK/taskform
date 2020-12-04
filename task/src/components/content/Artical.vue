<template>
  <div id="artcial" style="height: calc(70vh)">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!-- <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column> -->
      <el-table-column
        prop="filename"
        label="文件名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="选项"
        show-overflow-tooltip>
        <template slot-scope="scope"><el-button type="primary" @click="editArtical(scope)">编辑</el-button></template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="open" :style="isShow" type="danger">删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: this.$store.state.artical,
        multipleSelection: [],
        isShow: 'display:none'
      }
    },
    mounted () {
      this.init ()
    },
    watch: {
      multipleSelection (newName) {
        if (newName.length != 0) {
          this.isShow = 'display:inline-block'
        } else {
          this.isShow = 'display:none'
        }
      }
      // 'this.$store.state.artical' () {
      //   this.tableData = this.$store.state.artical
      // }
    },
    methods: {
      init () {
        this.isShow = 'display:none'
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      editArtical (scope) {
        this.$router.push({
          path: '/edit',
          query: {
            id: scope.$index
          }
        })
      },
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let articalList = []
          for (let i of this.multipleSelection) {
            articalList.push(i.id)
          }
          this.$store.dispatch('confirmDeleteArtical',articalList).then(() => {
            this.tableData = this.$store.state.artical
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
          }).catch(() => {
            this.$message({
            type: 'info',
            message: '删除失败！'
          });  
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>