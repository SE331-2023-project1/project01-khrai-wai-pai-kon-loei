<script setup lang="ts">
import  StudentCard  from "../../components/StudentCard.vue";
import type { Student } from '@/type'
import StudentService from '@/services/StudentService'
import type { AxiosResponse } from 'axios';
import { ref, type Ref, watchEffect, computed } from 'vue'

const students: Ref<Array<Student>> = ref([])
  const totalStudent = ref<number>(10)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const pageSize = ref(6) //Defualt page size

watchEffect (() => {
  StudentService.getStudents(pageSize.value, props.page)
  .then((response: AxiosResponse<Student[]>) => {
    students.value = response.data
    totalStudent.value = response.headers['x-total-count']
  })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudent.value / pageSize.value)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  
  <main class="events">
    <div class="container">
    <StudentCard v-for="student in students" :key="student.studentid" :student="student"></StudentCard>
  </div>
  <div class="flex"></div>
    <div class="pagination">
      <RouterLink :to="{ name: 'students', query: {page: page - 1}}" 
    rel="prev" v-if="page != 1" id="page-prev">
    Prev Page
    </RouterLink>  
    <RouterLink :to="{ name: 'students', query: {page: page + 1}}" 
    rel="next" v-if="hasNextPage" id="page-next">
    Next Page
    </RouterLink>
    </div>
    
    
  </main>
</template>

<style scoped>
.flex {
    @apply flex-1;
    
  }
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
.pageSize{
  padding: 0 0 20px 0;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
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
