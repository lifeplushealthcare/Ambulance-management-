// Initialize trips data
let trips = JSON.parse(localStorage.getItem('trips')) || [];

// Function to save trips to local storage
function saveTrips() {
    localStorage.setItem('trips', JSON.stringify(trips));
}

// Function to display trips in the table
function displayTrips() {
    const tripData = document.getElementById('tripData');
    tripData.innerHTML = '';
    trips.forEach(trip => {
        const row = `<tr>
            <td>${trip.patientName}</td>
            <td>${trip.fromCity}</td>
            <td>${trip.toCity}</td>
            <td>${trip.amountCharged} INR</td>
            <td>${trip.expenditure} INR</td>
        </tr>`;
        tripData.innerHTML += row;
    });
}

// Function to calculate and display statistics
function calculateStatistics() {
    const analysisResult = document.getElementById('analysisResult');
    let totalIncome = 0;
    let totalExpenditure = 0;

    trips.forEach(trip => {
        totalIncome += parseFloat(trip.amountCharged);
        totalExpenditure += parseFloat(trip.expenditure);
    });

    const netProfit = totalIncome - totalExpenditure;

    analysisResult.innerHTML = `
        <h3>Statistics</h3>
        <p>Total Income: ${totalIncome} INR</p>
        <p>Total Expenditure: ${totalExpenditure} INR</p>
        <p>Net Profit: ${netProfit} INR</p>
    `;

    // Generate chart
    generateChart(totalIncome, totalExpenditure);
}

// Function to generate income/expenditure chart
function generateChart(totalIncome, totalExpenditure) {
    const ctx = document.getElementById('incomeExpenditureChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Income', 'Total Expenditure'],
            datasets: [{
                label: 'Amount (INR)',
                data: [totalIncome, totalExpenditure],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
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

// Handle form submission
document.getElementById('tripForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get input values
    const patientName = document.getElementById('patientName').value;
    const patientDetails = document.getElementById('patientDetails').value;
    const fromCity = document.getElementById('fromCity').value;
    const fromHospital = document.getElementById('fromHospital').value;
    const toCity = document.getElementById('toCity').value;
    const toHospital = document.getElementById('toHospital').value;
    const driverName = document.getElementById('driverName').value;
    const nursingStaff = document.getElementById('nursingStaff').value;
    const patientStatus = document.getElementById('patientStatus').value;
    const statusDescription = document.getElementById('statusDescription').value;
    const distance = document.getElementById('distance').value || 0; // Optional
    const chargePerKm = document.getElementById('chargePerKm').value || 0; // Optional
    const ambulanceNumber = document.getElementById('ambulanceNumber').value;
    const amountCharged = document.getElementById('amountCharged').value;
    const expenditure = document.getElementById('expenditure').value;
    const driverExpenditure = document.getElementById('driverExpenditure').value;
    const fuelExpenditure = document.getElementById('fuelExpenditure').value;
    const maintenanceExpenditure = document.getElementById('maintenanceExpenditure').value;
    const miscellaneousExpenditure = document.getElementById('miscellaneousExpenditure').value;
    const nursingExpenditure = document.getElementById('nursingExpenditure').value;

    // Create a trip object
    const trip = {
        patientName,
        patientDetails,
        fromCity,
        fromHospital,
        toCity,
        toHospital,
        driverName,
        nursingStaff,
        patientStatus,
        statusDescription,
        distance,
        chargePerKm,
        ambulanceNumber,
        amountCharged,
        expenditure,
        driverExpenditure,
        fuelExpenditure,
        maintenanceExpenditure,
        miscellaneousExpenditure,
        nursingExpenditure,
    };

    // Add trip to trips array and save to local storage
    trips.push(trip);
    saveTrips();
    displayTrips();
    calculateStatistics();

    // Reset form
    document.getElementById('tripForm').reset();
});

// Cancel Trip Functionality (Remove trip data)
document.getElementById('cancelTrip').addEventListener('click', function () {
    const lastTrip = trips.pop(); // Remove the last trip
    saveTrips();
    displayTrips();
    calculateStatistics();
});

// Load trips when the page loads
window.onload = function () {
    displayTrips();
    calculateStatistics();
};
