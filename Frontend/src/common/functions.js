export function inArray(needle, haystack = []) {
    if (haystack.length > 0) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] === needle) return true;
        }
    }
    return false;
}

export function getBaseApi() {
    // The API were setup on a linux Server under the commented domain but also works on localhost
    // return "https://api.linos2508.com:4444"
    return "http://localhost:5000";
}