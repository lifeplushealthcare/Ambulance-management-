let trips = [];

document.getElementById('tripForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
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
    const distance = document.getElementById('distance').value || 0;
    const chargePerKm = document.getElementById('chargePerKm').value || 0;
    const ambulanceNumber = document.getElementById('ambulanceNumber').value;
    const amountCharged = document.getElementById('amountCharged').value;
    const expenditure = document.getElementById('expenditure').value;
    const driverExpenditure = document.getElementById('driverExpenditure').value;
    const fuelExpenditure = document.getElementById('fuelExpenditure').value;
    const maintenanceExpenditure = document.getElementById('maintenanceExpenditure').value;
    const miscellaneousExpenditure = document.getElementById('miscellaneousExpenditure').value;
    const nursingExpenditure = document.getElementById('nursingExpenditure').value;

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
        expenditure: {
            total: expenditure,
            driver: driverExpenditure,
            fuel: fuelExpenditure,
            maintenance: maintenanceExpenditure,
            miscellaneous: miscellaneousExpenditure,
            nursing: nursingExpenditure,
        },
        date: new Date().toLocaleString(),
    };

    trips.push(trip);
    displayTrips();
    this.reset();
});

document.getElementById('cancelTrip').addEventListener('click', function () {
    alert('Trip cancelled.');
    // Additional logic for trip cancellation
