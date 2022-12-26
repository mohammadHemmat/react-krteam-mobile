import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const serverAPI = {
    lastEnterExitState: async function (cid, cancel = false) {
        const response = await api.request({
            url: `/EnterExit/last/${cid}`,
            method: "GET",
            // retrieving the signal value by using the property name
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
    companyLocation: async function (cid, cancel = false) {
        const response = await api.request({
            url: `/companyLocation/company/${cid}`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
    enterExit: async function (cid, lid, type, cancel = false) {
        var data = JSON.stringify({
            "company": cid,
            "location": lid,
            "type": type
        });
        alert(data)
        const response = await api.request({
            url: `/EnterExit`,
            method: "POST",
            data: data,
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

}
// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(serverAPI)