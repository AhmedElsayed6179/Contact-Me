document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const button = document.getElementById('submit-btn');
    const originalText = button.innerHTML;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const message = form.elements['message'].value.trim();

        if (!name || !email || !message) {
            button.innerHTML = 'Please fill out all fields';
            button.disabled = true;

            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
            }, 3000);
            return;
        }

        const formData = new FormData(form);

        button.disabled = true;
        button.innerHTML = 'Sending…';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://formspree.io/f/xrelbplz');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                button.innerHTML = 'Sent successfully ✔';
                form.reset();

                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                }, 4000);
            } 
            else {
                button.innerHTML = 'Failed to send ✖';

                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalText;
                }, 4000);
            }
        };

        xhr.onerror = () => {
            button.innerHTML = 'Network error ✖';

            setTimeout(() => {
                button.disabled = false;
                button.innerHTML = originalText;
            }, 4000);
        };

        xhr.send(formData);
    });
});
document.getElementById("year").textContent = new Date().getFullYear();