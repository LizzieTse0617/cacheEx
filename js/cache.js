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
  userName: "lizzie0617", //replace this with your own username
  init() {
    //
    //cacheName = key name for our cache
    CACHE.cacheName = `filecache-${CACHE.userName}-${CACHE.cacheVersion}`;
    // caches
    //   .open(CACHE.cacheName)
    //   .then((cache) => {
    //     let request = new Request(`./data/${APP.itemList}`);
    //     let response = new Response(file, {
    //       status: 200,
    //       statusText: "Ok",
    //     });
    //     cache.put(request, response);
    //   })
    //   .catch(console.warn);
  },
  open(req, res) {
    caches.open(CACHE.cacheName).then((cache) => {
      cache.put(req, res);
    });
  },



//cache.delete



};
export default CACHE;






