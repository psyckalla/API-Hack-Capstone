

const apikey = '0cefe77730501ffa5370c7079f559a9a';
const CORS = 'https://cors-anywhere.herokuapp.com/';


//add items to list and rate importance
function addItems(items, importance) {
    const params = {
        apikey: apikey,
        description: items,
        todo_group_id: importance
    };

    const addItemAPIURL = "http://beta.dorisapp.com/api/1_0/tasks/create.json"

    const queryURL = formatAddItemQuery(params);
    const fullURL = addItemAPIURL + '?' + queryURL;
    console.log(fullURL);
    
    fetch(CORS+fullURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayAddItems(responseJson, importance, items))
        .catch(err => {
            alert(`Something went wrong: ${err.message}`)
        });
}

function displayAddItems(responseJson, importance, items) {
    console.log(responseJson);
    $(`.${importance}`).append(`<form class="${responseJson.DRS_Success.message} deleteItem">
    <p class="${responseJson.DRS_Success.message}">${items}</p>
    <select class="deletion">
        <option value="${responseJson.DRS_Success.message}">Delete</option>
    </select>
    <label for="delete-button"></label>
    <input type="submit" value="Delete" name="delete-button" id="delete-button">
    </form>`)
    $(watchDeleteForm());

}




//formats the query
function formatAddItemQuery(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');


}


//delete items from list
function deleteFromList(itemToDelete) {
    $(`.${itemToDelete}`).empty(`.${itemToDelete}`);

}

//change importance


//sort items

//watch delete button

function watchDeleteForm() {
    $('.deleteItem').submit(event => {
        event.preventDefault();
        console.log('delete ran');
        const itemToDelete = $('.deletion').val();
        deleteFromList(itemToDelete);
    });
    console.log('watchdeleteform ran');
};



function watchAddForm() {
    $('.add').submit(event => {
        event.preventDefault();
        console.log('submit ran');
        const addTask = $('#add-task').val();
        const rateTask = $('#importance').val();
        addItems(addTask, rateTask);
    });
   
      console.log('watchaddform ran');
};
  
function runAllFunctions() {
    $(watchAddForm());
    
}

$(runAllFunctions());