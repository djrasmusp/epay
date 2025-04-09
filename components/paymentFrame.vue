<template>
<div >
<div ref="paymentFrame" id="paymentFrame"/>
</div>
</template>

<script setup lang="ts">
import {useHashEpay} from "~/composables/useHashEpay";

const paymentFrame = ref();
const orderId = Math.floor(Math.random() * 99999999)

const paymentParameter : Record<string, string | number | Record<string, string | number>> = {
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
  backgroundcolor: "FFF",
  cssurl: useRuntimeConfig().public.siteUrl + '/desktop2.css',
  mobilecssurl: useRuntimeConfig().public.siteUrl + "/mobile.css?v=" + orderId,
  phonenumber: '12345678',
}

paymentParameter.hash = useHashEpay(paymentParameter)

useScriptTag(
    '//ssl.ditonlinebetalingssystem.dk/integration/ewindow/paymentwindow.js',

    () => {
      const paymentwindow = new PaymentWindow(paymentParameter)

      paymentwindow.on('completed', function(params){
        console.log(Object.fromEntries(new URLSearchParams(params)));
      });
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
