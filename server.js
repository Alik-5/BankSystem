function reg(){
    fetch("http://localhost:80/DevO/0/odata/Contact",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}