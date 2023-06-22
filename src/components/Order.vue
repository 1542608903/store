<template>
    <div>
        <el-table :data="orders" border stripe style="width: 100%">
            <el-table-column prop="id" label="订单号" fixed ></el-table-column>
            <el-table-column prop="userId" label="用户id"></el-table-column>
            <el-table-column prop="orderDate" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价格">
                <template v-slot="{ row }">
                    ￥{{ row.total }}
                </template>
            </el-table-column>
            <el-table-column label="订单详情">
                <template v-slot="{ row }">
                    <el-table v-if="row.orderProducts && row.orderProducts.length > 0" :data="row.orderProducts" border>
                        <el-table-column prop="productId" label="商品id"></el-table-column>
                        <el-table-column prop="quantity" label="数量"></el-table-column>
                        <el-table-column prop="price" label="单价">
                            <template #default="{ row }">
                                ￥{{ row.price }}
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {

            row: null,
            userId: null,
            orders: [], // 订单列表数据
            dialogVisible: false, // 订单详情弹窗可见性
            selectedOrder: null, // 选中的订单数据
            scope: null
        }
    },
    mounted() {
        setTimeout(() => {
            // 在延迟时间后执行的操作
            this.getOrderList();
        }, 300); // 延迟时间，单位为毫秒
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
                .then((res) => {
                    this.userId = res.data.id;
                    console.log(this.userId);
                    // 处理响应数据
                })
                .catch(error => {
                    // 处理错误
                });
        },
        getOrderList() {
            this.$axios.get(`/api/orders/${this.userId}`)
                .then(response => {
                    this.orders = response.data;
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);

                })
        },
        showOrderDetails(orders) {
            this.selectedOrder = orders.id; // 设置选中的订单数据
            this.dialogVisible = true; // 打开订单详情弹窗
        }
    }
}
</script>