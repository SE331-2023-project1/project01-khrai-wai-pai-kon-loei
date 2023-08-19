<script setup lang="ts">
import StudentCard from "../../components/StudentCard.vue";
import type { Student } from "@/type";
import StudentService from "@/services/StudentService";
import type { AxiosResponse } from "axios";
import { ref, type Ref, watchEffect, computed } from "vue";
import NProgress from "nprogress";
import { useRouter } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";

const students: Ref<Array<Student>> = ref([]);
const totalStudent = ref<number>(10);
const router = useRouter();
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
});
const pageSize = ref(6); //Defualt page size

// watchEffect (() => {
//   StudentService.getStudents(pageSize.value, props.page)
//   .then((response: AxiosResponse<Student[]>) => {
//     students.value = response.data
//     totalStudent.value = response.headers['x-total-count']
//   })
// })

StudentService.getStudents(props.limit, props.page)
  .then((response: AxiosResponse<Student[]>) => {
    students.value = response.data;
    totalStudent.value = response.headers["x-total-count"];
  })
  .catch(() => {
    router.push({ name: "NetworkError" });
  });

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page);

  StudentService.getStudents(2, toPage)
    .then((response: AxiosResponse<Student[]>) => {
      students.value = response.data;
      totalStudent.value = response.headers["x-total-count"];
      next();
    })
    .catch(() => {
      next({ name: "NetworkError" });
    });
});

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudent.value / pageSize.value);
  return props.page.valueOf() < totalPages;
});
</script>

<template>
  <main class="events">
    <div class="container">
      <StudentCard
        v-for="student in students"
        :key="student.studentid"
        :student="student"
      ></StudentCard>
    </div>
    <div class="flex"></div>
    <div class="pagination flex justify-between items-center mt-8">
      <div>
        <RouterLink
          :to="{ name: 'students', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          class="btn btn-blue group relative overflow-hidden"
        >
          <!-- make button responsive -->
          <span class="absolute -start-full transition-all group-hover:start-4">
            <svg
              class="h-5 w-5 rtl:rotate-180"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </span>
          <span class="text-sm font-bold transition-all group-hover:ms-8">
            Prev Page
          </span>
        </RouterLink>
      </div>

      <div>
        <RouterLink
          :to="{ name: 'students', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          class="btn btn-blue group relative overflow-hidden"
        >
          <!-- make button responsive -->
          <span class="absolute -end-full transition-all group-hover:end-4">
            <svg
              class="h-5 w-5 rtl:rotate-180"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <span class="text-sm font-bold transition-all group-hover:me-8">
            Next Page
          </span>
        </RouterLink>
      </div>
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
  width: 340px;
  align-items: baseline;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
.pageSize {
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
  background-color: #9370db;
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
