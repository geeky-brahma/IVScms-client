function generateSimpleUniqueId() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2); // last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const randomPart = Math.random().toString(36).substring(2, 6); // 4-character random string

    return `${year}${month}${day}${hours}${minutes}${seconds}${randomPart}`;
}

// RAISE_NEW_COMPLAINT
let submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Unhide spinner and reference-info
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    const reference_info = document.getElementById('reference-info');
    reference_info.classList.remove('hidden');


    console.log("Button clicked")
    const uniqueId = generateSimpleUniqueId();
    console.log(uniqueId);
    // Gather form data
    let formData = {
        bankNo: document.querySelector("#bank-no").value,
        description: document.querySelector("#description").value,
        complaint_id: uniqueId,
        status: "Under Process"
    };
    
    // console.log(formData)
    // Send form data to the server
    sendData(formData, uniqueId);
});

function sendData(formData, uniqueId) {
    // Create XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Callback function to handle response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                console.log("Data sent successfully!");
                // Handle successful response from server if needed
                response_summary = JSON.parse(this.responseText)
                // response_summary = this.responseText
                console.log(response_summary)
                compID = document.querySelector("#compID")
                compID.innerHTML =`<div class="text-lg font-bold text-gray-800">Complaint ID Generated: ${uniqueId}</div>`
                const spinner = document.getElementById('spinner');
                spinner.classList.add('hidden');
            } else {
                console.error("Failed to send data. Status code: " + xhr.status);
                // Handle error response from server if needed
            }
        }
    };

    // Open a POST request to the server
    xhr.open("POST", "https://ivs-cms-b7e946df4103.herokuapp.com/data");

    // Set request headers
    xhr.setRequestHeader("Content-Type", "application/json");

    // Convert form data to JSON and send it to the server
    xhr.send(JSON.stringify(formData));
}

const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});



