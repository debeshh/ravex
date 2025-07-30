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

// Flip-style countdown
function updateCountdown() {
  const now = new Date();
  const targetDate = new Date("March 12, 2026 00:00:00");
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

updateDateTime();
setInterval(updateDateTime, 60000); // Every minute
updateCountdown();
setInterval(updateCountdown, 1000); // Every second

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
        max: 5,
        ticks: {
          stepSize: 1,
          precision: 0
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

function updateChart() {
  const todayIndex = new Date().getDay(); // Sunday=0
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