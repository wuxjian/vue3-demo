<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const { login } = useUserStore()
const router = useRouter()
const route = useRoute()

const username = ref('')

const handleLogin = async () => { 
  if (!username.value) {
    return
  }
  await login(username.value)
  if (route.query['redirectUrl']) {
    const redirectUrl = route.query['redirectUrl'] as string
    router.replace(redirectUrl)
  } else {
    router.replace('/')
  }
  
}

</script>

<template>
    <div>
        <!-- 创建一个表单 -->
        <form>
            <!-- 创建一个表单标题 -->
            <h1>登录页</h1>
            <!-- 创建一个用户名输入框 -->
            <input type="text" v-model="username" placeholder="请输入用户名" required>
            <!-- 创建一个密码输入框 -->
            <input type="password" name="password" placeholder="请输入密码">
            <!-- 创建一个登录按钮 -->
            <input type="button" value="登录" @click="handleLogin">
        </form>
    </div>
</template>

<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* 设置表单样式 */
form {
    width: 300px;
    border: 1px solid gray;
    padding: 20px;
    border-radius: 10px;
}

/* 设置表单标题样式 */
h1 {
    text-align: center;
}

/* 设置输入框和按钮样式 */
input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
}
</style>