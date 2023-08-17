<script setup lang="ts">
import type { Student } from '@/type'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import StudentService from '@/services/StudentService'


const students: Ref<Array<Student>> = ref([])

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
  StudentService.getStudents(10, 1).then((response) => {
    console.log(response)
    students.value = response.data
  })
})

</script>


<template>
  {{students}}
  <main class="container">
    <StudentCard v-for="student in students" :key="student.studentid" :student="student"></StudentCard>
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
