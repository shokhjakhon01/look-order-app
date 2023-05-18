const clientId = document.querySelector("#clientId");
const userForm = document.querySelector("#userForm");
const foodsForm = document.querySelector("#foodsForm");
const foodsCount = document.querySelector("#foodsCount");
const userHeader = document.querySelector("#userHeader");
const ordersList = document.querySelector(".orders-list");
const foodsSelect = document.querySelector("#foodsSelect");
const usernameInput = document.querySelector("#usernameInput");
const customersList = document.querySelector(".customers-list");
const telephoneInput = document.querySelector("#telephoneInput");

async function renderOrders(userId) {
  ordersList.innerHTML = null;

  const orders = await (
    await fetch(`http://localhost:5000/orders?userId=${userId}`)
  ).json();

  for (let order of orders.results) {
    const [li, img, div, count, name] = createElements(
      "li",
      "img",
      "div",
      "span",
      "span"
    );
    let food = order.food;

    count.textContent = order.count;
    name.textContent = food.foodName;

    li.classList.add("order-item");
    name.classList.add("order-name");
    count.classList.add("order-count");

    img.src = food.foodImg;

    div.append(name, count);
    li.append(img, div);
    ordersList.append(li);
  }
}

async function renderUsers() {
  customersList.innerHTML = null;

  const users = await (await fetch("http://localhost:5000/users")).json();

  for (let user of users.users) {
    const [li, span, a] = createElements("li", "span", "a");

    span.textContent = user.username;
    a.textContent = "+" + user.phone;

    span.classList.add("customer-name");
    li.classList.add("customer-item");
    a.classList.add("customer-phone");

    a.setAttribute("href", "tel:+" + user.phone);

    li.append(span, a);
    customersList.append(li);

    li.onclick = () => {
      renderOrders(user.userId);

      clientId.textContent = user.userId;
      userHeader.textContent = user.username;
    };
  }
}

async function renderFoods() {
  const foods = await (await fetch("http://localhost:5000/foods")).json();

  for (let food of foods.foods) {
    const [option] = createElements("option");
    option.textContent = food.foodName;
    option.value = food.foodId;

    foodsSelect.append(option);
  }
}

userForm.onsubmit = async (event) => {
  event.preventDefault();

  await fetch("http://localhost:5000/users", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value,
      phone: telephoneInput.value,
    }),
  });

  usernameInput.value = null;
  telephoneInput.value = null;

  renderUsers();
};

foodsForm.onsubmit = async (event) => {
  event.preventDefault();

  if (!foodsSelect.value) return;
  if (!clientId.textContent) return;
  if (!foodsCount.value || foodsCount.value > 10) return;

  await fetch("http://localhost:5000/orders", {
    method: "POST",
    body: JSON.stringify({
      userId: +clientId.textContent,
      foodId: +foodsSelect.value,
      count: +foodsCount.value,
    }),
  });

  foodsSelect.value = 1;
  foodsCount.value = null;

  renderOrders(clientId.textContent);
};

renderFoods();
renderUsers();
renderOrders();
