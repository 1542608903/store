<template>
  <div class="cart-container">
    <h2 class="cart-title">购物车</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <el-empty description="购物车为空" />
    </div>
    <div v-else>
      <div class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <div class="item-image">
            <img :src="iURL + item.coverImage" alt="Product Image">
          </div>
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">￥{{ item.price }}</p>
          </div>
          <div class="item-actions">
            <el-input-number @click="updateCart(item)" v-model="item.quantity" :min="1" size="small"></el-input-number>
            <el-button @click="removeItem(item)" type="danger" plain size="small"><el-icon>
                <DeleteFilled />
              </el-icon></el-button>
          </div>
        </div>
      </div>
      <div class="cart-footer">
        <div class="cart-total">总计：￥{{ getTotalPrice() }}</div>
        <el-button class="checkout-button" type="primary" round @click="createOrder">去结算</el-button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      iURL: 'http://localhost:8080/images/',
      cartItems: [],
      userId: null,
    };
  },
  created() {
    this.getTokenUser()
    console.log("created");
  },
  mounted() {
    setTimeout(() => {
      // 在延迟时间后执行的操作
      this.getCartListByuserId()
    }, 300); // 延迟时间，单位为毫秒
  },
  methods: {
    getTokenUser() {
      const token = localStorage.getItem('token')
      // 发送带有 Token 的请求
      this.$axios.get('/api/user/info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          this.userId = response.data.id;
          console.log(this.userId);
          // 处理响应数据
        })
        .catch(error => {
          // 处理错误
        });
    },
    removeItem(item) {
      let productId = item.id
      this.$axios.delete(`/api/delete/cart/${productId}`)
        .then(() => {
          this.getCartListByuserId()
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getTotalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    getCartListByuserId() {
      this.$axios.get(`/api/cartList/${this.userId}`)
        .then(response => {
          // 请求成功处理逻辑
          this.cartItems = response.data
          console.log(response.data);
        })
        .catch(error => {
          // 请求失败处理逻辑
          console.error(error);
        });
    },
    createOrder() {
      // const productIds = this.cartItems.map(product => product.id);
      // 构建要发送的订单数据
      const orderData = {
        userId: this.userId, //替换为实际的用户ID
        total:this.getTotalPrice(), //总价格
        orderDate:null,
        orderProducts: this.cartItems.map(product => {
          return {
            productId: product.id,
            quantity: product.quantity,
            price: product.price
          };
        })
      }
      console.log(orderData);
      // 发送插入订单的请求
      this.$axios.post("/api/create/order", orderData)
        .then(response => {
          // 处理成功响应
          console.log(response.data);
          this.getCartListByuserId()
          // 在这里可以执行其他操作，如更新页面数据等
        })
        .catch(error => {
          // 处理错误响应
          console.error(error);
          // 在这里可以显示错误提示或执行其他错误处理逻辑
        });
    },
    updateCart(item) {
      const cartItems = item
      console.log(cartItems);
            this.$axios.post('/api/addCart',{
                productId:cartItems.id,
                userId:this.userId,
                quantity:cartItems.quantity,
              })
                .then(response => {
                    // 请求成功处理逻辑
                    console.log(response.data);
                    ElMessage({
                        message: '加入购物车成功！',
                        type: 'success',
                    })
                })
                .catch(error => {
                    // 请求失败处理逻辑
                    console.error(error);
                });
        }

  },
};
</script>
  
<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #999999;
}

.cart-items {

  border-radius: 4px;
  padding: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px black solid;
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.item-info {
  flex-grow: 1;
}

.item-name {
  font-size: 16px;
  margin-bottom: 5px;
}

.item-price {


  margin-bottom: 5px;
  font-size: 15px;
  color: #e4393c;
}

.item-actions {
  display: flex;
  align-items: center;
}

.el-input-number {
  margin-right: 10px;
  width: 80px;
}

.cart-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}

.cart-total {
  font-size: 18px;
  margin-right: 20px;
}

.checkout-button {
  font-size: 16px;
}
</style>
  