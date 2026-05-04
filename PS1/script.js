const products = [
    {img:"images/p1.png", name:"Headphones", price:"7999", desc:"Wireless headphones"},
    {img:"images/p2.png", name:"Watch", price:"12999", desc:"Smart watch"},
    {img:"images/p3.png", name:"Mouse", price:"2499", desc:"Gaming mouse"},
    {img:"images/p4.png", name:"Laptop Stand", price:"1999", desc:"Adjustable stand"},
    {img:"images/p5.png", name:"Keyboard", price:"2999", desc:"Mechanical keyboard"},
    {img:"images/p6.png", name:"Speaker", price:"4999", desc:"Bluetooth speaker"},
    {img:"images/p7.png", name:"Mobile", price:"15999", desc:"Android mobile"},
    {img:"images/p8.png", name:"Charger", price:"999", desc:"Fast charger"},
    {img:"images/p9.png", name:"USB Cable", price:"499", desc:"Type C cable"},
    {img:"images/p10.png", name:"Tablet", price:"18999", desc:"Android tablet"},
    {img:"images/p11.png", name:"Camera", price:"25999", desc:"HD camera"}
];

let currentPage = 1;
let rowsPerPage = 6;

function displayProducts() {

    let table = document.getElementById("productTable");
    table.innerHTML = "";

    let start = (currentPage-1)*rowsPerPage;
    let end = start + rowsPerPage;

    let pageItems = products.slice(start,end);

    pageItems.forEach(item => {

    table.innerHTML += `
        <tr>
            <td><img src="${item.img}"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.desc}</td>
        </tr>
    `;

    });

    document.getElementById("pageInfo").innerText =
    `Page ${currentPage} of ${Math.ceil(products.length/rowsPerPage)}`;
}

function nextPage(){
    if(currentPage < Math.ceil(products.length/rowsPerPage)){
        currentPage++;
        displayProducts();
    }
}

function prevPage(){
    if(currentPage > 1){
        currentPage--;
        displayProducts();
    }
}

displayProducts();