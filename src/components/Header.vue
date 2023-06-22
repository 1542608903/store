<template>
  <div class="header">
    <div>
      <el-menu mode="horizontal" router style="width: 100%;">
        <div class="header-logo">
          <el-icon size="50"><GoodsFilled /></el-icon>
        </div>
        <el-menu-item index="/home"><el-icon><HomeFilled /></el-icon>首页</el-menu-item>
        <el-menu-item index="/category"><el-icon><Menu /></el-icon>分类</el-menu-item>
        <el-menu-item index="/cart">
          <el-icon><ShoppingCart /></el-icon>购物车
          <span class="cart-count" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
          <div class="cart-content" v-if="showCartContent">
            <ul>
              <li v-for="item in cartItems" :key="item.id">{{ item.name }} - {{ item.price }}</li>
            </ul>
          </div>
        </el-menu-item>
        <el-menu-item index="/order"><el-icon><List /></el-icon>我的订单</el-menu-item>
        <el-menu-item index="/my"><el-icon><UserFilled /></el-icon>个人主页</el-menu-item>
      </el-menu>
    </div>
    <div class="avatar-container" @mouseover="showLogin" @mouseleave="hideLogin">
      <img class="avatar" :src="iURL + user.userImage" alt="Avatar">
      <div v-if="showLoginBox" class="login-box">
        <div class="login-text" @click="goToLogin" v-show="isLogin">登录</div>
        <div class="login-text" @click="outLogin" v-show="isRegister">退出</div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      showLoginBox: false,
      showCartContent: false,
      cartItems: [],
      iURL: 'http://localhost:8080/images/',
      user: [],
      isLogin: true,
      isRegister: false,
    };
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token != "") {
      this.isLogin = false
      this.isRegister = true
    } else {
    }
    this.getTokenUser()

  },
  methods: {
    outLogin() {
      localStorage.removeItem('token');
      this.$router.push('/')

    },
    showLogin() {
      this.showLoginBox = true;
    },
    hideLogin() {
      this.showLoginBox = false;
    },
    goToLogin() {
      this.$router.push('/');
    },
    getTokenUser() {
      const token = localStorage.getItem('token')
      // 发送带有 Token 的请求
      this.$axios.get('/api/user/info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          // 处理错误
        });
    }
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  color: red;
}

.header .el-menu-item {
  font-size: 16px;
  margin-right: 20px;
  position: relative;
}
.header-logo{
  display: flex;
  justify-content: center;
  align-items: center;
}
img{
  width: 120px;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  font-size: 12px;
}

.cart-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px red solid;
}

.cart-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.avatar-container {
  width: 60px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.login-box {
  position: absolute;
  top: 100%;
  right: 0;
  width: 100px;
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
}

.login-text {
  font-size: 14px;
}
</style>
