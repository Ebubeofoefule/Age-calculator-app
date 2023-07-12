const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const submitFormBtn = document.querySelector(".submitForm-btn");

// Add click event listener to submit the form
submitFormBtn.addEventListener("click", () => {
  const errorInfo = document.querySelectorAll(".error-info");
  const label = document.querySelectorAll("label");
  let input = [dayInput, monthInput, yearInput];
  let messages = [
    "Must be a valid day",
    "Must be a valid month",
    "Must be in the past",
  ];

  let error = {};

  for (let i = 0; i < input.length; i++) {
    // Function to pass in error
    let passError = () => {
      input[i].classList.add("error");
      label[i].classList.add("error");
      errorInfo[i].textContent = messages[i];
      error[input[i].id] = false;
      submitFormBtn.classList.add("translate");
    };

    if (!input[i].value) {
      // Display error for empty fields
      input[i].classList.add("error");
      label[i].classList.add("error");
      errorInfo[i].textContent = "This field is required";
      error[input[i].id] = false;
      submitFormBtn.classList.add("translate");
    } else {
      input[i].classList.remove("error");
      label[i].classList.remove("error");
      errorInfo[i].textContent = "";

      // Validate day input
      if (i === 0) {
        // Function to check valid date
        let isValidDate = (day, month, year) => {
          let date = new Date(year, month - 1, day);

          return (
            date.getDate() === day &&
            date.getMonth() + 1 === month &&
            date.getFullYear() === year
          );
        };

        let day = Number(input[i].value);
        let month = Number(input[1].value);
        let year = Number(input[2].value);

        if (!isValidDate(day, month, year)) {
          passError();
        } else {
          error[input[i].id] = true;
          submitFormBtn.classList.remove("translate");
        }
      }

      // Validate month input
      if (i === 1) {
        let month = Number(input[i].value);
        if (month < 1 || month > 12) {
          passError();
        } else {
          error[input[i].id] = true;
        }
      }

      // Validate year input
      if (i === 2) {
        let day = Number(input[0].value);
        let month = Number(input[1].value);
        let year = Number(input[i].value);
        let currentDate = new Date();
        // let currentYear = currentDate.getFullYear();
        let inputDate = new Date(year, month - 1, day);

        if (inputDate > currentDate) {
          passError();
        } else {
          error[input[i].id] = true;
        }
      }
    }
  }

  if (error.day && error.month && error.year) {
    // Function to calculate age
    let calcAge = (day, month, year) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      let years = currentYear - year;
      let months = currentMonth - month;
      let days = currentDay - day;

      if (
        currentMonth < month ||
        (currentMonth === month && currentDay < day)
      ) {
        years--;
        months += 12;
      }

      if (days < 0) {
        months--;
        let prevMonthDate = new Date(year, month - 1, 0);
        days += prevMonthDate.getDate();
      }

      return { years, months, days };
    };

    // Display user's age according to the inputs value
    let day = Number(dayInput.value);
    let month = Number(monthInput.value);
    let year = Number(yearInput.value);
    let age = calcAge(day, month, year);
    document.querySelector(".years-slot").textContent = age.years + " ";
    document.querySelector(".months-slot").textContent = age.months + " ";
    document.querySelector(".days-slot").textContent = age.days + " ";
  }
});
