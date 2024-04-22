<template>
  <div>
    <h2>Kvittering</h2>
    <strong>Weborder</strong>: {{ route.params.id[0] }}
  </div>
</template>

<script setup lang="ts">
import type {RouteLocationNormalizedLoaded} from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute()
</script>

<style scoped>

</style>
