<script setup lang="ts">
import { ref, reactive, computed, onMounted, unref } from 'vue'
import { useCounterStore } from '../stores/counter'
import Mycomponent from '@/components/Mycomponent.vue'
import { useMouse } from '@/js/mouse'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import useHttp from '../utils/http'


const { count } = useCounterStore()
const { x, y } = useMouse()

const enale = ref(false)
const router = useRouter()

const state = reactive({ count: 0 })
const id = ref(1)
const url = computed(() => {
  return "https://jsonplaceholder.typicode.com/todos/" + id.value
})

const { data: todo, error, loding, fethcData } = useHttp<Todo>(url, 'get', null)

function handleSwitchData() {
  fethcData()
}



const now = computed(() => Date.now())

const { username, loginOut } = useUserStore()

interface User {
  name?: string
}

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}



const handleLoginOut = () => {
  loginOut()
  router.push('/login')
}

const objAttr = {
  a: 1,
  b: 2
}
</script>

<template>
  <main>
    home
    <div>
       <h1>
        当前用户:{{ username }}
        <button @click="handleLoginOut">退出</button>
      </h1>
    </div>
    <hr/>
    <div>
      <span>todo:</span>
      <button @click="handleSwitchData">切换</button>
      <select v-model="id">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <template v-if="loding">
        加载中
      </template>
      <template v-if="!loding">
        <template v-if="error">
          加载出错
        </template>
        <template v-else>
          <div>{{ 'id:' + todo?.id }}</div>
          <div>{{ 'title:' + todo?.title }}</div>
          <div>{{ 'completed:' + todo?.completed }}</div>
          <div>{{ 'userId:' + todo?.userId }}</div>
        </template>
      </template>
    </div>
    <hr/>
    <Mycomponent :process-ing="true" :student="{ name: 'zhangsan', age: 18 }" />
    <div>{{ count }}</div>
    <div>
      <button :disabled="enale" v-bind="objAttr" @click="enale = !enale">按钮</button>
    </div>
    <div>{{ state.count }}</div>
    <div>{{ now }}</div>
    <div>
      {{ x }} - {{ y }}
    </div>
  </main>
</template>
