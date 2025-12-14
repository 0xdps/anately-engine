document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input = this.querySelector('input[type="email"]');
    const notification = document.getElementById('notification');
    const email = input.value;
    
    // Simulate storing the email
    if (email) {
        notification.textContent = '✓ Thank you! We\'ll notify you soon.';
        notification.classList.add('success');
        notification.classList.remove('error');
        input.value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            notification.textContent = '';
            notification.classList.remove('success');
        }, 5000);
    } else {
        notification.textContent = 'Please enter a valid email.';
        notification.classList.add('error');
        notification.classList.remove('success');
    }
});
