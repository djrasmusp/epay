<template>
<div >
  <pre>{{ $route.query.hash }}</pre>
  <pre>{{ hashValidator(returnQueries) }}</pre>
  <pre>{{ returnQueries }}</pre>
<div ref="paymentFrame" id="paymentFrame"/>
</div>
</template>

<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";
import { Md5 } from "ts-md5";

const paymentFrame = ref();
const orderId = Math.floor(Math.random() * 99999999)

const returnQueries = useRoute().query

const paymentParameter = {
  'merchantnumber': useRuntimeConfig().public.merchantNumber,
  'amount': 10000,
  'language': 1,
  'currency': "DKK",
  'subscription': 1,
  'windowstate': 2,
  'paymentcollection': 1,
  'lockpaymentcollection': 1,
  'instantcapture': 1,
  'ownreceipt': 1,
  'accepturl': useRuntimeConfig().public.siteUrl,
  'mobilecssurl': useRuntimeConfig().public.siteUrl + "/mobile.css?v=" + orderId,
}

paymentParameter.hash = hashOrder(paymentParameter)

useScriptTag(
    '//ssl.ditonlinebetalingssystem.dk/integration/ewindow/paymentwindow.js',

    () => {
      const paymentwindow = new PaymentWindow(paymentParameter)

      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)

function hashOrder(parameters) : string {

  let hashString = "";
  for (const [key, value] of Object.entries(parameters)) {
    hashString += value
  }


  return Md5.hashStr(hashString + useRuntimeConfig().public.md5key)
}

function hashValidator(parameters : object) : string {
  if(parameters?.hash){
    delete parameters.hash
  }

  let hashString = "";
  for (const [key, value] of Object.entries(parameters)) {
    hashString += value
  }


  return Md5.hashStr(hashString + useRuntimeConfig().public.md5key)
}

</script>

<style scoped>
:deep(iframe) {
  width: 100%;
  background: white;
}
</style>
