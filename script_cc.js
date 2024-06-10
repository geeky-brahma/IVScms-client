// Check Complaint Status

document.getElementById('check-status-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    // Clear previous results
    document.getElementById('results-table-body').innerHTML = '';

    // Get input values
    const searchBy = document.querySelector('input[name="searchBy"]:checked').value;
    const searchValue = document.getElementById('search-input').value;
    let formData = {
        "searchBy": searchBy,
        "searchValue": searchValue
    };
    sendData(formData);
});

function sendData(formData) {
    // Create XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Callback function to handle response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                console.log("Data sent successfully!");
                // Handle successful response from server
                let responseSummary = JSON.parse(this.responseText);
                console.log(responseSummary)
                // Extract data from response
                let data = responseSummary['data'];
                data.forEach(item => {
                    let complaintId = item["complaint_id"];
                    let bankNo = item["bankNo"];
                    let status = item["status"];
                    let actionTaken = item["action-taken"];

                    // Create a new row and add the data
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="py-2 px-4 border-b text-center">${complaintId}</td>
                        <td class="py-2 px-4 border-b text-center">${bankNo}</td>
                        <td class="py-2 px-4 border-b text-center font-bold ${status === 'Under Process' ? 'text-red-500' : 'text-green-500'}">
                            ${status}
                        </td>
                        <td class="py-2 px-4 border-b text-center">
                            ${actionTaken ? actionTaken : 'No Action Taken'}
                        </td>
                    `;
                    document.getElementById('results-table-body').appendChild(row);
                });
                const spinner = document.getElementById('spinner');
                spinner.classList.add('hidden');

            } else {
                console.error("Failed to send data. Status code: " + xhr.status);
                // Handle error response from server if needed
            }
        }
    };

    // Open a POST request to the server
    xhr.open("POST", "https://ivs-cms-b7e946df4103.herokuapp.com/status");

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