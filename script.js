document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("content");

  const messages = {
    "new-moon": {
      images: ["new-moon1", "new-moon2"],
      text: "Just like the New Moon, our love is a fresh beginning. With you, every moment feels like a fresh start, a chance to fall in love all over again. You are always my beginning."
    },
    "waxing-crescent": {
      images: ["waxing-crescent1", "waxing-crescent2"],
      text: "Like the Waxing Crescent, My love for you grow stronger day by day. I cherish every moment we spend together."
    },
    "first-quarter": {
      images: ["first-quarter1", "first-quarter2"],
      text: "The First Quarter reminds me of how far we’ve come. We’ve built something beautiful together."
    },
    "waxing-gibbous": {
      images: ["waxing-gibbous1", "waxing-gibbous2"],
      text: "Our love is like the Waxing Gibbous—almost full, almost perfect, and always shining brighter. With you, I feel complete, yet always yearning for more of your heart. "
    },
    "full-moon": {
      images: ["full-moon1", "full-moon2"],
      text: "The Full Moon symbolizes the completeness I feel with you. You are my everything, and I’m so grateful to have you in my life."
    },
    "waning-gibbous": {
      images: ["waning-gibbous1", "waning-gibbous2"],
      text: "Even as the moon wanes, my love for you never fades. It only grows deeper and more meaningful."
    },
    "last-quarter": {
      images: ["last-quarter1", "last-quarter2"],
      text: "The Last Quarter reminds me that even in tough times, our love remains strong and resilient."
    },
    "waning-crescent": {
      images: ["waning-crescent1", "waning-crescent2"],
      text: "Like the Waning Crescent, our love is a quiet, steady fLike the Waning Crescent, our love is a quiet, steady force that guides me through life. No matter where I am, your love is my compass, always leading me back to you."
    }
  };

  let currentImages = []; // Track currently active images
  let clickCount = 0;

  function handleImageDisplay() {
    if (clickCount < currentImages.length) {
      // Show the next image
      const image = document.getElementById(currentImages[clickCount]);
      if (image) {
        image.classList.add("visible");
      }
      clickCount++;
    } else {
      // Reset images once all have been shown
      currentImages.forEach(imgId => {
        const image = document.getElementById(imgId);
        if (image) {
          image.classList.remove("visible");
        }
      });
      clickCount = 0;
    }
  }

  function showContent(phase) {
    const { images, text } = messages[phase];

    content.innerHTML = `<p>${text}</p>`;

    // Remove active class from all buttons
    document.querySelectorAll(".moon-phases button").forEach(button => {
      button.classList.remove("active");
    });

    // Add active class to the clicked button
    document.getElementById(`${phase}-btn`).classList.add("active");

    // Hide all previous images
    document.querySelectorAll(".content-image").forEach(image => {
      image.classList.remove("visible");
    });

    // Set new image list and reset click count
    currentImages = images;
    clickCount = 0;

    // Remove previous click event and add a new one
    content.removeEventListener("click", handleImageDisplay);
    content.addEventListener("click", handleImageDisplay);
  }

  // Add event listeners to buttons
  document.querySelectorAll(".moon-phases button").forEach(button => {
    button.addEventListener("click", function () {
      const phase = this.id.replace("-btn", ""); // Extract phase name
      showContent(phase);
    });
  });
});


// Timer and Moon Cycles Calculation
const startDate = new Date("2024-03-01"); // Your anniversary date
const moonCycleDays = 29.53; // Average length of a moon cycle in days

function updateTimer() {
  const currentDate = new Date();
  let timeDiff = currentDate - startDate;

  // If the start date is in the future, set timeDiff to 0
  if (timeDiff < 0) {
    timeDiff = 0;
  }

  // Calculate total years, months, and days
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();

  // Adjust for negative months or days
  if (days < 0) {
    // Get the last day of the previous month
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate(); // Add the total days of the previous month
    months--;
  }

  if (months < 0) {
    months += 12; // Adjust for negative months
    years--;
  }

  // If today is the anniversary, set to 1 year, 0 months, 0 days
  if (
    currentDate.getMonth() === startDate.getMonth() &&
    currentDate.getDate() === startDate.getDate()
  ) {
    years = currentDate.getFullYear() - startDate.getFullYear();
    months = 0;
    days = 0;
  }

  // Update the timer display
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;

  // Calculate moon cycles
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const moonCycles = (totalDays / moonCycleDays).toFixed(2);
  document.getElementById("cycles").textContent = moonCycles;
}

// Show Timer Modal
document.getElementById("show-timer-btn").addEventListener("click", function () {
  const modal = document.getElementById("timer-modal");
  modal.style.display = "flex"; // Show the modal
});

// Close Timer Modal
document.querySelector(".close-modal").addEventListener("click", function () {
  const modal = document.getElementById("timer-modal");
  modal.style.display = "none"; // Hide the modal
});

// Update the timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call to display the timer immediately

// Show Letter Modal
document.getElementById("read-me-btn").addEventListener("click", function () {
  const modal = document.getElementById("letter-modal");
  modal.style.display = "flex"; // Show the modal
});

// Close Letter Modal
document.querySelectorAll(".close-modal").forEach(closeBtn => {
  closeBtn.addEventListener("click", function () {
    const modal = this.closest(".modal");
    modal.style.display = "none"; // Hide the modal
  });
});

// Toggle PS Message
document.getElementById("ps-btn").addEventListener("click", function () {
  const psMessage = document.getElementById("ps-message");
  psMessage.classList.toggle("visible"); // Toggle visibility
});