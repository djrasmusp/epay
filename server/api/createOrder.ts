export default defineEventHandler(async (event) => {
    const urlObj = getRequestURL(event)



    if(urlObj.searchParams.has('orderid')){
        const orderId = urlObj.searchParams.get('orderid')
        await sendRedirect(event, '/kvittering/' + orderId, 301)
    }
})
