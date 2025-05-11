document.addEventListener("DOMContentLoaded", () => {
  // Initialize elements
  const mainPage = document.getElementById("mainPage");
  const resultsPage = document.getElementById("resultsPage");
  const completeButton = document.getElementById("completeButton");
  const backButton = document.getElementById("backButton");
  const spotCount = document.getElementById("spotCount");
  const spottedList = document.getElementById("spottedList");
  const achievementMessage = document.getElementById("achievementMessage");

  // Load saved checkbox states
  const checkboxes = document.querySelectorAll(".bird-checkbox");
  checkboxes.forEach((checkbox) => {
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState === "true") {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", (e) => {
      localStorage.setItem(e.target.id, e.target.checked);
    });
  });

  const achievementMessages = {
    none: [
      "Ready to start your bird watching adventure!",
      "The birds are waiting to be discovered!",
      "Time to grab those binoculars and get started!",
    ],
    few: [
      "You're beginning your journey as a bird watcher!",
      "Getting started with some great spots!",
      "Every bird counts - keep going!",
    ],
    some: [
      "You're really getting into the swing of things!",
      "Impressive progress on your bird watching journey!",
      "You're developing quite the eye for birds!",
    ],
    many: [
      "Wow! You're becoming a serious bird spotter!",
      "Outstanding work - you're a natural!",
      "Your bird watching skills are soaring!",
    ],
    all: [
      "🏆 AMAZING! You've spotted all the birds!",
      "🌟 You're a master bird spotter!",
      "🎉 Perfect score! You're a bird watching champion!",
    ],
  };

  function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  function calculateResults() {
    const checkboxes = document.querySelectorAll(".bird-checkbox");
    const totalBirds = checkboxes.length;
    const checkedBirds = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    );
    const checkedCount = checkedBirds.length;

    // Get spotted bird names
    const spottedBirds = checkedBirds.map((checkbox) => {
      const card = checkbox.closest(".bird-card");
      return card.querySelector(".bird-name").textContent;
    });

    // Determine achievement level
    let messageCategory;
    const percentage = (checkedCount / totalBirds) * 100;

    if (checkedCount === 0) messageCategory = "none";
    else if (percentage <= 25) messageCategory = "few";
    else if (percentage <= 50) messageCategory = "some";
    else if (percentage < 100) messageCategory = "many";
    else messageCategory = "all";

    return {
      count: checkedCount,
      spottedBirds,
      message: getRandomMessage(achievementMessages[messageCategory]),
    };
  }

  completeButton.addEventListener("click", () => {
    const results = calculateResults();

    // Update results page
    spotCount.textContent = results.count;
    achievementMessage.textContent = results.message;
    spottedList.innerHTML = results.spottedBirds
      .map((bird) => `<li>${bird}</li>`)
      .join("");

    // Toggle visibility
    mainPage.style.display = "none";
    resultsPage.style.display = "block";
  });

  backButton.addEventListener("click", () => {
    mainPage.style.display = "block";
    resultsPage.style.display = "none";
  });
});