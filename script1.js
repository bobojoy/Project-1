const apiUrl = "http://localhost:3000/images";

document.addEventListener("DOMContentLoaded", () => {
  const statusCodeInput = document.getElementById("status-code");
  const generateCatBtn = document.getElementById("generate-cat-btn");
  const clearBtn = document.getElementById("clear-btn");
  const catImageContainer = document.getElementById("cat-image-container");

  // Function to display cat images
  function displayCatImage(imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    catImageContainer.innerHTML = "";
    catImageContainer.appendChild(img);
  }

  // Function to fetch cat image data from the API
  function fetchCatImage(statusCode) {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const imageData = data.find((img) => img.statusCode === parseInt(statusCode));
        if (imageData && imageData.image) {
          displayCatImage(imageData.image);
        } else {
          throw new Error("No image found for the given status code");
        }
      })
      .catch((error) => {
        console.log("Fetch error:", error);
        catImageContainer.innerHTML = "Error fetching cat image";
      });
  }

  // Event listener for generating cat image
  generateCatBtn.addEventListener("click", () => {
    const statusCode = statusCodeInput.value;
    if (statusCode.length > 0 && !isNaN(statusCode) && statusCode >= 200 && statusCode <= 599) {
      fetchCatImage(statusCode);
    } else {
      catImageContainer.innerHTML = "Please enter a valid status code between 200 and 599";
    }
  });

  // Event listener for clearing input and image
  clearBtn.addEventListener("click", () => {
    statusCodeInput.value = "";
    catImageContainer.innerHTML = "";
  });

  // Event listener for handling Enter key press
  statusCodeInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();  // Prevent form submission
      const statusCode = statusCodeInput.value;
      if (statusCode.length > 0 && !isNaN(statusCode) && statusCode >= 200 && statusCode <= 599) {
        fetchCatImage(statusCode);
      }
    }
  });
});