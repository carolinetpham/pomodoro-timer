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
  
    function startPomodoroCycle() {
      if (shortBreakCount < 3) {
        startTimer(shortBreakDuration, display, startPomodoro);
        shortBreakCount++;
      } else {
        startTimer(longBreakDuration, display, function () {
          shortBreakCount = 0; 
          startPomodoro(); 
        });
      }
    }
  
    function startPomodoro() {
      startTimer(pomodoroDuration, display, startPomodoroCycle);
    }
  
    startPomodoro(); // Start the first Pomodoro session
  };