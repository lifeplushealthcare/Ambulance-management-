// DOM Elements
const mainContent = document.getElementById('mainContent');
const tripRecorder = document.getElementById('tripRecorder');
const analysis = document.getElementById('analysis');
const financialRecords = document.getElementById('financialRecords');
const tripTracker = document.getElementById('tripTracker');
const patientAnalysis = document.getElementById('patientAnalysis');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');

// Navigation
document.getElementById('homeLink').addEventListener('click', showHome);
document.getElementById('tripRecorderLink').addEventListener('click', showTripRecorder);
document.getElementById('analysisLink').addEventListener('click', showAnalysis);
document.getElementById('financialRecordsLink').addEventListener('click', showFinancialRecords);
document.getElementById('tripTrackerLink').addEventListener('click', showTripTracker);
document.getElementById('patientAnalysisLink').addEventListener('click', showPatientAnalysis);
document.getElementById('adminLink').addEventListener('click', showAdminPanel);
document.getElementById('loginLink').addEventListener('click', showLoginForm);
document.getElementById('logoutLink').addEventListener('click', logout);

// Simple authentication
let currentUser = null;

document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // In a real app, you'd validate against a server. Here we're just checking if the email contains "admin"
    if (email.includes('admin') && password === 'password') {
        currentUser = { email, isAdmin: true };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showHome();
    } else {
        alert('Login failed. Please check your credentials.');
    }
});

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showHome();
}

// Trip Recorder
document.getElementById('tripForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const tripData = {
        id: Date.now(), // use timestamp as a simple unique id
        patientName: document.getElementById('patientName').value,
        patientDetails: document.getElementById('patientDetails').value,
        fromCity: document.getElementById('fromCity').value,
        fromHospital: document.getElementById('fromHospital').value,
        toCity: document.getElementById('toCity').value,
        toHospital: document.getElementById('toHospital').value,
        driverName: document.getElementById('driverName').value,
        nursingStaffName: document.getElementById('nursingStaffName').value,
        patientStatus: document.getElementById('patientStatus').value,
        patientDescription: document.getElementById('patientDescription').value,
        distance: document.getElementById('distance').value,
        chargePerKm: document.getElementById('chargePerKm').value,
        ambulanceNumber: document.getElementById('ambulanceNumber').value,
        amountCharged: document.getElementById('amountCharged').value,
        expenditure: {
            driver: document.getElementById('driverExpenditure').value,
            fuel: document.getElementById('fuelExpenditure').value,
            maintenance: document.getElementById('maintenanceExpenditure').value,
            miscellaneous: document.getElementById('miscellaneousExpenditure').value,
            nursingStaff: document.getElementById('nursingStaffExpenditure').value
        },
        isCancelled: document.getElementById('isCancelled').checked,
        timestamp: new Date().toISOString()
    };

    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push(tripData);
    localStorage.setItem('trips', JSON.stringify(trips));

    alert('Trip recorded successfully!');
    document.getElementById('tripForm').reset();
});

// Analysis
function showAnalysis() {
    hideAllSections();
    analysis.style.display = 'block';
    
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    let totalIncome = 0;
    let totalExpenditure = 0;
    let tripData = [];

    trips.forEach((trip) => {
        totalIncome += parseFloat(trip.amountCharged);
        totalExpenditure += Object.values(trip.expenditure).reduce((sum, value) => sum + parseFloat(value), 0);
        
        tripData.push({
            date: new Date(trip.timestamp),
            income: parseFloat(trip.amountCharged),
            expenditure: Object.values(trip.expenditure).reduce((sum, value) => sum + parseFloat(value), 0)
        });
    });

    const netProfit = totalIncome - totalExpenditure;

    document.getElementById('financialSummary').innerHTML = `
        <p>Total Income: ₹${totalIncome.toFixed(2)}</p>
        <p>Total Expenditure: ₹${totalExpenditure.toFixed(2)}</p>
        <p>Net Profit: ₹${netProfit.toFixed(2)}</p>
    `;

    // Create chart
    const ctx = document.getElementById('incomeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: tripData.map(trip => trip.date.toLocaleDateString()),
            datasets: [{
                label: 'Income',
                data: tripData.map(trip => trip.income),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Expenditure',
                data: tripData.map(trip => trip.expenditure),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function showFinancialRecords() {
    hideAllSections();
    financialRecords.style.display = 'block';
    
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    let recordsHTML = '<table><tr><th>Date</th><th>Amount Charged</th><th>Total Expenditure</th></tr>';
    
    trips.forEach((trip) => {
        const totalExpenditure = Object.values(trip.expenditure).reduce((sum, value) => sum + parseFloat(value), 0);
        recordsHTML += `
            <tr>
                <td>${new Date(trip.timestamp).toLocaleDateString()}</td>
                <td>₹${parseFloat(trip.amountCharged).toFixed(2)}</td>
                <td>₹${totalExpenditure.toFixed(2)}</td>
            </tr>`;
    });

    recordsHTML += '</table>';
    document.getElementById('financialRecordsTable').innerHTML = recordsHTML;
}

function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
}

function showHome() {
    hideAllSections();
    mainContent.style.display = 'block';
}

function showTripRecorder() {
    hideAllSections();
    tripRecorder.style.display = 'block';
}

function showTripTracker() {
    hideAllSections();
    tripTracker.style.display = 'block';
}

function showPatientAnalysis() {
    hideAllSections();
    patientAnalysis.style.display = 'block';
}

function showAdminPanel() {
    hideAllSections();
    adminPanel.style.display = 'block';
}

function showLoginForm() {
    hideAllSections();
    loginForm.style.display = 'block';
}
