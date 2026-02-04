// ============================================================================
// Form Validation for Contact Page - Instastrategix
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ============================================================================
    // Validation Functions
    // ============================================================================

    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') return showError(nameInput, nameError, 'Name is required');
        if (name.length < 2) return showError(nameInput, nameError, 'Name must be at least 2 characters');
        return clearError(nameInput, nameError);
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') return showError(emailInput, emailError, 'Email is required');
        if (!emailPattern.test(email)) return showError(emailInput, emailError, 'Please enter a valid email address');
        return clearError(emailInput, emailError);
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject === '') return showError(subjectInput, subjectError, 'Subject is required');
        if (subject.length < 5) return showError(subjectInput, subjectError, 'Subject must be at least 5 characters');
        return clearError(subjectInput, subjectError);
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') return showError(messageInput, messageError, 'Message is required');
        if (message.length < 20) return showError(messageInput, messageError, 'Message must be at least 20 characters');
        return clearError(messageInput, messageError);
    }

    // ============================================================================
    // Helper Functions
    // ============================================================================

    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        return false;
    }

    function clearError(input, errorElement) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
    }

    function validateForm() {
        return validateName() && validateEmail() && validateSubject() && validateMessage();
    }

    // Real-time validation
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input === nameInput) validateName();
            else if (input === emailInput) validateEmail();
            else if (input === subjectInput) validateSubject();
            else if (input === messageInput) validateMessage();
        });
        input.addEventListener('blur', () => { if (input === nameInput) validateName(); });
    });

    // ============================================================================
    // Form Submission
    // ============================================================================

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulated API call
            setTimeout(() => {
                formSuccess.style.display = 'block';
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                contactForm.reset();

                setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);

                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }, 1500);
        } else {
            const firstError = document.querySelector('.form-control.error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // ============================================================================
    // Success/Error Messaging
    // ============================================================================

    function showSuccessMessage() {
        formSuccess.style.display = 'block';
        contactForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }

    function showErrorMessage(message) {
        let errorAlert = document.getElementById('formError');
        if (!errorAlert) {
            errorAlert = document.createElement('div');
            errorAlert.id = 'formError';
            errorAlert.className = 'form-error-alert';
            errorAlert.setAttribute('aria-live', 'polite');
            errorAlert.style.cssText = `
                background-color: #fee2e2;
                color: #dc2626;
                padding: var(--space-md);
                border-radius: var(--radius-md);
                margin-bottom: var(--space-md);
                border-left: 4px solid #dc2626;
            `;
            contactForm.insertBefore(errorAlert, contactForm.firstChild);
        }
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => { errorAlert.style.display = 'none'; }, 5000);

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }

    // ============================================================================
    // Optional: Character Counters
    // ============================================================================

    function addCharacterCounters() {
        const messageCounter = document.createElement('div');
        messageCounter.className = 'char-counter';
        messageCounter.style.cssText = `
            font-size: 0.875rem;
            color: var(--gray-color);
            text-align: right;
            margin-top: 4px;
        `;
        messageInput.parentElement.appendChild(messageCounter);

        function updateMessageCounter() {
            const length = messageInput.value.length;
            messageCounter.textContent = `${length}/500 characters`;
            if (length > 490) messageCounter.style.color = '#ef4444';
            else if (length > 450) messageCounter.style.color = '#f59e0b';
            else messageCounter.style.color = 'var(--gray-color)';
        }

        messageInput.addEventListener('input', updateMessageCounter);
        updateMessageCounter();
    }

    // Uncomment to enable counters
    // addCharacterCounters();
});
