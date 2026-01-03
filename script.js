function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// document.addEventListener("DOMContentLoaded", () => {
//     const sections = {
//       home: 0,
//       why: document.getElementById("benefits"),
//       products: document.getElementById("products")
//     };
  
//     const navLinks = document.querySelectorAll(".nav-center a");
  
//     function setActive(linkName) {
//       navLinks.forEach(link => link.classList.remove("active"));
//       const target = document.querySelector(`[data-nav="${linkName}"]`);
//       if (target) target.classList.add("active");
//     }
  
//     window.addEventListener("scroll", () => {
//       const scrollPos = window.scrollY + 120;
  
//       if (sections.products && scrollPos >= sections.products.offsetTop) {
//         setActive("products");
//       } else if (sections.why && scrollPos >= sections.why.offsetTop) {
//         setActive("why");
//       } else {
//         setActive("home");
//       }
//     });
//   });

  const bodyClass = document.body.classList;

if (bodyClass.contains("page-about")) {
  document
    .querySelector('[data-nav="about"]')
    ?.classList.add("active");
}


  

//   document.addEventListener("DOMContentLoaded", () => {
//     const params = new URLSearchParams(window.location.search);
  
//     if (params.get("success") === "true") {
//       const toast = document.getElementById("success-toast");
//       const btn = document.getElementById("submit-btn");
  
//       if (btn) {
//         btn.textContent = "Message Sent";
//         btn.disabled = true;
//         btn.classList.add("sent");
//       }
  
//       if (toast) {
//         toast.classList.add("show");
//         setTimeout(() => {
//           toast.classList.remove("show");
//         }, 3000);
//       }
//     }
//   });
  


  
  // Add to cart
//   document.addEventListener("click", function (e) {
//     if (!e.target.classList.contains("btn-cart")) return;
  
//     const btn = e.target;
  
//     const product = {
//       id: btn.dataset.id,
//       name: btn.dataset.name,
//       price: Number(btn.dataset.price),
//       qty: 1
//     };
  
//     let cart = getCart();
//     const existing = cart.find(i => i.id === product.id);
  
//     if (existing) {
//       existing.qty += 1;
//     } else {
//       cart.push(product);
//     }
  
//     saveCart(cart);
  
//     // Instant feedback
//     btn.textContent = "Added ✓";
//     btn.disabled = true;
  
//     setTimeout(() => {
//       btn.textContent = "ADD TO CART";
//       btn.disabled = false;
//     }, 600);
//   });
  
  
  // Init cart count on page load
  document.addEventListener("DOMContentLoaded", updateCartCount);

  
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
  
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
  }
  
  function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
  
    container.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalEl.textContent = "0";
      return;
    }
  
    cart.forEach(item => {
      total += item.price * item.qty;
  
      container.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
          </div>
  
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
          </div>
        </div>
      `;
    });
  
    totalEl.textContent = total;
  }
  
  function changeQty(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
  
    if (!item) return;
  
    item.qty += delta;
  
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  
    saveCart(cart);
  }
  
  function removeItem(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
  }
  
//   document.addEventListener("DOMContentLoaded", () => {
//     renderCart();
//     updateCartCount();
//   });
  

document.addEventListener("DOMContentLoaded", () => {

    // ===== NAV ACTIVE STATE =====
    const sections = {
      home: document.getElementById("benefits"),
      why: document.getElementById("benefits"),
      products: document.getElementById("products")
    };
  
    const navLinks = document.querySelectorAll(".nav-center a");
  
    function setActive(linkName) {
      navLinks.forEach(link => link.classList.remove("active"));
      const target = document.querySelector(`[data-nav="${linkName}"]`);
      if (target) target.classList.add("active");
    }
  
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 120;
  
      if (sections.products && scrollPos >= sections.products.offsetTop) {
        setActive("products");
      } else if (sections.why && scrollPos >= sections.why.offsetTop) {
        setActive("why");
      } else {
        setActive("home");
      }
    });
  
    // About page highlight
    if (document.body.classList.contains("page-about")) {
      document.querySelector('[data-nav="about"]')?.classList.add("active");
    }
  
    // Contact success toast
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const toast = document.getElementById("success-toast");
      const btn = document.getElementById("submit-btn");
  
      if (btn) {
        btn.textContent = "Message Sent";
        btn.disabled = true;
        btn.classList.add("sent");
      }
  
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      }
    }
  
    // Cart init
    updateCartCount();
  
    // Render cart ONLY if cart page
    if (document.getElementById("cart-items")) {
      renderCart();
    }
  });
  


  function renderCheckout() {
    const cart = getCart();
    const list = document.getElementById("checkout-items");
    const subtotalEl = document.getElementById("summary-subtotal");
    const shippingEl = document.getElementById("summary-shipping");
    const grandEl = document.getElementById("summary-grand");
  
    list.innerHTML = "";
  
    let subtotal = 0;
    let totalWeight = 0;
  
    cart.forEach(item => {
      subtotal += item.price * item.qty;
      totalWeight += item.weight * item.qty;
  
      list.innerHTML += `<li>${item.name} × ${item.qty} — ₹${item.price * item.qty}</li>`;
    });
  
    // SHIPPING RULE
    let shipping = 0;
    if (totalWeight <= 2) shipping = 40;
    else if (totalWeight <= 5) shipping = 70;
    else if (totalWeight <= 10) shipping = 120;
    else shipping = 0;
  
    // TOTAL
    const grandTotal = subtotal + shipping;
  
    // INSERT VALUES
    subtotalEl.textContent = `₹${subtotal}`;
    shippingEl.textContent = `₹${shipping}`;
    grandEl.textContent = `₹${grandTotal}`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCheckout();
  });
  

  