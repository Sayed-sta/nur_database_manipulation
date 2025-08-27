const fs = require('fs');


function fetchData() {
    const url = "https://api.daricomma.com/v2/question/f0c48061-2c94-4ea4-a179-c8323428a770?page=7";
    const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25fZGF0ZSI6IjIwMjUtMDgtMTJUMDk6MTg6NDYuNDI4WiIsImlkIjoiODE2MDg2NmQtNjBhMy00ZTczLThlNzItYjQ5OTJkMDZlN2I5IiwiZnVsbG5hbWUiOiJOdXIgSG9zc2FpbiIsInJvbGUiOiJ2aXNpdG9yIiwiZW1haWwiOm51bGwsIm1vYmlsZSI6IjAxNzAxNTkzMTAyIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInZpc2l0b3IiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidmlzaXRvciIsIngtaGFzdXJhLXVzZXItaWQiOiI4MTYwODY2ZC02MGEzLTRlNzMtOGU3Mi1iNDk5MmQwNmU3YjkiLCJ4LWhhc3VyYS11c2VyLXJvbGUiOiJ2aXNpdG9yIiwieC1oYXN1cmEtdXNlci1lbWFpbCI6bnVsbCwieC1oYXN1cmEtdXNlci1tb2JpbGUiOiIwMTcwMTU5MzEwMiJ9LCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NTYyODA3ODgsImV4cCI6MTc1Njg4NTU4OH0.rCZj41KQOijHxyEm-qJQsp8AuumZx963vgiFN7WoHpI";

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authorization
        }
    })
        .then(response => response.json())
        .then(data => {
            const questions = data.data.questions;
            // save the questions to a json file

            fs.writeFileSync('questions_math_2.json', JSON.stringify(questions, null, 2));
            // console.log(data.data.questions);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function main() {
    fetchData();
}

main();