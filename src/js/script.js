/* global GreenAudioPlayer*/

import {templates, select } from '/js/settings.js';

// Pages switch

const allPageBtn = document.querySelectorAll(select.pageButtons);

for (let pageBtn of allPageBtn) {
  pageBtn.addEventListener('click', function () {
    // console.log('this', this);
    if (!this.classList.value.includes('active')) {

      for (let pageBtn of allPageBtn) {
        pageBtn.classList.remove('active');
        const allPages = document.querySelectorAll(select.pages);
        for (let page of allPages) {
          page.classList.remove('active-page');
        }
      }
      this.classList.add('active');
      document.querySelector('.' + this.id).classList.add('active-page');
    }
  });
}

// API

const url = '//localhost:3131' + '/' + 'songs';

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (parsedResponse) {

    //GET DATA FROM API

    for (let oneSong of parsedResponse) {
      // console.log('one', oneSong);
      dataPayload.push(oneSong);
      const songId = oneSong.id;
      const songTitle = oneSong.title;
      // const songAuthor = oneSong.author;
      const songName = oneSong.filename;
      const songFileName = oneSong.filename.toLowerCase();
      const songCategories = oneSong.categories;
      const songRanking = oneSong.ranking;

      // GET DATA FOR FORMAT AUTHOR NAME

      const nameSongAndAuthor = songFileName.replaceAll('_', ' ').replace('.mp3', '').replace('-', ' ');
      const songTitleLowerCase = songTitle.toLowerCase();
      const authorName = nameSongAndAuthor.split(songTitleLowerCase).join('').trim().toUpperCase();


      // PUSH DATA TO dataContent
      prepareTemplate(songId, authorName, songTitle, songCategories, songRanking, songName);

    }
  })
  .then(function () {
    GreenAudioPlayer.init({
      selector: '.home .player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  });

let arrData = [];
console.log('arrdata', arrData);


const prepareTemplate = function (id, author, title, categories, ranking, songName) {

  const generatedData = { id: id, author: author, title: title, categories: categories, ranking: ranking, songName:songName };

  const pushGeneratedData = templates.player(generatedData);

  document.querySelector(select.wrapper).innerHTML += pushGeneratedData;

  arrData.push(pushGeneratedData);
};

function discoverMusic () {
  const data = arrData[Math.floor(Math.random() * arrData.length)];
  document.querySelector(select.containerDiscover).innerHTML += data;

  GreenAudioPlayer.init({
    selector: '.discover .player', // inits Green Audio Player on each audio container that has class "player"
    stopOthersOnPlay: true
  });
}

document.getElementById('discover').addEventListener('click', () => {
  document.querySelector(select.containerDiscover).innerHTML = '';
  discoverMusic();
});

//SEARCH//

const dataPayload = [];

const input = document.querySelector(select.searchInput);
const searchBtn = document.querySelector(select.searchBtn);

const searchSong = function () {
  console.log('klik');

  let keyWord = input.value;
  let filteredSongs = dataPayload.filter(song => song.title.toLowerCase().includes(keyWord.toLowerCase()));
  console.log('filteredSong', filteredSongs);

  if (filteredSongs.length == 0) {
    alert('Brak piosenek');
  }


  const prepareTemplate = function (id, author, title, categories, ranking, songName) {

    const generatedData = { id: id, author: author, title: title, categories: categories, ranking: ranking, songName:songName};

    const pushGeneratedData = templates.search(generatedData);


    // Prepare word 'song'

    document.querySelector(select.containerSearch).innerHTML += pushGeneratedData;
    document.querySelector(select.result).style.display = 'block';
    document.querySelector(select.resultNumber).textContent = filteredSongs.length;

    let wordSong;

    if (filteredSongs.length > 1) {
      wordSong = ' songs...';
    } else if (filteredSongs.length == 1) {
      wordSong = ' song...';
    }

    document.querySelector(select.wordSong).textContent = wordSong;
  };



  for (let filterSong of filteredSongs) {
    const songId = filterSong.id;
    const songTitle = filterSong.title;
    const songName = filterSong.filename;
    const songFileName = filterSong.filename.toLowerCase();
    const songCategories = filterSong.categories;
    const songRanking = filterSong.ranking;

    // GET DATA FOR FORMAT AUTHOR NAME

    const nameSongAndAuthor = songFileName.replaceAll('_', ' ').replace('.mp3', '').replace('-', ' ');
    const songTitleLowerCase = songTitle.toLowerCase();
    const authorName = nameSongAndAuthor.split(songTitleLowerCase).join('').trim().toUpperCase();

    prepareTemplate(songId, authorName, songTitle, songCategories, songRanking, songName);


  }
  console.log('filtersong', filteredSongs);

  GreenAudioPlayer.init({
    selector: '.search .player', // inits Green Audio Player on each audio container that has class "player"
    stopOthersOnPlay: true
  });
};

searchBtn.addEventListener('click', function () {
  if (document.querySelector(select.searchInput).value != '') {
    searchSong();
  } else alert('Wpisz tytuł');
});


