<script setup lang="ts">
import type { Contributor } from '@/type'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import ContributorsService from '@/services/ContributorsService'
import  ContributorsCard  from "../components/ContributorsCard.vue";


const contributors: Ref<Array<Contributor>> = ref([])

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
    ContributorsService.getContributors(3, 1).then((response) => {
    console.log(response)
    contributors.value = response.data
  })
})

</script>


<template>
  <main class="container">
    <ContributorsCard v-for="contributor in contributors" :key="contributor.studentId" :contributor="contributor"></ContributorsCard>
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
