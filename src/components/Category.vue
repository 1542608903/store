<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="sidebar">
        <el-menu class="menu" router unique-opened>
          <el-menu-item :index="'/productlist/' + category.classifyId" v-for="category in categories"
            :key="category.classifyId" class="menu-item-text">
            <span>
              {{ category.classifyName }}
            </span>
          </el-menu-item>
        </el-menu>

        <div class="copyright">
          版权所有 &copy; {{ copyright }}
        </div>
      </el-aside>

      <el-main>
        <router-view :key="$route.fullPath"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      activeMenu: '',
      copyright: "版权所有 14组"
    };
  },

  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      let that = this
      this.$axios.get('/api/classify')
        .then(response => {
          that.categories = response.data
          // console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    },
  },
};
</script>
 
<style scoped>
.common-layout {
  height: 700px;
  /* 设置布局容器高度为视口高度 */
  display: flex;
  /* 使用 flex 布局 */
}

.sidebar {
  display: flex;
  flex-direction: column;
  /* 设置侧边栏内容垂直排列 */
}

.sidebar .el-menu {
  flex-grow: 1;
  /* 设置菜单占满剩余空间 */
}

.copyright {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
  text-align: center;
}

.category {
  display: flex;
  height: 100%;
}

.menu {
  height: 100%;
  text-align: center;
}

.content {
  flex: 1;
  padding: 20px;
}

.menu-item-text {
  display: flex;
  justify-content: center;
  align-items: center;
}</style>
  