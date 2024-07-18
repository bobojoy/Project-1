document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://staff-backened-ten.vercel.app/images";

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

  // Function to fetch cat image data from the API
  function fetchCatImage(statusCode) {
    fetch(`${apiUrl}/${statusCode}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching cat image");
        }
        return res.json();
      })
      .then((data) => {
        displayCatImage(data.imageUrl); // Assuming the response JSON has a property 'imageUrl'
      })
      .catch((error) => {
        console.error(error);
        catImageContainer.innerHTML = "Error fetching cat image";
      });
  }

  // Event listeners using forEach method
  [
    {
      element: statusCodeInput,
      event: "input",
      handler: handleStatusCodeInput,
    },
    { element: clearBtn, event: "click", handler: handleClearButtonClick },
    {
      element: statusCodeInput,
      event: "keypress",
      handler: handleEnterKeyPress,
    },
  ].forEach(({ element, event, handler }) => {
    element.addEventListener(event, handler);
  });

  // Callback functions for event listeners

  function handleStatusCodeInput(event) {
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
  }

  function handleClearButtonClick() {
    statusCodeInput.value = "";
    catImageContainer.innerHTML = "";
  }

  function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
      const statusCode = statusCodeInput.value;
      fetchCatImage(statusCode);
    }
  }
});
