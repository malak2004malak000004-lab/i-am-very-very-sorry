const stars = document.querySelectorAll('.message-star');
const messageBox = document.getElementById('message-text');

stars.forEach(star => {
    star.addEventListener('click', () => {
        messageBox.textContent = star.getAttribute('data-msg');
        messageBox.classList.add('show');
    });
});