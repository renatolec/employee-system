window.onload = function () {

    let form = document.getElementById('register_form');
    let urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id');
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');

    if (id != null) {
        fetch(`http://localhost:8080/employees/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(employee => {
                fname.value = employee.fname;
                lname.value = employee.lname;
                email.value = employee.email;
            })
            .catch(error => {
                console.error('Erro ao carregar dados da API:', error);
            });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const employeeData = {
            id: id,
            fname: fname.value,
            lname: lname.value,
            email: email.value
        };

        fetch('http://localhost:8080/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })
            .catch(error => {
                console.error('Erro ao carregar dados da API:', error);
            });
    });
};
