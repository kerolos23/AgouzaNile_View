// Get input elements for check-in and check-out dates
let checkInDateInput = document.querySelector("#checkin-date");
let checkOutDateInput = document.querySelector("#checkout-date");
let airnbnElement = document.querySelector(".bnb");
let priceElement = document.querySelector(".tatal-price-card");
let bookingButtonElement = document.querySelector("#booking-button");
let calcAccommodationElement = document.querySelector("#calc-accommodation");
let accommodationTotalPriceElement = document.querySelector("#accommodation-total-price");
let selectedElement = document.getElementById('guests');
let calcDiscountedElement = document.querySelector("#calc-discounted");
let discountedTotalPriceElement = document.querySelector("#discounted-total-price");
let totalPriceCountElement = document.querySelector("#total-price-count");
let totalPriceCountdiscountElement = document.querySelector("#total-price-dicount");
let accommodationElement = document.querySelector(".accommodation");
let totalPrice = document.querySelector(".total-price");
let specialElement = document.querySelector(".special");
let discountElement = document.querySelector(".discount");
let discountPriceElement = document.querySelector(".discount-price");
let extraGuestElement = document.querySelector(".extra-guest");
let extraGuestSpan = document.querySelector("#extra-guest");
let extraPriceSpan = document.querySelector("#extra-price");
let selectedElementValue = selectedElement.options[selectedElement.selectedIndex];

// Get the current date
let currentDate = new Date();
let currentDay = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1 < 10  ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

// Format the current date as yyyy-mm-dd
let formattedCurrentDate = [currentYear, currentMonth, currentDay].join("-");

// Set the minimum and default value for the check-in date input
checkInDateInput.setAttribute("min", formattedCurrentDate);
checkInDateInput.setAttribute("value", formattedCurrentDate);

// Calculate the date three days later
let today = new Date(currentDate);
let threeDaysLatter = new Date(today);
threeDaysLatter.setDate(today.getDate() + 3);

// Format the check-out date three days later as yyyy-mm-dd
let checkOutDay = threeDaysLatter.getDate() < 10 ? `0${threeDaysLatter.getDate()}` : threeDaysLatter.getDate();
let checkOutMonth = threeDaysLatter.getMonth() + 1 < 10 ? `0${threeDaysLatter.getMonth() + 1}` : threeDaysLatter.getMonth() + 1;
let checkOutYear = threeDaysLatter.getFullYear();

let formattedCheckOutDate = [checkOutYear, checkOutMonth, checkOutDay].join("-");

// Set the minimum value for the check-out date input
checkOutDateInput.setAttribute("min", formattedCheckOutDate);

// Add an event listener to the check-in date input to update the minimum value of the check-out date
checkInDateInput.addEventListener("change", function () {
    updateCheckOutMinDate()
});

// Function to calculate the check-out date three days later
function calculateThreeDaysLater () {
    let dateValue = checkInDateInput.value.split("-");

    let dayValue = dateValue[1];

    let dayArray = dayValue.split("");

    let totalDate = [dateValue[0], ];

    if (dayArray[0] == 0) {
        dayArray.shift("0"); // Remove leading zero
        totalDate.push(Number(...dayArray));
        totalDate.push(dateValue[2])
    } else {
        totalDate.push(Number(dayArray.join("")));
        totalDate.push(dateValue[2])
    }

    let today = new Date(totalDate);
    let threeDaysLatter = new Date(today);
    threeDaysLatter.setDate(today.getDate() + 3);

    let day = threeDaysLatter.getDate() < 10 ? `0${threeDaysLatter.getDate()}` : threeDaysLatter.getDate();
    let month = threeDaysLatter.getMonth() + 1 < 10 ? `0${threeDaysLatter.getMonth() + 1}` : threeDaysLatter.getMonth() + 1;
    let year = threeDaysLatter.getFullYear();

    let dateArray = [year, month, day].join("-");
    return dateArray;
}

// Function to update the minimum value of the check-out date input
function updateCheckOutMinDate () {
    checkOutDateInput.setAttribute("min", `${calculateThreeDaysLater()}`);
    checkOutDateInput.value = ""
};

// Function to hide Airbnb element
function hideAirbnbElement () {
    airnbnElement.style.display = "none";
};

// Function to show the accommodation price
function showPrice () {
    priceElement.classList.remove("close-price")
};

// Function to enable the booking button
function enableBookingButton () {
    bookingButtonElement.classList.remove("disabled");
    bookingButtonElement.classList.add("booking");
};

// Function to calculate accommodation price
function calculateAccommodationPrice () {
    let totalDays = calculateTotalDays(); // Calculate the total number of days 
    const cleaningFee = 10;
    let basePricePerDay = 32;
    const accommodationCost = Math.ceil(totalDays * basePricePerDay );
    const discountedDailyRate = Math.ceil(basePricePerDay * calculateDiscountPercent(totalDays));
    const discountedAccomodationCost = Math.ceil(totalDays * discountedDailyRate);
    const totalPrice =  accommodationCost + cleaningFee;
    const totalPriceWithDiscount =  discountedAccomodationCost + cleaningFee;
    
    // Update HTML elements with calculated values
    calcAccommodationElement.textContent= `${basePricePerDay}$ X ${totalDays} Nights`;
    accommodationTotalPriceElement.textContent= `${accommodationCost}$`;
    calcDiscountedElement.textContent= `${discountedDailyRate}$ X ${totalDays} Nights`;
    discountedTotalPriceElement.textContent= `${discountedAccomodationCost}$`;
    totalPriceCountElement.textContent= `${totalPrice}$`;
    totalPriceCountdiscountElement.textContent= `${totalPriceWithDiscount}$`;
    return {totalPrice, totalPriceWithDiscount}
}

// Function to activate no discount mode
function activateNoDiscountMode () {
    const fullDays = calculateTotalDays();
    if (fullDays < 7) {
        specialElement.style.display= "flex";
        accommodationElement.classList.remove("disabled-dsc");
        totalPrice.classList.remove("disabled-dsc");
        discountElement.classList.add("close-dsc");
        discountPriceElement.classList.add("close-dsc");
    }
}

// Function to activate discount element
function activateDiscountElement () {
    const fullDays = calculateTotalDays();
    if (fullDays >= 7) {
        specialElement.style.display= "none";
        accommodationElement.classList.add("disabled-dsc");
        totalPrice.classList.add("disabled-dsc");
        discountElement.classList.remove("close-dsc");
        discountPriceElement.classList.remove("close-dsc");
    }
}

// Function to calculate the discount percentage based on the number of days
function calculateDiscountPercent(days){
    if (days >= 7 && days < 14) {
        return 0.93;
    } else if (days >= 14 && days < 30) {
        return 0.90;
    } else if (days >= 30) {
        return 0.85;
    }
    else {
        return 1;
    };
};

// Function to calculate the total number of days between check-in and check-out dates
function calculateTotalDays () {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const checkInDate = new Date(checkInDateInput.value);
    const checkOutDate = new Date(checkOutDateInput.value);
    
    const differenceInDays = Math.round(Math.abs((checkInDate - checkOutDate) / oneDayInMilliseconds));
    
    return differenceInDays;
};

// Function to check the number of guests and calculate extra guest fees
function checkGeusts () {
    let selectedGuestsValue = selectedElement.options[selectedElement.selectedIndex].value;
    const extraGuestPrice = 25;
    const fullDays = calculateTotalDays();

    if (selectedGuestsValue <= 5) {
        extraGuestElement.style.display= "none";
    } 
    else if (selectedGuestsValue > 5) {
        extraGuestElement.style.display= "block";
        let priceForExtraGuests = Math.ceil(extraGuestPrice * (selectedGuestsValue - 5) * fullDays);
        extraGuestSpan.textContent= `${extraGuestPrice}$ X ${selectedGuestsValue - 5} Guest(s) X ${fullDays} Nights`
        extraPriceSpan.textContent= `${priceForExtraGuests}$`;
        updateTextContent(priceForExtraGuests);
    }
};

// Function to update the total price with extra guest fees
function updateTextContent(priceForExtraGuests) {
    let totalPrice = calculateAccommodationPrice().totalPrice;
    let totalPriceWithDiscount = calculateAccommodationPrice().totalPriceWithDiscount;
    totalPriceCountElement.innerHTML= `${totalPrice + priceForExtraGuests}$`;
    totalPriceCountdiscountElement.textContent= `${totalPriceWithDiscount + priceForExtraGuests}$`;
};

// Event listener for changing the number of guests
selectedElement.addEventListener("change", function() {
    updateGuest();
});

// Function to update guests when the check-out date is changed
function updateGuest () {
    if (checkOutDateInput.value != "") {
        checkGeusts();
    };
};

// Event listener for changing the check-out date
checkOutDateInput.addEventListener("change", function () {
    hideAirbnbElement();
    showPrice()
    enableBookingButton();
    calculateAccommodationPrice();
    activateNoDiscountMode();
    activateDiscountElement();
    checkGeusts();
}) 

// Selecting DOM elements
let popupContainer = document.querySelector(".popup-container");
let popup = document.querySelector(".popup");
let submitButton = document.querySelector("#submit-button");
let emailInput = document.querySelector("#email");
let whatsAppInput = document.querySelector("#whatsapp");
let emailLable = document.querySelector(".email-lable span");
let whatsAppLable = document.querySelector(".whatsapp-lable span");
let confirmPopup = document.querySelector(".confirm-popup");
let confirmButton = document.querySelector("#conf-button");
let fieldsElement = document.querySelector("#fields");

// Event listener for booking button
bookingButtonElement.addEventListener("click", function () {
     // Check if the booking button is not disabled, then open the popup
    if (bookingButtonElement.classList.contains("disabled") == false) {
        openPopup();
    };
});

// Function to open the popup
function openPopup() {
    popupContainer.classList.add("open-popup-cont");
    popup.classList.add("active-popup")
}

// Event listener for submit button
submitButton.addEventListener("click", function() {
    validateInputsfunc ()
})

// Regular expressions for email and WhatsApp validation
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const whatsappPattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

// Function to validate user inputs
function validateInputsfunc () {
    if (emailInput.value == "" && whatsAppInput.value == "") {
        showEmptyFieldsfunc ();
        fieldsElement.style.display= "block";
    }
    else if (emailInput.value != "" && emailPattern.test(emailInput.value) == false) {
        showInvalidEmailfunc();
    }
    else if (whatsAppInput.value != "" && whatsappPattern.test(whatsAppInput.value) == false) {
        showInvalidWhatsappfunc();
    }
    else {
        popupContainer.classList.remove("open-popup-cont");
        sendEmailfunc();
        confirmPopup.style.display= "flex";
    }
}

// Function to show error for empty fields
function showEmptyFieldsfunc () {
    emailInput.classList.add("field");
    whatsAppInput.classList.add("field");
    emailLable.classList.add("field-lable-active");
    whatsAppLable.classList.add("field-lable-active");
}

// Function to show error for invalid email
function showInvalidEmailfunc () {
    emailInput.classList.add("field");
    emailLable.classList.add("field-lable-active");
}

// Function to show error for invalid WhatsApp
function showInvalidWhatsappfunc() {
    whatsAppInput.classList.add("field");
    whatsAppLable.classList.add("field-lable-active");
}

// Event listener to remove error styles when inputs are focused
emailInput.addEventListener("focus", function () {
    emailInput.classList.remove("field");
    whatsAppInput.classList.remove("field");
    emailLable.classList.remove("field-lable-active");
    whatsAppLable.classList.remove("field-lable-active");
})

// Event listener to close the popup when clicking outside
window.addEventListener("click", closeOutSide);
function closeOutSide(el) {
    if(el.target == popupContainer){
        popupContainer.classList.remove("open-popup-cont");
    };
};

// Function to send email (Placeholder, you need to implement actual email sending logic)
function sendEmailfunc () {

    Email.send({
        SecureToken : "2676c301-eece-44eb-b8e6-5f17b33d7f15",
        To : 'agouzanileview@outlook.com',
        From : `kerolosamiel3@gmail.com`,
        Subject : "Booking",
        Body :`
            Email: ${emailInput.value == " " ? "Not Found" : emailInput.value} <br>
            WhatsApp: ${whatsAppInput.value == " " ? "Not Found" : whatsAppInput.value} <br>
            Check In: ${checkInDateInput.value} <br>
            Check Out: ${checkOutDateInput.value} <br>
            Guests: ${selectedElement.options[selectedElement.selectedIndex].value} <br>
            Nights: ${calculateTotalDays()} <br>
            TotalPrice: ${calculateAccommodationPrice().totalPrice}$ <br>
            discout: ${calculateTotalDays() < 7 ? "There is no discount" : calculateAccommodationPrice().totalPriceWithDiscount}$ <br>
        `
    });
};