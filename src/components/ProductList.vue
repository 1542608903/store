<template>
    <div class="product-container">
        <el-card class="product-card" @click="goToProductDetail(product.id)" v-for="product in products" :key="product.id">
            <div class="product-image">
                <img :src="iURL + product.coverImage" alt="Product Image">
            </div>
            <div class="product-info">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-price">￥{{ product.price }}</p>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            classifyId: null,
            products: [],
            iURL: 'http://localhost:8080/images/'
        }
    },
    mounted() {
        this.classifyId = this.$route.params.classifyId;
        this.getClassifyById()
    },
    watch: {
        $route(to, from) {
            // 在路由变化时执行刷新列表的操作
            this.getClassifyById();
        }
    },
    methods: {
        getClassifyById() {
            this.$axios.get(`/api/productByClassifyId/${this.classifyId}`)
                .then(response => {
                    // 请求成功处理逻辑
                    this.products = response.data
                })
                .catch(error => {
                    // 请求失败处理逻辑
                    console.error(error);
                });
        },
        goToProductDetail(productId) {
            this.$router.push(`/detail/${productId}`);
        },

    }
}
</script>

<style scoped>
.product-container {
    /* 设置容器高度 */
    width: 100%;
    height: 100%;
}
.product-container {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
}
.product-card {
    width: 180px;
    height: 250px;
    margin: 5px;
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
