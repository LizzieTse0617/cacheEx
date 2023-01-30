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
    caches
      .match(req)
      .then((matchResponse) => {
        if (!matchResponse) throw new Error('bad file request');
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

      .then((listOfRequests) => {
        caches
          .match(req)
          .then((matchResponse) => {
            if (!matchResponse) throw new Error('bad file request');
            //just like fetch   .json     .blob()    .text()    .arrayBuffer()
            return matchResponse.text();
          })
          .then((contents) => {
            let file_list = document.getElementById('file_list');

            //split & display correct file name
            let reachingURL = req.url;
            console.log(reachingURL);
            let arr = reachingURL.split('-');
            let li = document.createElement('li');
            li.innerHTML = `<li><span>data-${arr[1]}.json</span><button data-ref="data-162342934893.json" class="delete">Delete File</button></li>`;
            file_list.appendChild(li);
            document.getElementById('no_file').classList.add('hidden');

            //file_list.innerHTML += contents;

            //console.log(contents);
            //this content will be used later to display inside file content while clicking button
          })
          .catch(console.warn);

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
