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
      .open(CACHE.cacheName)
      .then((cache) => {
        return cache.keys();
      })
      .then((listOfRequests) => {
        caches
          .match(req)
          .then((matchResponse) => {
            if (!matchResponse) throw new Error('bad file request');

            return matchResponse.text();
          })
          .then((contents) => {
            console.log('step 4 - to be displayed in file list');
            let file_list = document.getElementById('file_list');
            let reachingURL = req.url;
            let arr = reachingURL.split('-');
            let li = document.createElement('li');
            let fileId = `${arr[1]}`;

            let fileName = `${fileId}.json`;
            let newlyJSONfile = `<span id="${fileId}-text">
            data-${fileId}.json</span>`;

            li.innerHTML = `${newlyJSONfile}<button id="${fileId}-delete" class="delete">Delete File</button></li>`;
            file_list.appendChild(li);

            document.getElementById('no_file').classList.add('hidden');

            item_list.innerHTML = '';
            li.setAttribute('id', `${fileId}`);

            if (fileId) {
              CACHE.displayFileContents(contents, fileName, fileId);
            }

            //file_list.innerHTML += contents;
          })
          .catch(console.warn);

        //extract the url here
        listOfRequests.forEach((request) => {
          let url = new URL(request.url);
          return url;
          //console.log(url.pathname);
        });
      });
  },

  displayFileContents(contents, fileName, fileId) {
    let previewBtn = document.getElementById(`${fileId}-text`);

    previewBtn.addEventListener('click', (ev) => {
      console.log('step 6 - find the cache to be and display in HTML');

      let displayFileName = document.getElementById('data_display_fileName');
      displayFileName.innerHTML = `${fileName}`;
      let data_display_content = document.getElementById(
        'data_display_content'
      );

      data_display_content.innerHTML = `${contents.replace(
        /[^a-zA-Z0-9,;\-.!? ]/g,
        ''
      )}`;
    });

    CACHE.deleteFile(fileId);
  },

  //fileId = fileName

  deleteFile(fileId) {
    caches
      .open(CACHE.cacheName)
      .then((cache) => {
        console.log(`step 8 ${cache} - gone already`);
        //return cache.delete(`/itemlist-${fileId}`);
        //如果唔寫(return cache.delete(`/itemlist-${fileId}`);)，就係delete before record, so its probably the order
      })
      .then(() => {
        console.log('step 5- ready to be deleted');
        let delete_btn = document.getElementById(`${fileId}-delete`);
        delete_btn.addEventListener('click', (ev) => {
          console.log('step 7 - found the URL' + `${fileId}`);
          //here, i need to remove it from the innerHTML , like
          //.innerHTML = '';
        });
      });
  },
};
export default CACHE;
