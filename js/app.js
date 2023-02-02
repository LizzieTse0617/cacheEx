import CACHE from './cache.js';

const APP = {
  itemList: [],
  activeLI: '',
  init() {
    document.getElementById('itemForm').addEventListener('submit', APP.addItem);

    document.getElementById('btnItem').addEventListener('click', APP.addItem);

    document
      .getElementById('btnList')
      .addEventListener('click', APP.saveListAsFile);

    //step1
    CACHE.init();

    //step2 (functoin addItem & displayList)
    APP.addItem(CACHE.cacheName);

    //let the HTML disseapear in box2
    APP.saveFile();

    //also insert CACHE.open(req,res)
    APP.saveListAsFile();

    APP.displayFiles();
  },

  //DOM-step1 - adding item into cache
  addItem(ev) {
    let item = document.getElementById('gItem').value;
    item = item.trim();
    if (!item) return;
    APP.itemList.push(item);
    APP.displayList(CACHE.cacheName);
  },

  displayList() {
    let list = document.getElementById('item_list');
    if (APP.itemList.length === 0) {
      list.innerHTML = 'No Items currently.';
    } else {
      list.innerHTML = APP.itemList
        .map((txt) => {
          return `<li>${txt}</li>`;
        })
        .join('');
    }
    document.getElementById('gItem').value = '';
  },

  saveListAsFile(ev) {
    //ev.preventDefault();
    let json = JSON.stringify(APP.itemList);
    let file = new File([json], 'isTheJsonFile', {
      type: 'text/plain',
      lastModified: Date.now(),
    });
    let today = Date.now();
    let singleCache = `itemlist-${today}`;
    let req = new Request(`${singleCache}`);
    let res = new Response(file, {
      status: 200,
      statusText: 'Ok',
    });

    CACHE.open(req, res);
    CACHE.second(req, res);
  },

  saveFile() {
    let list = document.getElementById('item_list');
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    //and then update the list of files
  },
  getFiles() {
    //display all the files in the cache
    //loop through response matches and display the file names
  },
  displayFiles() {
    //CACHE.second();
    console.log();
  },

  displayFileContents(req) {
    //ev.preventDefault();
    //get the list item from the file
    /* 
    //and show its contents in the <pre><code> area
  },
  deleteFile(ev) {
    ev.preventDefault();

    //*** */
    //user has clicked on a button in the file list
    //delete the file from the cache using the file name
    //remove the list item from the list if successful
    //clear the code contents
  },
};
document.addEventListener('DOMContentLoaded', APP.init);
