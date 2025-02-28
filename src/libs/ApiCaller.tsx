import axios from "axios"

interface ApiResponse {
    status: string
}

export const postApiCaller = async (endPonit: string, body: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const url = baseUrl + endPonit
    const headers = {
        'Content-Type': 'application/json'
    }
    const response: ApiResponse = await axios.post(url, body, { headers })
    return response
}
export const getApiCaller = async (endPonit: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const url = baseUrl + endPonit
    const headers = {
        'Content-Type': 'application/json'
    }
    const response: ApiResponse = await axios.get(url, { headers })
    return response
}