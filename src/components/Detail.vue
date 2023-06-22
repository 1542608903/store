<template>
    <div class="product-detail">
        <div class="product-image">
            <el-image :src="iURL + product.coverImage"></el-image>
        </div>
        <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <el-text class="product-description" tag="b">介绍:{{ product.detail }}</el-text>

            <div class="product-price-container">
                <span class="product-price">价格:</span>
                <el-text class="product-price-value" tag="b">￥{{ product.price }}</el-text>
            </div>
            <div>
                <span class="product-stock">库存:{{ product.stock }}</span>
            </div>
            <el-input-number v-model="quantity" :min="1" :max="10" size="small" style="margin-top: 10px;" />
            <div class="product-buttons">
                <el-button type="primary" @click="addToCart"><el-icon size="18">
                        <ShoppingCart />
                    </el-icon>购物车</el-button>
                <el-button type="success"><el-icon size="18" @click="createOrder">
                        <WalletFilled />
                    </el-icon>立即购买</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            productId: this.$route.params.id,
            quantity: 1,
            userId: null,
            product: [],
            iURL: 'http://localhost:8080/images/',
        }
    },
    mounted() {
        this.getProductById()
        this.getTokenUser()
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
                    // 处理响应数据
                })
                .catch(error => {
                    // 处理错误
                });
        },
        getProductById() {
            this.$axios.get(`/api/products/${this.productId}`)
                .then(response => {
                    // 请求成功处理逻辑
                    this.product = response.data
                })
                .catch(error => {
                    // 请求失败处理逻辑
                    console.error(error);
                });
        },
        addToCart() {

            this.$axios.post('/api/addCart', {
                productId: this.productId,
                userId: this.userId,
                quantity: this.quantity
            })
                .then(response => {
                    // 请求成功处理逻辑
                    console.log(response.data);
                    ElMessage({
                        message: '加入购物车成功！',
                        type: 'success',
                    })
                    this.$router.push('/cart')
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
                total: this.getTotalPrice(), //总价格
                orderDate: null,
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
    }

}
</script>


<style scoped>
.product-detail {
    display: flex;
    align-items: center;
    width: 500px;
    margin: 200px auto;

}

.product-image {
    flex: 0 0 200px;
    margin-right: 20px;
    border: 1px solid var(--el-border-color);
}

.product-info {
    flex: 1;
    padding-left: 10px;
    border-left: 1px solid var(--el-border-color);
    border-radius: 12;
}

.product-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.product-description {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
}

.product-price-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
}

.product-price {
    /* font-size: 18px; */
    margin-right: 5px;
}

.product-price-value {
    font-size: 22px;
    color: #e4393c;
}

.product-stock {
    font-size: 10px;
    margin-bottom: 10px;
}

.product-buttons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}
</style>