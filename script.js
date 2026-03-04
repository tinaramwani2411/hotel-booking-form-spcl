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
// Room Prices
// ===============================

const roomPrices = {
    single: 2000,
    double: 3500,
    suite: 5000
};

const roomType = document.getElementById("roomType");
const totalPrice = document.getElementById("totalPrice");

// ===============================
// Calculate Total Price
// ===============================

function calculatePrice() {

    if (!checkin.value || !checkout.value || !roomType.value) {
        totalPrice.value = "₹0";
        return;
    }

    const checkinDate = new Date(checkin.value);
    const checkoutDate = new Date(checkout.value);

    const timeDifference = checkoutDate - checkinDate;
    const nights = timeDifference / (1000 * 60 * 60 * 24);

    if (nights > 0) {
        const pricePerNight = roomPrices[roomType.value];
        const total = nights * pricePerNight;
        totalPrice.value = "₹" + total;
    } else {
        totalPrice.value = "₹0";
    }
}

// ===============================
// Event Listeners
// ===============================

roomType.addEventListener("change", calculatePrice);
checkin.addEventListener("change", calculatePrice);
checkout.addEventListener("change", calculatePrice);

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