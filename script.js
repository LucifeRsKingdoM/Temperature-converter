function convertTemperature() {
    var temperatureInput = parseFloat(document.getElementById("temperatureInput").value);
    var unitSelect = document.getElementById("unitSelect").value;

    if (isNaN(temperatureInput)) {
        alert("Please enter a valid number for temperature.");
        return;
    }

    var result;
    if (unitSelect === "celsius") {
        result = {
            fahrenheit: (temperatureInput * 9 / 5) + 32,
            kelvin: temperatureInput + 273.15
        };
    } else if (unitSelect === "kelvin") {
        result = {
            celsius: temperatureInput - 273.15,
            fahrenheit: (temperatureInput - 273.15) * 9 / 5 + 32
        };
    }   else if (unitSelect === "fahrenheit") {
        result = {
            celsius: (temperatureInput - 32) * 5 / 9,
            kelvin: (temperatureInput - 32) * 5 / 9 + 273.15
        };
    }

    // Extend container and display result area with transition effect
    var container = document.querySelector(".container");
    container.style.transition = "max-height 0.9s ease, opacity 0.9s ease"; // Add transition effect
    container.style.maxHeight = "800px"; // Extend container

    // Display result with transition effect and add hover effect class
    var resultArea = document.getElementById("resultArea");
    var previousResult = resultArea.innerHTML; // Store the previous result
    resultArea.innerHTML = "";
    for (var unit in result) {
        resultArea.innerHTML += result[unit].toFixed(2) + " " + unit.charAt(0).toUpperCase() + unit.slice(1) + "<br>";
    }
    resultArea.classList.add("hover-effect");

    // Only update liquid levels if the result has changed
    if (resultArea.innerHTML !== previousResult) {
        updateLiquidLevels();
    }

    // Update test tube names
    updateTestTubeNames(result);
}

function updateLiquidLevels() {
    var liquidElements = document.querySelectorAll('.liquid');
    liquidElements.forEach(function(liquid) {
        var randomHeight = Math.random() * 100; // Generate a random height between 0 and 100
        liquid.style.height = randomHeight + "%";
    });
}

function clearForm() {
    // Clear input fields
    document.getElementById("temperatureInput").value = "";
    document.getElementById("unitSelect").selectedIndex = 0;

    // Clear result area
    var resultArea = document.getElementById("resultArea");
    resultArea.innerHTML = "";

    // Clear liquid elements
    var liquidElements = document.querySelectorAll('.liquid');
    liquidElements.forEach(function(liquid) {
        liquid.style.height = "0";
    });

    // Reset container height and remove hover effect class
    var container = document.querySelector(".container");
    container.style.transition = "max-height 0.9s ease, opacity 0.9s ease"; // Add transition effect
    container.style.maxHeight = "300px"; // Reset container height
    resultArea.classList.remove("hover-effect");

    // Reset test tube names
    var testTubeNames = document.querySelectorAll('.test-tube-name');
    testTubeNames.forEach(function(name) {
        name.innerText = "";
    });
}

function updateTestTubeNames(result) {
    var resultKeys = Object.keys(result);
    var testTubeNames = document.querySelectorAll('.test-tube-name');

    testTubeNames[0].innerText = result[resultKeys[0]].toFixed(2) + " " + resultKeys[0].charAt(0).toUpperCase() + resultKeys[0].slice(1);
    testTubeNames[1].innerText = result[resultKeys[1]].toFixed(2) + " " + resultKeys[1].charAt(0).toUpperCase() + resultKeys[1].slice(1);
}

 // Function to update date, day, year, and time
 function updateDateTime() {
            var currentDate = new Date();
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('date').textContent = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
            document.getElementById('day').textContent = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            document.getElementById('year').textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric' });
            document.getElementById('time').textContent = currentDate.toLocaleTimeString('en-US');
        }

        // Call the function initially to set the initial values
        updateDateTime();

        // Update date, day, year, and time every second
        setInterval(updateDateTime, 1000);