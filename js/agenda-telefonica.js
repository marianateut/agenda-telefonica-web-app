window.AgendaTelefonica = {

    API_URL: "http://localhost:8081/agendas",

    getPersons: function () {
        $.ajax({
            url: AgendaTelefonica.API_URL,
            method: "GET"
        }).done(function (response) {
            console.log("GET done");
            console.log(response);

              AgendaTelefonica.displayPersons(JSON.parse(response));

        });
    },
    createPersons: function() {
        let firstNameVal = $("#input").val();
        let lastNameVal = $("#input").val();
        let nrTelVal = $("#input").val();
        let mailVal = $("input").val();

        var requestBody = {
            firstName: firstNameVal,
            lastName: lastNameVal,
            nrTel: nrTelVal,
            mail: mailVal
        };
        $.ajax({
            url: AgendaTelefonica.API_URL,
            method: "POST",
            //mine type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            AgendaTelefonica.getPersons();
        })
    } ,
    displayPersons: function (persons) {
        var tableContent = "";

        persons.forEach(person => {
            return tableContent += AgendaTelefonica.getPersonTableRow(person);
        } );
        console.log(tableContent);

        $("#agenda-telefonica tbody").html(tableContent);
    },
    getPersonTableRow: function (person) {
   // ES6 string template
        return `<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.nrTel}</td>
            <td>${person.mail}</td>
            <td>
                <a href='#' data-id='${person.id}' class='delete'>&#10006;</a>
                <a href='#' data-id='${person.id}' class='edit'>&#9998;</a>
            </td>
        </tr>`;
    },
    searchPersons: function (value) {
        value = value.toLowerCase();

        var filtered = persons.filter(function (person) {
            return person.firstName.toLowerCase().includes(value) ||
                person.lastName.toLowerCase().includes(value) ||
                person.nrTel.toLowerCase().includes(value);
        });

        AgendaTelefonica.displayPersons(filtered);
    },
    bindEvents: function () {
        $("#agenda-telefonica ").submit(function (event) {
            event.preventDefault();

            AgendaTelefonica.createPersons();
        })
    },
}
 AgendaTelefonica.getPersons();
// console.info('loading persons ');
// AgendaTelefonica.load();
AgendaTelefonica.bindEvents();