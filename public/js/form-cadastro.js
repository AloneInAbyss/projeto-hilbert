function validateForm() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let password_check = document.getElementById("password-check").value;
  // Alerta
  let alert = document.getElementById("alert");
  let alert_message = document.getElementById("alert-message");

  let unMinLength = 4;
  let unMaxLength = 16;
  let psMinLength = 6;
  let psMaxLength = 16;

  // if (password !== password_check) {

  //   alert_message.innerHTML = "As senhas diferem!";
  //   alert.classList.remove("d-none");

  // } else
  
  if (username.length < psMinLength) {
    
    alert_message.innerHTML = `O nome de usuário precisa conter pelo menos ${psMinLength} caracteres`;
    alert.classList.remove("d-none");

  } else
  
  if (username.length > unMaxLength) {
    
    alert_message.innerHTML = `O nome de usuário não pode ter mais de ${unMaxLength} caracteres`;
    alert.classList.remove("d-none");

  } else 

  if (password.length < psMinLength) {

    alert_message.innerHTML = `A senha precisa conter pelo menos ${psMinLength} caracteres`;
    alert.classList.remove("d-none");

  } else

  if (password.length > psMaxLength) {

    alert_message.innerHTML = `A senha não pode ter mais de ${psMaxLength} caracteres`;
    alert.classList.remove("d-none");
    
  } else
  
  {

    alert.classList.add("d-none");

  }
}