/*
    ==================================
            Function for timer 
    ==================================
*/
function startTimer(duration, display, callback) {
  var timer = duration,
    minutes,
    seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      if (callback) callback(); // Call the function to switch the timer
    }
  }, 1000);
}

window.onload = function () {
  var display = document.querySelector("#timer");

  var pomodoroDuration = 1500; // 25 minutes
  var shortBreakDuration = 300; // 5 minutes
  var longBreakDuration = 900; // 15 minutes
  var shortBreakCount = 0;

  function updateTomatoes(shortBreakCount) {
    for (let i = 1; i <= 4; i++) {
      const tomato = document.getElementById(`tomato-${i}`);
      if (i <= shortBreakCount) {
        tomato.style.opacity = "1"; // Loaded tomato
      } else {
        tomato.style.opacity = "0.3"; // Unloaded tomato
      }
    }
  }

  function startPomodoroCycle() {
    if (shortBreakCount < 3) {
      shortBreakCount++;
      updateTomatoes(shortBreakCount); // Update tomatoes based on short breaks
      startTimer(shortBreakDuration, display, startPomodoro);
    } else {
      shortBreakCount = 0; // Reset for long break
      updateTomatoes(shortBreakCount); // Reset tomatoes
      startTimer(longBreakDuration, display, startPomodoro);
    }
  }

  function startPomodoro() {
    startTimer(pomodoroDuration, display, startPomodoroCycle);
  }

  startPomodoro(); // Start the first Pomodoro session
};

// TODO: figure out how to get the tomatoes to tick on and off depending on which break you're on
