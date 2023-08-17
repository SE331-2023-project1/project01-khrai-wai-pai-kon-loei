<script setup lang="ts">
import type { Contributor } from "@/type";
import type { PropType } from "vue";

const props = defineProps({
    contributor: {
    type: Object as PropType<Contributor>,
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
          :src="contributor?.profileimage"
        />
        <h2>
          {{ contributor?.name }} {{ contributor?.surname }}
          <span>({{ contributor?.studentId }})</span>
        </h2>
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
