<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useCounterStore } from '../stores/counter'
import Mycomponent from '@/components/Mycomponent.vue'
import { useMouse } from '@/js/mouse'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'


const { count } = useCounterStore()
const { x, y } = useMouse()

const enale = ref(false)
const router = useRouter()

const state = reactive({ count: 0 })

const now = computed(() => Date.now())

const {username, loginOut} = useUserStore()

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
