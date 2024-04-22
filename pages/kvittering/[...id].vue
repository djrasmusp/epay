<template>
  <div>
    <pre>{{ route }}</pre>
  </div>
</template>

<script setup lang="ts">
import type {RouteLocationNormalizedLoaded} from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute()
const orderId = route.query.id
</script>

<style scoped>

</style>
