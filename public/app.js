async function createContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const resultElement = document.getElementById("result");
    
    if (!name || !phone) {
        resultElement.innerText = "Please fill in both fields";
        return;
    }
    
    resultElement.innerText = "Creating contact...";
    
    try {
        const response = await fetch("/create-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone })
        });
        
        const data = await response.text();
        
        if (response.ok) {
            resultElement.innerText = "✅ Success! " + data;
            // Մաքրել դաշտերը
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
        } else {
            resultElement.innerText = "❌ Error: " + data;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        resultElement.innerText = "❌ Connection error: " + error.message;
    }
}