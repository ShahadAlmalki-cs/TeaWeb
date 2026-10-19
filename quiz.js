document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".quiz-card", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  });
});

function showResult() {
  const q1El = document.getElementById("q1");
  const q2El = document.getElementById("q2");
  const q3El = document.getElementById("q3");

  const q1 = q1El ? q1El.value : "";
  const q2 = q2El ? q2El.value : "";
  const q3 = q3El ? q3El.value : "";

  const text = document.getElementById("resultText");
  const icon = document.getElementById("resultIcon");

  if (!q1 || !q2 || !q3) {
    if (text) text.textContent = "يرجى اختيار جميع الإجابات ✨";
    if (icon) icon.textContent = "";
    return;
  }

  // remove previous theme classes (keep this list in sync with themes used)
  const themes = ["chamomile", "green", "red", "fruit", "lavender", "peach"];
  themes.forEach(t => document.body.classList.remove(t));

  let tea = "";
  let theme = "";
  let emoji = "🍵";

  if (q1 === "calm" && q3 === "slow") {
    tea = "شاي البابونج";
    theme = "chamomile";
    emoji = "🌼";
  }
  else if (q2 === "nature" && q1 === "focus") {
    tea = "الشاي الأخضر";
    theme = "green";
    emoji = "🍃";
  }
  else if (q3 === "logic") {
    tea = "الشاي الأحمر";
    theme = "red";
    emoji = "🫖";
  }
  else if (q1 === "energy") {
    tea = "شاي الفواكه";
    theme = "fruit";
    emoji = "🍑";
  }
  else if (q2 === "warm") {
    tea = "شاي اللافندر";
    theme = "lavender";
    emoji = "💜";
  }
  else {
    tea = "شاي الخوخ";
    theme = "peach";
    emoji = "🍑";
  }

  document.body.classList.add(theme);
  if (text) text.textContent = `النكهة الأقرب لك: ${tea}`;
  if (icon) icon.textContent = emoji;

  // animation
  gsap.from(".result", { opacity: 0, y: 10, duration: 0.4 });

  // focus result for accessibility
  if (text) text.setAttribute('tabindex', '-1');
  if (text) text.focus();
}
