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
    caches.open(CACHE.cacheName).then((cache) => {
      cache.put(req, res);
    });

    //let req = new Request(`itemlist-${APP.itemList}`);
    caches
      .match(req)
      .then((matchResponse) => {
        if (!matchResponse) throw new Error('bad file request');
        console.log('found');
        //just like fetch   .json     .blob()    .text()    .arrayBuffer()
        return matchResponse.text();
      })
      .then((contents) => {
        document.body.innerHTML += contents;
      })
      .catch(console.warn);

    caches
      .open(CACHE.cacheName)
      .then((cache) => {
        return cache.keys();
      })

      //listOfRequests = all your file name
      .then((listOfRequests) => {
        //doing match method here
        //extract the url here
        listOfRequests.forEach((request) => {
          let url = new URL(request.url);
          console.log(url.pathname);
        });
      });
  },

  //cache.delete
};
export default CACHE;
