import {backendUrl} from "../config";

export async function backend(url: string, auth: any, data?: any) {
    const authString = encodeURIComponent(JSON.stringify(auth))

    const init: RequestInit = {
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "X-Auth": authString,
        }
    }
    if (data) {
        init.method = "POST"
        init.body = JSON.stringify(data)
    }

    const res = await fetch(backendUrl + url, init)
    if (res.status >= 400)
        throw new Error(await res.text())
    return await res.json()
}
