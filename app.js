const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const urlUsers = "https://jsonplaceholder.typicode.com/users";

let titleModal =document.querySelector("#exampleModalLabel");
let bodyModal =document.querySelector(".modal-body");
let userModal = document.querySelector(".userModal");
let emailModal = document.querySelector(".emailModal");

fetch(urlPosts)
  .then((response) => response.json())
  .then((data) => {
    cardsPosts(data);
  });
  // fetch(urlUsers)
  // .then((response) => response.json())
  // .then((data) => {
  //   cardsPosts(data);
  // });

function cardsPosts(titlesCards) {
  let cards = "";
  titlesCards.forEach((post) => {
    cards += `<div class= "col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <button onclick="prueba(event)" type="button" class="btn btn-primary" data-bs-toggle="modal" name ="${post.id}" data-bs-target="#exampleModal">View post</button>
                        </div>
                    </div>
                </div>`;
    document.querySelector("#cards").innerHTML = cards;
  });
}


function prueba(e){
  fetch(`${urlPosts}/${e.target.name}`)
  .then((response) => response.json())
  .then((modal) => {
    titleModal.textContent = modal.title;
    bodyModal.textContent = modal.body;
    userModal.textContent = modal.username;
    userModal.textContent = modal.email;
    console.log(userModal)

  });
  
}
