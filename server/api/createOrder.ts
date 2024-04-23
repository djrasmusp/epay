export default defineEventHandler(async (event) => {
    const params : Record<string, string | number> = getQuery(event)
    const hash = params.hash

    if(hash !== useHashEpay(params)){
        throw Error('Invalid Hash')
    }

   await sendRedirect(event, '/kvittering/' + params.orderid, 301)
})

import {useHashEpay} from "~/composables/useHashEpay";
