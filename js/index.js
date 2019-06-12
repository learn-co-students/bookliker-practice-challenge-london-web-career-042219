document.addEventListener("DOMContentLoaded", function() {
  fetchAndRenderBooks();
});
//////////////////////////////
const booksURL = "http://localhost:3000/books/";
const usersURL = "http://localhost:3000/users/";
//////////////////////////////
const booksPanel = document.querySelector("#list-panel");
const ul = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");
//////////////////////////////
function fetchBooks() {
  return fetch(booksURL).then(response => response.json());
}
//////////////////////////////
function fetchUsers() {
  return fetch(usersURL).then(response => response.json());
}
//////////////////////////////
function booksList(book) {
  const li = document.createElement("li");
  li.dataset.id = book.id;
  li.innerHTML = book.title;
  ul.appendChild(li);
  li.addEventListener("click", () => toggleBook(book));
  return ul;
}
//////////////////////////////
function renderBooks(json) {
  booksPanel.innerHTML = "";
  json.forEach(function(book) {
    booksPanel.appendChild(booksList(book));
  });
}
//////////////////////////////
function fetchAndRenderBooks() {
  fetchBooks().then(renderBooks);
}
//////////////////////////////
function toggleBook(book) {
  showPanel.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerText = book.title;
  showPanel.appendChild(h1);

  const cover = document.createElement("img");
  cover.src = book.img_url;
  showPanel.appendChild(cover);

  const desc = document.createElement("p");
  desc.innerText = book.description;
  showPanel.appendChild(desc);

  const button = document.createElement("button");
  button.innerText = "Read Book";
  showPanel.appendChild(button);
  button.addEventListener("click", () => addLikeToBook(book));

  const bookUl = document.createElement("ul");

  book.users.forEach(function(user) {
    const bookLi = document.createElement("li");
    bookLi.innerText = user.username;
    bookUl.appendChild(bookLi);
  });
  showPanel.appendChild(bookUl);
}
//////////////////////////////
function updateLikesOnServer(updatedBook, id) {
  return fetch(booksURL + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedBook)
  }).then(toggleBook(updatedBook));
}
//////////////////////////////
function addLikeToBook(book) {
  event.preventDefault;

  let bookUsers = book.users;

  if (book.users.find(user => user.id === 1)) {
    bookUsers = book.users.filter(user => user.id !== 1);
  } else {
    bookUsers = book.users.push({ id: 1, username: "pouros" });
  }

  const updatedBook = {
    title: book.title,
    description: book.description,
    img_url: book.img_url,
    users: bookUsers,
    id: book.id
  };
  console.log(bookUsers);
  updateLikesOnServer(updatedBook, book.id);
}
//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////

//////////////////////////////
