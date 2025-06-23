function normalizeUrl(urlString) {
    const urlobj = new URL(urlString)
    const hostpath = `${urlobj.hostname}${urlobj.pathname}`
    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1)
    }
    return hostpath
}

module.exports = {
    normalizeUrl
}
 