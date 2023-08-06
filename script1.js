// payGapData object containing average salary and years of experience data for each region
let payGapData = {
  delhi: [
    {
      averageSalaryMen: 65000,
      averageSalaryWomen: 55000,
      averageYearsOfExperienceMen: 8.5,
      averageYearsOfExperienceWomen: 7.5,
    },
    {
      averageSalaryMen: 72000,
      averageSalaryWomen: 60000,
      averageYearsOfExperienceMen: 9.2,
      averageYearsOfExperienceWomen: 8.0,
    },
    // Add more data for Delhi as needed
  ],
  bombay: [
    {
      averageSalaryMen: 70000,
      averageSalaryWomen: 57500,
      averageYearsOfExperienceMen: 8.2,
      averageYearsOfExperienceWomen: 7.0,
    },
    {
      averageSalaryMen: 68800,
      averageSalaryWomen: 56000,
      averageYearsOfExperienceMen: 7.9,
      averageYearsOfExperienceWomen: 6.8,
    },
    // Add more data for Bombay as needed
  ],
  chennai: [
    {
      averageSalaryMen: 68000,
      averageSalaryWomen: 56800,
      averageYearsOfExperienceMen: 8.0,
      averageYearsOfExperienceWomen: 6.5,
    },
    {
      averageSalaryMen: 72500,
      averageSalaryWomen: 58500,
      averageYearsOfExperienceMen: 8.7,
      averageYearsOfExperienceWomen: 7.0,
    },
    // Add more data for Chennai as needed
  ],
  northeast: [
    {
      averageSalaryMen: 70800,
      averageSalaryWomen: 57500,
      averageYearsOfExperienceMen: 8.3,
      averageYearsOfExperienceWomen: 7.0,
    },
    {
      averageSalaryMen: 68200,
      averageSalaryWomen: 56200,
      averageYearsOfExperienceMen: 7.9,
      averageYearsOfExperienceWomen: 6.8,
    },
    // Add more data for Northeast as needed
  ],
  // Add more regions with their respective data
};

let myChart; // Global variable to store the chart instance

// Function to calculate pay gap and update the result and graph
function calculatePayGap() {
  const yearsOfExperience = parseFloat(
    document.getElementById("yearsOfExperience").value
  );
  const selectedRegion = document.getElementById("region").value;

  if (!payGapData[selectedRegion]) {
    alert("Invalid region selection.");
    return;
  }

  const regionData = payGapData[selectedRegion];
  let totalPayGap = 0;

  for (const data of regionData) {
    const {
      averageSalaryMen,
      averageSalaryWomen,
      averageYearsOfExperienceMen,
      averageYearsOfExperienceWomen,
    } = data;

    const adjustedSalaryMen =
      (averageSalaryMen * yearsOfExperience) / averageYearsOfExperienceMen;
    const adjustedSalaryWomen =
      (averageSalaryWomen * yearsOfExperience) / averageYearsOfExperienceWomen;

    const genderPayGap =
      ((adjustedSalaryMen - adjustedSalaryWomen) / adjustedSalaryMen) * 100;

    totalPayGap += genderPayGap;
  }

  const averagePayGap = totalPayGap / regionData.length;

  const resultMessage = `The average gender pay gap in ${selectedRegion} with ${yearsOfExperience} years of experience is ${averagePayGap.toFixed(
    2
  )}%.`;
  document.getElementById("result").textContent = resultMessage;
  document.getElementById("result").style.display = "block"; // Show the result message

  // Optionally, you can add a smooth scroll to the result message
  const resultElement = document.getElementById("result");
  resultElement.scrollIntoView({ behavior: "smooth", block: "center" });

  // Destroy the existing chart (if any)
  if (myChart) {
    myChart.destroy();
  }

  // Create and display the graph
  createGraph(averagePayGap);
}

// Function to create and display the graph
function createGraph(payGap) {
  var ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Gender Pay Gap"],
      datasets: [
        {
          label: "Pay Gap (%)",
          data: [payGap],
          backgroundColor: ["rgba(255, 64, 129, 0.6)"],
          borderColor: ["rgba(255, 64, 129, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
