<template>
    <div class="profile">
        <el-card class="profile-card">
            <div class="profile-info">
                <div class="profile-avatar">
                    <img :src="iURL + user.userImage" alt="头像" />
                </div>
                <div class="profile-details">
                    <div class="profile-name">{{ user.name }}</div>
                    <div class="profile-age">年龄：{{ user.sex }}</div>
                    <div class="profile-age">年龄：{{ user.age }}</div>
                    <div class="profile-address">
                        地址：{{ user.address }}
                        <el-button type="text" icon="el-icon-edit" @click="showEditDialog">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>

        <el-dialog v-model="dialogVisible" title="编辑地址" width="400px" @close="cancelEdit">
            <el-form label-position="top">
                <el-form-item label="地址">
                    <el-input v-model="editAddress" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取消</el-button>
                <el-button type="primary" @click="saveAddress">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            user: [],
            dialogVisible: false,
            editAddress: "",
            iURL: 'http://localhost:8080/images/',
        };
    },
    mounted() {
        this.getTokenUser();
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
                    this.user = response.data;
                })
                .catch(error => {
                    // 处理错误
                });
        },
        getUpdateUser(){
        
        },
        showEditDialog() {
            this.editAddress = this.user.address;
            this.dialogVisible = true;
        },
        saveAddress() {
            this.user.address = this.editAddress;
            this.dialogVisible = false;
            this.$axios.put(`api/update/${this.user.id}`,this.user)
            .then((res)=>{
                console.log(res);
            }).catch((error)=>{
                console.log(error);
            })
        },
        cancelEdit() {
            this.dialogVisible = false;
        },
    },
};
</script>
  
<style scoped>
.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.profile-card {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.profile-info {
    display: flex;
    align-items: center;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-details {
    flex-grow: 1;
}

.profile-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.profile-age,
.profile-address {
    margin-bottom: 5px;
}
</style>
  