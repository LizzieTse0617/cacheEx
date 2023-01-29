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
    //
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
    //CACHE.matchMethod(req, res);

    caches
      .match(req)
      .then((matchResponse) => {
        if (!matchResponse) throw new Error('bad file request');
        //just like fetch   .json     .blob()    .text()    .arrayBuffer()
        return matchResponse.text();
      })
      .then((contents) => {
        document.body.innerHTML += contents;
      })
      .catch(console.warn);

    return req.url;
  },

  matchMethod(req) {
    //cache open to access cache first and then use match method -- find the match
  },

  //cache.delete
};
export default CACHE;
