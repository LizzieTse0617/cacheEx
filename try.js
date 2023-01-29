//file for all the cache functionality
// caches.open()
// caches.keys()
// caches.delete()
// caches.matchAll()
// cache.put()
// cache.match()
const CACHE = {
    cacheVersion: 1,
    cacheName: null, //this gets set in the init() method
    userName: 'lizzie0617', //replace this with your own username
    init() {

      //cacheName = key name for our cache
      CACHE.cacheName = `filecache-${CACHE.userName}-${CACHE.cacheVersion}`;
    },
  
    open(req, res) {
      //cache open to access cache first and then use put method - adding to cache
      caches.open(CACHE.cacheName).then((cache) => {
        cache.put(req, res);
        // console.log(req.url);
        return req.url;
      });
  
      //calling matchMethod
      CACHE.matchMethod(req, res);
    },
  
    matchMethod(req, res) {
      //cache open to access cache first and then use match method -- find the match
      caches.open(CACHE.cacheName).then((cache) => {
        let options = {
          ignoreSearch: true, //ignore the queryString
          ignoreMethod: true, //ignore the method - POST, GET, etc
          ignoreVary: false, //ignore if the response has a VARY header
        };
        cache
          .match(req, options)
          .then((res) => {
            console.log('123');
            if (!res.ok) throw new Error(res.statusText);
            res.json();
            // response.blob()
            // response.text()
          })
          .then((obj) => {
            //do something with the contents of the Response that was pulled from the Cache
          })
          .catch((err) => {
            console.warn(err.message);
          });
      });
    },
  
    //cache.delete
  };
  