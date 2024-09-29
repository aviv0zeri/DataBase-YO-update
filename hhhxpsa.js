// Load submissions from local storage
function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const tbody = document.getElementById('answers-table').getElementsByTagName('tbody')[0];

    // Clear existing rows
    tbody.innerHTML = '';

    // Populate the table with data
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

// Handle form submission
document.getElementById('test-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get values from the input fields
    const personalNumber = document.getElementById('personalNumber').value;
    const idNumber = document.getElementById('idNumber').value;
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const rank = document.getElementById('rank').value;
    const militaryStatus = document.getElementById('militaryStatus').value;
    const operationalExperience = document.getElementById('operationalExperience').value;
    const personalSkills = document.getElementById('personalSkills').value;

    // Create an object to hold the answers
    const answers = {
        personalNumber,
        idNumber,
        fullName,
        age,
        address,
        rank,
        militaryStatus,
        operationalExperience,
        personalSkills
    };

    // Load existing submissions from local storage
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    
    // Add the new submission
    submissions.push(answers);
    
    // Save to local storage
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // Show a response message
    document.getElementById('response-message').innerText = "תשובות נשמרו!";

    // Reset the form
    document.getElementById('test-form').reset();

    // Load submissions to update the database
    loadSubmissions();
});

// Call loadSubmissions when the page loads
document.addEventListener('DOMContentLoaded', loadSubmissions);
