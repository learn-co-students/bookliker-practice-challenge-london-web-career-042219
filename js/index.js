document.addEventListener("DOMContentLoaded", function() {});

// Fetch the list of books, then display eachg element as an LI in the 'list' UL
//1 - Set const variables

BOOK_URL='http://localhost:3000/books'
BOOK_NODE=document.querySelector('#list')
BOOK_SHOW_NODE=document.querySelector('#show-panel')

//2 - Fetch data, then display list
function getBooks() {

    fetch( BOOK_URL )
        .then( data => data.json() )
        .then( renderBooks )
        .catch( console.log );

}

function renderBooks( booksObj ) {

    booksObj.forEach( function(bookObj) { renderBook(bookObj) } );

}

function renderBook( bookObj ) {

    let bookItem = document.createElement('LI')
    bookItem.innerText=bookObj.title
    bookItem.addEventListener('click', event => renderBookDetail(event, bookObj) )
    BOOK_NODE.append(bookItem)

}

function renderBookDetail( event, bookObj ) {

    BOOK_SHOW_NODE.innerHTML=""
    let bookTitle = document.createElement('H1')
    let bookImg = document.createElement('IMG');
    let bookDesc = document.createElement('P');
    let bookUserDiv = document.createElement('DIV');

    bookImg.setAttribute("src", bookObj.img_url);
    bookDesc.innerText=bookObj.description;
    bookTitle.innerText=bookObj.title;
    BOOK_SHOW_NODE.append( bookTitle, bookImg, bookDesc, bookUserDiv )

    renderUsers( bookUserDiv, bookObj.users)

    let bookReadBtn = document.createElement('BUTTON')
    bookReadBtn.innerText='Read Book'
    bookReadBtn.addEventListener( 'click', event => readBook(event, bookObj, bookUserDiv ))
    BOOK_SHOW_NODE.append( bookReadBtn)

}

function renderUsers( bookUserDiv, usersObj ) {
    bookUserDiv.innerHTML="";
    usersObj.forEach( function(userObj) { renderUser( bookUserDiv, userObj ) } );
}

function renderUser( bookUserDiv, userObj ) {
    let userName=document.createElement('P');
    userName.innerText=userObj.username;
    bookUserDiv.append( userName );
}

function readBook( event, bookObj, bookUserDiv ) {
    let thisUser = {"id":1, "username":"pouros"};

    if (bookObj.users.find( function(user) { return user.username==="pouros"} )) {
        // Remove the user
        bookObj.users = bookObj.users.filter(user => {
                    return user.username !=="pouros"
                })
    } else { 
// Add the user
        bookObj.users.push( thisUser );
    }

    configObj = {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify( bookObj )
        };

    fetch(`${BOOK_URL}/${bookObj.id}`, configObj)
    .catch(console.log)
    
    renderUsers( bookUserDiv, bookObj.users )

}

document.body.onload = getBooks()