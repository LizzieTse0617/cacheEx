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
    /*   caches
      .match(req)
      .then((matchResponse) => {
        if (!matchResponse) throw new Error('bad file request');
        return matchResponse.text();
      })
      .then((contents) => {
        document.body.innerHTML += contents;
      })
      .catch(console.warn); */

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
            //I am still in safeList
            //console.log(contents);
            //split & display correct file name
            let reachingURL = req.url;
            let arr = reachingURL.split('-');
            let li = document.createElement('li');

            let fileId = `${arr[1]}`; //32426993269
            let newlyJSONfile = `<span>data-${fileId}.json</span>`;
            li.innerHTML = `${newlyJSONfile}<button id="${fileId}-delete" class="delete">Delete File</button></li>`;
            file_list.appendChild(li);
            document.getElementById('no_file').classList.add('hidden');
            //console.log(contents);
            li.setAttribute('id', `${fileId}`);
            let span = document.getElementsByTagName('span');

            if (span) {
              console.log(`found`);
              console.log(contents);
              //span.addEventListener('click', CACHE.displayContent);
            }

            //let fileBtn = newlyJSONfile;

            /*             document
              .querySelector('span')
              .addEventListener('click', CACHE.displayContent); */

            //file_list.innerHTML += contents;

            //console.log(contents);
            //this content will be used later to display inside file content while clicking button
          })
          .catch(console.warn);

        //extract the url here
        listOfRequests.forEach((request) => {
          let url = new URL(request.url);
          //console.log(url.pathname);
        });
      });
  },

  displayFileContents(ev) {
    //get the list item from the file
    console.log('found span');
    /* ev.preventDefault();
    console.log(newlyJSONfile, content);
    console.log(`${newlyJSONfile},${content}`);
    //console.log('hehe');
    let displayFileName = document.getElementById('data_display_fileName');
    displayFileName.innerHTML = `${newlyJSONfile}`;
    let data_display_content = document.getElementById('data_display_content');
    data_display_content.innerHTML = `${content}`; */

    //and show its contents in the <pre><code> area
  },

  /* displayContent(ev, newlyJSONfile, content) {
    ev.preventDefault();
    console.log(newlyJSONfile, content);
    console.log(`${newlyJSONfile},${content}`);
    //console.log('hehe');
    let displayFileName = document.getElementById('data_display_fileName');
    displayFileName.innerHTML = `${newlyJSONfile}`;
    let data_display_content = document.getElementById('data_display_content');
    data_display_content.innerHTML = `${content}`;
  }, */
  removeContent() {
    let list = document.getElementById('item_list');
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  },

  //cache.delete
};
export default CACHE;
