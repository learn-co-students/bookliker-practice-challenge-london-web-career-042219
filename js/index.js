const BASE_URL = "http://localhost:3000/books/";
let bookList = document.querySelector("#list");
let showPanel = document.querySelector("#show-panel");

///////////////////ADD DIsLIKE BUTTON///////////////

document.addEventListener("DOMContentLoaded", function() {
  console.log("loaded");
  getBooks();
});

function getBooks() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(books => {
      console.log(books);
      displayBooks(books);
    });
}

function displayBooks(books) {
  books.forEach(book => {
    listItem = document.createElement("li");
    listItem.append(book.title);
    listItem.addEventListener("click", () => showBook(book));
    bookList.appendChild(listItem);
  });
}

function showBook(book) {
  showPanel.innerHTML = "";

  bookPic = document.createElement("img");
  bookPic.src = book.img_url;
  bookDes = document.createElement("p");
  bookDes.innerText = book.description;
  bookUsersList = document.createElement("ol");

  allUsers = book.users;
  listBookUsers(allUsers);

  bookButton = document.createElement("button");
  bookButton.innerText = "Like!";
  bookButton.addEventListener("click", () => likeBook(book));

  showPanel.append(bookPic, bookDes, bookUsersList, bookButton);
}

function listBookUsers(allUsers) {
  bookUsersList.innerHTML = "";
  allUsers.forEach(user => {
    bookUsersListItem = document.createElement("li");
    bookUsersListItem.innerText = user.username;
    bookUsersList.appendChild(bookUsersListItem); //this is still in scope!!
  });
}

function userAlreadyLikes(book, userInfo) {
  arrayOfUserHashes = book.users;
  arrayOfUserIds = arrayOfUserHashes.map(user => user.id);

  if (arrayOfUserIds.includes(userInfo.id)) {
    alert("You already have this book!");
    return false;
  } else {
    return true;
  }
}

function likeBook(book) {
  let userInfo = { id: 1, username: "pouros" };

  if (userAlreadyLikes(book, userInfo)) {
    book.users.push(userInfo);

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(book) // having curlies around this broke it!!
    };

    return fetch(BASE_URL + book.id, configObj)
      .then(res => res.json())
      .then(book => showBook(book))
      .catch(function(error) {
        alert("Bad things! Ragnarők!");
        console.log(error);
      });
  }
}
