console.log("Client side loaded ");

const form = document.querySelector("form");
const search = document.querySelector("input");
const result = document.querySelector("#m-1");
const result2 = document.querySelector("#m-2");
const result3 = document.querySelector("#m-3");
const isLoading = false;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);

  result.textContent = "Loading..";
  result2.textContent = ``;
  result3.textContent = ``;
  fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return (result.textContent = `${data.error}`);
      }
      console.log(data);

      result.textContent = `${data.forecast}`;
      result2.textContent = `latitude is ${data.latitude} and longitude is ${data.longitude}`;
      result3.textContent = `Location is ${data.location}`;
    });
  });
});
