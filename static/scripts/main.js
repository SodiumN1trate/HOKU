"use strict"
console.log("Main Js working");

/* FUNCTIONS */
// Render new titles with updates
function render(){
    let income_titles = document.querySelector(".drop-down-income");
    let expenses_titles =  document.querySelector(".drop-down-expenses");
    let didnt_buy_it = document.querySelector(".drop-down-didnt-buy-it");
    income_titles.innerHTML = "";
    expenses_titles.innerHTML = "";
    didnt_buy_it.innerHTML = "";
    for (let index = 0; index < titles.length; index++) {
        let title = `<div class="drop-down-title" id="${ titles[index].id }">
                        <span class="drop-down-title-name">${ titles[index].title_name }</span>
                        <div>
                            <span class="drop-down-title-price">${ titles[index].title_price }€</span>
                            <span class="delete-title-button"><img src="static/vectors/archive.svg" width="20px"></span>
                        </div>
                    </div>
            `;
        if(titles[index].title_category == "Ienākumi"){
            income_titles.innerHTML += title;
        }
        if(titles[index].title_category == "Izdevumi"){
            expenses_titles.innerHTML += title;
        }
        if(titles[index].title_category == "Nenopirku"){
            didnt_buy_it.innerHTML += title;
        }
    }

    let input = `<div class="drop-down-title-input">
        <input type="text" class="drop-down-title-name-input" placeholder="Nosaukums"  maxlength="15">
        <input type="text" class="drop-down-title-price-input" placeholder="Summa" maxlength="6">
        <img src="static/vectors/plus.svg" width="25px">
    </div>`;
    income_titles.innerHTML += input;
    expenses_titles.innerHTML += input;
    didnt_buy_it.innerHTML += input;

    render_balance();
    render_inputs();
    render_delete_buttons();
    title_sum_render();
}

// Funciton which renders all titles whith input fields
function render_inputs(){
    for (let index = 0; index < document.querySelectorAll(".drop-down-title-input > img").length; index++) {
        document.querySelectorAll(".drop-down-title-input > img")[index].addEventListener("click", (e) =>{
            let title_name = document.querySelectorAll(".drop-down-title-name-input")[index].value;
            let title_price = document.querySelectorAll(".drop-down-title-price-input")[index].value;
            if(title_name == "" || title_price == ""){
                alert("Aizpildiet visus laukus!");
            }
            else if(title_name.length > 15 || title_price.length > 6 || parseInt(title_price) <= 0 || parseInt(title_price) == NaN){
                alert("Notikusi kļūda!");
            }
            else{
                let price = title_price.split("");
                let coma_pos = price.indexOf(',');
                if(coma_pos != -1){ // If is used coma, not dot
                    price[coma_pos] = ".";
                }
                console.log(price.join(""));
                console.log("Komats", coma_pos);
                titles.push({"id": id, "title_name": title_name, "title_price": parseFloat(price.join("")), "title_category":e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].innerHTML});
                localStorage.setItem("titles", JSON.stringify(titles));
                id += 1;
                render();
            }
        })   
    }
}

// Function which renders total balance of all titles sum
function render_balance(){
    let balance = 0;
    for (let index = 0; index < titles.length; index++) {
        if(titles[index].title_category == "Ienākumi"){
            balance += parseInt(titles[index].title_price);
        }
        if(titles[index].title_category == "Izdevumi"){
            balance -= parseInt(titles[index].title_price);
        }
    }
    document.getElementById("balance").innerHTML = balance;
}

// Function which renders all delete buttons
function render_delete_buttons() {
    for(let index = 0; index < document.querySelectorAll(".delete-title-button").length; index++) {
        document.querySelectorAll(".delete-title-button")[index].addEventListener("click", (e)=>{
            for (let index = 0; index < titles.length; index++) {
                if(titles[index].id == e.target.parentNode.parentNode.parentNode.id){
                    titles.splice(titles.indexOf(titles[index]), 1);
                }
            }
            localStorage.setItem("titles", JSON.stringify(titles));
            e.target.parentNode.remove();
            render();
        })
    }
}

// Renders sum next to all titles
function title_sum_render() {
    let income_sum = 0;
    let expenses_sum = 0;
    let didnt_buy_it_sum = 0;
    console.log(document.querySelectorAll(".sum")[0]);
    for (let index = 0; index < titles.length; index++) {
        if(titles[index].title_category == "Ienākumi"){
            income_sum += titles[index].title_price;
        };
        if(titles[index].title_category == "Izdevumi"){
            expenses_sum += titles[index].title_price;
        };
        if(titles[index].title_category == "Nenopirku"){
            didnt_buy_it_sum += titles[index].title_price;
        }
    }
    document.querySelectorAll(".sum")[0].innerHTML = income_sum;
    document.querySelectorAll(".sum")[1].innerHTML = expenses_sum;
    document.querySelectorAll(".sum")[2].innerHTML = didnt_buy_it_sum;
}


// Function which closes all dropdowns
function close_all_drop_downs() {
    const TITLE_DROPDOWN = [document.querySelector(".drop-down-income"), document.querySelector(".drop-down-expenses"), document.querySelector(".drop-down-didnt-buy-it")];
    TITLE_DROPDOWN.forEach(element =>{
        element.style.display = "none";
    })
}

// Delete all titles
function delete_all_titles() {
    titles = [];
    render();
}



/* MAIN LOGIC */

// Title managment
let titles = JSON.parse(localStorage.getItem("titles")) || [];
let id = 0; // Global variable of titles id's
render(); // Renders all titles

let last_opened_title; // Last opended title name



// All options to close dropdown
document.querySelector("#wrapper").addEventListener("click", (e)=>{
    if(e.target.id == "wrapper" || e.target.id == "content" || e.target.id == "header"){
        close_all_drop_downs();
    }
})

for (let index = 0; index < document.querySelectorAll(".title").length; index++) {
    document.querySelectorAll(".title")[index].addEventListener('click', (e)=>{
        close_all_drop_downs();
        let title_name = document.querySelectorAll(".title")[index].childNodes[3].innerHTML;
        if (title_name === "Ienākumi") {
            if(last_opened_title === title_name){
                document.querySelector(".drop-down-income").style.display = "none";
                last_opened_title = "";
            }
            else{
                document.querySelector(".drop-down-income").style.display = "initial";
                last_opened_title = title_name;
            }
        }
        else if(title_name === "Izdevumi"){
            if(last_opened_title === title_name){
                document.querySelector(".drop-down-expenses").style.display = "none";
                last_opened_title = "";
            }
            else{
                document.querySelector(".drop-down-expenses").style.display = "initial";
                last_opened_title = title_name;
            }
        }
        else if(title_name === "Nenopirku"){
            if(last_opened_title === title_name){
                document.querySelector(".drop-down-didnt-buy-it").style.display = "none";
                last_opened_title = "";
            }
            else{
                document.querySelector(".drop-down-didnt-buy-it").style.display = "initial";
                last_opened_title = title_name;
            }
        }
    })
}

// Help button
const FOOTER = document.getElementById('footer');
const TITLES = document.querySelectorAll('.title');
const INSTRUCTION = document.getElementById('instructions');

document.querySelector("#footer-content > button").addEventListener("click", (e) =>{
    FOOTER.style.display = "none";
    TITLES.forEach(element => {
        element.style.display = "none";
    })
    close_all_drop_downs();
    INSTRUCTION.style.display = "block";
})

document.querySelector("#instruction-close-button").addEventListener("click", (e) => {
    FOOTER.style.display = "block";
    TITLES.forEach(element => {
        element.style.display = "block";
    })
    close_all_drop_downs();
    INSTRUCTION.style.display = "none";
})

// Title deleting at end of month
let date_of_today = new Date();
let last_date_of_this_month = new Date(date_of_today.getFullYear(), date_of_today.getMonth() + 1, 0).getDate();
let last_month_of_deleting_data;
if( date_of_today.getDate() === 31){
    let marquee = `
        <marquee direction="right">Pēdējā diena. Rīt pazudīs visi raksti. Apskatiet savus ienākumus un izdevumus!</marquee>
    `;
    document.querySelector("#header").innerHTML += marquee;
}

if( date_of_today.getDate() === 1){
    if(sessionStorage.getItem("month") != date_of_today.getMonth()){
        sessionStorage.setItem("month", date_of_today.getMonth());
        delete_all_titles();
        document.getElementById("header").childNodes[5].innerHTML = "";
        console.log("Test");
    }
}

