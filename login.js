// ----------------------leftSide-----------------
const forgotPasswordText = document.querySelector(".forgotPasswordText");

forgotPasswordText.addEventListener("click", function login() {
  const loginContainer = document.querySelector(".loginContainer");
  const forgotPassword = document.querySelector(".forgotPassword");

  if (
    loginContainer.style.display === "flex" ||
    loginContainer.style.display === ""
  ) {
    loginContainer.style.display = "none";
    forgotPassword.style.display = "flex";
  }
});

const sendCode = document.querySelector(".sendSubmit");

sendCode.addEventListener("click", function () {
  const numberInput = document.querySelector(".numberInput").value;
  const emailInput = document.querySelector(".emailInput").value;

  if (numberInput === "" && emailInput === "") {
    return;
  }

  const forgotPassword = document.querySelector(".forgotPassword");
  const camingCodeContainer = document.querySelector(".camingCodeContainer");

  if (
    forgotPassword.style.display === "flex" ||
    forgotPassword.style.display === ""
  ) {
    forgotPassword.style.display = "none";
    camingCodeContainer.style.display = "block";
  }
});
// ----------------------rightSide-----------------
const signInButton = document.querySelector(".signInButton");

signInButton.addEventListener("click", function () {
  const leftSideContainer = document.querySelector(".leftSideContainer");
  const rightSideContainer = document.querySelector(".rightSideContainer");

  if (
    leftSideContainer.style.display === "flex" ||
    leftSideContainer.style.display === ""
  ) {
    leftSideContainer.style.display = "none";
    rightSideContainer.style.display = "flex";
  }
});
// -----------------------users------------------
const submitForSignIn = document.querySelector(".submitForSignIn");

submitForSignIn.addEventListener("click", function () {
  const firstName = document.querySelector(".firstName").value;
  const lastName = document.querySelector(".lastName").value;
  const emailForSignIn = document.querySelector(".emailForSignIn").value;
  const passwordForSignIn = document.querySelector(".passwordForSignIn").value;
  const selectsCountry = document.querySelector(".selectsCountry").value;
  const phoneNumberForSignIn = document.querySelector(
    ".phoneNumberForSignIn"
  ).value;

  if (
    firstName &&
    lastName &&
    emailForSignIn &&
    passwordForSignIn &&
    selectsCountry &&
    phoneNumberForSignIn
  ) {
    fetchSubmit(
      firstName,
      lastName,
      emailForSignIn,
      passwordForSignIn,
      selectsCountry,
      phoneNumberForSignIn
    );
    window.location.href = "movies.html";
  } else {
    alert("Please Enter Your Information");
  }
});

async function fetchSubmit(
  firstName,
  lastName,
  email,
  password,
  country,
  PhoneNumber
) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        Country: country,
        PNumber: PhoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
}
