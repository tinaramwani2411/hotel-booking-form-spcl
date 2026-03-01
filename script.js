// ===============================
// Hotel Booking Form Script
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const errorMsg = document.getElementById("errorMsg");

    // ===============================
    // 1. Restrict Past Dates
    // ===============================

    const today = new Date().toISOString().split("T")[0];
    checkin.setAttribute("min", today);
    checkout.setAttribute("min", today);

    // ===============================
    // 2. Update Checkout Min Date
    // ===============================

    checkin.addEventListener("change", function () {
        checkout.value = "";
        checkout.setAttribute("min", checkin.value);
    });

    // ===============================
    // ===============================
// Form Submission Validation
// ===============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    errorMsg.style.color = "red";
    errorMsg.textContent = "";

    if (!checkin.value || !checkout.value) {
        errorMsg.textContent = "Please select both check-in and check-out dates.";
        return;
    }

    const checkinDate = new Date(checkin.value);
    const checkoutDate = new Date(checkout.value);

    if (checkoutDate <= checkinDate) {
        errorMsg.textContent = "Check-out date must be after check-in date.";
        return;
    }

    errorMsg.style.color = "green";
    errorMsg.textContent = "Booking submitted successfully!";
});

});