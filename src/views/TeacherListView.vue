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
