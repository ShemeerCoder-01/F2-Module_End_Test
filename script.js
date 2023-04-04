var serNo = 0;
var students = [];

function addStudent() {

    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const ageValue = document.getElementById('age').value;
    const gradeValue = document.getElementById('grade').value;
    const degreeValue = document.getElementById('degree').value;


    if (nameValue === '' || emailValue === '' || ageValue === '' || gradeValue === '' || degreeValue === "") {
        alert("All fields are required!")
        return;
    }

    serNo++;


    students.push({ ID: serNo, name: nameValue, email: emailValue, age: ageValue, grade: gradeValue, degree: degreeValue });


    localStorage.setItem("students", JSON.stringify(students));


    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('grade').value = "";
    document.getElementById('degree').value = "";
    showTable();
}

function showTable() {
    const table = document.getElementById('tbody');

    table.innerHTML = '';

    students.forEach((student) => {


        const row = document.createElement("tr");
        var id = document.createElement('td');
        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        var keys = Object.keys(student);

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'grade') {
                grade.innerHTML = student[key];
            }
            else if (key == 'degree') {
                degree.innerHTML = `<div>${student[key]}
                </div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div> `;
            }

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree);
        })
        table.appendChild(row);
    })
}

function search() {
    var input,searchKey,table, tr,i;
    var name_search, email_search, degree_search;
    input = document.getElementById("search");
    searchKey = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        tdata1 = tr[i].getElementsByTagName("td")[1];
        tdata2 = tr[i].getElementsByTagName("td")[2];
        tdata3 = tr[i].getElementsByTagName("td")[5];

        if (tdata1 || tdata2 || tdata3) {
            name_search = tdata1.textContent || tdata1.innerText;
            email_search = tdata2.textContent || tdata2.innerText;
            degree_search = tdata3.textContent || tdata3.innerText;

            if (name_search.toUpperCase().includes(searchKey) || email_search.toUpperCase().includes(searchKey) || degree_search.toUpperCase().includes(searchKey)) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }

        }
    }
}

function edit(id) {
    students.forEach((student) => {
        if (student['ID'] == id) {
            document.getElementById('name').value = student['name'];
            document.getElementById('email').value = student['email'];
            document.getElementById('age').value = student['age'];
            document.getElementById('grade').value = student['grade'];
            document.getElementById('degree').value = student['degree'];

            document.getElementById('submit').innerText = 'Edit Student';

            document.getElementById("submit").onclick = function() {

                student['name'] = document.getElementById('name').value;
                student['email'] = document.getElementById('email').value;
                student['age'] = document.getElementById('age').value;
                student['grade'] = document.getElementById('grade').value;
                student['degree'] = document.getElementById('degree').value;

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('age').value = "";
                document.getElementById('grade').value = "";
                document.getElementById('degree').value = "";

                document.getElementById('submit').innerText = 'Add Student';

                showTable();
            }
        }
    })
}

function del(id) {
    var num = 1;
    students.forEach((student, index) => {
        if (student['ID'] == id) {
            students.splice(index, 1);
            students.forEach((student) => {
                student['ID'] = num;
                num++;
            })
            localStorage.setItem("students", JSON.stringify(students));
            showTable();
        }
    })
}







window.onload = () => {
    showTable();
};

window.onbeforeunload = () => {
    localStorage.setItem('students', JSON.stringify(students));
};





