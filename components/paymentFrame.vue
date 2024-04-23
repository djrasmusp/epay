<template>
<div >
  {{ hashOrder() }}
  {{ useRuntimeConfig().public.md5key }}
<div ref="paymentFrame" id="paymentFrame"/>
</div>
</template>

<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";
import { Md5 } from "ts-md5";

const paymentFrame = ref();
const orderId = Math.floor(Math.random() * 99999999)

useScriptTag(
    '//ssl.ditonlinebetalingssystem.dk/integration/ewindow/paymentwindow.js',

    () => {
      const paymentwindow = new PaymentWindow({
        'merchantnumber': useRuntimeConfig().public.merchantNumber,
        'amount': 500,
        'language': 1,
        'currency': "DKK",
        'subscription': 1,
        'subscriptiontype': "recurring",
        'subscriptionname': 'My sub',
        'windowstate': 2,
        'paymentcollection': 1,
        'lockpaymentcollection': 1,
        'instantcapture': 1,
        'ownreceipt': 1,
        //'accepturl': useRuntimeConfig().public.siteUrl + "/api/createOrder",
        'accepturl': useRuntimeConfig().public.siteUrl,
        'mobilecssurl': useRuntimeConfig().public.siteUrl + "/mobile.css?v=" + orderId,
        'hash': hashOrder(),
      })

      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)

function hashOrder() : string {

  const paymentWindowRequest = {
    'merchantnumber': useRuntimeConfig().public.merchantNumber,
    'amount': 500,
    'language': 1,
    'currency': "DKK",
    'subscription': 1,
    'subscriptiontype': "recurring",
    'subscriptionname': 'My sub',
    'windowstate': 2,
    'paymentcollection': 1,
    'lockpaymentcollection': 1,
    'instantcapture': 1,
    'ownreceipt': 1,
    'accepturl': useRuntimeConfig().public.siteUrl,
    'mobilecssurl': useRuntimeConfig().public.siteUrl + "/mobile.css?v=" + orderId,
  };

  let hashString = "";
  for (const [key, value] of Object.entries(paymentWindowRequest)) {
    console.log(value)
    hashString += value
  }

  console.log(hashString)

  return Md5.hashStr(hashString + useRuntimeConfig().public.md5key)
}

</script>

<style scoped>
:deep(iframe) {
  width: 100%;
  background: white;
}
</style>
