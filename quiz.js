document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".quiz-card", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  });

  renderHistory();

  document.getElementById('submitBtn').addEventListener('click', showResult);
  document.getElementById('shareBtn').addEventListener('click', shareResult);
  document.getElementById('clearHistory').addEventListener('click', () => {
    localStorage.removeItem('teaweb_history');
    renderHistory();
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
  const shareBtn = document.getElementById('shareBtn');

  if (!q1 || !q2 || !q3) {
    if (text) text.textContent = "يرجى اختيار جميع الإجابات ✨";
    if (icon) icon.textContent = "";
    if (shareBtn) shareBtn.style.display = 'none';
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
  if (shareBtn) shareBtn.style.display = 'inline-block';

  // animation
  gsap.from(".result", { opacity: 0, y: 10, duration: 0.4 });

  // focus result for accessibility
  if (text) text.setAttribute('tabindex', '-1');
  if (text) text.focus();

  // save to history
  saveResult({ tea, theme, emoji, at: new Date().toISOString() });
  renderHistory();
}

function saveResult(entry) {
  try {
    const key = 'teaweb_history';
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    // keep last 20
    const trimmed = arr.slice(0, 20);
    localStorage.setItem(key, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

function renderHistory() {
  const key = 'teaweb_history';
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  if (arr.length === 0) {
    list.innerHTML = '<li class="empty">ليس هناك نتائج حتى الآن.</li>';
    return;
  }
  arr.forEach(item => {
    const li = document.createElement('li');
    const date = new Date(item.at);
    li.innerHTML = `<span class="h-emoji">${item.emoji}</span> <span class="h-text">${item.tea}</span> <span class="h-date">— ${date.toLocaleString('ar-SA')}</span>`;
    list.appendChild(li);
  });
}

function shareResult() {
  const textEl = document.getElementById('resultText');
  const iconEl = document.getElementById('resultIcon');
  if (!textEl || !iconEl) return;
  const text = textEl.textContent || '';
  const emoji = iconEl.textContent || '🍵';

  // create canvas card
  const w = 1000, h = 600;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = '#FFF8F9';
  ctx.fillRect(0,0,w,h);

  // left accent
  ctx.fillStyle = '#DFF0E1';
  ctx.fillRect(0,0,200,h);

  // emoji
  ctx.font = '120px sans-serif';
  ctx.fillText(emoji, 60, 160);

  // title
  ctx.fillStyle = '#2b3a33';
  ctx.font = 'bold 48px "Readex Pro", sans-serif';
  const lines = wrapText(ctx, text, w - 260);
  let y = 160;
  ctx.textAlign = 'left';
  lines.forEach(line => { y += 56; ctx.fillText(line, 240, y); });

  // footer
  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#6b6b6b';
  ctx.fillText('Shahad\'s Tea Corner', 240, h - 40);

  // open in new tab
  const dataUrl = canvas.toDataURL('image/png');
  const win = window.open();
  if (win) {
    win.document.write(`<img src="${dataUrl}" alt="نتيجتي في اختبار الشاي">`);
  } else {
    // fallback: download
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'tea-result.png';
    a.click();
  }
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());
  return lines;
}
