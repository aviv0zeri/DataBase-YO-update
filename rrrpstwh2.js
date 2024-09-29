// Password for accessing the database
const correctPassword = 'yysxwr2';

// Initialize submissions array from local storage
let submissions = JSON.parse(localStorage.getItem('submissions')) || [];

// Function to load submissions into the table
function loadSubmissions() {
    const tbody = document.getElementById('answers-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing rows

    submissions.forEach((submission) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = submission.personalNumber;
        row.insertCell(1).innerText = submission.idNumber;
        row.insertCell(2).innerText = submission.fullName;
        row.insertCell(3).innerText = submission.age;
        row.insertCell(4).innerText = submission.address;
        row.insertCell(5).innerText = submission.rank;
        row.insertCell(6).innerText = submission.militaryStatus;
        row.insertCell(7).innerText = submission.operationalExperience;
        row.insertCell(8).innerText = submission.personalSkills;
    });
}

// Function to check password and load submissions
function checkPassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    if (password === correctPassword) {
        document.getElementById('database-section').style.display = 'block'; // Show database section
        document.querySelector('.password-section').style.display = 'none'; // Hide password section
        loadSubmissions();
    } else {
        alert("סיסמה שגויה. אנא נסה שוב.");
        passwordInput.value = ''; // Clear the input
    }
}

// Function to download table data as Excel file
function downloadExcel() {
    const table = document.getElementById('answers-table');
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);

    // Style the header row
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ c: C, r: 0 });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
            font: { bold: true },
            border: {
                top: { style: 'thin', color: '000000' },
                bottom: { style: 'thin', color: '000000' },
                left: { style: 'thin', color: '000000' },
                right: { style: 'thin', color: '000000' },
            },
        };
    }

    // Adjust the width of columns
    const colWidth = [
        { wpx: 100 }, { wpx: 100 }, { wpx: 200 }, { wpx: 50 },
        { wpx: 250 }, { wpx: 100 }, { wpx: 100 }, { wpx: 300 },
        { wpx: 250 },
    ];
    ws['!cols'] = colWidth;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Database');

    // Export the workbook
    XLSX.writeFile(wb, 'database.xlsx');
}

// Function to clear submissions from local storage
function clearSubmissions() {
    const confirmClear = confirm("האם אתה בטוח שברצונך למחוק את כל התשובות?");
    if (confirmClear) {
        localStorage.removeItem('submissions'); // Clear the submissions
        submissions = []; // Clear the submissions array
        loadSubmissions(); // Reload the table
        alert("המאגר נמחק בהצלחה!"); // Success message
    }
}

// Add event listeners
document.getElementById('submit-password').addEventListener('click', checkPassword);
document.getElementById('download-excel').addEventListener('click', downloadExcel);
document.getElementById('clear-database').addEventListener('click', clearSubmissions);
