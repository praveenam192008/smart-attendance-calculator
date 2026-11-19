// Change labels based on the selected mode

const mode = document.getElementById("mode");

mode.addEventListener("change", function () {

    if (mode.value === "days") {
        document.getElementById("unit1").textContent = "Working Days";
        document.getElementById("unit2").textContent = "Days";
        document.getElementById("unit3").textContent = "days";
    } else {
        document.getElementById("unit1").textContent = "Classes";
        document.getElementById("unit2").textContent = "Classes";
        document.getElementById("unit3").textContent = "classes";
    }

});


// Main attendance calculation

function calculate() {

    let total = Number(document.getElementById("total").value);
    let attended = Number(document.getElementById("attended").value);
    let minimum = Number(document.getElementById("minimum").value);
    let missed = Number(document.getElementById("missed").value);

    // Validate inputs

    if (
        !Number.isInteger(total) ||
        !Number.isInteger(attended) ||
        !Number.isInteger(missed) ||
        total <= 0 ||
        attended < 0 ||
        attended > total ||
        missed < 0 ||
        minimum <= 0 ||
        minimum > 100
    ) {
        alert("Please enter valid attendance details!");
        return;
    }

    let required = minimum / 100;

    // Calculate current percentage

    let percentage = (attended / total) * 100;

    // Calculate maximum absences allowed

    let bunks = Math.max(
        0,
        Math.floor((attended / required) - total + 0.0000001)
    );

    // Calculate recovery classes

    let recovery = 0;

    if (percentage < minimum) {

        if (minimum === 100) {
            recovery = "Not possible";
        } else {
            recovery = Math.ceil(
                (required * total - attended) /
                (1 - required) - 0.0000001
            );
        }
    }

    // Calculate predicted attendance

    let prediction = (attended / (total + missed)) * 100;

    // Display results

    document.getElementById("percentage").textContent =
        percentage.toFixed(2) + "%";

    document.getElementById("bunks").textContent = bunks;

    document.getElementById("recovery").textContent = recovery;

    document.getElementById("prediction").textContent =
        prediction.toFixed(2) + "%";

    // Update progress bar

    document.getElementById("progressBar").style.width =
        Math.min(percentage, 100) + "%";

    // Attendance status

    let status = document.getElementById("status");

    if (percentage >= minimum) {
        status.textContent = "You meet the minimum attendance requirement!";
        status.className = "status safe";
    } else {
        status.textContent = "Warning! Your attendance is below the required percentage.";
        status.className = "status danger";
    }

    // Planned absence warning

    if (prediction < minimum) {
        status.textContent += " Your planned absences will take you below the minimum requirement.";
    }

    // Special recovery message

    if (recovery === "Not possible") {
        status.textContent += " Reaching 100% is impossible after past absences.";
    } else if (recovery > 0) {
        status.textContent += " Attend " + recovery +
            " consecutive classes/days to reach your target.";
    }

    document.getElementById("results").hidden = false;

}


// Reset all fields

function resetCalculator() {

    document.getElementById("total").value = "";
    document.getElementById("attended").value = "";
    document.getElementById("minimum").value = "75";
    document.getElementById("missed").value = "0";

    document.getElementById("results").hidden = true;

}