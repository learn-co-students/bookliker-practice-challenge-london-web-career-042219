const BASE_URL = `http://localhost:3000/books/`

const listPanel = document.querySelector('list-panel')
const currentUser = {"id":1, "username":"pouros"}


/////<----- fetch books --->
function getBooks(){
    return fetch(BASE_URL)
        .then(resp => resp.json())
}


/////<--- add a book ---->
function renderBook(book){
   
const list = document.querySelector('#list')
let bookLi = document.createElement('li')
    bookLi.innerText = book.title
    bookLi.dataset.id = book.id

    list.append(bookLi)

    bookLi.addEventListener('click', () => renderBookInfo(book) )
}



/////<------ render all books ----->
function renderBooks(books){
    books.forEach(book => renderBook(book))
}
///// <--- render a book info ---->
function renderBookInfo(book){
       const bookPanel = document.querySelector('#show-panel')
        bookPanel.innerText = ""
    let bookTitle = document.createElement('h1')
        bookTitle.innerText = book.title
    let bookImage = document.createElement('img')
        bookImage.src = book.img_url
    let bookDescription = document.createElement('p')
        bookDescription.innerText = book.description
    let bookUsers = document.createElement('div')
    let likebookButton = document.createElement('button')
        likebookButton.innerText = "Like Book"
        likebookButton.dataset.id = book.id
        likebookButton.className = "button"

    
        renderBookUsers(book.users, bookUsers)

        likebookButton.addEventListener("click", () => {

            if (book.users.find((user) => user.id == currentUser.id)){
                alert("liked already")  
            } else {
                toggleBook(book)
            }
           
            
        })

        bookPanel.append(bookTitle, bookImage, bookDescription, bookUsers, likebookButton)

        
}



function toggleBook(book){
    return patchBook(book)
        .then(() => document.querySelector('button').innerText = "Liked already")
}

function patchBook(book){
   
    book.users.push(currentUser)

    return fetch (BASE_URL + `${book.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(resp => resp.json())
    .then(renderBookInfo)
}

/////<----- render the users ---->
function renderBookUsers(usersArray, bookUsers){
             usersArray.forEach(user => {
        const userLi = document.createElement('li')
        userLi.innerText = user.username
        bookUsers.append(userLi)
    })
}





/////<----- ininitalize page --------->
function init(){
    getBooks()
        .then(book => renderBooks(book))
}

init()