
let timeoutID = 0;
const apiURL = "http://localhost:8000/"


document.getElementById("reg").addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const searchParams = new URLSearchParams();

  for (const pair of formData){
    searchParams.append(pair[0], pair[1], pair[2])
  }


  console.log(searchParams)
  register(searchParams);
    
})

document.getElementById("log").addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const searchParams = new URLSearchParams();

  for (const pair of formData){
    searchParams.append(pair[0], pair[1], pair[2])
  }


  console.log(searchParams)
  login(searchParams);
    
})

function register(searchParams){

  const options = {
    method: 'POST',
    body: searchParams,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  fetch(apiURL + 'register/', options)
    .then(response => {
      // valida se a requisição falhou
      if (!response.ok) {
        document.getElementById('modal').innerHTML = "Usuário já existe";
        return new Error('falhou a requisição') // cairá no catch da promise
      }

      // verificando pelo status
      if (response.status === 401) {
        return new Error('não encontrou qualquer resultado')
      }

      if(response.status == 201){
        document.getElementById('modal').innerHTML= "Cadastrado com sucesso";
        console.log("Request complete! response:", response);
      }
    })
    .then(text => {
      console.log(text);
    })

    .catch(function(error) {
        document.getElementById('modal').innerHTML = "Usuário já existe";
      console.log('Request failed', error);
    });

}

function login(searchParams){

  const options = {
    method: 'POST',
    body: searchParams,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  fetch(apiURL + 'login/', options)
    .then(response => {
      console.log(response)
      // valida se a requisição falhou
      if (!response.ok) {
        return new Error('falhou a requisição') // cairá no catch da promise
      }

      // verificando pelo status
      if (response.status === 401) {
        return new Error(response);
      }

      if(response.status == 201){
        console.log("Request complete! response:", response);
      }   
      return response.json();
    })
    .then(text => {
      if(text.auth == true){
        document.getElementById('modal2').innerHTML = "Login executado com sucesso!";
        window.location.href = '/homePage';
      }else{  
        document.getElementById('modal2').innerHTML = "Seu nome ou senha está incorreto";
      }
      console.log(text)
    })

    .catch(function(error) {
      console.log('Request failed', error);
    });

}