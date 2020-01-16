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
        
        var storedNames = JSON.parse(localStorage.getItem("Studentnames"));
        if (storedNames == null) {
            var names = [this.name];
            localStorage.setItem("Studentnames", JSON.stringify(names));
            localStorage.setItem(this.name, JSON.stringify(this));
        }
        else {
            if (storedNames.indexOf(this.name) < 0) {
                storedNames.push(this.name);
                localStorage.setItem("Studentnames", JSON.stringify(storedNames));
                localStorage.setItem(this.name, JSON.stringify(this));
            }
            else {
                alert("Name Already Registered");
            }
        }
    }
}




function displayStudent() {

    var table = "<table border=1><tr><th>Index</th><th>Name</th><th>Maths Marks</th><th>English Marks</th><th>Average Marks</th><th>Passing Year</th><th>Created Date</th></tr>";
    var storedNames = JSON.parse(localStorage.getItem("Studentnames"));
    if (storedNames !== null) {
        for (var i = 0; i < storedNames.length; i++) {
            var record = JSON.parse(localStorage.getItem(storedNames[i]));
            table += "<tr><td>" + (i + 1) + "</td><td>" + record.name + "</td><td>" + record.mathmark + "</td><td>" + record.engmark + "</td><td>" + record.avg + "</td><td>" + record.passyear + "</td><td>" + record.createDate + "</td></tr>";

        }
        table += "</table>";
        document.getElementById("tableDisplay").innerHTML = table;
    }
}

displayStudent();

