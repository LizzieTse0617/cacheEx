const CACHE = {
  cacheVersion: 1,
  cacheName: null,
  userName: 'lizzie0617',
  init() {
    CACHE.cacheName = `filecache-${CACHE.userName}-${CACHE.cacheVersion}`;
  },

  //CACHE-step
  open(req, res) {
    //step1 - create response objects first

    caches.open(CACHE.cacheName).then((cache) => {
      cache.put(req, res);
    });
  },

  match(req) {
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
            console.log(`${contents}+ 123`);
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

            let no_file = document.getElementById('no_file');
            if (no_file) {
              no_file.classList.add('hidden');
            }

            item_list.innerHTML = '';
            li.setAttribute('id', `${fileId}`);

            if (fileId) {
              CACHE.displayFileContents(contents, fileName, fileId);
            }
          })
          .catch(console.warn);

        //extract the url here
        listOfRequests.forEach((request) => {
          let url = new URL(request.url);
          return url;
        });
      });
  },

  displayFileContents(contents, fileName, fileId) {
    let previewBtn = document.getElementById(`${fileId}-text`);

    previewBtn.addEventListener('click', (ev) => {
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

  deleteFile(fileId) {
    let delete_btn = document.getElementById(`${fileId}-delete`);
    delete_btn.addEventListener('click', (ev) => {
      CACHE.deleteCACHE_HTML(fileId);
    });
  },

  deleteCACHE_HTML(fileId) {
    caches
      .open(CACHE.cacheName)
      .then((cache) => {
        return cache.delete(`/itemlist-${fileId}`);
      })
      .then(() => {
        console.log(`${fileId} is deleted`);
        document.getElementById(`${fileId}`).innerHTML = '';
        document.getElementById('data_display_fileName').innerHTML = '';
        document.getElementById('data_display_content').innerHTML = '';
      });
  },
};
export default CACHE;
