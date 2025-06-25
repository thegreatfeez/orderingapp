import { menuArray } from "./data.js"

const container = document.getElementById("container")
let orderArray = []

function getMenuHtml() {
    return menuArray.map(item => `
        <div class="flex justify-between items-center border-b-2 py-4">
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain" />
            <div class="flex-1 px-4">
                <h3 class="text-base28 font-normal">${item.name}</h3>
                <p class="text-base16 text-grayText font-normal">${item.ingredients.join(", ")}</p>
                <p class="text-base28 font-normal mt-1">₦${item.price}</p>
            </div>
            <button class="text-2xl border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200" data-add="${item.id}">+</button>
        </div>
    `).join("")
}

function getOrderSectionHtml() {
    return `
        <div id="order-section" class="mt-8">
            <h2 class="text-center text-base28 font-normal mb-4">Your order</h2>
            <div id="order-items" class="mb-4"></div>
            <hr class="mb-[20px] border-t-2 border-black">
            <div class="flex justify-between mb-6">
                <p class="text-base28 font-normal">Total price:</p>
                <p id="total-price" class="text-base28 font-normal">₦0</p>
            </div>
            <button id="complete-order-btn" class="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded font-verdana font-bold">
                Complete order
            </button>
        </div>
    `
}

function renderPage() {
    container.innerHTML = `
        ${getMenuHtml()}
        ${getOrderSectionHtml()}
    `
}

function renderOrder() {
    const orderContainer = document.getElementById("order-items")
    const totalPriceEl = document.getElementById("total-price")

    let total = 0
    const itemsHtml = orderArray.map(item => {
        total += item.price
        return `
            <div class="flex justify-between mb-2">
                <p class="text-base28 font-normal">
                    ${item.name}
                    <span class="text-base16 text-grayText ml-2 cursor-pointer" data-remove="${item.id}">remove</span>
                </p>
                <p class="text-base28 font-normal">₦${item.price}</p>
            </div>
        `
    }).join("")

    orderContainer.innerHTML = itemsHtml
    totalPriceEl.textContent = `₦${total}`
}

document.addEventListener("click", function (e) {
    // Add item
    if (e.target.dataset.add) {
        const itemId = Number(e.target.dataset.add)
        const selectedItem = menuArray.find(item => item.id === itemId)
        orderArray.push(selectedItem)
        renderOrder()
    }

    // Remove item
    if (e.target.dataset.remove) {
        const itemId = Number(e.target.dataset.remove)
        const indexToRemove = orderArray.findIndex(item => item.id === itemId)
        if (indexToRemove !== -1) {
            orderArray.splice(indexToRemove, 1)
        }
        renderOrder()
    }
})

renderPage()
