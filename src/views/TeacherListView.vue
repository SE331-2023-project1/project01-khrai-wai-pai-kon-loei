<script setup lang="ts">
import type { Student } from '@/type'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import TeacherService from '@/services/TeacherService'
import  TeacherCard  from "../components/TeacherCard.vue";


const teachers: Ref<Array<Student>> = ref([])

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
  // limit:{
  //   type: Number,
  //   required: true
  // }
})

watchEffect(() => {
  TeacherService.getTeachers(20, 1).then((response) => {
    console.log(response)
    teachers.value = response.data
  })
})

</script>


<template>
  <!-- {{students}} -->
  <main class="container">
    <TeacherCard v-for="teacher in teachers" :key="teacher.teacherid" :teacher="teacher"></TeacherCard>
  </main>
</template>

<style scoped>
.container {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  row-gap: 3rem;
}

@media (max-width: 1149px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 859px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
