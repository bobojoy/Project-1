const statusCodeInput = document.getElementById("status-code");
const clearBtn = document.getElementById("clear-btn");
const catImageContainer = document.getElementById("cat-image-container");

// Function to display cat images
function displayCatImage(imageUrl) {
  const img = document.createElement("img");
  img.src = imageUrl;
  catImageContainer.innerHTML = "";
  catImageContainer.appendChild(img);
}

// Function to fetch cat image data from the JSON server
function fetchCatImage(statusCode) {
  return fetch(`http://localhost:3000/catImages?statusCode=${statusCode}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching cat image");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        displayCatImage(data[0].image);
      } else {
        catImageContainer.innerHTML =
          "No cat image found for this status code.";
      }
    })
    .catch((error) => {
      console.error(error);
      catImageContainer.innerHTML = "Error fetching cat image";
    });
}

// Event listener on status code input field
statusCodeInput.addEventListener("input", (event) => {
  const statusCode = event.target.value;
  if (
    statusCode.length > 0 &&
    !isNaN(statusCode) &&
    statusCode >= 200 &&
    statusCode <= 599
  ) {
    fetchCatImage(statusCode);
  } else {
    catImageContainer.innerHTML = "";
  }
});

// Click event listener on "Clear" button
clearBtn.addEventListener("click", () => {
  statusCodeInput.value = "";
  catImageContainer.innerHTML = "";
});

// Event listener for Enter key press
statusCodeInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const statusCode = statusCodeInput.value;
    fetchAndDisplayCatImage(statusCode);
  }
});

document.addEventListener("click", (event) => {
  if (!statusCodeInput.contains(event.target)) {
    const statusCode = statusCodeInput.value;
    if (statusCode.length > 0 && !isNaN(statusCode)) {
      const catImage = getCatImage(statusCode);
      if (catImage) {
        displayCatImage(catImage.image);
      } else {
        catImageContainer.innerHTML =
          "No cat image found for this status code.";
      }
    }
  }
});
