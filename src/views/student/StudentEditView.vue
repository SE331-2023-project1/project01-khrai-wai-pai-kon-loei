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
       <p>Edit the event here</p>
</template>
