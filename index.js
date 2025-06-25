import { menuArray } from "./data.js";

const menuHtml = menuArray.map(function(menu){
    return `
        <div class="flex justify-between items-center border-b py-4">
            <div class="text-3xl">${menu.emoji}</div>
            <div class="flex-1 px-4">
                <h3 class="text-lg font-bold">${menu.name}</h3>
                <p class="text-sm text-gray-600">${menu.ingredients.join(", ")}</p>
                <p class="text-sm font-semibold mt-1">$${menu.price}</p>
            </div>
            <button class="text-2xl border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200" data-add="${menu.id}">+</button>
        </div>
    `
})

document.getElementById("container").innerHTML = menuHtml.join("");
