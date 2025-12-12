var photo = document.getElementById("image");
var fullname = document.getElementById("Fullname");
var PhoneNumber = document.getElementById("PhoneNumber");
var Email = document.getElementById("Email");
var Address = document.getElementById("Address");
var selectoption = document.getElementById("select");
var notes = document.getElementById("notes");
var Favorite = document.getElementById("Favorite");
var Emergency = document.getElementById("Emergency");
var FlexData = document.getElementById("FlexData");
var Add = document.getElementById("Add");
var Save = document.getElementById("Save");
var update = document.getElementById("updateContact1");
var modalLabel = document.getElementById("modal");

var contactlist = JSON.parse(localStorage.getItem("contact")) || [];
updateRightSection()

DisplayAllContacts();
updateCounters();

function Addnew() {
  var imgValue = photo.files[0] ? `img7/${photo.files[0].name}` : "";
  if(vlaidateName()){
    var Newcontact = {
    img: imgValue,
    name: fullname.value,
    phone: PhoneNumber.value,
    Emailaddress: Email.value,
    location: Address.value,
    select: selectoption.value,
    notes: notes.value,
    Favoriteoption: Favorite.checked,
    Emergencyoption: Emergency.checked,
    firstLetter: fullname.value.charAt(0).toUpperCase(),
  }
    // console.log(fullname.value)
  };

  Add.classList.remove("d-none");
  contactlist.push(Newcontact);

  localStorage.setItem("contact", JSON.stringify(contactlist));

  ClearAllInputs();
  DisplayAllContacts();
  updateRightSection()
  updateCounters();
  console.log(contactlist);
}

function ClearAllInputs() { 
  (photo.value = ""), (fullname.value = "");
  PhoneNumber.value = "";
  Email.value = "";
  Address.value = "";
  selectoption.value = "Select a group";
  (notes.value = ""), (Favorite.checked = false);
  Emergency.checked = false;
  fullname.classList.remove("is-valid")
  PhoneNumber.classList.remove("is-valid")
  Email.classList.remove("is-valid")
}

// var choose = "";

// if(contactlist[i].Favoriteoption){
//   choose += "Favorite ";
// }
// if(contactlist[i].Emergencyoption){
//   choose += "Emergency";
// }

function DisplayAllContacts(element) {
  var text = element ? element.value : "";
  var box = "";
  for (var i = 0; i < contactlist.length; i++) {
    // console.log(contactlist[0]);
    var choose = "";
    if (contactlist[i].Favoriteoption) {
      choose += "Favorite ";
    }
    if (contactlist[i].Emergencyoption) {
      choose += "Emergency";
    }
    if (contactlist[i].name.toLowerCase().includes(text.toLowerCase())) {
      box += ` <div class="col-lg-  ">
                  <div class="inner p-3 bg-white rounded-4">
                    <div class="d-flex">
                      <span class="fw-bold p-2 me-3 align-self-center text-white bg-name text-uppercase rounded-4" id="first-litter">
  ${
    contactlist[i].img
      ? `<img src="${contactlist[i].img}" class="w- rounded-4" alt="">`
      : contactlist[i].firstLetter
  }
</span> 
                      <div>
                        <p class="text-capitalize fw-semibold" id="Name">${
                          contactlist[i].name
                        }</p>
                        <p id="phone" class="d-inline-flex">
                          <span
                            class="me-2 bg-icon4 color rounded-3 align-self-center p-1"
                            ><i class="fa-solid fa-phone fa-2xs"></i></span
                          >${contactlist[i].phone}
                        </p>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <p id="email" class="d-inline-flex">
                        <span><i class="fa-solid fa-envelope me-2"></i></span
                        >${contactlist[i].Emailaddress}
                      </p>
                      <p id="location" class="d-inline-flex">
                        <span><i class="fa-solid fa-location-dot"></i></span
                        >${contactlist[i].location}
                      </p>
                    </div>
                    <div class="d-flex justify-content-around">
                      <p id="group">${contactlist[i].select}</p>
                      <p id="choose">${choose}</p>
                    </div>
                    <div class="d-flex justify-content-between bg-section w-100">
                      <button id="update" data-bs-toggle="modal" data-bs-target="#modal" onclick="updateContact(${i}) " class="btn my-btn1">
                        <span><i class="fa-solid fa-pen"></i></span>
                      </button>
                      <button id="delete" onclick="deleteContact(${i})" class="btn my-btn2">
                        <span><i class="fa-solid fa-trash"></i></span>
                      </button>
                    </div>
                  </div>
                </div>
  `;
    }
  }
  FlexData.innerHTML = box;
}

function deleteContact(index) {
  contactlist.splice(index, 1);
  localStorage.setItem("contact", JSON.stringify(contactlist));
  DisplayAllContacts();
  updateRightSection()
  updateCounters();
}

var globalIndex;

function updateContact(index) {
  globalIndex = index;
  fullname.value = contactlist[index].name;
  PhoneNumber.value = contactlist[index].phone;
  Email.value = contactlist[index].Emailaddress;
  Address.value = contactlist[index].location;
  selectoption.value = contactlist[index].select;
  Favorite.checked = contactlist[index].Favoriteoption;
  Emergency.checked = contactlist[index].Emergencyoption;
  Save.classList.add("d-none");
  update.classList.remove("d-none");
}

function updateThisContact() {
  var updateContact = {
    img: `img7/${photo.files[`0`].name}`,
    name: fullname.value,
    phone: PhoneNumber.value,
    Emailaddress: Email.value,
    location: Address.value,
    select: selectoption.value,
    notes: notes.value,
    Favoriteoption: Favorite.checked,
    Emergencyoption: Emergency.checked,
  };
  // console.log(updateContact)
  contactlist[globalIndex] = updateContact;

  localStorage.setItem("contact", JSON.stringify(contactlist));

  ClearAllInputs();
  DisplayAllContacts();
  updateRightSection()
  updateCounters();
  Save.classList.remove("d-none");
  update.classList.add("d-none");
}

function searchContact(element) {
  var box = "";
  for (var i = 0; i < contactlist.length; i++) {
    if (
      contactlist[i].name.toLowerCase().includes(element.value.toLowerCase())
    ) {
      box += ` <div class="col-lg-  ">
                <div class="inner p-3 bg-white rounded-4">
                  <div class="d-flex">
                    <span
                      class="fw-bold p-2 me-3 align-self-center text-white bg-name text-uppercase rounded-4"
                      id="first-litter"
                      ><img src="${contactlist[i].img}" class="w- rounded-4" alt=""></span
                    >
                    <div>
                      <p class="text-capitalize fw-semibold" id="Name">${contactlist[i].name}</p>
                      <p id="phone" class="d-inline-flex">
                        <span
                          class="me-2 bg-icon4 color rounded-3 align-self-center p-1"
                          ><i class="fa-solid fa-phone fa-2xs"></i></span
                        >${contactlist[i].phone}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <p id="email" class="d-inline-flex">
                      <span><i class="fa-solid fa-envelope me-2"></i></span
                      >${contactlist[i].Emailaddress}
                    </p>
                    <p id="location" class="d-inline-flex">
                      <span><i class="fa-solid fa-location-dot"></i></span
                      >${contactlist[i].location}
                    </p>
                  </div>
                  <div class="d-flex justify-content-around">
                    <p id="group">${contactlist[i].select}</p>
                    <p id="choose">${choose}</p>
                  </div>
                  <div class="d-flex justify-content-between bg-section w-100">
                    <button id="update" data-bs-toggle="modal" data-bs-target="#modal" onclick="updateContact(${i}) " class="btn my-btn1">
                      <span><i class="fa-solid fa-pen"></i></span>
                    </button>
                    <button id="delete" onclick="deleteContact(${i})" class="btn my-btn2">
                      <span><i class="fa-solid fa-trash"></i></span>
                    </button>
                  </div>
                </div>
              </div>
`;
    }
  }

  FlexData.innerHTML = box;
}

function updateCounters() {
  var total = contactlist.length;
  var favorites = 0;
  var emergency = 0;

  for (var i = 0; i < contactlist.length; i++) {
    if (contactlist[i].Favoriteoption) {
      favorites++;
    }
    if (contactlist[i].Emergencyoption) {
      emergency++;
    }
  }

  document.getElementById("TOTAL").textContent = total;
  document.getElementById("Fav").textContent = favorites;
  document.getElementById("Emer").textContent = emergency;
}




function updateRightSection() {
  var favList = "";
  var emerList = "";

  for (var i = 0; i < contactlist.length; i++) {

    if (contactlist[i].Favoriteoption) {
      favList += `
        <div class="contact-mini d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <span class="fw-bold p-3 rounded-3 text-white" style="background:#6f42c1;">
              ${contactlist[i].name.charAt(0).toUpperCase()}
            </span>
            <div class="ms-2">
              <p class="fw-bold m-0">${contactlist[i].name}</p>
              <p class="text-muted m-0">${contactlist[i].phone}</p>
            </div>
          </div>
        </div>
      `;
    }

    if (contactlist[i].Emergencyoption) {
      emerList += `
        <div class="contact-mini d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <span class="fw-bold p-3  rounded-3 text-white" style="background:#0d6efd;">
              ${contactlist[i].name.charAt(0).toUpperCase()}
            </span>
            <div class="ms-2">
              <p class="fw-bold m-0">${contactlist[i].name}</p>
              <p class="text-muted m-0">${contactlist[i].phone}</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  document.getElementById("favlist").innerHTML = favList;
  document.getElementById("emerlist").innerHTML = emerList;
}



function vlaidateName(){
var text = fullname.value;
var Msgalert = document.getElementById("Msgalert") 
var regex = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/
if (regex.test(text)){
  fullname.classList.add("is-valid")
  fullname.classList.remove("is-invalid")
  Msgalert.classList.add("d-none")
  return true
}else{
  fullname.classList.add("is-invalid")
  fullname.classList.remove("is-valid")
  Msgalert.classList.remove("d-none")
  return false
}
}



function vlidateNumber(){
var text = PhoneNumber.value;
var errorNum = document.getElementById("errorNum") 
var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
if (regex.test(text)){
  PhoneNumber.classList.add("is-valid")
  PhoneNumber.classList.remove("is-invalid")
  errorNum.classList.add("d-none")
  return true
}else{
  PhoneNumber.classList.add("is-invalid")
  PhoneNumber.classList.remove("is-valid")
  errorNum.classList.remove("d-none")
  return false
}
}



function vlidateEmail(){
var text = Email.value;
var errorEmail = document.getElementById("errorEmail") 
var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
if (regex.test(text)){
  Email.classList.add("is-valid")
  Email.classList.remove("is-invalid")
  errorEmail.classList.add("d-none")
  return true
}else{
  Email.classList.add("is-invalid")
  Email.classList.remove("is-valid")
  errorEmail.classList.remove("d-none")
  return false
}
}