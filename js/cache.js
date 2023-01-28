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

      console.log(response)
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
            //return response.json();

          })
        .then((obj) => {
            //do something with the contents of the Response that was pulled from the Cache
            console.log(`sucessfully retrive data ${obj}`)
            let file_list = document.getElementById('file_list');
            file_list.style.color= 'red';
            let arr = request.url.split('/')
console.log(`${arr[3]}.json`);
          }) 
          .catch((err) => {
            console.warn(err.message);
          });

  




      
    });

  },


//cache.delete



};
export default CACHE;





