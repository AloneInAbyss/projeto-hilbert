function validateForm() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let password_check = document.getElementById("password-check").value;
  // Alerta
  let alert = document.getElementById("alert");
  let alert_message = document.getElementById("alert-message");

  if (password !== password_check) {

    alert_message.innerHTML = "As senhas diferem!";
    alert.classList.remove("d-none");

  } else
  
  if (username.length < 4) {
    
    alert_message.innerHTML = "O nome de usuário precisa conter pelo menos 4 caracteres";
    alert.classList.remove("d-none");

  } else
  
  if (username.length > 16) {
    
    alert_message.innerHTML = "O nome de usuário não pode ter mais de 16 caracteres";
    alert.classList.remove("d-none");

  } else 

  if (password.length < 4) {

    alert_message.innerHTML = "A senha precisa conter pelo menos 4 caracteres";
    alert.classList.remove("d-none");

  } else

  if (password.length > 16) {

    alert_message.innerHTML = "A senha não pode ter mais de 16 caracteres";
    alert.classList.remove("d-none");
    
  } else
  
  {

    alert.classList.add("d-none");

  }
}