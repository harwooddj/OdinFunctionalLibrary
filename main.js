let Library = []

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function(){
    return this.title + ', ' + this.author + ', ' + this.pages + ' pgs, ' + this.read
}
Book.prototype.is_read = function(){
    if(this.read === "Read"){
        this.read = "Not Read"
    }else{
        this.read = "Read"
    }
}

function LibraryToLocalStorage(){
    localStorage.clear()
    if(Library.length){
        Library.forEach(function(book){
            localStorage.setItem(Library.indexOf(book),JSON.stringify(book))
        })
    }
}


function LocalStorageToLibrary(){
    //localStorage.clear()
    Library=[]
    let keys = Object.keys(localStorage)
    if(keys.length){
        keys.forEach(function(key){
            let temp = JSON.parse(localStorage.getItem(key))
            let book = new Book(temp.title,temp.author,temp.pages,temp.read)
            Library.push(book)
        })
    }
}



function DisplayBooks(){
    let str = ""
    let i=3
    let k=1
    Library.forEach(function(book){
        
        if(i%3 === 0){
            str += "<div class='row' style='margin-left: 25%'>"
        } 
            str += "<div class='col-auto'>"
                str += "<div class='card' data-index = "
                str += Library.indexOf(book)
                str += " style='width: 200px; text-align: center'>"
                    str += "<div class='card-body'>"
                    str += "<p>" + book.info() + "</p>"
                    /*str += "<p>" + book.author + "</p>"
                    str += "<p>" + book.pages + "</p>"
                    str += "<p>" + book.read + "</p>"*/
                    str += "<button type='button' class='del'>Delete</button>"
                    str += "<button type='button' class='read'>Toggle Read/Unread</button>"
                    str += "</div>"
                str += "</div>"
            str += "</div>"
        if(i%3 === 2){
            str += "</div>"
        }
        i += 1
    })


    document.getElementById("container").innerHTML = str
    
    const delButtons = document.querySelectorAll(".del")
    delButtons.forEach(function(curButton){
        curButton.addEventListener("click", function(event){
            let id = event.target.parentNode.parentNode.dataset.index
            Library.splice(id,1)
            LibraryToLocalStorage()
            DisplayBooks()
            })
    })

    const readButtons = document.querySelectorAll(".read")
    readButtons.forEach(function(curButton){
        curButton.addEventListener("click", function(event){
            let id = event.target.parentNode.parentNode.dataset.index
            Library[id].is_read()
            LibraryToLocalStorage()
            DisplayBooks()
        })
    })
}



LocalStorageToLibrary()
DisplayBooks()


const form = document.getElementById("new-form")
form.addEventListener('submit', function(event){
    event.preventDefault()
    let title = form.elements['title'].value
    let author = form.elements['author'].value
    let pages = form.elements['pages'].value
    let read = form.elements['read'].value
    if (read == 1) {
        read = "Read"
    }else{
        read = "Unread"
    }
    let book = new Book(title, author, pages, read)
    Library.push(book)
    LibraryToLocalStorage()
    DisplayBooks()
})


