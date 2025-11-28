(() => {
  const lever = document.getElementById('lever');
  const heartsContainer = document.getElementById('hearts');
  const typingEl = document.getElementById('typing');
  const spinSound = document.getElementById('spinSound');
  const winSound = document.getElementById('winSound');
  const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
  ];

  const emojis = ["🍃","🌸","🌞","🌱","🍀","🌷","🌻","🌿","✨","🌼"];
  const winMessages = [
    "You won, and so did I, knowing you 🌱",
  ];
  const loseMessages = [
    "So close! Try again 🍃",
    "No win this time, but you are amazing ",
    "Keep spinning, your luck awaits ",
    "Almost! Don’t give up 🌿"
  ];

  function randomEmoji() { return emojis[Math.floor(Math.random()*emojis.length)]; }
  function pause(ms){ return new Promise(r=>setTimeout(r,ms)); }

  async function typeText(targetEl, text) {
    targetEl.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    for (let i=0; i<=text.length; i++){
      targetEl.textContent = text.slice(0,i);
      if(!targetEl.querySelector('.cursor')) targetEl.appendChild(cursor);
      await pause(35 + Math.random()*40);
    }
    await pause(1600);
    targetEl.innerHTML = '';
  }

  async function pullLever() {
    spinSound.currentTime = 0;
    spinSound.play();

    lever.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(25deg)' }, { transform: 'rotate(0deg)' }],
      { duration: 300, easing: 'ease-in-out' }
    );

    const isWin = Math.random() < 0.5;
    let results = isWin
      ? Array(3).fill(randomEmoji())
      : [randomEmoji(), randomEmoji(), randomEmoji()];

    for (let t = 0; t < 15; t++) {
      reels.forEach(r => r.textContent = randomEmoji());
      await pause(80);
    }

    reels.forEach((r, i) => r.textContent = results[i]);

    if (isWin) {
      winSound.play();
      for (let i = 0; i < 15; i++) {
        spawnHeartFromDrawer();
        await pause(100 + Math.random()*100);
      }
      typeText(typingEl, winMessages[Math.floor(Math.random()*winMessages.length)]);
    } else {
      typeText(typingEl, loseMessages[Math.floor(Math.random()*loseMessages.length)]);
    }
  }

  function spawnHeartFromDrawer() {
    const heart = document.createElement('div');
    heart.className = 'real-heart';
    heart.textContent = '💚';

    const slot = document.querySelector('.drawer-slot');
    const containerRect = heartsContainer.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();

    const offsetX = (slotRect.left + slotRect.width / 2) - containerRect.left - 15;
    const offsetY = (slotRect.top + slotRect.height / 2) - containerRect.top - 10;

    heart.style.left = `${offsetX + (Math.random() * 10 - 5)}px`;
    heart.style.top = `${offsetY}px`;
    heart.style.animationDuration = `${2 + Math.random()}s`;

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }

  document.querySelector('.lever-wrap').addEventListener('click', pullLever);
})();
