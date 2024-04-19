window.onload = function () {

    let table = document.getElementById('employee_table');
    let form = document.getElementById('search_form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const searchParams = new URLSearchParams(formData);
        console.log(searchParams)
        fetch('http://localhost:8080/employees?' + searchParams, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                const rows = Array.from(table.getElementsByTagName('tr'));
                rows.slice(1).forEach(row => row.remove());
                data.forEach(employee => {
                    let row = table.insertRow();
                row.insertCell(0).innerText = employee.id;
                row.insertCell(1).innerText = employee.fname;
                row.insertCell(2).innerText = employee.lname;
                row.insertCell(3).innerText = employee.email;

                let updateButton = document.createElement('button');
                updateButton.classList.add('update')
                let updateIcon = document.createElement('i');
                updateIcon.classList.add('fa-solid', 'fa-arrows-rotate');
                updateButton.appendChild(updateIcon);
                updateButton.addEventListener('click', function() {
                    window.location.href = `employees/update?id=${employee.id}`;
                })
                row.insertCell(4).appendChild(updateButton);

                let deleteButton = document.createElement('button');
                deleteButton.classList.add('delete')
                let deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa', 'fa-trash');
                deleteButton.appendChild(deleteIcon);
                deleteButton.addEventListener('click', function () {
                    deleteEmployee(employee.id, table);
                });
                row.insertCell(5).appendChild(deleteButton);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar dados da API:', error);
            });
    });

    loadEmployees(table)

};


function loadEmployees(table) {
    fetch('http://localhost:8080/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            const rows = Array.from(table.getElementsByTagName('tr'));
            rows.slice(1).forEach(row => row.remove());
            data.forEach(employee => {
                let row = table.insertRow();
                row.insertCell(0).innerText = employee.id;
                row.insertCell(1).innerText = employee.fname;
                row.insertCell(2).innerText = employee.lname;
                row.insertCell(3).innerText = employee.email;

                let updateButton = document.createElement('button');
                updateButton.classList.add('update')
                let updateIcon = document.createElement('i');
                updateIcon.classList.add('fa-solid', 'fa-arrows-rotate');
                updateButton.appendChild(updateIcon);
                updateButton.addEventListener('click', function() {
                    window.location.href = `employees/update?id=${employee.id}`;
                })
                row.insertCell(4).appendChild(updateButton);

                let deleteButton = document.createElement('button');
                deleteButton.classList.add('delete')
                let deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa', 'fa-trash');
                deleteButton.appendChild(deleteIcon);
                deleteButton.addEventListener('click', function () {
                    deleteEmployee(employee.id, table);
                });
                row.insertCell(5).appendChild(deleteButton);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados da API:', error);
        });
}

function deleteEmployee(employeeId, table) {
    fetch(`http://localhost:8080/employees/${employeeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Funcionário excluído com sucesso');
                loadEmployees(table);
            } else {
                console.error('Erro ao excluir funcionário:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Erro ao excluir funcionário:', error);
        });
}
