import ZillowBySwongF from "./ZillowBySwongF";

const host = process.env.RAPID_API_SWONGF_ZILLOW_HOST
const apiKey = process.env.RAPID_API_KEY

if(!host) throw new Error('RAPID_API_ZILLOW_HOST is not defined')
if(!apiKey) throw new Error('RAPID_API_KEY is not defined')

const zillowBySwongF = new ZillowBySwongF(host, apiKey)
export { zillowBySwongF }