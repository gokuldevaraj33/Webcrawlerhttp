const { url } = require('inspector');
const {JSDOM} = require('jsdom');

function getURLFromHTML(htmlbody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlbody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){

        if (linkElement.href.slice(0, 1) === '/') {
            // relative url
            try{

            const urlobj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlobj.href)

            }catch(err) {
                console.log(`error with relative url: ${err.message} `)
            }
           
        }
        else {
             // absolute url
            try{

            const urlobj = new URL(linkElement.href)
            urls.push(urlobj.href)

            }catch(err) {
                console.log(`error with absolute url: ${err.message} `)
            }
           

        }
    }
    return urls
    
}


function normalizeUrl(urlString) {
    const urlobj = new URL(urlString)
    const hostpath = `${urlobj.hostname}${urlobj.pathname}`
    if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
        return hostpath.slice(0, -1)
    }
    return hostpath
}

module.exports = {
    normalizeUrl,
    getURLFromHTML,
}
