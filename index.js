import { menuArray } from "./data.js"
import { getMenuHtml, getOrderSectionHtml, getPaymentModalHtml } from './html.js';



const container = document.getElementById("container")
let orderArray = [];
let total = 0
function renderPage() {
    container.innerHTML = `
        ${getMenuHtml()}
        ${getOrderSectionHtml()}
        ${getPaymentModalHtml()}
    `
}

function renderOrder() {
    const orderContainer = document.getElementById("order-items")
    const totalPriceEl = document.getElementById("total-price")
    total = orderArray.reduce((sum,item)=> sum + item.price, 0)

    
    const itemsHtml = orderArray.map(item => {

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

renderPage()
