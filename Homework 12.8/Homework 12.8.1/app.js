const giftArr = [
    {
        title: "Скидка 20% на первую покупку в нашем магазине!",
        icon: "/img/discount.svg"
    },
    {
        title: "Скидка 10% на всё!",
        icon: "/img/discount_2.svg"
    },
    {
        title: "Подарок при первой покупке в нашем магазине!",
        icon: "/img/gift.svg"
    },
    {
        title: "Бесплатная доставка для вас!",
        icon: "/img/delivery.svg"
    },
    {
        title: "Сегодня день больших скидок!",
        icon: "/img/discount_3.svg"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        showRandomGiftPopup();
    }, 3000);
});

function showRandomGiftPopup() {
    const randomIndex = Math.floor(Math.random() * giftArr.length);
    const selectedGift = giftArr[randomIndex];

    const popup = document.getElementById("gift-popup");
    const title = document.getElementById("gift-title");
    const icon = document.getElementById("gift-icon");
    const closeButton = document.getElementById("close-button");

    title.textContent = selectedGift.title;
    icon.src = selectedGift.icon;

    popup.classList.remove("hidden");

    closeButton.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
}
