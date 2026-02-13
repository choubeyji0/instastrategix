document.querySelectorAll(".service-card button").forEach(button => {
    button.addEventListener("click", (e) => {
        const card = e.target.closest(".service-card");

        const service = {
            name: card.dataset.name,
            price: card.dataset.price
        };

        localStorage.setItem("selectedService", JSON.stringify(service));

        window.location.href = "checkout.html";
    });
});
const checkoutContainer = document.getElementById("checkoutDetails");

if (checkoutContainer) {
    const service = JSON.parse(localStorage.getItem("selectedService"));

    if (!service) {
        window.location.href = "payment.html";
    }

    checkoutContainer.innerHTML = `
        <h2>${service.name}</h2>
        <p>Amount: ₹${service.price}</p>
    `;

    document.getElementById("payNow").addEventListener("click", () => {

        const success = Math.random() > 0.3;

        if (success) {
            const history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
            history.push({
                ...service,
                date: new Date().toLocaleDateString()
            });

            localStorage.setItem("paymentHistory", JSON.stringify(history));
            window.location.href = "success.html";
        } else {
            window.location.href = "failed.html";
        }
    });
}
