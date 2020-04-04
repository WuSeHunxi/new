export async function getProvinces() {
    return await fetch("/api/local").then(resp => {
        resp.json()
    })
}

export async function getCities(parentId) {
    const url = `/api/local?parentId=${parentId}`;
    return await fetch(url).then(resp => {
        resp.json()
    })
}