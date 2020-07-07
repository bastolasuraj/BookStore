export interface AxiosConfig{
    headers?:{ [key:string]:string }
    url:string
    method:'POST'|'GET'|'PUT'|'DELETE'|'PATCH'
    data?:any
    params?:any
}