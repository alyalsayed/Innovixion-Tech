document.addEventListener("DOMContentLoaded", function () {
  // Get references to the input fields and buttons
  const dayInput = document.getElementById("day");
  const hourInput = document.getElementById("hour");
  const minuteInput = document.getElementById("minute");
  const secondInput = document.getElementById("seconds");
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");
  const resetButton = document.getElementById("reset");

  let totalTimeInSeconds;
  let countdownInterval;
  let isTimerRunning = false; // Variable to track timer state

  // Function to set initial values for inputs
  function setInitialValues() {
    dayInput.value = 0;
    hourInput.value = 0;
    minuteInput.value = 0;
    secondInput.value = 0;
  }

  // Call the function initially to set default values
  setInitialValues();

  // Function to start the countdown timer
  function startTimer() {
    // Calculate total time in seconds
    totalTimeInSeconds =
      parseInt(dayInput.value) * 86400 +
      parseInt(hourInput.value) * 3600 +
      parseInt(minuteInput.value) * 60 +
      parseInt(secondInput.value);

    // Update the timer every second
    countdownInterval = setInterval(updateTimer, 1000);

    // Hide start button and show pause and reset buttons
    startButton.style.display = "none";
    pauseButton.textContent = "Pause";
    pauseButton.style.display = "block";
    resetButton.style.display = "block";

    // Update timer state
    isTimerRunning = true;
  }

  // Function to update the countdown timer
  function updateTimer() {
    // Calculate remaining time in days, hours, minutes, and seconds
    const days = Math.floor(totalTimeInSeconds / 86400);
    const hours = Math.floor((totalTimeInSeconds % 86400) / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    // Update the input fields with the remaining time
    dayInput.value = days;
    hourInput.value = hours;
    minuteInput.value = minutes;
    secondInput.value = seconds;

    // Stop the timer when time is up
    if (totalTimeInSeconds <= 0) {
      clearInterval(countdownInterval);
      showModal(); // Show modal when time is up
      resetTimer();
    } else {
      totalTimeInSeconds--;
    }
  }

  // Function to pause the countdown timer
  function pauseTimer() {
    clearInterval(countdownInterval);

    // Change button text to "Resume"
    pauseButton.textContent = "Resume";

    // Update timer state
    isTimerRunning = false;
  }

  // Function to resume the countdown timer
  function resumeTimer() {
    // Resume the timer
    startTimer();
  }

  // Function to toggle between pausing and resuming the countdown timer
  function toggleTimerPause() {
    if (isTimerRunning) {
      // If timer is running, pause it
      pauseTimer();
    } else {
      // If timer is paused, resume it
      resumeTimer();
    }
  }

  // Function to reset the countdown timer
  function resetTimer() {
    clearInterval(countdownInterval);

    // Reset input fields to zero
    setInitialValues();

    // Hide pause and reset buttons and show start button
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
    startButton.style.display = "block";

    // Reset timer state
    isTimerRunning = false;
  }

  // Event listeners for buttons
  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", toggleTimerPause);
  resetButton.addEventListener("click", resetTimer);

  // Event listeners for input fields
  dayInput.addEventListener("input", updateTimerWhileRunning);
  hourInput.addEventListener("input", updateTimerWhileRunning);
  minuteInput.addEventListener("input", updateTimerWhileRunning);
  secondInput.addEventListener("input", updateTimerWhileRunning);

  // Function to update the timer while it's running and input values change
  function updateTimerWhileRunning() {
    if (isTimerRunning) {
      // Stop the current timer
      clearInterval(countdownInterval);
      // Restart the timer with the new input values
      startTimer();
    }
  }

  // Get the modal
  const modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Function to show the modal
  function showModal() {
    modal.style.display = "block";
  }
});
