<script setup lang="ts">

interface Student {
    name: string
    age: number
}

defineProps<{
    processIng: boolean,
    student: Student
}>()

</script>

<template>
    <div>
        <div>
            {{ processIng }}
        </div>
        
        <div>
            {{ student.age + "-" + student.name }}
        </div>
    </div>
</template>