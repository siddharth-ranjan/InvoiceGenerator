function addItem() {
    const invoiceDetails = document.getElementById("invoiceDetails");

    const itemDiv = document.createElement("div");

    itemDiv.innerHTML = `
        <label>Item</label>
        <input type="text" name="item" placeholder="Item">
        <label>Quantity</label>
        <input type="number" name="quantity" placeholder="Quantity" min="1">
        <label>Unit Price</label>
        <input type="number" name="unitPrice" placeholder="Unit Price" min="0.01" step="0.01" inputmode="decimal">
        <label>Discount</label>
        <input type="number" name="discount" placeholder="Discount" min="0.01" step="0.01" inputmode="decimal" max="100">
        <br>
    `;

    invoiceDetails.appendChild(itemDiv);  // Append the new div to the container
}

document.addEventListener("DOMContentLoaded", function () {
    const invoiceForm = document.getElementById("invoiceForm");

    invoiceForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get customer details
        const username = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Get the dynamically added items
        const itemElements = document.querySelectorAll("#invoiceDetails > input");

        console.log("itemElements->", itemElements);  // Logs the NodeList of item divs

        const items = [];
        itemElements.forEach(input => {
            // Check the name of the input element to handle the specific data
            if (input.name === 'item') {
                const item = input.value;
                const quantity = parseInt(document.querySelector("input[name='quantity']").value);
                const unitPrice = parseFloat(document.querySelector("input[name='unitPrice']").value);
                let discount = parseFloat(document.querySelector("input[name='discount']").value);

                if (isNaN(discount) || discount < 0) {
                    discount = 0; // Default discount to 0 if invalid or empty
                }

                // Push each item with its details
                items.push({ item, quantity, unitPrice, discount });
            }
        });

        console.log("Username:", username);  // Check username
        console.log("Email:", email);  // Check email
        console.log("Items:", items);  // Check items array

        const payload = {
            username,
            email,
            items
        };

        console.log(payload);  // Log the final payload for testing

        // Fetch logic (commented out for testing)
        fetch("/invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(response => response.text())
            .then(data => console.log("Server Response:", data))
            .catch(error => console.error("Error:", error));
    });
});