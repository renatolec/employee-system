window.onload = function () {

    let form = document.getElementById('register_form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;

        const employeeData = {
            fname: fname,
            lname: lname,
            email: email
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
