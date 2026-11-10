
const tableBody = document.querySelector("#studentTableBody");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const message = document.querySelector("#message");
const form = document.querySelector("#studentForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const programSelect = document.querySelector("#programSelect");


let students = JSON.parse(localStorage.getItem("students")) || [
    { id: 1, name: "Ana", email: "ana@gmail.com", program: "BSIT" },
    { id: 2, name: "Almeya", email: "alm@yahoo.com", program: "BSIS" }
];
let editingId = null;


function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


function resetForm() {
    form.reset();
    editingId = null;
    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;
}


function renderStudents() {
    tableBody.innerHTML = "";

    students.forEach(student => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.program)}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const program = programSelect.value;

    if (!name || !email || !program) return;

    if (editingId !== null) {
 
        const student = students.find(s => s.id === editingId);
        if (student) {
            student.name = name;
            student.email = email;
            student.program = program;
            saveStudents();
            renderStudents();
            message.textContent = "Student updated successfully.";
        }
        resetForm();
    } else {

        const newStudent = {
            id: Date.now(),
            name: name,
            email: email,
            program: program
        };

        students.push(newStudent);
        saveStudents();
        renderStudents();
        message.textContent = "Student added successfully.";
        resetForm();
    }
});


window.editStudent = function (id) {
    const student = students.find(s => s.id === id);
    if (student) {
        editingId = id;
        nameInput.value = student.name;
        emailInput.value = student.email;
        programSelect.value = student.program;

        submitBtn.textContent = "Update Student";
        cancelBtn.hidden = false;
        message.textContent = "Editing student details.";
    }
};
window.editStudent = function (id) {
    const student = students.find(s => s.id === id);
    if (student) {
        editingId = id;
        nameInput.value = student.name;
        emailInput.value = student.email;
        programSelect.value = student.program;

        submitBtn.textContent = "Update Student";
        cancelBtn.hidden = false;
        message.textContent = "Editing student details.";

       
        nameInput.focus(); 
        nameInput.select();
    }
};


cancelBtn.addEventListener("click", function () {
    resetForm();
    message.textContent = "";
});


window.deleteStudent = function (id) {
    if (confirm("Delete this student?")) {
        students = students.filter(s => s.id !== id);
        saveStudents();
        renderStudents();
        message.textContent = "Student deleted successfully.";

        if (editingId === id) {
            resetForm();
        }
    }
};


function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


renderStudents();