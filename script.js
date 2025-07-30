const countdownEl = document.getElementById("countdown");
const currentDateEl = document.getElementById("currentDate");

// Show current date
function updateDateTime() {
  const now = new Date();
  currentDateEl.textContent = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Countdown logic
function updateCountdown() {
  const now = new Date();
  const targetDate = new Date("March 12, 2026 00:00:00");
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update date every 1 min
updateCountdown();
setInterval(updateCountdown, 1000); // Update countdown every 1 sec

// Chart.js setup
const ctx = document.getElementById("progressChart").getContext("2d");
const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Tasks Completed",
      backgroundColor: "#4caf50",
      borderColor: "#4caf50",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

const progressChart = new Chart(ctx, {
  type: "bar",
  data: chartData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // You can adjust this based on max tasks
        ticks: {
          stepSize: 1,
          precision: 0 // Ensures whole numbers only
        },
      },
    },
  },
});

// Toggle icons and update chart
function toggleIcon(icon) {
  icon.classList.toggle("fa-circle");
  icon.classList.toggle("fa-check-circle");
  icon.classList.toggle("completed");
  icon.classList.contains("fa-check-circle")
    ? icon.setAttribute("data-checked", "true")
    : icon.setAttribute("data-checked", "false");

  updateChart();
}

// Update chart when icons are toggled
function updateChart() {
  const todayIndex = new Date().getDay(); // Sunday=0, so adjust for chart (Mon=0)
  const adjustedIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  const icons = document.querySelectorAll(".todo-item i[data-checked]");
  let completedCount = 0;
  icons.forEach((icon) => {
    if (icon.getAttribute("data-checked") === "true") {
      completedCount++;
    }
  });

  chartData.datasets[0].data[adjustedIndex] = completedCount;
  progressChart.update();
}