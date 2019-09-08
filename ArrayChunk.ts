function ChunkArray(array, size, action): Promise<any> {
    if (!array) {
        return new Promise((resolve) => {
            resolve([]);
        })
    }
    const chunkedArray = array.slice(0, size);
    if (!chunkedArray.length) {
        return new Promise((resolve) => {
            resolve(array);
        })
    }
    return new Promise((resolve) => {
        Promise.all(chunkedArray.map((item) => {
            action(item);
        })).then(() => {
            resolve([chunkedArray].concat(ChunkArray(array.slice(size, array.length), size, action)))
        });
    })
}