const templates = {
  player: Handlebars.compile(document.getElementById('template-player').innerHTML)
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
      const songFileName = oneSong.filename.toLowerCase();
      const songCategories = oneSong.categories;
      const songRanking = oneSong.ranking;

      // console.log(songAuthor, songCategories);


      // GET DATA FOR FORMAT AUTHOR NAME

      const nameSongAndAuthor = songFileName.split('_').join(' ').split('.mp3').join('').split('-').join('');
      const songTitleLowerCase = songTitle.toLowerCase();
      const authorName = nameSongAndAuthor.split(songTitleLowerCase).join('').trim().toUpperCase();

      console.log('authorName', authorName);
      // console.log(songTitle.toLowerCase());

      // PUSH DATA TO dataContent
      dataContent(songId, authorName, songTitle, songCategories, songRanking);

      //PUSH DATA TO authorAndTitle
      getCorrectAuthorName(authorName);
    }
  });


const dataContent = function (id, author, title, categories, ranking) {

  const generatedData = { id: id, author: author, title: title, categories: categories, ranking: ranking };

  const pushGeneratedData = templates.player(generatedData);

  document.querySelector('.wrapper').innerHTML += pushGeneratedData;
};


const getCorrectAuthorName = function (author) {
  // console.log('authorName', author);

  const authorTrim = author.trim();

  formatName(authorTrim);
  console.log(formatName(authorTrim));

  function formatName(name) {

    const firstNameAndLastName = name.split(' ');
    let firstName = firstNameAndLastName[0];
    let lastName = firstNameAndLastName[1];
    firstName = firstName.charAt(0).toUpperCase() + firstName.substr(1).toLowerCase();
    lastName = lastName.charAt(0).toUpperCase() + lastName.substr(1).toLowerCase();
    return firstName + ' ' + lastName;
  }

};