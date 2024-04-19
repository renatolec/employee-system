window.onload = function () {

    let table = document.getElementById('employee_table');
    let form = document.getElementById('searchForm');

    fetch('http://localhost:8080/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(employee => {
                let row = table.insertRow();
                row.insertCell(0).innerText = employee.id;
                row.insertCell(1).innerText = employee.fname;
                row.insertCell(2).innerText = employee.lname;
                row.insertCell(3).innerText = employee.email;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados da API:', error);
        });

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
                console.log(data);
                const rows = Array.from(table.getElementsByTagName('tr'));
                rows.slice(1).forEach(row => row.remove());
                data.forEach(employee => {
                    let row = table.insertRow();
                    row.insertCell(0).innerText = employee.id;
                    row.insertCell(1).innerText = employee.fname;
                    row.insertCell(2).innerText = employee.lname;
                    row.insertCell(3).innerText = employee.email;
                });
            })
            .catch(error => {
                console.error('Erro ao carregar dados da API:', error);
            });
    });
};
