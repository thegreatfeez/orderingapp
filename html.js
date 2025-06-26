import { menuArray } from "./data.js"

export function getMenuHtml() {
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

export function getOrderSectionHtml() {
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

export function getPaymentModalHtml() {
    return `
        <div id="payment-modal" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 hidden">
            <form class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full font-sans font-bold">
                <h3 class="text-xl text-center mb-4">Enter card details</h3>

               <input 
    type="text" 
    id="customer-name" 
    placeholder="Enter your name" 
    required 
    pattern="[A-Za-z]+" 
    title="Only letters allowed, no spaces"
    class="w-full border px-4 py-2 mb-3 rounded"
/>

<input 
    type="text" 
    id="card-number" 
    placeholder="Enter card number" 
    required 
    pattern="[0-9]+" 
    title="Only numbers allowed"
    class="w-full border px-4 py-2 mb-3 rounded"
/>

<input 
    type="text" 
    id="cvv" 
    placeholder="Enter CVV" 
    required 
    pattern="\\d{3}" 
    maxlength="3"
    title="Enter exactly 3 digits"
    class="w-full border px-4 py-2 mb-5 rounded"
/>


                <button 
                    type="submit" 
                    id="pay-btn" 
                    class="w-full bg-green-400 hover:bg-green-500 text-white py-2 rounded"
                >
                    Pay
                </button>
            </form>
        </div>
    `
}

