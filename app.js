let titleModal = document.querySelector("#exampleModalLabel");
let bodyModal = document.querySelector(".modal-body");
let usersModal = document.querySelector("#userModal");
let emailsModal = document.querySelector("#emailModal");
let commentModal = document.querySelector("#commentModal");
let btnComments = document.querySelector("#btnComments");
let btnDelete = document.querySelector("#btnDelete");
let containerPost = document.querySelector("#containerPost");
let cards = document.querySelector("#cards");
let postTitleInput = document.querySelector("#editTitle");
let postBodyInput = document.querySelector("#editBody");
let savePostBtn = document.querySelector("#savePost");

let idPost;
let idBodyModal;

const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";
const urlComments = "http://localhost:3000/comments";

getData();
btnComments.addEventListener("click", showComments);
btnDelete.addEventListener("click", deletePost);
savePostBtn.addEventListener("click", editPost);

async function getData() {
  const response1 = await fetch(urlPosts);
  const data1 = await response1.json();

  const response2 = await fetch(urlUsers);
  const data2 = await response2.json();

  cardsPosts(data1);
  modalPosts(data2);
}

function cardsPosts(titlesCards) {
  let cards = "";
  titlesCards.forEach((post) => {
    cards += `<div class= "col">
                    <div class="card">
                    <img src="assets/img/autum6.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" name="${post.id}">${post.title}</h5>
                            <button onclick="swohModal(event)" type="button" class="btn btn-primary" data-bs-toggle="modal" name="${post.id}" data-bs-target="#exampleModal">View post</button>
                        </div>
                    </div>
                </div>`;
    document.querySelector("#cards").innerHTML = cards;
  });
}

function modalPosts(userEmail) {
  let modalsUser = "";
  let modalsEmail = "";
  userEmail.forEach((modal) => {
    modalsUser += `<p class="userModal" name="${modal.userId}">${modal.username}</p>`;
    modalsEmail += `<p class="emailModal" name="${modal.userId}">${modal.email}</p>`;

    document.querySelector("#userModal").innerHTML = modalsUser;
    document.querySelector("#emailModal").innerHTML = modalsEmail;
  });
}

function swohModal(e) {
  idPost = e.target.name;
  console.log(idPost);
  fetch(`${urlPosts}/${idPost}`)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data1) {
      titleModal.textContent = data1.title;
      bodyModal.textContent = data1.body;
      btnComments.setAttribute("name", data1.id);
      return fetch(`${urlUsers}/${data1.userId}`);
    })
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data2) {
      usersModal.textContent = data2.username;
      emailsModal.textContent = data2.email;
      return fetch(`${urlComments}/${data2.postId}`);
    })
    .then(function (response3) {
      return response3.json();
    })
    .then(function (data3) {
      document.getElementById("flush-collapseOne").classList.remove("show");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showComments() {
  let postId = btnComments.getAttribute("name", "name");
  commentModal.innerHTML = "";
  fetch(urlComments)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((comment) => {
        if (comment.postId == postId) {
          let commentElement = document.createElement("p");
          commentElement.textContent = comment.body;
          commentModal.appendChild(commentElement);
        }
      });
    });
}


function editPost(e) {
  e.preventDefault();
  bodyModal.setAttribute("name", idBodyModal);
  let postId = titleModal.getAttribute("name", "edition");
  let postTitleData = postTitleInput.value;
  let postBodyData = postBodyInput.value;

  fetch(`${urlPosts}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postTitleData,
      body: postBodyData,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      titleModal.textContent = postTitleData;
      let h5 = document.querySelector(`h5[name="${idPost}"]`);
      let div = document.querySelector(`div[name="${idBodyModal}"]`);
      h5.textContent = postTitleData;
      div.textContent = postBodyData;
    });
}

function deletePost() {
  let postId = btnComments.getAttribute("name", "delete");
  fetch(`${urlPosts}/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      cards.remove();
    });
  setTimeout(function () {
    window.location.reload(true);
  }, 1000);
}
