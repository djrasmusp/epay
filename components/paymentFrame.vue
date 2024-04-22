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
        'amount': "10095",
        'currency': "DKK",
        'windowstate': "4",
        'paymentcollection': "1",
        'iframeheight': "600",
        'iframewidth': "600",
        'accepturl': "http://www.epay.dk"
      });
      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)
</script>
