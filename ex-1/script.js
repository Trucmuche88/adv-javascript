class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
      return `<div class="goods-item"><div class="article"><h3 class="product">${this.title}</h3><p class="price">${this.price}</p></div><div class="goods-button"><button class="gd-bt">Добавить</button></div></div></div>`;

  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  total() {
    let total = 0;

    this.goods.forEach(good => {
      total += good.price;
    });

    return total;
  }
} 

  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  console.log(list.total());
  
  class Cart {
    constructor() {
      this.items = [];
      this.total = 0; 
    }

    addItem(item) {
      this.items.push(item);
      this.total += item.price; 
    }
  };

  class CartItem {
    constructor(title, price, quantity = 1) {
      this.title = title;
      this.price = price;
      this.quantity = quantity;
    }
  };

  let item1 = new CartItem("Product-1", 50);
  let item2 = new CartItem("Product-2", 250);

  let cart = new Cart();
  cart.addItem(item1);
  cart.addItem(item2);

  console.log(cart.items);
  console.log(cart.total);

/*

class Burger {
  constructor(price, calories) {
    this.price = price;
    this.calories = calories;
    this.topping = [];
  }

  addTopping(topping) {
    this.topping.push(topping);
    this.price += topping.price;
    this.calories += topping.calories;
  }
}

class Toppings {
  constructor(price, calories) {
    this.price = price;
    this.calories = calories;
  }
}

class Cheese extends Toppings {
  constructor() {
    super(10, 20);
  }
}

class Salad extends Toppings {
  constructor () {
    super(10, 5);
  }
}

class Potatoes extends Toppings {
  constructor() {
    super(15, 10);
  }
}

class Spices extends Toppings {
  constructor() {
    super(15, 0);
  }
}

class Mayo extends Toppings {
  constructor() {
    super(20, 5);
  }
}

class BigBurger extends Burger {
  constructor() {
    super(100, 40);
  }
}

class SmallBurger extends Burger {
  constructor() {
    super(50, 20);
  }
}

// test of a burger

let smallBurger = new SmallBurger();
smallBurger.addTopping(new Cheese());
smallBurger.addTopping(new Cheese());
smallBurger.addTopping(new Potatoes());
smallBurger.addTopping(new Mayo());
smallBurger.addTopping(new Salad());
smallBurger.addTopping(new Spices());

console.log(smallBurger.price, smallBurger.calories, smallBurger.topping);
console.table(smallBurger);
*/
