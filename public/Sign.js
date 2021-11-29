//MONGO DB

const MongoClient = require("mongodb").MongoClient;
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://zineddine_walid:mongodb1209@cluster0.o2k2b.mongodb.net/Meeeteor?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const Meeeteor = client.db("Meeeteor");
const Teachers = Meeeteor.collection("Teachers");

async function insertTeacher(doc) {
  Teachers.createIndex({ matricule: 1 }, { unique: true });
  try {
    await client.connect();

    // create a document to insert

    const result = await Teachers.insertOne(doc);

    console.log(`A Teacher was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function deleteTeacher(query) {
  try {
    await client.connect();

    // Query for a Teacher that has matricule 191931047539

    const result = await Teachers.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one Teacher.");
    } else {
      console.log("No Teachers matched the query. Deleted 0 Teachers.");
    }
  } finally {
    await client.close();
  }
}

async function findTeacher(query) {
  try {
    await client.connect();

    // Query for a Teacher that has matricule 191931047539

    const result = await Teachers.find(query).limit(1).count();

    if (result) {
      console.log(`A Teacher was found`);
    } else console.log("Teacher does not existe.");
  } finally {
    await client.close();
  }
}

module.exports = { insertTeacher, deleteTeacher, findTeacher };

//End MongoDB

const SIGNINBTN = document.getElementById("signinBtn");
const SIGNUPBTN = document.getElementById("signupBtn");
const FIRSTNAME = document.getElementById("first-name");
const LASTTNAME = document.getElementById("last-name");
const PASSWORD = document.getElementById("password");
const FORM = document.getElementById("form");
const logedInUser = { first_name: "", last_name: "", password: "" };

//configure the firstname, lastname and password fields
FIRSTNAME.addEventListener("change", function () {
  //This input has changed
  logedInUser.first_name = FIRSTNAME.value;
  console.log("first-name : ", FIRSTNAME.value);
});

LASTTNAME.addEventListener("change", function () {
  //This input has changed
  logedInUser.last_name = LASTTNAME.value;
  console.log("last-name : ", LASTTNAME.value);
});

PASSWORD.addEventListener("change", function () {
  //This input has changed
  logedInUser.password = PASSWORD.value;
});

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
});

//configure the click event of the Sign In button
SIGNINBTN.addEventListener("click", () => {
  console.log("sign-in clicked");
});
/*if (logedInUser.first_name && logedInUser.last_name && logedInUser.password) {
    if (findTeacher(logedInUser)) {
      window.location.href = "http://localhost:3030/new-meeting";
    } else {
      alert("Wrong username, or password.");
      PASSWORD.value = "";
      FIRSTNAME.value = "";
      LASTTNAME.value = "";
    }
  } else {
    alert("User does not exists!!");
    PASSWORD.value = "";
    FIRSTNAME.value = "";
    LASTTNAME.value = "";
  }*/

/**
   <% if(locals.errors){ %> <% errors.forEach(function(error) { %>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <%= error.msg %>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<% }); %> <% } %> <% if(success_msg != ''){ %>
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <%= success_msg %>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<% } %> <% if(error_msg != ''){ %>
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <%= error_msg %>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<% } %> <% if(error != ''){ %>
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <%= error %>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<% } %>
   */
