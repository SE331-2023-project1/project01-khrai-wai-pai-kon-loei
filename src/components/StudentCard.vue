<script setup lang="ts">
import type { Student } from "@/type";
import type { PropType } from "vue";

const props = defineProps({
  student: {
    type: Object as PropType<Student>,
    require: true,
  },
});
</script>

<template>
  <article>
    <div class="card-wrapper">
      <div class="card-body">
        <img
          class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
          :src="student?.profileimage"
        />
        <h2>
          {{ student?.name }} {{ student?.surname }}
          <span>({{ student?.studentid }})</span>
        </h2>
        <p class="card-email">{{ student?.courselist }}</p>
        <p>{{ student?.comment }} {{ student?.teacherID }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card-wrapper {
  padding: 20px;
  width: 350px;
  cursor: pointer;
  border: 1px solid #39495c;
  /* margin-bottom: 18px; */
  border-radius: 8px;
}

.card-wrapper:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.student-link {
  color: #2c3e50;
  text-decoration: none;
}

.card-body h2 {
  margin: 0 0 12px 0;
  font-size: 1.6rem;
  font-weight: bold;
}

.card-body h2 > span {
  font-size: 16px;
  color: #818181;
}

.card-body .card-email {
  margin: 0 0 12px 0;
  color: #818181;
}

.card-body p {
  margin: 0 0 12px 0;
}
</style>
