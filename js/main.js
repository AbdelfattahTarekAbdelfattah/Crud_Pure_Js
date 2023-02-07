// varibles
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = "Create";
let temp;
// varibles

// get total
function getTotal()
{
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background ='#006eff';
    }else{
        total.innerHTML = "";
        total.style.background = "#0057bb";
    }
}
// get total

// create prouduct
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro=[];
}

submit.onclick=()=>
{
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(newPro.count < 100){
        if(title.value && price.value && category.value != "" ){
            if(mood=="Create"){
                if(newPro.count > 1){
                    for(let i = 0;i< newPro.count;i++){
                        dataPro.push(newPro);
                    }
                }else{
                    dataPro.push(newPro);
                }
            }else{
                dataPro[temp] = newPro;
                mood = "Create";
                submit.innerHTML = "Create";
                count.style.display = "block";
            }
        }else{
            alert("Please Enter Data In Title Price And Category At Minmum...");
        }
    }else{
        alert("Your Maximum Count Is Less Than 100 Product...")
    }
    localStorage.setItem("product",JSON.stringify(dataPro));
    clearInputs();
    createProuduct();
}
// create prouduct

// clear inputs
function clearInputs()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value  = '';
    count.value = '';
    category.value = ''; 
    total.innerHTML = '';
}
// clear inputs

// create prouduct
function createProuduct()
{
    getTotal();
    let table = "";
    for(let i = 0;i < dataPro.length;i++){
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateProuduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProuduct(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML=table;
    let DelAll=document.getElementById("deleteAll");
    if(dataPro.length>0){
        DelAll.innerHTML=`
        <button onclick="DeleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        DelAll.innerHTML="";
    }
}
createProuduct();
// create prouduct

// delete data
function deleteProuduct(i)
{
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    createProuduct();
}
// detete data

// delete all
function DeleteAll()
{
    localStorage.clear();
    dataPro.splice(0);
    createProuduct();
}
// detete all

// updata
function updateProuduct(i)
{
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML="Update";
    mood="Update";
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// update

// search
let searchMood="title";

function getSearchMood(id)
{
    let search=document.getElementById("search");

    if(id=="searchTitle"){
        searchMood="title";
        search.placeholder="Search By Title"
    }else{
        searchMood="category";
        search.placeholder="Search By Category"

    }
    search.focus();
}

function searchProuduct(value)
{
    let table="";
    if(searchMood=="title"){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value)){
            table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateProuduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProuduct(${i})" id="delete">Delete</button></td>
        </tr>
        `;
            }
        }
    }else{
        for(let i = 0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value)){
            table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateProuduct(${i})" id="update">Update</button></td>
        <td><button onclick="deleteProuduct(${i})" id="delete">Delete</button></td>
        </tr>
        `;
            }
        }
    }
    document.getElementById("tbody").innerHTML=table;

}
// search