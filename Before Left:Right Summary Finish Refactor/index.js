// const { default: axios } = require("axios");

// const fetchData = async searchTerm => {
//     const response = await axios.get('http://www.omdbapi.com/', { // set up Async function to await hte API response
//         params: {
//             apikey: 'bde95a7f',
//             s: searchTerm
//         }
//     });
//     if (response.data.Error) {                // add in error handling, want it to 
//         return [];                                //return empoty
//     }
//     return response.data.Search;
// };

const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: 'bde95a7f',
                s: searchTerm
            }
        });
        if (response.data.Error) {
            return [];
        }
        return response.data.Search;
    }
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'))

    }
})

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'))
    }
})

// createAutoComplete({
//     root: document.querySelector('#right-autocomplete'),
//     renderOption(movie) {
//         const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
//         return `
//         <img src="${imgSrc}" />
//         ${movie.Title} (${movie.Year})
//         `;
//     },
//     onOptionSelect(movie) {
//         onMovieSelect(movie)
//     },
//     inputValue(movie) {
//         return movie.Title;
//     },
//     async fetchData(searchTerm) {
//         const response = await axios.get('http://www.omdbapi.com/', {
//             params: {
//                 apikey: 'bde95a7f',
//                 s: searchTerm
//             }
//         });
//         if (response.data.Error) {
//             return [];
//         }
//         return response.data.Search;
//     }
// })

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'bde95a7f',
            i: movie.imdbID                     // switched from searchterm
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
        <figure class="media-left">
        <p class="image">
        <img src="${movieDetail.Poster}" />
        </p>
        </figure>
        <div class="media-content">
        <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
        </div>
        </div>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">BoxOffice</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDBVotes</p>
        </article>
    `
}