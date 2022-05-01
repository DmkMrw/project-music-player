/* global GreenAudioPlayer*/

const templates = {
  player: Handlebars.compile(document.getElementById('template-player').innerHTML),
  discover: Handlebars.compile(document.getElementById('template-player-discover').innerHTML),
};

// Pages switch

const allPageBtn = document.querySelectorAll('.page-btn');

for (let pageBtn of allPageBtn) {
  pageBtn.addEventListener('click', function () {
    console.log('this', this);
    if (!this.classList.value.includes('active')) {

      for (let pageBtn of allPageBtn) {
        pageBtn.classList.remove('active');
        const allPages = document.querySelectorAll('.page');
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
    // console.log('parsed', parsedResponse);

    //GET DATA FROM API

    for (let oneSong of parsedResponse) {
      // console.log('one', oneSong);

      const songId = oneSong.id;
      const songTitle = oneSong.title;
      // const songAuthor = oneSong.author;
      const songName = oneSong.filename;
      const songFileName = oneSong.filename.toLowerCase();
      const songCategories = oneSong.categories;
      const songRanking = oneSong.ranking;

      songsArr.push(songName);
      // console.log(songAuthor, songCategories);


      // GET DATA FOR FORMAT AUTHOR NAME

      const nameSongAndAuthor = songFileName.replaceAll('_', ' ').replace('.mp3', '').replace('-', ' ');
      const songTitleLowerCase = songTitle.toLowerCase();
      const authorName = nameSongAndAuthor.split(songTitleLowerCase).join('').trim().toUpperCase();


      // PUSH DATA TO dataContent
      dataContent(songId, authorName, songTitle, songCategories, songRanking, songName);

    }
  })
  .then(function () {
    GreenAudioPlayer.init({
      selector: '.gap-example', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  });


const dataContent = function (id, author, title, categories, ranking, songName) {

  const generatedData = { id: id, author: author, title: title, categories: categories, ranking: ranking, songName:songName };

  const pushGeneratedData = templates.player(generatedData);

  document.querySelector('.wrapper').innerHTML += pushGeneratedData;
  // console.log('songName', songName);
};

let songsArr = [];
console.log(songsArr);

const randomSong = function (array) {
  console.log('array.length', array.length);
  let index =Math.floor(Math.random()*array.length);
  console.log('index', index);
  console.log('arrIndex', array[index]);
  return array[index];
};

randomSong(songsArr);
