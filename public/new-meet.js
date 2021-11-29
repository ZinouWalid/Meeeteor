const FORM = document.getElementById("meet-name");
const START_MEET = document.getElementById("in_btn");
const MEET_NAME = document.getElementById("Name_value");

const name_to_send = document.getElementById("meeting_title");

//GET a unique ID for our meeting URL
//import { v4 as uuidv4 } from 'uuid';

FORM.addEventListener("submit", function (e) {
  e.preventDefault();
});

//redirect(`/${uuidv4()}`).
START_MEET.addEventListener("click", function () {
  MEET_NAME.value
    ? (window.location.href = `/meeeteor_${Math.random()
        .toString(36)
        .substr(2, 10)}`)
    : setTimeout(() => (MEET_NAME.style.border = "1px solid red"), 10);
});
