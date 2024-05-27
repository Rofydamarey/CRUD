let bookmarkNameInput = document.getElementById("bookmarkName");
let bookmarkURLInput = document.getElementById("bookmarkURL");
var exampleModal = document.getElementById("exampleModalToggle")
let bookscontainer = [];


if (localStorage.getItem('allbooks')) {
    bookscontainer = JSON.parse(localStorage.getItem('allbooks'))
    displaybook()
}

function addbook() {
    if (validateinput(bookmarkNameInput) &&
        validateinput(bookmarkURLInput)
    ) {
        let book = {
            name: bookmarkNameInput.value,
            url: bookmarkURLInput.value
        }
        modal()
        bookscontainer.push(book)
        localStorage.setItem('allbooks', JSON.stringify(bookscontainer))
        displaybook()
        clearinputs()
    } else {
        modal()
    }
}
function modal() {
    if (validateinput(bookmarkNameInput) &&
        validateinput(bookmarkURLInput)
    ) {
        exampleModal.classList.add('d-none')
        let backGround = document.querySelector(".modal-backdrop");
        backGround.classList.remove('show')
        location.reload()
    }
    else {
        exampleModal.classList.replace('d-none', 'show')
    }
}

function displaybook() {
    let cartona = ''
    for (let i = 0; i < bookscontainer.length; i++) {
        cartona += `   
        <tr>
        <td>${bookscontainer[i].name}</td>
        <td>${bookscontainer[i].url}</td>
        <td><button onclick="visititem(${i})" class="btn"style="background-color: #987070;"><i class="fa-solid fa-eye pe-2"></i> visit</button></td>
        <td><button onclick="deleteitem(${i})" class="btn "style="background-color:#DBB5B5; "><i class="fa-solid fa-trash pe-2"style="color:#000; "></i> Delete</button></td>

    </tr>
        `
    }
    document.getElementById("displayitem").innerHTML = cartona
}
function clearinputs() {
    name: bookmarkNameInput.value = ""
    url: bookmarkURLInput.value = ""

    bookmarkNameInput.classList.remove('is-valid')
    bookmarkURLInput.classList.remove('is-valid')
}

function deleteitem(index) {
    bookscontainer.splice(index, 1)
    localStorage.setItem('allbooks', JSON.stringify(bookscontainer))
    displaybook()
}
function visititem(index) {
    window.open(bookscontainer[index].url);
}


function validateinput(element) {

    var text = element.value;
    var regex = {
        bookmarkName: /^[A-Z][a-z0-9]{2,8}$/i,
        bookmarkURL: /^(ftp|http|https):\/\/[^ "]+$/img
    }
    if (regex[element.id].test(text) == true) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        exampleModalToggle.classList.add('d-none')

        return true;
    }
    else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        exampleModalToggle.classList.remove('d-none')
        return false;
    }

}


