const loginForm = document.querySelector("#loginForm");
const nameInput = document.querySelector("#name");


async function submitHandler(e) {
  e.preventDefault();
  try {
    await fetch(`/api/login?name=${nameInput.value}`);

    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
}

loginForm.addEventListener("submit", submitHandler);
