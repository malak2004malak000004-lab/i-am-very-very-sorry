const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
  window.location.href = 'games.html';
});

// 🫧 توليد الفقاعات العشوائية
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  const size = Math.random() * 60 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${6 + Math.random() * 5}s`;
  
  // 🎵 اختيار صوت عشوائي من 1 إلى 10
  const randomSound = Math.floor(Math.random() * 10) + 1;
  bubble.dataset.sound = `sound${randomSound}`;
  
  bubble.addEventListener('click', () => {
    const sound = document.getElementById(bubble.dataset.sound);
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
    // ✨ تأثير صغير عند الضغط
    bubble.style.transform = "scale(1.4)";
    setTimeout(() => {
      bubble.style.transform = "scale(1)";
    }, 200);
  });

  document.body.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 10000);
}

setInterval(createBubble, 500);