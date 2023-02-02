import CACHE from './cache.js';

const APP = {
  itemList: [],
  activeLI: '',
  init() {
    //page loaded
    document.getElementById('itemForm').addEventListener('submit', APP.addItem);
    document.getElementById('btnItem').addEventListener('click', APP.addItem);
    document
      .getElementById('btnList')
      .addEventListener('click', APP.saveListAsFile);
    //access the cache
    CACHE.init('lizzie');
    //then display files
    //and then show all the current files
  },
  addItem(ev) {
    //add an item to the list
    ev.preventDefault();
    let item = document.getElementById('gItem').value;
    item = item.trim();
    if (!item) return;
    APP.itemList.push(item);
    APP.displayList(CACHE.cacheName);

    console.log('step1 - btn activtate - additem');
  },
  displayList() {
    //populate the list of items
    let list = document.getElementById('item_list');
    if (APP.itemList.length === 0) {
      list.innerHTML = 'No Items currently.';
    } else {
      list.innerHTML = APP.itemList
        .map((txt) => {
          return `<li>${txt}</li>`;
        })
        .join('');
      console.log('step2 - additem to list');
    }
    document.getElementById('gItem').value = '';
  },
  saveListAsFile(ev) {
    ev.preventDefault();
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

    APP.saveFile();
  },

  saveFile() {
    console.log('step3 - file goes to cache');
    //create a url or request object

    //save the file in the Cache
    //when file has been saved,
    //clear the displayed list
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
    //show the file names from the cache as a list.
    //each list item contains a span for the file name plus a button for deleting the file from the cache
    //displayFileContents(ev);
    //deleteFile(ev);
  },

  displayFileContents() {
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
