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
