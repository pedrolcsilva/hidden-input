const apiURL = "http://localhost:8000/"
try {
    fetch(apiURL + 'home/', {method: 'GET'})
    .then(response => {
      console.log(response)
      
      if (!response.ok) {
        return new Error('falhou a requisição') 
      }

      if (response.status === 401) {
        return new Error(response);
      }

      if(response.status == 201){
        console.log("Request complete! response:", response);
      }   
      return response.json();
    })
    .then(text => {
        console.log(text)
        if(text.auth == false){
            window.location.href = "http://localhost:8080/"
        }
    })

    .catch(function(error) {
      console.log('Request failed', error);
    });
}
catch (e) {
}



document.getElementById("logout").addEventListener('click', () => {
    fetch(apiURL + 'logout/', {method: 'GET'})
    .then(response => {
      console.log(response)
      if (!response.ok) {
        return new Error('falhou a requisição') 
      }

      if (response.status === 401) {
        return new Error(response);
      }

      if(response.status == 201){
        console.log("Request complete! response:", response);
      }   
      return response.json();
    })
    .then(text => {
      console.log(text)
      if(text.auth == false){
        window.location.href = '/';
      }
    })

    .catch(function(error) {
      console.log('Request failed', error);
    });
})