import { menuArray } from "./data.js"
import { getMenuHtml, getOrderSectionHtml, getPaymentModalHtml } from './html.js';
let orderArray = JSON.parse(localStorage.getItem("orderArray")) || []



const container = document.getElementById("container")

let total = 0
function renderPage() {
    container.innerHTML = `
        ${getMenuHtml()}
        ${getOrderSectionHtml(total)}
        ${getPaymentModalHtml()}
    `
}

function renderOrder() {
    const orderContainer = document.getElementById("order-items")
    const totalPriceEl = document.getElementById("total-price")
    total = orderArray.reduce((sum,item)=> sum + item.price * item.quantity, 0)

    const itemsHtml = orderArray.map(item => {
        return `
            <div class="flex justify-between mb-2">
                <p class="text-base28 font-normal">
                    ${item.name} x${item.quantity}
                    <span class="text-base16 text-grayText ml-2 cursor-pointer" data-remove="${item.id}">remove</span>
                </p>
                <p class="text-base28 font-normal">₦${item.price * item.quantity}</p>
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
        const existingOrderItem = orderArray.find(item => item.id === itemId)
        if (existingOrderItem) {
            existingOrderItem.quantity += 1
        } else {
            orderArray.push({ ...selectedItem, quantity: 1 })
        }
        localStorage.setItem("orderArray", JSON.stringify(orderArray))
        total = orderArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
        localStorage.setItem("total", total);
        renderPage()
        renderOrder()
    }

    // Remove item
    if (e.target.dataset.remove) {
        const itemId = Number(e.target.dataset.remove)
        const indexToRemove = orderArray.findIndex(item => item.id === itemId)
        if (indexToRemove !== -1) {
            if (orderArray[indexToRemove].quantity > 1) {
                orderArray[indexToRemove].quantity -= 1
            } else {
                orderArray.splice(indexToRemove, 1)
            }
            localStorage.setItem("orderArray", JSON.stringify(orderArray))
        }
        total = orderArray.reduce((sum, item) => sum + item.price * item.quantity, 0);
        localStorage.setItem("total", total);
        renderPage()
        renderOrder()
    }
    //Complete Order
    if (e.target.id === "complete-order-btn" && total > 1){
        document.getElementById('payment-modal').classList.remove('hidden')
    }
    
    //Pay
   if (e.target.id === "pay-btn") {
    e.preventDefault()

    const name = document.getElementById("customer-name").value.trim()
    const card = document.getElementById("card-number").value.trim()
    const cvv = document.getElementById("cvv").value.trim()

    if (name && card && cvv) {
        const firstName = name.split(" ")[0]
        document.getElementById("order-section").innerHTML = `
            <div class="bg-green-100 text-green-900 text-center py-4 px-6 rounded-md mt-6 max-w-md mx-auto font-semibold">
            Thanks, ${firstName}! Your order is on its way!
        `
        document.getElementById("payment-modal").classList.add("hidden")
        orderArray = []
    } else {
        alert("Please fill out all fields.")
    }
}

})

// On page load, recalculate total from orderArray before rendering
total = orderArray.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
renderPage()
renderOrder()