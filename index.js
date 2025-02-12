
let users = [];
let user = {}
// let useremail = "";
// let username = "";
// let currBalance = 0;
document.write("<div id=root></div>");
function showUser() {
  if (document.getElementById("type").value == "3") {
    console.log("Transfer")
    selUser.style.display = 'block'
    let str = "<option value=0>--Select--</option>";
    for (let i = 0; i < users.length; i++) {
      if (users[i].email != user.email) {
        str += `<option value='${users[i].email}'>${users[i].name}</option>`;
      }
    }
    selUser.innerHTML = str;
  }
  else {
    selUser.style.display = "none"
  }
}
function saveData() {
  let amount = Number(document.getElementById("amount").value);
  let type = document.getElementById("type").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == user.email) {
      if (type == "1") {
        console.log("testing")
        users[i].balance += amount;
        spBalance.innerHTML = users[i].balance;
      } else if (type == "2") {
        users[i].balance -= amount;
        spBalance.innerHTML = users[i].balance;
      } else if (type == "3") {
        let newUser = document.getElementById("selUser").value;
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == newUser) {
            users[i].balance += amount;
          }
        }
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == user.email) {
            users[i].balance -= amount;
            spBalance.innerHTML = users[i].balance;
          }
        }
      }

      break;
    }
  }
}
function home() {
  let str = `
      <h3>Welcome ${user.name}</h3>
      <button onclick='showLogin()'>Logout</button>
      <p><select id="type" onchange='showUser()'>
         <option value=0>--Select--</option>
         <option value=1>Deposit</option>
         <option value=2>Withdraw</option>
         <option value=3>Transfer</option>
         </select></p>
         <p><select style="display:none" id="selUser"></select></p>
         <p><input type="number" id="amount" placeholder="Enter Amount"></p>
         <button onclick='saveData()'>Submit</button>
         <p><b>Current Balance: <span id='spBalance'>${user.balance}</span></b></p>

      `;
  root.innerHTML = str;
}
function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(user);
  showLogin();
}
function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i]
      home();
      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
  }
}
function showForm() {
  let str = `
  <h2>Registration Form</h2>
  <p><input type="text" id="name" placeholder="Name"></p>
  <p><input type="text" id="email" placeholder="Email"></p>
  <p><input type="password" id="password" placeholder="Password"></p>
  <p><input type="date" id="dob"></p>
  <p><button onclick='addUser()'>Submit</button></p>
  <p>Already a member?<button onclick='showLogin()'>Login Here</button></p>
  `;
  root.innerHTML = str;
}
function showLogin() {
  let str = `
  <div>
      <h2>Login Form</h2>
      <div id='msg'></div>
      <p><input id="email" type="text"></p>
      <p><input id="password" type="password"></p>
      <button onclick='chkUser()'>Log In</button>
      <p><button onclick='showForm()'>Create Account</button></p>
  </div>
  `;
  root.innerHTML = str;
}

showLogin();
