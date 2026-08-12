const form = document.getElementById('consent-form');
const ackRisk = document.getElementById('ack-risk');
const noReliance = document.getElementById('no-reliance');
const enterBtn = document.getElementById('enter-citadel');

function checkConsent() {
    if (ackRisk.checked && noReliance.checked) {
        enterBtn.disabled = false;
    } else {
        enterBtn.disabled = true;
    }
}

ackRisk.addEventListener('change', checkConsent);
noReliance.addEventListener('change', checkConsent);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;

    const metaField = document.createElement('input');
    metaField.type = 'hidden';
    metaField.name = 'client_metadata';
    metaField.value = `Timestamp: ${timestamp} | UserAgent: ${userAgent}`;
    form.appendChild(metaField);

    fetch('https://formspree.io/f/your-unique-id', {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = 'citadel.html';
        } else {
            alert('Consent logging failed. Access denied.');
        }
    });
});
