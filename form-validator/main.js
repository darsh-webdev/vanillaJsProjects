const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Show Input Error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

// Show Success Outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// Check Email Validity
const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.trim())) {
    showError(input, "Email is not valid.");
  } else {
    showSuccess(input);
  }
};

// Capitalise first letter of field name and return
const getFieldName = (input) => {
  const inputName = input.id;
  return inputName.charAt(0).toUpperCase() + inputName.slice(1);
};

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check field length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check passwords match
const checkPasswords = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
};

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 16);
  checkEmail(email);
  checkPasswords(password, confirmPassword);
});
