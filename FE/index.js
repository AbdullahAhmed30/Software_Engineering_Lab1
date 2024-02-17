function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
        console.log('fetchinig done')
      })
    })
    .catch(error => console.error(error))
}


// TODO
// add event listener to submit button
let submitButton = document.getElementById('employeeForm')
submitButton.addEventListener('submit', createEmployee)

// TODO
// add event listener to delete button
const employeeTable = document.getElementById('dataTable')
employeeTable.addEventListener('click', function(event){
  if (event.target && event.target.nodeName === 'BUTTON' && event.target.textContent === 'Delete'){
    deleteEmployee(event);
  }
})

// TODO
function createEmployee (){
  // get data from input field
  const employeename = document.getElementById('name').value
  const employeeid = document.getElementById('id').value

  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: employeeid, name: employeename})
  })
  .then(response => response.json())
  .then(data => {

    // call fetchEmployees
    fetchEmployees();

  })
}

// TODO
function deleteEmployee (event){

  // get id
  const row = event.target.parentNode.parentNode;
  const employeeid = row.firstChild.textContent;

  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${employeeid}`, {
    method: 'DELETE',
  })
  .then(response => response.json)
  .then(data => {

    // call fetchEmployees
    fetchEmployees();
    console.log('ay haga')

  })
}

fetchEmployees()
