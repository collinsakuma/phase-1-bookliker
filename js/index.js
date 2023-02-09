document.addEventListener("DOMContentLoaded", function() {});
const user = { id: 15, username: "pouros"};
const bookList = document.getElementById("list")
const showPanel = document.getElementById('show-panel')

fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then((books) => books.forEach((book) => addBookTitle(book)))


function addBookTitle(book) {
    const li = document.createElement('li')
    li.addEventListener('click', () => {
        showPanel.innerHTML = ""
        const img = document.createElement('img')
        const title = document.createElement('h4')
        const userList = document.createElement('ul')
        const button = document.createElement('button')
        button.innerText = 'Like'
        button.addEventListener('click', () => {
            book.users.push(user)
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: book.user 
            })
            userList.innerHTML = ""
            book.users.forEach((user) => {
                const li = document.createElement('li')
                li.innerText = user.username
                userList.append(li)
            })
        })

        img.src = book.img_url
        title.innerText = book.title
        book.users.forEach((user) => {
            const li = document.createElement('li')
            li.innerText = user.username
            userList.append(li)
        })
        showPanel.append(li, img, title, userList, button)
    })
    li.innerText = book.title 
    bookList.append(li)
}