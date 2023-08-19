<script setup lang="ts">
import  TeacherCard  from "../components/TeacherCard.vue";
import type { Teacher } from '@/type'
import TeacherService from '@/services/TeacherService'
import type { AxiosResponse } from 'axios';
import { ref, type Ref, watchEffect, computed } from 'vue'

const teachers: Ref<Array<Teacher>> = ref([])
  const totalTeacher = ref<number>(10)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const pageSize = ref(6) //Defualt page size

watchEffect (() => {
  TeacherService.getTeachers(pageSize.value, props.page)
  .then((response: AxiosResponse<Teacher[]>) => {
    teachers.value = response.data
    totalTeacher.value = response.headers['x-total-count']
  })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalTeacher.value / pageSize.value)
  return props.page.valueOf() < totalPages
})
</script>a

<template>
  
  <main class="events">
    <div class="container">
    <TeacherCard v-for="teacher in teachers" :key="teacher.teacherID" :teacher="teacher"></TeacherCard>
  </div>
  <div class="flex"></div>
    <div class="pagination flex justify-between items-center mt-8">
      <RouterLink 
        :to="{ name: 'teachers', query: {page: page - 1}}" 
        rel="prev" 
        v-if="page != 1" 
        class="btn btn-blue">
        Prev Page
      </RouterLink>  

      <RouterLink 
        :to="{ name: 'teachers', query: {page: page + 1}}" 
        rel="next" 
        v-if="hasNextPage" 
        class="btn btn-blue">
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
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-blue {
  background-color: rgb(251, 221, 239);
  color: white;
}

.btn-blue:hover {
  background-color: #9370DB;
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
