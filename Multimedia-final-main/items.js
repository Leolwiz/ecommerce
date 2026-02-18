document.addEventListener("DOMContentLoaded", function () {

    // Always reload cart fresh from localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const cartCounts = document.querySelectorAll(".cart-count");

    updateCartCount();

    // =========================
    // ADD TO CART
    // =========================
    document.querySelectorAll(".add-button").forEach(button => {

        button.addEventListener("click", function () {

            const product = this.closest(".detail-cover");
            if (!product) return;

            const nameEl = product.querySelector(".product-name");
            const priceEl = product.querySelector(".product-price");
            const imageEl = product.querySelector(".product-img");

            if (!nameEl || !priceEl) return;

            const name = nameEl.textContent.trim();

            
            const price = priceEl.textContent
                .replace("KSH", "")
                .replace(",", "")
                .trim();

            const image = imageEl ? imageEl.src : "";

            const item = { name, price, image };

            let cart = getCart();

            cart.push(item);

            saveCart(cart);

            updateCartCount();

            // Button animation
            const originalHTML = button.innerHTML;
            button.innerHTML = "Added ✓";
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }, 1000);

        });

    });

    // =========================
    // UPDATE CART COUNT
    // =========================
    function updateCartCount() {

        const cart = getCart();

        cartCounts.forEach(span => {

            span.textContent = cart.length;

            span.classList.add("pop");

            setTimeout(() => {
                span.classList.remove("pop");
            }, 200);

        });

    }

    // =========================
    // DARK MODE
    // =========================
    const darkToggle = document.getElementById("dark-toggle");

    if (darkToggle) {

        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark");
            darkToggle.checked = true;
        }

        darkToggle.addEventListener("change", function () {

            if (this.checked) {
                document.body.classList.add("dark");
                localStorage.setItem("darkMode", "enabled");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("darkMode", "disabled");
            }

        });

    }

});
