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
  open(request, response) {
    caches.open(CACHE.cacheName).then((cache) => {
      cache.put(request, response);

      console.log(cache);
console.log(`123`)

        //the request argument can be a USVString, a URL object, or a Request object
        //the options argument is optional. It is an object with 3 properties
        let options = {
          ignoreSearch: true, 
          ignoreMethod: true, 
          ignoreVary: false, 
        };
        cache
          .match(request, options)
          .then((response) => {

            if(! response.ok) throw new Error(response.statusText);
            return response.text();
            return response.json();

          })
        .then((obj) => {
            //do something with the contents of the Response that was pulled from the Cach)
            console.log(`sucessfully retrive data ${obj}`)
          }) 
          .catch((err) => {
            console.warn(err.message);
          });

  




      
    });

  },


//cache.delete



};
export default CACHE;






