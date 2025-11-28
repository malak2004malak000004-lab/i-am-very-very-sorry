

const galleryImages = document.querySelectorAll('.gallery-scroll img');

galleryImages.forEach(img => {
  img.addEventListener('click', async () => {
    const ask = confirm("Do you want to download this image?");
    if (!ask) return;

    try {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = "image.jpg"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to download 😒");
    }
  });
});

const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
  let direction = 1;
  setInterval(() => {
    bubble.style.transform = `translateY(${direction * 3}px)`;
    direction *= -1;
  }, 1000 + Math.random()*500); 
});

function goToNextPage() {
  window.location.href = "../nav/games.html"; 
}