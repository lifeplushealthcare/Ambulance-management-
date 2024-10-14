// Initialize trips array from localStorage or create an empty array
let trips = JSON.parse(localStorage.getItem('trips')) || [];

// DOM elements
const tripForm = document.getElementById('tripForm');
const tripTable = document.getElementById('tripData');
const analysisResult = document.getElementById('analysisResult');
const incomeExpenditureChart = document.getElementById('incomeExpenditureChart');

// Event listeners
tripForm.addEventListener('submit', handleTripSubmission);
document.getElementById('cancelTrip').addEventListener('click', handleTripCancellation);

// Handle trip submission
function handleTripSubmission(e) {
    e.preventDefault();
    
    const newTrip = {
        patientName: document.getElementById('patientName').value,
        patientDetails: document.getElementById('patientDetails').value,
        fromCity: document.getElementById('fromCity').value,
        fromHospital: document.getElementById('fromHospital').value,
        toCity: document.getElementById('toCity').value,
        toHospital: document.getElementById('toHospital').value,
        driverName: document.getElementById('driverName').value,
        nursingStaff: document.getElementById('nursingStaff').value,
        patientStatus: document.getElementById('patientStatus').value,
        statusDescription: document.getElementById('statusDescription').value,
        distance: document.getElementById('distance').value,
        chargePerKm: document.getElementById('chargePerKm').value,
        ambulanceNumber: document.getElementById('ambulanceNumber').value,
        amountCharged: parseFloat(document.getElementById('amountCharged').value),
        expenditure: parseFloat(document.getElementById('expenditure').value),
        driverExpenditure: parseFloat(document.getElementById('driverExpenditure').value),
        fuelExpenditure: parseFloat(document.getElementById('fuelExpenditure').value),
        maintenanceExpenditure: parseFloat(document.getElementById('maintenanceExpenditure').value),
        miscellaneousExpenditure: parseFloat(document.getElementById('miscellaneousExpenditure').value),
        nursingExpenditure: parseFloat(document.getElementById('nursingExpenditure').value),
        status: 'Completed',
        date: new Date().toISOString()
    };

    trips.push(newTrip);
    saveTrips();
    updateTripTable();
    updateAnalysis();
    tripForm.reset();
}

// Handle trip cancellation
function handleTripCancellation() {
    const cancelledTrip = {
        patientName: document.getElementById('patientName').value,
        fromCity: document.getElementById('fromCity').value,
        toCity: document.getElementById('toCity').value,
        status: 'Cancelled',
        date: new Date().toISOString()
    };

    trips.push(cancelledTrip);
    saveTrips();
    updateTripTable();
    tripForm.reset();
}

// Save trips to localStorage
function saveTrips() {
    localStorage.setItem('trips', JSON.stringify(trips));
}

// Update trip table
function updateTripTable() {
    tripTable.innerHTML = '';
    trips.forEach((trip, index) => {
        const row = tripTable.insertRow();
        row.innerHTML = `
            <td>${trip.patientName}</td>
            <td>${trip.fromCity}</td>
            <td>${trip.toCity}</td>
            <td>${trip.amountCharged || 'N/A'}</td>
            <td>${trip.expenditure || 'N/A'}</td>
            <td>${trip.status}</td>
        `;
    });
}

// Update analysis
function updateAnalysis() {
    const completedTrips = trips.filter(trip => trip.status === 'Completed');
    const totalIncome = completedTrips.reduce((sum, trip) => sum + trip.amountCharged, 0);
    const totalExpenditure = completedTrips.reduce((sum, trip) => sum + trip.expenditure, 0);
    const netProfit = totalIncome - totalExpenditure;

    analysisResult.innerHTML = `
        <p>Total Income: ₹${totalIncome.toFixed(2)}</p>
        <p>Total Expenditure: ₹${totalExpenditure.toFixed(2)}</p>
        <p>Net Profit: ₹${netProfit.toFixed(2)}</p>
    `;

    updateIncomeExpenditureChart(totalIncome, totalExpenditure);
}

// Update income/expenditure chart
function updateIncomeExpenditureChart(income, expenditure) {
    const ctx = incomeExpenditureChart.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenditure'],
            datasets: [{
                label: 'Amount (INR)',
                data: [income, expenditure],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize the page
updateTripTable();
updateAnalysis();
