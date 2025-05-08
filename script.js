
document.getElementById("animateBtn").addEventListener("click", function () {
    const element = document.getElementById("animatedElement");

    // Retrieve stored preference for background color
    let colorPreference = getPreference("preferredColor");

    // Apply multiple transformations and background change
    element.style.transition = "transform 1.6s ease-in-out, opacity 0.6s ease-in-out, background 0.6s ease-in-out";
    element.style.transform = "rotate(1080deg) translateX(100px) scale(1.2)";
    element.style.opacity = "0.7";
    element.style.background = colorPreference;

    // Reset animation after a short delay
    setTimeout(() => {
        element.style.transform = "rotate(0deg) translateX(0) scale(1)";
        element.style.opacity = "1";
        element.style.background = "royalblue";
    }, 600);
});

// Function to store user preferences in localStorage
function savePreference(key, value) {
    localStorage.setItem(key, value);
}

// Function to retrieve user preferences from localStorage
function getPreference(key) {
    return localStorage.getItem(key) || "royalblue"; // Default color
}

// Save user preference when color is selected
document.getElementById("colorPicker").addEventListener("change", function () {
    let selectedColor = this.value;
    savePreference("preferredColor", selectedColor);
});

function saveImageToLocalStorage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
            images.push(event.target.result); // Add new image
            localStorage.setItem("galleryImages", JSON.stringify(images)); // Update storage
            loadPreviousImages(); // Refresh gallery
        };
        reader.readAsDataURL(file); // Convert image to Base64
    }
}

function loadPreviousImages() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Clear current images

    let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
    images.forEach((src, index) => {
        let imgContainer = document.createElement("div"); // Wrapper for image + button
        imgContainer.classList.add("image-container");

        let img = document.createElement("img");
        img.src = src;
        img.alt = "Stored Image";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.onclick = () => removeImage(index); // Pass index to delete function

        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteBtn);
        gallery.appendChild(imgContainer);
    });
}

function removeImage(index) {
    let images = JSON.parse(localStorage.getItem("galleryImages")) || [];
    images.splice(index, 1); // Remove selected image
    localStorage.setItem("galleryImages", JSON.stringify(images)); // Update storage
    loadPreviousImages(); // Refresh gallery
}

function clearAllImages() {
    let confirmation = confirm("Are you sure you want to delete all images?");
    if (confirmation) {
        localStorage.removeItem("galleryImages"); // Delete stored images
        document.querySelector(".gallery").innerHTML = ""; // Clear gallery visually
    }
}


