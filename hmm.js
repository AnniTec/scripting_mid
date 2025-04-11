const form = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const teamSize = document.getElementById("teamSize");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const teamSizeError = document.getElementById("teamSizeError");
const checkboxError = document.getElementById("checkbox-error");


function toggleImage(checkbox) {
  const image = document.getElementById(`${checkbox.id}-img`);
  if (checkbox.checked) {
    image.style.display = "inline-block";
  } else {
    image.style.display = "none";
  }
}


form.addEventListener("submit", (e) => {
  let isValid = true;

  if (!validateFirstName()) isValid = false;
  if (!validateLastName()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validatePassword()) isValid = false;
  if (!validateTeamSize()) isValid = false;
  if (!validateCheckbox()) isValid = false;

  if (!isValid) {
    e.preventDefault();
  } else {
    alert("Form is valid");
  }
});


function setError(field, message) {
  const errorElement = getErrorElement(field);
  if (errorElement) {
    errorElement.textContent = message;
  }
  field.classList.add("invalid");
  field.classList.remove("valid");
}

function clearError(field) {
  const errorElement = getErrorElement(field);
  if (errorElement) {
    errorElement.textContent = "";
  }
  field.classList.remove("invalid");
  field.classList.add("valid");
}

function getErrorElement(field) {
  switch (field) {
    case firstName: return firstNameError;
    case lastName: return lastNameError;
    case email: return emailError;
    case password: return passwordError;
    case teamSize: return teamSizeError;
    default: return null;
  }
}


function validateFirstName() {
  if (!firstName.value.trim()) {
    setError(firstName, "First name is required");
    return false;
  } else {
    clearError(firstName);
    return true;
  }
}

function validateLastName() {
  if (!lastName.value.trim()) {
    setError(lastName, "Last name is required");
    return false;
  } else {
    clearError(lastName);
    return true;
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    setError(email, "Please enter a valid email");
    return false;
  } else {
    clearError(email);
    return true;
  }
}

function validatePassword() {
  if (password.value.length < 8) {
    setError(password, "Password must be at least 8 characters long");
    return false;
  } else {
    clearError(password);
    return true;
  }
}

function validateTeamSize() {
  const value = parseInt(teamSize.value, 10);
  if (isNaN(value) || value < 1 || value > 3) {
    setError(teamSize, "Team size should be 1, 2 or 3");
    return false;
  } else {
    clearError(teamSize);
    return true;
  }
}

function validateCheckbox() {
  const checkboxGroup = document.querySelector(".checkbox-group");
  const checkboxes = checkboxGroup?.querySelectorAll("input[type='checkbox']");
  const checkedCount = [...checkboxes].filter((checkbox) => checkbox.checked).length;

  if (checkedCount < 3) {
    checkboxError.textContent = "Please select at least 3 technologies";
    return false;
  } else {
    checkboxError.textContent = "";
    return true;
  }
}
