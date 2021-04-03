// const createAutoComplete = (config) => { change that for a construct variables
const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
// const root = document.querySelector('.autocomplete'); 
root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
    </div>
    </div>
`
const input = root.querySelector('input');                  // change to route
const dropdown = root.querySelector('.dropdown');           // change to route
const resultsWrapper = root.querySelector('.results');      // change to route

const onInput = async event => {
    const items = await fetchData(event.target.value);
    resultsWrapper.innerHTML = "";                      //use this to clear the HTML from previous searches so that new titles appear at the top
    if (!items.length) {                           // if no movies returned, nothing shown
        dropdown.classList.remove('is-active')
        return
    }

    for (let item of items) {
        const option = document.createElement('a');
        const imgSrc = item.Poster === 'N/A' ? '' : item.Poster        // handle broken images. This is saying blank src if N/A, item.Poser if not.
        dropdown.classList.add('is-active');                // add class when someone searches
        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item)
        option.addEventListener('click', () => {       //when you select a movie, close dropdown
            dropdown.classList.remove('is-active')
            input.value = inputValue(item)                  // update the text inside the input
            onOptionSelect(item);
        })

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
    if (!root.contains(event.target)) {         // if what we click is NOT contained within that const root variable above
        dropdown.classList.remove('is-active')
    }
})
}