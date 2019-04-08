<template>

  <div class="h-pagination pt-15">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total , sizes , prev, pager, next , jumper"
      :total="total"
      :current-page="currentPage"
      :page-size="size"
      :page-sizes="pageSizes"
      :pager-count="pagerCount">
      
    </el-pagination>
  </div>

</template>

<script>

export default {
  name: "HPagination",
  data(){
    return {}
  },
  props: {
    total: {  //数据总数，支持 .sync
      type: Number,
      default: 0,
      required: true
    },
    currentPage: { //当前页，支持 .sync
      type: Number,
      default: 1
    },
    size: {  //当前每页显示数据数，支持 .sync
      type: Number,
      default: 10
    },
    pageSizes: { //每页显示个数选择器的选项设置
      type: Array,
      default(){
        return [10,20,30,40,50]
      }
    },
    pagerCount: { //页码按钮的数量，当总页数超过该值时会折叠
      type: Number,
      default: 5
    }
  },
  methods: {
    handleCurrentChange(index){  //页码变化时

      index = index <= 0 ? 1 : index;

      this.$emit("current-change" , index)
      this.$emit("update:currentPage", index)
    },
    handleSizeChange(size){  //每页显示条数变化时
      this.$emit("size-change" , size)
      this.$emit("update:size" , size)
    }
  }
}
</script>

