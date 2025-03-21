
let userId;
function showLogin() {
  fetch("https://jsonplaceholder.typicode.com/users/")
    .then((res) => res.json())
    .then((data) => displayUsers(data))
    .catch((err) => console.log(err));
}
function showMyPost(id){
  let str = "<h3>My Post</h3>";
  fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data &&
        data.map((value) => {
          str += `<div>
        <b>UserId:${value.userId}</b>
        <b>${value.title}</b>
        <p>${value.body}</p>
        </div>`;
        });
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));
}
function showPosts(id) {
  let str = "<h3>Home</h3>";
  //fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`)
  fetch(`https://jsonplaceholder.typicode.com/posts/`)
    .then((res) => res.json())
    .then((data) => {
      data &&
        data.map((value) => {
          str += `<div>
        <b>UserId:${value.userId}</b>
        <b>${value.title}</b>
        <p>${value.body}</p>
        </div>`;
        });
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));
}

function showAlbum(id) {
  fetch(`https://jsonplaceholder.typicode.com/albums/?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let str = `<h3>My Albums</h3>`;
      data &&
        data.map((value) => {
          str += `<div>${value.title}</div>`;
        });
      content.innerHTML = str;
    });
}


function showTodos(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let str = `<h3>My Todos</h3>`;
      data &&
        data.map((value) => {
          str += `<div><input type='checkbox' ${value.completed && "checked"}>${value.title}</div>`;
        });
      content.innerHTML = str;
    });
}



function showProfile(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let str = `<h3>My Profile</h3><div>
      <b>${data.name}</b>
      <p>${data.email}</p>
      </div>`;
      content.innerHTML = str;
    })
    .catch((err) => console.log(err));
}

function showHome() {
  userId = selUser.value;
  let str = `
   <div class='container-fluid'>
     <div class='row'>
      <div class='d-flex justify-content-between bg-primary text-light'>
       <div>My Social Media</div>
       <div id='username'></div>
      </div>
     </div>
     <div class='row'>
      <div class='d-flex'>
       <div class='p-2 me-5'>
         <p onclick='showPosts(${userId})'>Home</p>
          <p onclick='showMyPost(${userId})'>My Post</p>
         <p onclick='showAlbum(${userId})'>Album</p>
          <p onclick='showTodos(${userId})'>Todos</p>
          <p onclick='showProfile(${userId})'>Profile</p>
         <p onclick='showLogin()'>Logout</p>
       </div>
       <div class='p-2' id='content'></div>
      </div>
     </div>
     <div class='row'>
      <div class='bg-primary text-light p-5'>
       <p>@Copyright 2025. All rights reserved.</p>
      </div>
     </div>
   </div>
  `;
  let name = selUser.options[selUser.selectedIndex].text
  root.innerHTML = str;
  username.innerHTML = name
  showPosts(userId);
}

function displayUsers(data) {
  let str = `
  <div class='d-flex justify-content-center p-5'>
  <div class='p-5'>
  <h2>My Social Media</h2>
  <p>This is the caption of the website.</p>
  </div>
  <div class='p-5'>
  <select class='form-control m-3' id='selUser'>
  <option value='0'>--Select User--</option>`;
  data.map((value) => {
    str += `<option value=${value.id}>${value.name}</option>`;
  });
  str += `</select><p><button class='form-control m-3 btn btn-primary' onclick='showHome()'>Log In</button></p></div></div>`;
  root.innerHTML = str;
}
