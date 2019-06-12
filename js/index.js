document.addEventListener("DOMContentLoaded", init);
const booksUrl = "http://localhost:3000/books/"
const list = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")
const thisUser = {
    id: 1,
    username: "pouros"
}



//fetch books 

function fetchBooks() {
    return fetch(booksUrl)
        .then(response => response.json())
        .then(booksObject => renderBooks(booksObject))
}

function renderBooks(booksObject) {
    list.innerHTML = ""
    booksObject.forEach(book => {
        renderBook(book)
    })
}

function renderBook(book) {
    let li = document.createElement("li")
    li.innerText = book.title
    list.append(li)
    li.addEventListener('click', function(event) {
        event.preventDefault();
        displayBookEvent(book.id)
    }) 
}

function displayBookEvent(bookId) {
    return fetch (booksUrl + bookId)
        .then(response => response.json())
        .then(bookInfo => displayBook(bookInfo))
}

function displayBook(book) {
    showPanel.innerHTML = ""
    let showTitle = document.createElement("h2");
    let showImage = document.createElement("img");
    let showDescription = document.createElement("p");
    let showUsers = document.createElement("ul")

    let showButton = document.createElement("button");
    showButton.addEventListener('click', function(event) {
        event.preventDefault;
        likeBook(book.id, book.users, book)
    })

    showTitle.innerText = book.title;
    showImage.src = book.img_url;
    showDescription.innerText = book.description;
    showButton.innerText = "Read Book"

    displayUsers(book, showUsers)

    showPanel.append(showTitle, showImage, showDescription, showUsers, showButton)
}

function displayUsers(book, showUsers) {
    console.log(book)
    console.log(showUsers)
    showUsers.innerHTML = ""
    book.users.forEach(user => displayUser(user, showUsers))
}

function displayUser(user, showUsers) {
    let userLi = document.createElement("li")
    userLi.innerText = user.username

    showUsers.append(userLi)
}

function likeBook(bookId, users, book) {

    if (users.includes(thisUser)) {
         
         users.pop(thisUser) 
         
         return fetch(booksUrl + bookId, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users
            })
        }).then(response => response.json())
            .then(displayBook(book))
         
             
    } else {
        users.push(thisUser) 
        
        return fetch(booksUrl + bookId, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users
            })
        }).then(response => response.json())
            .then(displayBook(book))
    }
}

function init() {
    fetchBooks();
}