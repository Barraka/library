//------------- form behaviour -------------
let title=document.querySelector("#title");
let author=document.querySelector("#author");
let pages=document.querySelector("#pages");
let isread=document.querySelector("#isread");
let submit=document.querySelector("#submit");
let display=document.querySelector(".display");
let inputs=document.querySelectorAll('input');
submit.addEventListener("click", checkinputs);

function makeBook(title,author,pages,isread) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isread=isread;
    this.info = function() {
        let ending;
        if(isread)ending="is already read";
        else ending="not read yet";
        return(`${title} by ${author}, ${pages} pages, ${ending}`);
    };
}
inputs.forEach(x=> {
    x.addEventListener('blur',outfocus);
});
function outfocus(e) {
    if(!e.target.checkValidity())e.target.classList.add("invalid");
    else e.target.classList.remove("invalid");
}
// let myinput = prompt("Book list:");
let myLibarary=[];
myLibarary.push(
{title: "The Hobbit", author: "J.R.R. Tolkien", pages: '546', isread: false},
{title: "Peter Rabbit", author: "Not Me", pages: '54', isread: false}
);

function checkinputs() {
    
    let flag=true;
    inputs.forEach(x=> {
        if(!x.checkValidity()){
            x.setCustomValidity("");
            if(x.validity.patternMismatch)x.setCustomValidity("Only numbers 0-9 are allowed");
            x.reportValidity();
            flag=false;
            x.classList.add("invalid");
        }
        
    });
    if(flag)addBook();
}
function addBook() {
    
    let booktitle=title.value.toLowerCase().split(' ');
    let result=[];
    //Parse the title to capitalise each word, by storing them in a list
    for(let x in booktitle) {
        let temp=booktitle[parseInt(x)];
        if(temp==='')continue;
        temp=temp[0].toUpperCase()+temp.slice(1);
        result.push(temp);
    }
    booktitle=result.join(' ');
    //Make the object
    let currentBook=new makeBook(booktitle,author.value,pages.value,isread.checked);
    //Decompose the object to better store it in the library array
    let index=myLibarary.length;
    myLibarary[index]={};
    for(x in currentBook){
        myLibarary[index][x]=currentBook[x];
    }
    //Erase current form
    title.value="";
    author.value="";
    pages.value="";
    isread.checked=false;
    generateCard();
}

//let book1=new makeBook("The Hobbit", "J.R.R. Tolkien", "546", false);
// addBook("The Hobbit", "J.R.R. Tolkien", "546", false);
// addBook("Other Book","Me Yes","1",true);
console.log(myLibarary);

function generateCard() {
    for(let x of myLibarary) {
        let container=document.createElement('div');
        container.classList.add('book');
        if(x.isread)container.classList.add('isread');
        let title=document.createElement('p');
        title.classList.add('title');
        title.textContent=x.title;
        let author=document.createElement('p');
        author.classList.add('author');
        author.textContent=x.author;
        container.setAttribute('data-read',x.isread);
        container.appendChild(title);
        container.appendChild(author);
        display.appendChild(container);

    }
}
generateCard();

