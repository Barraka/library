//------------- form behaviour -------------
let title=document.querySelector("#title");
let author=document.querySelector("#author");
let pages=document.querySelector("#pages");
let isread=document.querySelector("#isread");
let submit=document.querySelector("#submit");
let display=document.querySelector(".display");
let inputs=document.querySelectorAll('input');
let up=document.querySelector('.up');
let add=document.querySelector('#btnadd');
let visible=document.querySelector(".contvisible");
let cancel=document.querySelector("#notadd");
let modalbg=document.querySelector(".modalbg");
let delbook=document.querySelector(".delbook");
let delno=document.querySelector("#delno");
submit.addEventListener("click", checkinputs);
up.addEventListener('click', scrollup);
add.addEventListener('click', toggleAdd);
cancel.addEventListener('click', toggleAdd);
delno.addEventListener('click',toggledel);
modalbg.classList.toggle('modalbg');
delbook.classList.toggle('delhide');

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
    if(e.target.name==='pages') {
        console.log('pages');
    }
    if(!e.target.checkValidity())e.target.classList.add("invalid");
    
    else e.target.classList.remove("invalid");
}
// let myinput = prompt("Book list:");
let myLibarary=[];
myLibarary.push(
{title: "The Hobbit", author: "J.R.R. Tolkien", pages: '546', isread: true},
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
    //Parse the title to capitalise each word, by storing them in a list
    let booktitle=title.value;
    let name=author.value;
    booktitle=capitalise(booktitle);
    name=capitalise(name);
    
    //Make the object
    let currentBook=new makeBook(booktitle,name,pages.value,isread.checked);
    //Decompose the object to better store it in the library array
    let index=myLibarary.length;
    myLibarary[index]={};
    for(x in currentBook){
        myLibarary[index][x]=currentBook[x];
    }
    //Erase current form
    eraseform();
    isread.checked=false;
    generateCard(myLibarary[index]);
    function capitalise(item) {
        let string=item.toLowerCase().split(' ');
        let result=[];
        for(let x in string) {
            let temp=string[parseInt(x)];
            if(temp==='')continue;
            temp=temp[0].toUpperCase()+temp.slice(1);
            result.push(temp);
        }
        item=result.join(' ');
        return item;
    }
    //hide addbook
    toggleAdd();
}

function generateCard(x) {    
    let container=document.createElement('div');
    container.classList.add('book');
    let title=document.createElement('p');
    title.classList.add('title');
    title.textContent=x.title;
    let author=document.createElement('p');
    author.classList.add('author');
    author.textContent=x.author;
    let isread=document.createElement('div');
    isread.classList.add('check');
    if(x.isread) {
        let svg=document.createElement('div');
        svg.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        isread.appendChild(svg);
    }
    let cancel=document.createElement('div');
    cancel.classList.add('hide');
    cancel.id="cancel";
    let delbtn=document.createElement('div');
    delbtn.classList.add('delbtn');
    delbtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`;
    cancel.appendChild(delbtn);
    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(isread);
    container.appendChild(cancel);
    container.addEventListener('mouseover',toggleCancle);
    container.addEventListener('mouseout',toggleCancle);
    delbtn.addEventListener('click',toggledel);
    display.appendChild(container);    
}
generateCard(myLibarary[0]);
generateCard(myLibarary[1]);

function scrollup() {
    window.scrollTo(0,0);
}
function toggleAdd() {
    eraseform();
    visible.classList.toggle('contvisible');
    modalbg.classList.toggle('modalbg');
}

function eraseform() {
    title.value="";
    author.value="";
    pages.value="";
}
function toggleCancle(e){
    e.currentTarget.lastElementChild.classList.toggle("hide");
}
// function delbook(e){
//     modalbg.classList.toggle('modalbg');
// }
function toggledel(){
    modalbg.classList.toggle('modalbg');
    delbook.classList.toggle('delhide');
}