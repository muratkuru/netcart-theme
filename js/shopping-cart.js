var products = [];

function setProducts() {
    let json = Cookies.getJSON('products');
    products = json == undefined ? [] : json;
}

function pushProduct(product) {
    if (products != undefined) {
        let index = products.findIndex((item) => item.id == product.id);

        if (index > -1) {
            products[index].count++;
        } else {
            products.push(product);
        }
    } else {
        products.push(product);
    }
}

function setCookieAndRender() {
    Cookies.set('products', products);
    showShoppingCartInfo();
    showShopItems();
}

function increaseItem(t) {
    let id = t.dataset.id;
    let index = products.findIndex((item) => item.id == id);

    if (index > -1) {
        products[index].count++;

        setCookieAndRender();
    }
}

function decreaseItem(t) {
    let id = t.dataset.id;
    let index = products.findIndex((item) => item.id == id);

    if (index > -1) {
        if (products[index].count > 1) {
            products[index].count--;

            setCookieAndRender();
        }
    }
}

function deleteItem(t) {
    let id = t.dataset.id;
    let index = products.findIndex((item) => item.id == id);

    if (index > -1) {
        products.splice(index, 1);

        setCookieAndRender();
    }
}

function addCart(item) {
    let product = {
        id: item.dataset.id,
        name: item.dataset.name,
        price: item.dataset.price,
        count: 1
    };

    pushProduct(product);

    setCookieAndRender();
}

var totalPrice = 0;

function showShoppingCartInfo() {
    setProducts();

    let shoppingCartInfo = document.querySelector('.shopping-cart-info');
    let count = 0;
    let total = 0;

    products.forEach((item) => {
        count = count + item.count;
        total = total + (item.price * item.count);
    });

    totalPrice = total.toFixed(2);

    shoppingCartInfo.innerHTML = `${count} ürün - ${totalPrice}₺`;
}

function showShopItems() {
    let modalBody = document.querySelector('.modal-body');
    let html = '';

    if (products.length > 0) {
        html = `
                <table class="table table-hover">
                    <thead>
                        <th>Ürün Adı</th>
                        <th>Birim Fiyat</th>
                        <th>Adet</th>
                        <th></th>
                    </thead>
                    <tbody>
                `;
        products.forEach((item) => {
            html += `
                        <tr>
                            <td>` + item.name + `</td>
                            <td>` + item.price + `</td>
                            <td>` + item.count + `</td>
                            <td>
                                <button type="button" data-id="` + item.id + `" onclick="increaseItem(this)" class="btn btn-success btn-xs">+</button>
                                <button type="button" data-id="` + item.id + `" onclick="decreaseItem(this)" class="btn btn-info btn-xs">-</button>
                                <button type="button" data-id="` + item.id + `" onclick="deleteItem(this)" class="btn btn-danger btn-xs">x</button>
                            </td>
                        </tr>
                    `;
        });
        html += `
                </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">
                                <b>Toplam:</b>
                            </td>
                            <td>
                                ` + totalPrice + `₺
                            </td>
                        </tr>
                    </tfoot>
                </table>
                `;
    } else {
        html = 'Sepetiniz boş.';
    }

    modalBody.innerHTML = html;
}

showShoppingCartInfo();
showShopItems();