function goBack(){ window.location.href='games.html'; }

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