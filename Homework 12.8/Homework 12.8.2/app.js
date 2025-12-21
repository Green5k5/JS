const promocodeObj = {
    promocode: "PROM50",
    gift: "Скидка 50%"
};

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("promocode-form");
    const inputField = document.getElementById("promocode-input");
    const messageArea = document.getElementById("message-area");

    // Получить сохранённые данные из cookie
    const savedPromocode = getCookie("used_promocode");

    if(savedPromocode && savedPromocode === promocodeObj.promocode) {
        inputField.value = savedPromocode;
        applyPromotion(promocodeObj.gift);
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const enteredCode = inputField.value.trim();

        if(enteredCode === promocodeObj.promocode) {
            saveCookie("used_promocode", enteredCode);
            applyPromotion(promocodeObj.gift);
        } else {
            resetForm();
        }
    });

    function applyPromotion(giftMessage) {
        messageArea.textContent = `Поздравляем! Промокод успешно применён. Ваш подарок: ${giftMessage}.`;
        inputField.disabled = true;
    }

    function resetForm() {
        inputField.value = "";
        messageArea.textContent = "";
    }

    function saveCookie(name, value) {
        document.cookie = `${name}=${value}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    function getCookie() {
        return document.cookie.split('; ').reduce((acc, item) => {
            const [name, value] = item.split('=');
            acc[name] = value;
            return acc;
        }, {});
    }
});