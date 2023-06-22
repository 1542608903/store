<template>
  <div class="home">

    <div>
      <el-carousel :interval="4000" type="card" height="380px">
        <el-carousel-item v-for="item in image" :key="item">
          <img :src="item.img" style="width: 100%;"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <span>热销<el-icon size="12">
        <ArrowRight />
      </el-icon></span>
    <div>
      <div class="product-container">
        <el-card class="product-card" v-for="product in highestSales" :key="product.id"
          @click="goToProductDetail(product.id)">
          <div class="product-image">
            <img :src="iURL + product.coverImage" alt="Product Image">
          </div>
          <div class="product-info">
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">￥{{ product.price }}</p>
          </div>
        </el-card>
      </div>
    </div>
    <span>新品<el-icon size="12">
        <ArrowRight />
      </el-icon></span>
    <div>
      <div class="product-container">
        <el-card class="product-card" v-for="product in newProducts" :key="product.id"
          @click="goToProductDetail(product.id)">
          <div class="product-image">
            <img :src="iURL + product.coverImage" alt="Product Image">
          </div>
          <div class="product-info">
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">￥{{ product.price }}</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      image: [
        {
          id: 1,
          img: '../../public/phone/09bdcb4c4aaf89ad130198e0746e4049.jpg'
        },
        {
          id: 2,
          img: '../../public/phone/69d4b845cf7409fff4ede9bb31e25643.jpg'
        }, {
          id: 3,
          img: '../../public/phone/7f46857e9876f168ae660dbfb0909169.jpeg'
        },
        {
          id: 4,
          img: '../../public/phone/c66eff8e22a48ded4854017b25cbf631.jpeg'
        }],
      cartItems: {
        productId: null,
        userId: 1,
        quantity: null,
      },
      products: [],
      newProducts: [],
      iURL: 'http://localhost:8080/images/',
      highestSales:[],
    };
  },
  mounted() {
    // this.productList()
    this.newProductList()
    this.getHighestSales()
  },
  methods: {
    productList() {
      this.$axios.get('/api/product/list') // 发送GET请求到指定的API接口
        .then(response => {
          this.products = response.data; // 获取响应数据
        })
        .catch(error => {
          console.error(error);
        });
    },
    newProductList() {
      this.$axios.get('/api/newProduct/list') // 发送GET请求到指定的API接口
        .then(response => {
          this.newProducts = response.data; // 获取响应数据
        })
        .catch(error => {
          console.error(error);
        });
    },
    getHighestSales(){
      this.$axios.get('/api/product/highest-sales') // 发送GET请求到指定的API接口
        .then(response => {
          this.highestSales = response.data; // 获取响应数据
        })
        .catch(error => {
          console.error(error);
        });

    },
    goToProductDetail(productId) {
      this.$router.push(`/detail/${productId}`);
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}

.product-card {
  width: 180px;
  height: 250px;
  margin: 10px;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(0.95);
}

.product-image {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  max-height: 100%;
  max-width: 100%;
}

.product-info {
  text-align: center;
}

.product-name {
  font-size: 16px;
  margin-bottom: 5px;
}

.product-price {
  font-size: 14px;
  color: #e4393c;
}
</style>
