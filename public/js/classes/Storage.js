class Storage {
    static getData(key) {
        const item = sessionStorage.getItem(key);
        if(!item) return [];
        return JSON.parse(item);
    }
    
    static setData(key, value) {
        if(key === '' || value === '') return;
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
}