import {Md5} from "ts-md5";
import type {LocationQuery} from "vue-router";

export const useHashEpay = (parameters : Record<string, string | number> | LocationQuery):string => {
    if(Object.hasOwn(parameters,'hash')){
        delete parameters.hash
    }

    let hashString = "";
    for (const [key, value] of Object.entries(parameters)) {
        hashString += value
    }

    return Md5.hashStr(hashString + useRuntimeConfig().public.md5key)
}
