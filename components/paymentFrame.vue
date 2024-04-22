<template>
<div ref="paymentFrame" id="paymentFrame" style="width:100%;" />
</template>

<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";

const paymentFrame = ref();

const { scriptTag } = useScriptTag(
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
        'windowstate': "4",
        'paymentcollection': "1",
        'instantcapture': 1,
        'ownreceipt': 1,
        'accepturl': useRuntimeConfig().public.siteUrl + "/api/createOrder",
        'mobilecssurl' : useRuntimeConfig().public.siteUrl + "/desktop.css"
      })

      paymentwindow.on('completed', function(params){ alert('The Payment Window was completed: ' + params); });
      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)
</script>
