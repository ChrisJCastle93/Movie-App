const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { //adding in parameters to the API query 
            apikey: 'bde95a7f',
            s: searchTerm
        }
    });
    console.log(response.data);
}

// const input = document.querySelector('input');              // select the input in HTML file
// input.addEventListener('input', (event) => {                // add an event listener, and get whatever is entered in the search box. Add event callback?
//     event.target.value;
// })             

// const input = document.querySelector('input');              
// input.addEventListener('input', event => {                
//     fetchData(event.target.value);                              // put that grabbed info into the fetch data function - add it as a varibale in async function at the top
// })                   

//////////

// const input = document.querySelector('input');              // create new function to tidy things up, declare new variable, wrap the fetchdata in a SetTimeout so that it doesnt run until it hasn't been pressed for 2 seconds
// let timeoutId

// const onInput = event => {                                      
//     setTimeout(() => {fetchData(event.target.value)}, 2000);                              
// }

// input.addEventListener('input', onInput)            

//////////////

// const input = document.querySelector('input');              //  make new setTimeout function equal to timeoutId variable, then add if statement so that if there is a timeout, it 
//                                                             //  will  clear the timeoutId and start again.
// let timeoutId

// const onInput = event => {                                      
//     if(timeoutId) {
//         clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {fetchData(event.target.value)}, 500);                              
// }

// input.addEventListener('input', onInput)      


/////////////


// const input = document.querySelector('input');              //  make new setTimeout function equal to timeoutId variable, then add if statement so that if there is a timeout, it 
// //  will  clear the timeoutId and start again.

// const debounce = (func) => {                                // create function, with func pass in 
//     let timeoutId;
//     return (arg) => {                                       // this is debounce that protects the onInput from being called too many times - everything in curly braces. arg is 
//                                                             // in there so that something can be passed in and used in function below 
//         if (timeoutId) {                                    // if timeoutId is defined, 
//             clearTimeout(timeoutId);                        // clear it
//         }
//         timeoutId = setTimeout(() => {func(arg)}, 500)                    // then queue up underlying fucntion

//     }
// }

// let timeoutId

// const onInput = event => {
//     if (timeoutId) {
//         clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => { fetchData(event.target.value) }, 500);
// }

// input.addEventListener('input', onInput)

/////////////


// const input = document.querySelector('input');

// const debounce = (func) => {
//     let timeoutId;
//     return (...args) => {                                               // change this to args so it can take in more than one argument
//         if (timeoutId) {
//             clearTimeout(timeoutId);
//         }
//         timeoutId = setTimeout(() => { func.apply(null, args) }, 500)   // change this, not sure why. It keeps track of how many args we are going to pass through.

//     }
// }

// const onInput = debounce(event => {                                     // add debounce here
//     fetchData(event.target.value)                                       // this function is passed into the above as func, then the arrays in args are passed into the function
//                                                                         // (here they are blank, so it's just out search value that is being fetched)
// });

// input.addEventListener('input', onInput)

///////////


const input = document.querySelector('input');

const debounce = (func, delay) => {                                     // we can add the delay here instead as an arguement to pass in 
    let timeoutId;
    return (...args) => {                                               
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => { func.apply(null, args) })        // remove delay from here

    }
}

const onInput = event => {                                              // remove debounce here
    fetchData(event.target.value)                                       
};

input.addEventListener('input', debounce(onInput, 500))                 // add debounce and delay here to be passed into the above.