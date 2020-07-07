class StorageService {
    static set(key: string, data: any): void {
        sessionStorage.setItem(key, data)
    }

    static get(key: string): any {
        sessionStorage.getItem(key)
    }

    static delete(key: string): void {
        sessionStorage.removeItem(key)
    }

    static clear(): void {
        sessionStorage.clear()
    }
}

export default StorageService