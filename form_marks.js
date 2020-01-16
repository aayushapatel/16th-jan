function validateStudent() {
    var fullName = document.getElementById("fullName").value;
    var mathsMarks = document.getElementById("mathsMarks").value;
    var engMarks = document.getElementById("engMarks").value;
    var passYear = document.getElementById("passYear").value;
    var letters = /^[A-Za-z]+$/;
    if (fullName == "") {
        alert("Name is required");
    }
    else if (!fullName.match(letters)) {
        alert("Name Invalid");
    }
    else if (mathsMarks == "" || isNaN(mathsMarks)) {
        alert("Maths Marks Invalid");
    }
    else if (mathsMarks < 0 || mathsMarks > 100) {
        alert("Maths Mark Invalid\n Marks Range from 0-100");
    }
    else if (engMarks == "" || isNaN(engMarks)) {
        alert("English Marks Invalid");
    }
    else if (engMarks < 0 || engMarks > 100) {
        alert("English Mark Invalid\n Marks Range from 0-100");
    }
    else {
        var data = new Student(fullName, mathsMarks, engMarks, passYear);
        data.saveData();
        displayStudent();
        document.getElementById("form").reset();
    }
}

class Student {
    constructor(name, mathmark, engmark, passyear) {
        this.name = name;
        this.mathmark = Number(mathmark);
        this.engmark = Number(engmark);
        this.passyear = passyear;
        this.avg = (this.mathmark + this.engmark) / 2;
        this.createDate = new Date();
    }
    saveData() {
        var cnt = 0;
        var student = JSON.parse(localStorage.getItem("student"));
        var Students = new Array();
        if (student !== null) {
            for (var i = 0; i < student.length; i++) {
                if (student[i].name == this.name) {
                    cnt = 1;
                }
            }
            Students = student;
        }
        if (cnt == 0) {
            Students.push(this);
            localStorage.setItem("student", JSON.stringify(Students));
        }
        else {
            alert("Name Already Stored");
        }
    }
}


function displayStudent() {

    var table = "<table border=1><tr><th>Index</th><th>Name</th><th>Maths Marks</th><th>English Marks</th><th>Average Marks</th><th>Passing Year</th><th>Created Date</th></tr>";
    var student = JSON.parse(localStorage.getItem("student"));
    if (student !== null) {
        for (var i = 0; i < student.length; i++) {
            table += "<tr><td>" + (i + 1) + "</td><td>" + student[i].name + "</td><td>" + student[i].mathmark + "</td><td>" + student[i].engmark + "</td><td>" + student[i].avg + "</td><td>" + student[i].passyear + "</td><td>" + student[i].createDate + "</td></tr>";

        }
        table += "</table>";
        document.getElementById("tableDisplay").innerHTML = table;
    }
}

displayStudent();

