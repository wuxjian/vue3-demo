<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

const store = useCounterStore()

function handleClick() {
  store.increment()
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ store.count }}</h2>
    <button @click="handleClick()">+1</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
