<script setup  lang="ts">
import type { Student } from '@/type'
import type { PropType } from 'vue';

defineProps({
    student: {
        type: Object as PropType<Student>,
            require:true
    }
})
</script>
<template>
    <div v-if="student">
    <p>{{ student.name }}  {{ student.surname }}</p>
    <p>{{ student.comment }}</p>
</div>

</template>
