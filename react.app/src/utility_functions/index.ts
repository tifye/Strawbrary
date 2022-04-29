export const getCookie = (name): string | null => {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    else return null;
};

export const setCookie = (name: string, value: any) => {
    document.cookie = name + '=' + value + '; path=/';
};

export const setLibraryItemsOrderByCoookie = (value: string) => {
    setCookie('libraryItemsOrder', value);
};

export const getLibraryItemsOrderByCookie = () => {
    const cookie = getCookie('libraryItemsOrder');
    if (cookie) {
        return cookie;
    }
    return 'name';
};
