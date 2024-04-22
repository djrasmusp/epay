<template>
  <div>
    <h1>Epay payment</h1>
    ASFADS
    {{ useRuntimeConfig().public.siteUrl + "/desktop.css"  }}
    <payment-frame />
  </div>
</template>

<script setup lang="ts">

import PaymentFrame from "~/components/paymentFrame.vue";
</script>
