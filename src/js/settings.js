export const templates = {
  player: Handlebars.compile(document.getElementById('template-player').innerHTML),
  search: Handlebars.compile(document.getElementById('template-search').innerHTML),
};

export const select = {
  pageButtons: '.page-btn',
  pages: '.page',
  wrapper: '.wrapper',
  containerDiscover: '.container-discover',
  searchInput: '.search-input',
  searchBtn: '.search-btn',
  containerSearch: '.container-search',
  result: '.result',
  resultNumber: '.result-number',
  wordSong: '.wordSong',
};