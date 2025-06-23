const {JSDOM} = require('jsdom');
async function crawlPage(currentURL){
    console.log(`Actively crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399){
            console.log(`error in fetch with status code:${resp.status} on page: ${currentURL}`)
            return
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}]`)
            return
        }

        console.log(await resp.text())
    }
    catch(err){
        console.log(`Error in fetch: ${err.message},n on page ${currentURL}`)
    }
}

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
    crawlPage,
}
