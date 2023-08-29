const container = document.querySelector(".container");



window.onload = (event) =>{
  inicialize();
 
}


function inicialize (){
  const user = fetch('http://localhost:8081/login', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json' 
    },
  })
  .then(response => {
    if(!response.ok){
        throw new Error ("Erro na solicitacao")
    }
    return response.json()
  })
  .then(data => { 
    populate(data)
    return data
  })
  .catch(error => {
    console.log(error)
  })
  return user
}

function populate(data){
  
  const table = document.querySelector("table")
  table.innerHTML = `<tr>
                        <th  scope="row">Name</th>
                        <th  scope="row">Email</th>
                        <th  scope="row">Phone</th>
                        <th  scope="row">Edit</th>
                        </tr>`

  data.forEach(element => {
    const row = document.createElement("tr");
    row.innerHTML = `<td  scope="col">${element.fullName}</td>
                      <td  scope="col">${element.email}</td>
                      <td  scope="col">${element.phone}</td>
                      <th  scope="row"><button onclick = "editClient(${element.id})">Edit</button></th>`
                      table.appendChild(row);
  });

  
}

const createNewClient = () =>{
  
  const data = {
    fullName : document.querySelector('#name').value,
    email : document.querySelector('#email').value,
    phone : document.querySelector('#phone').value
  }

  fetch('http://localhost:8081/login/register', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data) // transformar o json para string
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro na solicitação")
    }
  
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
     
      return response.text(); 
    }
  })
  .then(data => {
    if (typeof data === 'object') {
      console.log(data);
    } else {
      
      console.log("Resposta do servidor:", data);
    }
  })
  .catch(error => console.log(error))

  document.querySelector('.container').style.display = "flex";
  document.querySelector('.createClient').style.display = "none";
  inicialize();
}








const showCreateClient = () => {
  document.querySelector('.container').style.display = "none";
  document.querySelector('.createClient').style.display = "flex";
}







const editClient = (userID) =>{
  console.log(userID)
  showCreateClient();
  
fetch(`http://localhost:8081/login/${encodeURIComponent(userID)}`,{

method: 'GET',
headers:{
  'Content-Type' : 'application/json'
},
})
.then(response => {
  if(!response.ok){
      throw new Error ("Erro na solicitacao")
  }
  return response.json()
})
.then(data => { 
  console.log(data)
  //populateInput(data)
  return data
})
.catch(error => {
  console.log(error)
  console.error(error)
})

}

/* function populateInput(data){
  
  const table = document.querySelector("table")
  table.innerHTML = `<tr>
                        <th  scope="row">Name</th>
                        <th  scope="row">Email</th>
                        <th  scope="row">Phone</th>
                        </tr>`

  data.forEach(element => {
    const row = document.showCreateClient("tr");
    row.innerHTML = `<th scope="row"><button onclick = "editClient(${element.id})">Edit</button></th>`
                      table.appendChild(row);
  });
  
}

 */






