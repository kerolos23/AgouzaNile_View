let sendMessageButton = document.querySelector(".submit");
let emailInputEle = document.querySelector("#Mail");
let whatsAppInputEle = document.querySelector("#phone");
let nameInput = document.querySelector("#name");
let messageInput = document.querySelector("#message");
let mailLabel = document.querySelector("#mail-label");
let phoneLabel = document.querySelector("#phone-label");
let confPopup = document.querySelector(".confirm-popup");
let confButton = document.querySelector("#conf-button");
let fieldP = document.querySelector("#fields_contact");

sendMessageButton.addEventListener("click", function () {
    validateInputs();
});


const emailMessagePattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const whatsappMassegePattern = /^([+]?)*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

// Function to validate user inputs
function validateInputs () {
    if (emailInputEle.value == "" && whatsAppInputEle.value == "") {
        showEmptyFields ();
        fieldP.style.display = "flex"
    }
    else if (emailInputEle.value != "" && emailMessagePattern.test(emailInputEle.value) == false) {
        showInvalidEmail();
    }
    else if (whatsAppInputEle.value != "" && whatsappMassegePattern.test(whatsAppInputEle.value) == false) {
        showInvalidWhatsapp();
    }
    else {
        sendEmail();
        emailInputEle.value = " ";
        whatsAppInputEle.value = " ";
        nameInput.value = " ";
        messageInput.value = " ";
        confPopup.style.display= "flex";
    }
}

function showEmptyFields () {
    emailInputEle.classList.add("field");
    mailLabel.classList.add("field-label")
    whatsAppInputEle.classList.add("field");
    phoneLabel.classList.add("field-label")
}

// Function to show error for invalid email
function showInvalidEmail () {
    emailInputEle.classList.add("field");
    mailLabel.classList.add("field-label")
}

// Function to show error for invalid WhatsApp
function showInvalidWhatsapp() {
    whatsAppInputEle.classList.add("field");
    phoneLabel.classList.add("field-label")
};

// Event listener to remove error styles when inputs are focused
emailInputEle.addEventListener("focus", function () {
    mailLabel.classList.remove("field-label")
    phoneLabel.classList.remove("field-label")
    emailInputEle.classList.remove("field");
    whatsAppInputEle.classList.remove("field");
})

whatsAppInputEle.addEventListener("focus", function() {
    mailLabel.classList.remove("field-label")
    phoneLabel.classList.remove("field-label")
    emailInputEle.classList.remove("field");
    whatsAppInputEle.classList.remove("field");
});


// Function to send email (Placeholder, you need to implement actual email sending logic)
function sendEmail () {

    Email.send({
        SecureToken : "2676c301-eece-44eb-b8e6-5f17b33d7f15",
        To : 'agouzanileview@outlook.com',
        From : `kerolosamiel3@gmail.com`,
        Subject : "Booking",
        Body :`
            name: ${nameInput.value == " " ? "Not Found" : nameInput.value} <br>
            Email: ${emailInputEle.value == " " ? "Not Found" : emailInputEle.value} <br>
            WhatsApp: ${whatsAppInputEle.value == " " ? "Not Found" : whatsAppInputEle.value} <br>
            message:${messageInput.value == " " ? "Not Found" : messageInput.value} <br>
            `
    });
};

// Event listener to close the popup when clicking outside
window.addEventListener("click", closeOutSidePopup);
function closeOutSidePopup(el) {
    if(el.target == confPopup){
        confPopup.style.display= "none";
    };
};

confButton.addEventListener("click", function() {
    closeConfirmPopup ();
});

function closeConfirmPopup () {
    confPopup.style.display= "none";
}