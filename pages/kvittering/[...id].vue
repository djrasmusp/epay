<template>
  <div>
    <h2>Kvittering</h2>
    <strong>Weborder</strong>: {{ orderId }}<br>
    <nuxt-link to="/">Tilbage til epay</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import type {RouteLocationNormalizedLoaded} from "vue-router";

const orderId: RouteLocationNormalizedLoaded = useRoute().params.id[0]
</script>

<style scoped>

</style>
