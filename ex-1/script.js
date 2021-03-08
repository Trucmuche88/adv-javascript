const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><div class="article"><h3 class="product">${title}</h3><p class="price">${price}</p></div><div class="goods-button"><button class="gd-bt">Добавить</button></div></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        );

    $goodsList.insertAdjacentHTML('beforeend', goodsList.join("")); //Базовый разделитель .join - запятая. Нужно заставить его поставить пробел.
}
  
renderGoodsList();

var cart = document.getElementById("cart");

cart.onclick = function () { document.getElementById("cart").style.color = "red"; }