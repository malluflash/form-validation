// Project - FORM Validation (Using Regular Expressions In JavaScript) //

storingData()
let name = document.getElementById('name')
let email = document.getElementById('email')
let phone = document.getElementById('phone')
let Alert = document.getElementById('alert')
let address = document.getElementById('address')
let job = document.getElementById('job')
let Message = document.getElementById('message')

let forName = false
let forEmail = false
let forPhone = false
let forAddress = false

name.addEventListener('blur', () => {
    console.log("Blur event is fired for name");
    let regex = /^[(a-zA-Z)]{3}([a-zA-Z0-9\s]){0,15}$/
    let Name = name.value
    let namePara = document.getElementById('namePara')
    if (regex.test(Name)) {
        name.classList.remove('notValid')
        namePara.classList.add('hide')
        console.log("Matched")
        forName = true
    } else {
        console.log("Not Matched")
        name.classList.add('notValid')
        namePara.classList.remove('hide')
        forName = false
    }
})
email.addEventListener('blur', () => {
    console.log("Blur event is fired for email");
    let regex = /^[a-zA-Z\_]([a-zA-Z0-9]+)@([a-zA-Z0-9\_\-]+)\.([a-zA-Z]){2,6}$/
    let Email = email.value
    let emailPara = document.getElementById('emailPara')
    if (regex.test(Email)) {
        email.classList.remove('notValid')
        emailPara.classList.add('hide')
        console.log("Matched")
        forEmail = true
    } else {
        console.log("Not Matched")
        email.classList.add('notValid')
        emailPara.classList.remove('hide')
        forEmail = false
    }
})
phone.addEventListener('blur', () => {
    console.log("Blur event is fired for phone");
    let regex = /^([0-9]){10,13}$/
    let Phone = phone.value
    let phonePara = document.getElementById('phonePara')
    if (regex.test(Phone)) {
        console.log("Matched")
        phone.classList.remove('notValid')
        phonePara.classList.add('hide')
        forPhone = true
    } else {
        console.log("Not Matched")
        phone.classList.add('notValid')
        phonePara.classList.remove('hide')
        forPhone = false
    }
})
address.addEventListener('blur', () => {
    let regex = /^([a-zA-Z]){3,5}([a-zA-Z\s{0,1}]){0,10}$/
    let Address = address.value
    let addressPara = document.getElementById('addressPara')
    if (regex.test(Address)) {
        addressPara.classList.add('hide')
        console.log('matched')
        forAddress = true
    } else {
        addressPara.classList.remove('hide')
        console.log('not matched')
        forAddress = false
    }
})

let form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (forName && forEmail && forPhone && forAddress) {
        Alert.classList.replace('alert-danger', 'alert-success')
        Alert.classList.remove('hide')
        Alert.innerHTML = "<strong>Success!</strong> Your form has been submitted successfully"
        let myData = localStorage.getItem('myData')
        if (myData == null) {
            myObj = []
        } else {
            myObj = JSON.parse(myData)
        }
        let myDatas = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            job: job.value,
            message: Message.value
        }
        myObj.push(myDatas)
        localStorage.setItem('myData', JSON.stringify(myObj))
        form.reset()
        storingData()

    } else {
        Alert.classList.replace('alert-success', 'alert-danger')
        Alert.classList.remove('hide')
        Alert.innerHTML = "<strong>Error!</strong> Your form is imcomplete. Please fill all the fields"
    }
    console.log("Submitting form")
})
function storingData() {
    let myData = localStorage.getItem('myData')
    let myObj;
    if (myData == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myData)
    }
    let tbody = document.getElementById('tbody')
    let html = ""
    myObj.forEach((element, index) => {
        html += `<tr> 
                        <td>${index + 1}</td>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td>${element.phone}</td>
                        <td>${element.address}</td>
                        <td>${element.job}</td>
                        <td>${element.message == "" ? "No Message" : element.message}</td>
                        <td id="${index}" onclick="deleteForm(this.id)"><button type="delete" type="button" class="btn btn-primary">DELETE </button> </td>
                     </tr>`
    });
    let msg = document.getElementById('msg')
    if (myObj.length <= 0) {
        msg.innerHTML = "<h6>Nothing to show please submit a form</h6>"
    } else {
        tbody.innerHTML = html
        msg.innerHTML = ""
    }
}

function deleteForm(index) {
    let myData = localStorage.getItem('myData')
    let myObj;
    if (myData == null) {
        myObj = []
    } else {
        myObj = JSON.parse(myData)
    }
    myObj.splice(index, 1)
    localStorage.setItem('myData', JSON.stringify(myObj))
    storingData()
}