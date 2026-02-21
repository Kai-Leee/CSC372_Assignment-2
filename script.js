/*
  Name: Kai Lee
  Date: 02.20.2026
  CSC 372-01

  This script adds Favorites functionality to the Campus Eats page by dynamically
  creating price tags and favorite buttons for each dish card, and updating a
  favorites summary list and running total using event listeners.
*/
let favoriteList = new Map();
const prices = [10.1, 12.0, 9.8, 14.8, 14.2, 15, 12.8, 11.1, 9.8]

document.addEventListener('DOMContentLoaded', () => {
    createFavoriteList();
    addButtonsNPrice();
})

function createFavoriteList() {
    let main = document.querySelector('main');

    const section = document.createElement("section");
    section.id = "favorites";

    const title = document.createElement("h4");
    title.textContent = "Favorites";
    const ul = document.createElement("ul");
    ul.id = "favorites-list";
    const totalP = document.createElement("p");
    totalP.id = "favorites-total";
    const strong = document.createElement("strong");
    strong.textContent = "Total:";
    const textNode = document.createTextNode(" $");
    const totalSpan = document.createElement("span");
    totalSpan.id = "total-amount";
    totalSpan.textContent = "0";

    totalP.appendChild(strong);
    totalP.appendChild(textNode);
    totalP.appendChild(totalSpan);

    section.appendChild(title);
    section.appendChild(ul);
    section.appendChild(totalP);

    main.appendChild(section);
}

function addButtonsNPrice() {
    const dishCards = document.querySelectorAll(".dish-card");

    dishCards.forEach((dishCard, idx) => {

        dishCard.id = String(idx);
        let price = prices[idx % prices.length];
        let name = dishCard.querySelector('h4').textContent;

        const priceP = document.createElement("p");
        priceP.className = "price-tag";
        priceP.textContent = `$${price.toFixed(2)}`;

        const btn = document.createElement("button");
        btn.className = "favorite-button";
        btn.textContent = "Add to Favorites";

        btn.addEventListener("click", () => {
            let ul = document.querySelector("#favorites-list");

            if (!dishCard.classList.contains("is-favorite")) {
                dishCard.classList.add("is-favorite");
                btn.textContent = "Remove Favorite";

                favoriteList.set(dishCard.id, price);

                let li = document.createElement("li");
                li.id = `fav-${dishCard.id}`
                li.textContent = `${name} - $${price.toFixed(2)}`;

                ul.appendChild(li);
            } else {
                dishCard.classList.remove("is-favorite");
                btn.textContent = "Add to Favorites";

                favoriteList.delete(dishCard.id);

                const li = document.querySelector(`#fav-${dishCard.id}`);
                li.remove();
            }
            let total = 0;
            for (let i of favoriteList.values()) {
                total += i;
            }

            let totalMount = document.querySelector("#total-amount");
            totalMount.textContent = `${total.toFixed(2)}`;
        });

        dishCard.appendChild(priceP);
        dishCard.appendChild(btn);

    });
}


