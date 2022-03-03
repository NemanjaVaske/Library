const newBookForm = document.getElementById('new-book-form');
let myLibrary = [];
//Book object
function Book(title,author,pages,read){
    //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.toogleRead = function(){
  this.read = this.read === true ? false : true;
}

function addBookToLIbrary(...args){
    myLibrary.push(...args)
}

function displayBooks(){
    const library = document.getElementsByClassName('library')[0];

    myLibrary.forEach((book,index)=>{
        const list = document.createElement('div');
        const title = document.createElement('li');
        title.textContent = `Title: ${book.title}`;
        const author = document.createElement('li');
        author.textContent = `Author: ${book.author}`;
        const pages = document.createElement('li');
        pages.textContent = `Pages: ${book.pages}`;
        const read = document.createElement('li');
        read.textContent =`Status:  ${book.read? "It is read" : "It isn't read"} `;
        const dltButton = document.createElement('button');
        dltButton.textContent = "Delete Book";
        //event listener for delete button
        dltButton.addEventListener('click', ()=>{
            myLibrary.splice(index, 1);
            removeBooks();
            displayBooks();
        });
        //event listener for edit read status button
        const readButton = document.createElement('button');
        readButton.textContent = "Change read status"
        readButton.addEventListener('click',()=>{
          myLibrary[index].toogleRead();
          removeBooks();
            displayBooks();
        });

        list.appendChild(title);
        list.appendChild(author);
        list.appendChild(pages);
        list.appendChild(read);
        list.appendChild(dltButton)
        list.appendChild(readButton)
        library.appendChild(list)
    });
}
let book1 = new Book("harry","john",80,true);
let book2 = new Book("marry","mick",84,false);


//add new book by form
function showForm() {
  if (newBookForm.style.display === "block") {
    newBookForm.style.display = "none";
  } else {
    newBookForm.style.display = "block";
  };
};
//remove all from library dom before displaying all again
function removeBooks(){
    const library = document.getElementsByClassName('library')[0];
    while (library.hasChildNodes()) {
        library.removeChild(library.firstChild);
      }
}

newBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    removeBooks();
    addBookToLIbrary(new Book(newBookForm.elements['title'].value,
                 newBookForm.elements['author'].value,
                 newBookForm.elements['pages'].value,
                 newBookForm.elements['read-status'].checked));
    displayBooks();
    this.reset();
    showForm();
  });

addBookToLIbrary(book1,book2)
displayBooks();
