console.log("Js working");

// Drop down managment
document.querySelector("#wrapper").addEventListener("click", (e)=>{
    if(e.target.id == "wrapper" || e.target.id == "content" || e.target.id == "header"){
        close_all_drop_downs();
    };
});


for (let index = 0; index < document.querySelectorAll(".title").length; index++) {
    document.querySelectorAll(".title")[index].addEventListener('click', (e)=>{
        if (document.querySelectorAll(".title")[index].childNodes[3].innerHTML == "Ienākumi") {
            close_all_drop_downs();
            document.querySelector(".drop-down-income").style.display = "initial";
        }
        else if(document.querySelectorAll(".title")[index].childNodes[3].innerHTML == "Izdevumi"){
            close_all_drop_downs(); 
            document.querySelector(".drop-down-expenses").style.display = "initial";
        }
        else if(document.querySelectorAll(".title")[index].childNodes[3].innerHTML == "Nenopirku"){
            close_all_drop_downs(); 
            document.querySelector(".drop-down-didnt-buy-it").style.display = "initial";
        };
    });
};

function close_all_drop_downs() {
    document.querySelector(".drop-down-income").style.display = "none";
    document.querySelector(".drop-down-expenses").style.display = "none";
    document.querySelector(".drop-down-didnt-buy-it").style.display = "none";
};



// Title managment
let titles = JSON.parse(localStorage.getItem("titles")) || [];

render();

function render(){
    let income_titles = document.querySelector(".drop-down-income");
    let expenses_titles =  document.querySelector(".drop-down-expenses");
    let didnt_buy_it = document.querySelector(".drop-down-didnt-buy-it");
    income_titles.innerHTML = "";
    expenses_titles.innerHTML = "";
    didnt_buy_it.innerHTML = "";
    for (let index = 0; index < titles.length; index++) {
        let title = `<div class="drop-down-title">
                        <span class="drop-down-title-name">${ titles[index].title_name }</span>
                        <span class="drop-down-title-price">${ titles[index].title_price }€</span>
                    </div>
            `;
        if(titles[index].title_category == "Ienākumi"){
            income_titles.innerHTML += title;
        };
        if(titles[index].title_category == "Izdevumi"){
            expenses_titles.innerHTML += title;
        };
        if(titles[index].title_category == "Nenopirku"){
            didnt_buy_it.innerHTML += title;
        };
    };

    let input = `<div class="drop-down-title-input">
        <input class="drop-down-title-name-input" placeholder="Nosaukums"  maxlength="20">
        <input class="drop-down-title-price-input" placeholder="Summa" maxlength="8">
        <img src="static/vectors/plus.svg" width="25px">
    </div>`;
    income_titles.innerHTML += input;
    expenses_titles.innerHTML += input;
    didnt_buy_it.innerHTML += input;

    render_balance();
    render_inputs();
};


function render_inputs(){
    for (let index = 0; index < document.querySelectorAll(".drop-down-title-input > img").length; index++) {
        document.querySelectorAll(".drop-down-title-input > img")[index].addEventListener("click", (e) =>{
            let title_name = document.querySelectorAll(".drop-down-title-name-input")[index].value;
            let title_price = document.querySelectorAll(".drop-down-title-price-input")[index].value;
            if(title_name == "" || title_price == ""){
                alert("Aizpildiet visus laukus!");
            }
            else if(title_name.length > 20 || title_price.length > 8){
                alert("Notikusi kļūda!");
            }
            else{
                titles.push({"title_name": title_name, "title_price": title_price, "title_category":e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].innerHTML});
                localStorage.setItem("titles", JSON.stringify(titles));
                render();
            };
        });   
    };
};

function render_balance(){
    let balance = 0;
    for (let index = 0; index < titles.length; index++) {
        if(titles[index].title_category == "Ienākumi"){
            balance += parseInt(titles[index].title_price);
            console.log(balance);
        };
        if(titles[index].title_category == "Izdevumi"){
            balance -= parseInt(titles[index].title_price);
        };
    };
    document.getElementById("balance").innerHTML = balance;
};