document.addEventListener("DOMContentLoaded", function() {
  const BASE_URL_BOOKS = ("http://localhost:3000/books/")
  const BASE_URL_POUROS = ("http://localhost:3000/users/1")
  const listPanel = document.querySelector("ul")
  const showPanel = document.getElementById("show-panel")
  const userPouros = {id: 1, username: "pouros"}
  


  fetchBooks = () => {
    fetch(BASE_URL_BOOKS)
      .then(data => data.json())
      .then(booksArray => renderBooksList(booksArray));
  }

  function renderBooksList (booksArray) {
    listPanel.innerHTML ="";
    booksArray.forEach(book => booksList(book));
  }
  
  function booksList (book) {
    const li = document.createElement("li");
    li.dataset.id = book.id;
    li.innerText = book.title;
    listPanel.append(li);
    li.addEventListener("click", e => {
      // showPanel.innerHTML =""
      showBook(book)
    })
  }

  function showBook(book) {
    showPanel.innerHTML = ""
    const div = document.createElement("div");
    div.dataset.id = book.id;
    showPanel.append(div);

    const h2 = document.createElement("h2");
    h2.innerText = book.title;
    div.append(h2);

    const img = document.createElement("img");
    img.src = book.img_url;
    div.append(img);

    const p = document.createElement("p");
    p.innerText = book.description;
    div.append(p)

    const ul = document.createElement("ul");
    book.users.forEach(function(user) {
      let li = document.createElement("li")
      li.innerText = user.username
      ul.append(li)
    })
    div.append(ul);

    const button = document.createElement("button");
    button.innerText = "Read Book";
    button.dataset.id = book.id;
    button.addEventListener('click', () => {


       if (book.users.find(user => user.id === 1)) {
        book.users.filter(user => user.id !== 1);
        book.users.pop()
        patchReadBook(book.users, book).then(init);
      }
      else {
        book.users.push(userPouros)
        patchReadBook(book.users, book).then(init);
      }
    })
    div.append(button);

    return div
  }

  function init() {
    fetchBooks();
  }

  init();

  function patchReadBook(user, book) {
    return fetch(`${BASE_URL_BOOKS}${book.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "users": user
      })
    }).then(resp => resp.json())
      .then(showBook)
  }

});
