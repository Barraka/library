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
let delyes=document.querySelector("#delyes");
let myform = document.querySelector('.myform');

submit.addEventListener("click", checkinputs);
up.addEventListener('click', scrollup);
add.addEventListener('click', toggleAdd);
cancel.addEventListener('click', toggleAdd);
delno.addEventListener('click',toggledelmodal);
delyes.addEventListener('click',removebook);
modalbg.classList.toggle('modalbg');
delbook.classList.toggle('delhide');
let storeTargetToRemove;
let eventFlag=false;

class makeBook {
    constructor(title, author, pages, isread) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isread = isread;
        this.info = function () {
            let ending;
            if (isread)
                ending = "is already read";
            else
                ending = "not read yet";
            return (`${title} by ${author}, ${pages} pages, ${ending}`);
        };
    }
}
inputs.forEach(x=> {
    x.addEventListener('focus',onFocus);
    x.addEventListener('input',onType);
});

function onFocus(e) {
    if(eventFlag) {e.currentTarget.removeEventListener('blur', outfocus);eventFlag=false;}
    else {e.currentTarget.addEventListener('blur',outfocus);eventFlag=true;}
}
function outfocus(e) {
    e.currentTarget.removeEventListener('blur', outfocus);
    
    e.currentTarget.setCustomValidity('');
    if(!e.currentTarget.checkValidity()) {
        e.currentTarget.classList.add("invalid");
        if(e.currentTarget.id==='author')e.currentTarget.setCustomValidity('Only letters allowed, at least 3.');
        if(e.currentTarget.id==='pages')e.currentTarget.setCustomValidity('Only numbers allowed');
        e.currentTarget.reportValidity();
        console.log(this);
        // setTimeout(()=>{document.activeElement.blur();},1000);
    }
    
    else {
        e.target.classList.remove("invalid");
        eventFlag=false;
    }
}

function onType(e) {
    e.target.setCustomValidity('');
    if(e.target.classList.contains("invalid")) {
        if(e.target.checkValidity())e.target.classList.remove("invalid");
        
    }    
}


function checkinputs(e) {  
    let flag = true;  
    inputs.forEach(x=> {
        if(!x.checkValidity()){
            x.setCustomValidity("");
            if(x.validity.patternMismatch)x.setCustomValidity("Only numbers 0-9 are allowed");
            x.reportValidity();
            x.classList.add("invalid");
            flag=false;
        }        
    });
    if(flag)addBook();
}
let myLibarary=[];
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
    
    let svg=document.createElement('div');
    svg.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    isread.appendChild(svg);
    if(x.isread)isread.classList.add('checkgreen');
    else isread.classList.add('checkgray');

    let bookhover=document.createElement('div');
    bookhover.id="bookhover";
    let markread=document.createElement('div');
    markread.classList.add('markread');
    markread.innerHTML=`Mark as read:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bookhovercheck"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    let deldiv=document.createElement('div');
    deldiv.classList.add('bookhoverdelbtn');
    deldiv.innerHTML=`Delete book?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="delbooksvg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>`;
    if(x.isread)markread.classList.add('hoverisread');
    else markread.classList.add('hoverisnotread');
    bookhover.appendChild(markread);
    bookhover.appendChild(deldiv);
    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(isread);
    container.appendChild(bookhover);
    container.setAttribute('data-id',myLibarary.length-1);
    let delbtn=deldiv.querySelector('svg');
    delbtn.addEventListener('click',toggledel);
    let checkmark=markread.querySelector('svg');    
    checkmark.addEventListener('click',toggleisread);
    display.appendChild(container);    
}
myLibarary.push(
    {title: "Mindset: The New Psychology of Success", author: "Carol S. Dweck ", pages: '320', isread: true}
    );
generateCard(myLibarary[0]);
myLibarary.push(
    {title: "Javascript: The Definitive Guide", author: "David Flanagan", pages: '1096', isread: false}
    );
generateCard(myLibarary[1]);
myLibarary.push(
    {title: "DOM Enlightenment", author: "Cody Lindley", pages: '181', isread: true}
    );
generateCard(myLibarary[2]);


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
    title.classList.remove('invalid');
    author.classList.remove('invalid');
    pages.classList.remove('invalid');
}

function toggledelmodal() {
    modalbg.classList.toggle('modalbg');
    delbook.classList.toggle('delhide');
}   
function toggledel(e){
    storeTargetToRemove=e.currentTarget;    
    let info=document.querySelector('.infodelete')
    let currenttitle = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.title').textContent;
    let currentauthor = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.author').textContent
    info.innerHTML = '"'+currenttitle+'"<br> by <br>' + currentauthor;
    modalbg.classList.toggle('modalbg');
    delbook.classList.toggle('delhide');
    console.log(storeTargetToRemove);
}
function removebook(){
    let target=storeTargetToRemove.parentElement.parentElement.parentElement.getAttribute('data-id');
    target=parseInt(target);
    myLibarary.splice(target,1);
    let divtoremove=document.querySelector(`.book[data-id="${target}"]`);
    divtoremove.remove();
    storeTargetToRemove="";
    toggledelmodal();
}
function toggleisread(e){
    //toggle visibility
    if(e.currentTarget.parentElement.classList.contains('hoverisread')) {
        e.currentTarget.parentElement.classList.remove('hoverisread');
        e.currentTarget.parentElement.classList.add('hoverisnotread');
    }
    else {
        e.currentTarget.parentElement.classList.remove('hoverisnotread');
        e.currentTarget.parentElement.classList.add('hoverisread');
    }   

    //changes in database
    let currentIndex = e.currentTarget.parentElement.parentElement.parentElement.getAttribute('data-id');
    currentIndex=parseInt(currentIndex);
    myLibarary[currentIndex].isread=!myLibarary[currentIndex].isread;
    //toggle cover visibility
    let target = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.check');
    if(target.classList.contains('checkgreen')) {
        target.classList.remove('checkgreen');
        target.classList.add('checkgray');
    }
    else {
        target.classList.remove('checkgray');
        target.classList.add('checkgreen');
    }
}