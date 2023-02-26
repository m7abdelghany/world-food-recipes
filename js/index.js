
let searchContainer =document.getElementById("search-container"),
contactContainer=document.getElementById("contact"),
userName = document.getElementById("username"),
userEmail = document.getElementById("email"),
userPhone = document.getElementById("phone"),
userAge = document.getElementById("age"),
userPassword = document.getElementById("password"),
userRePassword = document.getElementById("rePassword"),
userNameAlert = document.getElementById("namealert"),
userEmailAlert = document.getElementById("emailalert"),
userPhoneAlert = document.getElementById("phonealert"),
userAgeAlert = document.getElementById("agealert"),
userpasswordAlert = document.getElementById("passwordalert"),
userRepasswordAlert = document.getElementById("repasswordalert"),
searchIteam=document.querySelector(".nav-Search"),
categoryIteam=document.querySelector(".nav-category"),
areaIteam=document.querySelector(".nav-Area"),
ingrdientsIteam=document.querySelector(".nav-Ingredients"),
contactIteam=document.querySelector(".nav-Contact"),
searchInputword=document.getElementById("search-inputword"),
searchInputletter=document.getElementById("search-inputletter"),
row=document.getElementById("rowData"),
searchWord,
searchLetter,
arr=[];



$("document").ready(function(){
$(".fa-spinner").fadeOut(1000,function(){
$(".loading-screen").remove();
$("body").css("overflow", "visible")
}
)})


$(".strip-toggel-menu").click(function (e) {
let nameClickd = $(e.target).offset().left;


console.log(nameClickd);
if (nameClickd ==20 ){
    $(".nav-tab-menu").css({display:"block"});
        $(".strip-header-nav").css({left:240});
        $(".nav-tab-menu").css({left:0})  
        
        $(".nav-tab-menu li").animate({
            opacity: "1",
            paddingTop: "35px"
        }, 1000);
        
    
}

else{

   closebtn();

}

})


function closebtn(){
    $(".nav-tab-menu").css({display:"none"});
    $(".strip-header-nav").css({left:0} )    
    $(".nav-tab-menu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 1500)
};

All();
async function All(){
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    meals = await meals.json()
    displayMeals(meals.meals);
}


searchIteam.addEventListener("click",function(){
    row.innerHTML =""
    searchContainer.classList.replace("d-none","d-block");
    closebtn()
})

async function searchbyword(searchWord){

let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`)
meals = await meals.json()
console.log(meals.meals)
displayMeals(meals.meals);

}

async function searchbyletter(searchLetter){

    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchLetter}`)
    meals = await meals.json()
    displayMeals(meals.meals)}

function displayMeals(arr) {
    let meals = ""
    for (let i = 0; i <arr.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = meals}

searchInputword.addEventListener("keyup",function(){
    searchWord= searchInputword.value;
    searchbyword(searchWord);

})

searchInputletter.addEventListener("keyup",function(){
    searchLetter= searchInputletter.value;
    searchbyletter(searchLetter);
})

async function getMeal(mealID) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])

}

function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` 
    } 
    let str = `
    <div class="col-md-4 myM text-gray">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-lightgray text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex w " id="recipes">
                    
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes


}



function displayCategories(arr) {
    let cartona = ""
    for (var i = 0; i < arr.length; i++)
     cartona += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">

                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    row.innerHTML = cartona
   
}
categoryIteam.addEventListener("click",function(){
    row.innerHTML =""
    getCategories();
    closebtn()
})


async function getCategories() {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    x = await x.json()
    displayCategories(x.categories)

}

async function filterByCategory(category) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
}




areaIteam.addEventListener("click",function(){
    row.innerHTML =""
    getArea();
    closebtn()
})

async function getArea() {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list `);
    x = await x.json()
    displayArea(x.meals)

}

function displayArea(arr) {
    let cartona = ""
    for (var i = 0; i < arr.length; i++){
     cartona += `
    <div class="col-md-6 col-lg-3 my-3 shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByArea('${arr[i].strArea}')" class="post ">
                <i class="fa-solid fa-city fa-4x"></i>
                <h2 class="text-gray">${arr[i].strArea}</h2>
            </div>
        </div>
    </div>`}
    row.innerHTML = cartona



}

async function filterByArea(area) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals)
}


ingrdientsIteam.addEventListener("click",function(){
    row.innerHTML =""
    getIngredient();
    closebtn()
})
 async function getIngredient(){
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    x = await x.json()
    displayIngredient(x.meals)


}
function displayIngredient(arr){
let cartona =""
for (var i = 0; i < arr.length; i++){
    cartona += `
    
    <div class="col-md-6 col-lg-4 my-3 heightdiv shadow">
    <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
        <div class="post ">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h4 class="text-gray ">${arr[i].strIngredient}</h4>
        
        </div>
    </div>
</div>
    
    `

}
row.innerHTML = cartona

}

async function getMainIngredient(mealName) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
}

contactIteam.addEventListener("click",function(){
    row.innerHTML ="";
    contactContainer.classList.replace("d-none","d-block");

    closebtn()

})



userName.addEventListener("keyup",function(){
    validateUsername()
});

userEmail.addEventListener("keyup",function(){
  validateEmail()
});
userPhone.addEventListener("keyup",function(){
    validatenum()
});
userAge.addEventListener("keyup",function(){
    validateAge()
});
userPassword.addEventListener("keyup",function(){
    validatePass()
});
userRePassword.addEventListener("keyup",function(){
    validaterePass()
});
function validateUsername() {
    let regex = /^[A-Z][a-z]{3,8}$/;

    if(regex.test(userName.value) == true)
    {
        userNameAlert.classList.replace("d-block", "d-none")
        return true;

    }
 else {
    document.getElementById("namealert").classList.replace("d-none", "d-block");
    return false;

}}
function validateEmail(){
    let regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(regex.test(userEmail.value) == true){
        userEmailAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else{
        userEmailAlert.classList.replace("d-none", "d-block")
        return false;
    }
}


function validatenum() {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if(regex.test(userPhone.value) == true)
    {
        userPhoneAlert.classList.replace("d-block", "d-none");
                return true;

    }
 else {
    userPhoneAlert.classList.replace("d-none", "d-block")
    return false;

}}

function validateAge() {
    let regex = /^[1-9][0-9]?$|^100$/;

    if(regex.test(userAge.value) == true)
    {
        userAgeAlert.classList.replace("d-block", "d-none");
                return true;

    }
 else {
    userAgeAlert.classList.replace("d-none", "d-block")
    return false;

}}

function validatePass() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(regex.test(userPassword.value) == true)
    {
        userpasswordAlert.classList.replace("d-block", "d-none");
                return true;

    }
 else {
    userpasswordAlert.classList.replace("d-none", "d-block")
    return false;

}}


function validaterePass() {
    if(userPassword.value == userRePassword.value)
    {
        userRepasswordAlert.classList.replace("d-block", "d-none");
                return true;

    }
 else {
    userRepasswordAlert.classList.replace("d-none", "d-block")
    return false;

}}


if(validateUseremail() && validateUseremail() && validatenum() && validateAge() && validatePass() && validaterePass()){
    document.getElementById("submitBtn").removeAttribute("disabled")
}else{
    document.getElementById("submitBtn").setAttribute("disabled")
}

