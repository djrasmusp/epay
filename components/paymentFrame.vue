<template>
<div >
<div ref="paymentFrame" id="paymentFrame"/>
</div>
</template>

<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";
import {useHashEpay} from "~/composables/useHashEpay";
import type {LocationQuery} from "vue-router";

const paymentFrame = ref();
const orderId = Math.floor(Math.random() * 99999999)


const returnQueries : LocationQuery = useRoute().query

const paymentParameter : Record<string, string | number> = {
  merchantnumber: useRuntimeConfig().public.merchantNumber,
  amount: 10000,
  language: 1,
  currency: "DKK",
  subscription: 1, // 1 for create, 2 for update
  windowstate: 2,
  paymentcollection: 1,
  lockpaymentcollection: 1,
  instantcapture: 1,
  ownreceipt: 1,
  accepturl: useRuntimeConfig().public.siteUrl + '/api/createOrder',
  mobilecssurl: useRuntimeConfig().public.siteUrl + "/mobile.css?v=" + orderId,
}

paymentParameter.hash = useHashEpay(paymentParameter)

useScriptTag(
    '//ssl.ditonlinebetalingssystem.dk/integration/ewindow/paymentwindow.js',

    () => {
      const paymentwindow = new PaymentWindow(paymentParameter)

      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    },
    {
      attrs: {
        charset : 'UTF-8',
      }
    }
)


</script>

<style scoped>
:deep(iframe) {
  width: 100%;
  background: white;
}
</style>
