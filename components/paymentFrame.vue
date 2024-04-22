<template>
<div ref="paymentFrame" id="paymentFrame" />
  <pre>isEpay Loaded : {{ isEpayLoaded }}</pre>
</template>

<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";

const paymentFrame = ref();
const isEpayLoaded = ref(false)

const { scriptTag } = useScriptTag(
    '//ssl.ditonlinebetalingssystem.dk/integration/ewindow/paymentwindow.js',

    () => {
      isEpayLoaded.value = true
      const paymentwindow = new PaymentWindow({
        'merchantnumber': useRuntimeConfig().public.MerchantNumber,
        'amount': "500",
        'language': 1,
        'currency': "DKK",
        'subscription': "1",
        'subscriptiontype': "recurring",
        'subscriptionname': 'My sub',
        'windowstate': "2",
        'paymentcollection': "1",
        'instantcapture': 1,
        'ownreceipt': 1,
        'accepturl': "https://epay.rsmsp.dk/?23"
      });
      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)
</script>
