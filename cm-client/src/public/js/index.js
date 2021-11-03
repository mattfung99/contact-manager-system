function getContacts() {
  fetch('http://localhost:3000/contact')
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
}
