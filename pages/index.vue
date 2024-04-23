<template>
  <div style="background: #EEE">
    <h1>Epay payment</h1>
    {{ useRuntimeConfig().public.siteUrl + "/desktop.css"  }}
    <payment-frame />
  </div>
</template>

<script setup lang="ts">

import PaymentFrame from "~/components/paymentFrame.vue";
</script>
