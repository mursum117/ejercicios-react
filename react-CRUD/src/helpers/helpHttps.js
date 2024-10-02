export const helpHttp = () =>{
    let customFetch = (endpoint, options) =>{
        let defaultHeaders = {
            accept : "application/json"
        };

        let controller = new AbortController();

        options.signal = controller.signal;
        options.method = options.method || "GET";
        options.headers = options.headers ? {...defaultHeaders, ...options.headers} : defaultHeaders
        options.body = JSON.stringify(options.body)|| false

        if(!options.body) delete options.body

        setTimeout(() => {
            controller.abort()
        }, 3000);


        return fetch(endpoint, options)
            .then((res) => res.ok ? res.json():Promise.reject({
                err: true,
                status: res.status || "00",
                statusText: resizeTo.statusText || "Ocurrió un error"
            }))
            .catch((err) => err);
    };

    const get = (url, options = {}) =>{
        return customFetch(url, options);
    }

    let post = (url, options = {}) =>{
        options.method = "POST";
        return customFetch(url, options);
    }

    let put = (url, options = {}) =>{
        options.method = "PUT";
        return customFetch(url, options);
    }

    let del = (url, options = {}) =>{
        options.method = "DELETE";
        return customFetch(url, options);
    }

    return {
        get, post, put, del
    };
}
