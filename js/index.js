document.addEventListener("DOMContentLoaded", function() {});

const BOOK_URL = "http://localhost:3000/books/";
const list = document.querySelector("#list-panel ul");
const showPanel = document.querySelector("#show-panel");

function getBooks() {
	return fetch(BOOK_URL)
		.then(resp => resp.json())
}

function readBook(book) {
	const current_user = {
		"id":1,
		"username":"pouros"
	};

	if(book.users.find((user) => user.id == current_user.id)) {
		alert("You read this already!");
	} else {
		const newUsers = [...book.users, current_user];
		fetch(`${BOOK_URL}${book.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({users: newUsers})
		})
			.then((resp) => {
				userList.innerText += `, ${current_user.username}`;
			})
	}
}

function showBook(book) {
	showPanel.innerHTML = "";

	title = document.createElement("h3");
	title.innerText = book.title;

	image = document.createElement("img");
	image.src = book.img_url;

	description = document.createElement("p");
	description.innerText = book.description;

	userList = document.createElement("h4");
	userList.innerText = book.users.map(user => user.username).join(", ");

	button = document.createElement("button");
	button.innerText = "Read Book";
	button.addEventListener("click", () => readBook(book));

	showPanel.append(title, image, description, userList, button);
}

function renderBooks() {
	getBooks()
		.then((books) => {
			books.forEach(book => {
				const bookLI = document.createElement("li");
				bookLI.dataset.id = book.id;
				bookLI.innerText = book.title;

				bookLI.addEventListener("click", () => showBook(book));

				list.appendChild(bookLI);
			});
		})
}

renderBooks();
