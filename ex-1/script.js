class ApiMock {
  constructor() {

  }

  fetch() {
    return [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ];
  }
}

class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  getHtml() {
    return `<div class="goods-item"><div class="article"><h3 class="product">${this.title}</h3><p class="price">${this.price}</p></div><div class="goods-button"><button class="gd-bt">Добавить</button></div></div></div>`;
  }
}

class GoodsList {
  constructor() {
    this.api = new ApiMock();
    this.$goodsList = document.querySelector('.goods-list');
    this.goods = [];
  }

  fetchGoods() {
    this.goods = this.api.fetch().map(({title, price}) => new GoodsItem(title, price));
  }

  render() {
    this.$goodsList.textContent = '';
    this.goods.forEach((good) => {
        this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
    })
  }
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();

class Cart {
  constructor() {
    this.items = [];
    this.total = 0; 
  }

  addItem(item) {
    let existingItem = this.items.find(element => element.title === item.title);

    if (existingItem === undefined) {
      this.items.push(item);
    } else {
      existingItem.quantity++;
    }

    cart.refreshTotal();
  }

  removeItem(title) {
    this.items.splice(this.items.findIndex(item => item.title === title), 1);
    cart.refreshTotal();
  }
  
  refreshTotal() {
    this.total = 0;
    this.items.forEach(item => this.total += item.quantity * item.price);
  }

  getItems() {
    return this.items;
  }
};

class CartItem {
  constructor(title, price, quantity = 1) {
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }
}


let cart = new Cart();
cart.addItem(new CartItem("Product-1", 50));
cart.addItem(new CartItem("Product-2", 250));
cart.addItem(new CartItem("Product-2", 250)); 
cart.addItem(new CartItem("Product-2", 250));
cart.removeItem("Product-1");

console.table(cart);



function makeGetRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      resolve(xhr.responseText);
    };
    xhr.onerror = function () {
      reject(xhr.status);
    };
    xhr.send();
  });
}

makeGetRequest('https://baconipsum.com/api/?type=meat-and-filler').then(function(data) {
  console.log('Success');
  console.log(data);
}).catch(function(data) {
  console.log('Fail');
  console.log(data);
});