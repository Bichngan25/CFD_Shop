import axiosInstance from "../utils/axiosInstance"

export const subscribeService = {
    subscribes(payload = {}){
        return axiosInstance.post(`/subscribes`, payload)
    },
    subscribeDeal(payload = {}){
        return axiosInstance.post(`subscribes/deals`, payload)
    }

}