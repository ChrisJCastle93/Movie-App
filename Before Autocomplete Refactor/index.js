// const { default: axios } = require("axios");

const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', { // set up Async function to await hte API response
        params: {
            apikey: 'bde95a7f',
            s: searchTerm
        }
    });
    if (response.data.Error) {                // add in error handling, want it to 
        return [];                                //return empoty
    }
    return response.data.Search;
};



// const root = document.querySelector('.autocomplete'); // we removed all of this from the HTML file and added it in here
// root.innerHTML = `
//     <label><b>Search For A Movie</b></label>
//     <input class="input" />
//     <div class="dropdown">
//         <div class="dropdown-menu">
//             <div class="dropdown-content results"></div>
//     </div>
//     </div>
// `
// const input = document.querySelector('input');
// const dropdown = document.querySelector('.dropdown');
// const resultsWrapper = document.querySelector('.results');

// const onInput = async event => {
//     const movies = await fetchData(event.target.value);
//     resultsWrapper.innerHTML = "";                      //use this to clear the HTML from previous searches so that new titles appear at the top
//     if (!movies.length) {                           // if no movies returned, nothing shown
//         dropdown.classList.remove('is-active')
//         return
//     }

//     for (let movie of movies) {
//         const option = document.createElement('a');
//         const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster        // handle broken images. This is saying blank src if N/A, item.Poser if not.
//         dropdown.classList.add('is-active');                // add class when someone searches
//         option.classList.add('dropdown-item')
//         option.innerHTML = `
//         <img src="${imgSrc}" />
//         ${movie.Title}
//       `;
//         option.addEventListener('click', () => {       //when you select a movie, close dropdown
//             dropdown.classList.remove('is-active')
//             input.value = movie.Title                   // update the text inside the input
//             onMovieSelect(movie);
//         })

//         resultsWrapper.appendChild(option);
//     }
// };
// input.addEventListener('input', debounce(onInput, 500));

// document.addEventListener('click', event => {
//     if (!root.contains(event.target)) {         // if what we click is NOT contained within that const root variable above
//         dropdown.classList.remove('is-active')
//     }
// })

// const onMovieSelect = async movie => {
//     const response = await axios.get('http://www.omdbapi.com/', {
//         params: {
//             apikey: 'bde95a7f',
//             i: movie.imdbID                     // switched from searchterm
//         }
//     });
//     document.querySelector('#summary').innerHTML = movieTemplate(response.data)
// }

// const movieTemplate = (movieDetail) => {
//     return `
//         <article class="media">
//         <figure class="media-left">
//         <p class="image">
//         <img src="${movieDetail.Poster}" />
//         </p>
//         </figure>
//         <div class="media-content">
//         <div class="content">
//         <h1>${movieDetail.Title}</h1>
//         <h4>${movieDetail.Genre}</h4>
//         <p>${movieDetail.Plot}</p>
//         </div>
//         </div>
//         </article>
//         <article class="notification is-primary">
//         <p class="title">${movieDetail.Awards}</p>
//         <p class="subtitle">Awards</p>
//         </article>
//         <article class="notification is-primary">
//         <p class="title">${movieDetail.BoxOffice}</p>
//         <p class="subtitle">BoxOffice</p>
//         </article>
//         <article class="notification is-primary">
//         <p class="title">${movieDetail.Metascore}</p>
//         <p class="subtitle">Metascore</p>
//         </article>
//         <article class="notification is-primary">
//         <p class="title">${movieDetail.imdbRating}</p>
//         <p class="subtitle">IMDB Rating</p>
//         </article>
//         <article class="notification is-primary">
//         <p class="title">${movieDetail.imdbVotes}</p>
//         <p class="subtitle">IMDBVotes</p>
//         </article>
//     `
// }