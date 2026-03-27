function createContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  fetch("/create-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      phone: phone
    })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("result").innerText = "Success!";
  })
  .catch(err => {
    document.getElementById("result").innerText = "Error!";
    console.error(err);
  });
}