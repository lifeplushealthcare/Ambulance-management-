// DOM Elements
const mainContent = document.getElementById('mainContent');
const tripRecorder = document.getElementById('tripRecorder');
const analysis = document.getElementById('analysis');
const financialRecords = document.getElementById('financialRecords');
const tripTracker = document.getElementById('tripTracker');
const patientAnalysis = document.getElementById('patientAnalysis');

// Navigation
const navLinks = {
    home: document.getElementById('homeLink'),
    tripRecorder: document.getElementById('tripRecorderLink'),
    analysis: document.getElementById('analysisLink'),
    financialRecords: document.getElementById('financialRecordsLink'),
    tripTracker: document.getElementById('tripTrackerLink'),
    patientAnalysis: document.getElementById('patientAnalysisLink'),
};

Object.entries(navLinks).forEach(([key, link]) => {
    link.addEventListener('click', () => {
        hideAllSections();
        showSection(key);
    });
});

// Trip Recorder
document.getElementById('tripForm').addEventListener('submit', (e) => {
    e.preventDefault();
    recordTrip();
});

// Function to Record Trip
function recordTrip() {
    const tripData = {
        id: Date.now(),
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
}

// Function to Show Sections
function showSection(sectionKey) {
    switch (sectionKey) {
        case 'home':
            mainContent.style.display = 'block';
            break;
        case 'tripRecorder':
            tripRecorder.style.display = 'block';
            break;
        case 'analysis':
            showAnalysis();
            break;
        case 'financialRecords':
            showFinancialRecords();
            break;
        case 'tripTracker':
            tripTracker.style.display = 'block';
            break;
        case 'patientAnalysis':
            patientAnalysis.style.display = 'block';
            break;
        default:
            mainContent.style.display = 'block';
    }
}

// Analysis
function showAnalysis() {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
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

    createChart(tripData);
}

// Function to Create Chart
function createChart(tripData) {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: tripData.map(trip => trip.date.toLocaleDateString()),
            datasets: [
                {
                    label: 'Income',
                    data: tripData.map(trip => trip.income),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, 
                {
                    label: 'Expenditure',
                    data: tripData.map(trip => trip.expenditure),
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }
            ]
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

// Function to Show Financial Records
function showFinancialRecords() {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    let recordsHTML = '<h3>Financial Records</h3><table class="styled-table"><tr><th>Date</th><th>Amount Charged</th><th>Total Expenditure</th></tr>';
    
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

// Utility Functions
function hideAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
}

// Initialize by showing the home section
showSection('home');
