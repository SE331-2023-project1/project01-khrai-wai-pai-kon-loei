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
    <span class="block text-center mt-4 mb-2 font-semibold text-lg">Contributor</span>
    <div class="card-wrapper">
      <div class="card-body flex items-center justify-center flex-col text-center">
        <img
          class="pic w-24 h-24 object-cover mb-2 rounded-full shadow-lg"
          :src="contributor?.profileimage"
        />
        <h2 class="text-lg font-semibold mb-1">
          {{ contributor?.name }} {{ contributor?.surname }}
          <span class="text-gray-600 block text-sm"
            >({{ contributor?.studentId }})</span
          >
        </h2>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card-wrapper {
  padding: 30px;
  width: 350px;
  cursor: pointer;
  border: 1px solid #39495c;
  /* margin-bottom: 18px; */
  border-radius: 8px;
  background-color: rgb(251, 221, 239);
}

/*pic response when mouse hover*/
.card-wrapper .pic {
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.7s ease 0s;
}
.card-wrapper:hover .pic {
  box-shadow: 0 0 0 8px #9b49af;
  transform: scale(0.8);
}

.card-wrapper:hover {
  transform: scale(1.07);
  box-shadow: 0 3px 12px 0 #b32fa5;
  /* box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2); */
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
