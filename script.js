let sbtn=document.getElementById("search-btn")
let mlist=document.getElementById("meal")
let mealDetailContent=document.querySelector(".meal-details-content")
let closebtn=document.getElementById("recipe-close-btn")


sbtn.addEventListener('click', getMeals)
mlist.addEventListener('click', getMealRecipe)


function getMeals(){

    let ingd=document.getElementById("search-input").value
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingd}`)
    .then(response => response.json())
    .then(data =>{
        let item=""
        if(data.meals){
            data.meals.forEach(meal => {
                item+=`
                <div class="meal-item" id="${meal.idMeal}">

                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>

                </div>
                `;
            })
            mlist.classList.remove("notFound");

        }else{
            item="Sorry, we have not found any results"
            mlist.classList.add("notFound")
        }
        mlist.innerHTML=item;


    }).catch((error)=>{
        console.log(error)
    })

}

function getMealRecipe(event){
    event.preventDefault()
    if(event.target.classList.contains('recipe-btn')){
        let item=event.target.parentElement.parentElement
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.id}`)
        .then(r => r.json())
        .then(data => {
            meal=data.meals[0]
            let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
                mealDetailContent.innerHTML=html;
                mealDetailContent.parentElement.classList.add('showRecipe')

        })
    }
}
