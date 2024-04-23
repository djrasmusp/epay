<template>
<div >
<div ref="paymentFrame" id="paymentFrame"/>
</div>
</template>

<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";

const paymentFrame = ref();

useScriptTag(
    '//ssl.ditonlinebetalingssystem.dk/integration/ewindow/paymentwindow.js',

    () => {
      const paymentwindow = new PaymentWindow({
        'merchantnumber': useRuntimeConfig().public.merchantNumber,
        'amount': "500",
        'language': 1,
        'currency': "DKK",
        'subscription': "1",
        'subscriptiontype': "recurring",
        'subscriptionname': 'My sub',
        'windowstate': 2,
        'backgroundcolor:': 'A7A7A7',
        'paymentcollection': "1",
        'instantcapture': 1,
        'ownreceipt': 1,
        'accepturl': useRuntimeConfig().public.siteUrl + "/api/createOrder",
        'mobilecssurl': useRuntimeConfig().public.siteUrl + "/mobile.css?v=" + crypto.randomUUID(),
      })

      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)
</script>

<style scoped>
:deep(iframe) {
  border: pink 1px solid;
  width: 100%;
  background: white
}
</style>
