document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".quiz-card", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  });
});

function showResult() {
  const q1 = q1El = document.getElementById("q1").value;
  const q2 = q2El = document.getElementById("q2").value;
  const q3 = q3El = document.getElementById("q3").value;

  const text = document.getElementById("resultText");
  const icon = document.getElementById("resultIcon");

  if (!q1 || !q2 || !q3) {
    text.textContent = "يرجى اختيار جميع الإجابات ✨";
    icon.textContent = "";
    return;
  }

  document.body.className = "";

  let tea = "";
  let theme = "";

  if (q1 === "calm" && q3 === "slow") {
    tea = "شاي البابونج";
    theme = "chamomile";
  }
  else if (q2 === "nature" && q1 === "focus") {
    tea = "الشاي الأخضر";
    theme = "green";
  }
  else if (q3 === "logic") {
    tea = "الشاي الأحمر";
    theme = "red";
  }
  else if (q1 === "energy") {
    tea = "شاي الفواكه";
    theme = "fruit";
  }
  else if (q2 === "warm") {
    tea = "شاي اللافندر";
    theme = "lavender";
  }
  else {
    tea = "شاي الخوخ";
    theme = "peach";
  }

  document.body.classList.add(theme);
  text.textContent = `النكهة الأقرب لك: ${tea}`;

  gsap.from(".result", { opacity: 0, y: 10, duration: 0.4 });

}
