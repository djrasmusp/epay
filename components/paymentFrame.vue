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
        'mobile': 2,
        'accepturl': "https://epay.rsmsp.dk/api/createOrder"
      });
      paymentwindow.append('paymentFrame');
      paymentwindow.open();
    }
)
</script>
