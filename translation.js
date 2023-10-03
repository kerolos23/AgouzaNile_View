document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://api.mymemory.translated.net/get';// Add more elements as needed

  function translateText(text, lang, callback) {
    fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=en|${encodeURIComponent(lang)}`)
      .then(response => response.json())
      .then(data => {
        if (data.responseData && data.responseData.translatedText) {
          callback(data.responseData.translatedText);
        } else {
          alert('Error translating the text');
        }
      })
      .catch(() => {
        alert('Error translating the text');
      });
  }

  document.querySelectorAll('.language-dropdown-content a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      const buttonText = this.textContent;
      document.querySelector('.language-change-button').textContent = buttonText;
      
      document.querySelector('.language-change-button').addEventListener('click', function(e) {
        e.preventDefault();
        const dropdownContent = document.querySelector('.language-dropdown-content');
        dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
      });

      // Add the elements you want to translate inside this array
      const elementsToTranslate = [

        { selector: '#li-1 a', originalText: 'Description'},
        { selector: '#li-2 a', originalText: 'Gallery'},
        { selector: '#li-3 a', originalText: 'Reviews'},
        { selector: '#li-4 a', originalText: 'Location'},
        { selector: '#li-5 a', originalText: 'Availability'},

        { selector: '#description h1', originalText: 'Welcome to Agouza Nile View Apartment' },
        { selector: '#description h2', originalText: 'Experience unparalleled Nile views from our centrally-located apartment, nestled amidst Egypt\'s most iconic landmarks. Immerse yourself in a captivating fusion of breathtaking panoramas and cultural treasures, all at your doorstep'},
        
        { selector: '#li1', originalText: 'Open view on the Nile from all rooms'},
        { selector: '#li2', originalText: 'Fully air-conditioned spacious rooms and modern ameneties' },
        { selector: '#li3', originalText: 'Around 3.7 km from Tahrir Square, The Egyptian Museum and Cairo Tower'},
        { selector: '#li4', originalText: 'The apartment has a large living room, a salon, 2 bedrooms, a kitchen, a balcony and a bathroom'},
        { selector: '#li5', originalText: 'Staff speaks Arabic, English and Spanish, Available for support 24/7' },
        
        { selector: '#p1', originalText: 'Free Wifi'},
        { selector: '#p2', originalText: '55" HDTV with cable'},
        { selector: '#p3', originalText: 'Clean towels and bed covers'},
        { selector: '#p4', originalText: 'Free Parking'},
        { selector: '#p5', originalText: 'Hot water'},
        { selector: '#p6', originalText: 'Fridge'},
        { selector: '#p7', originalText: 'Stove'},
        { selector: '#p8', originalText: 'Microwave'},
        { selector: '#p9', originalText: 'Bath/Shower'},

        { selector: '#description a', originalText: 'Call us'},

        { selector: '#gallery h2', originalText: 'Gallery'},

        { selector: '#reviews h2', originalText: 'Reviews'},

        { selector: '#p1bubble', originalText: '500+ rentals on Airbnb and Booking.com'},
        { selector: '#p2bubble', originalText: '4★ rating on Airbnb and Booking.com'},
        { selector: '#p3bubble', originalText: 'Staff is available 24/7 for Support'},
        { selector: '#p4bubble', originalText: 'Staff is available 24/7 for Support'},
        { selector: '#p5bubble', originalText: 'Long term accommodation discounts!'},
       
        { selector: '#location h2', originalText: 'Location'},

        { selector: '#availability h2', originalText: 'Availability'},

        { selector: '#l1', originalText: 'Check-in date'},

        { selector: '#l2', originalText: 'Check-out date'},

        { selector: '#l3', originalText: 'Guests'},

        { selector: '#discount-banner', originalText: 'Special Offer: Enjoy a discount on stays of 7 days or more!'}, 

        { selector: '#credp1', originalText: 'Please provide your Email and / or Whatsapp number'},
        
        //{ selector: '#prices1', originalText: 'Accomodation Cost'},
        //{ selector: '#prices2', originalText: 'Cleaning fees'},
        { selector: '#book-now-button', originalText: 'Book now'},

        { selector: '#cred-warning', originalText: 'Email or Whatsapp needed for booking 😊'},
        { selector: '#blocked-message', originalText: 'The dates to are not available. Please select other dates'},
        { selector: '#enquiryTitle', originalText: 'Contact Us'},
        { selector: '#enquiryName', originalText: 'Name'},
        { selector: '#enquiryEnquiry', originalText: 'Enquiry'},
        { selector: '#enquirySubmit', originalText: 'Submit'},
       // { selector: 'your_selector_here', originalText: 'original_text_here' },
      ];

      elementsToTranslate.forEach(function (element) {
        if (lang === 'en') {
        document.querySelector(element.selector).textContent = element.originalText;}
      else {
        translateText(element.originalText, lang, function (translatedText) {
          document.querySelector(element.selector).textContent = translatedText;
        });
        }
      });
    });
  });
});