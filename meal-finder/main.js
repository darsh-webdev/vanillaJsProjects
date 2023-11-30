const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEL = document.getElementById("single-meal");

// Search for a meal using keyword
function searchMeal(e) {
  e.preventDefault();

  // Clear Single Meal
  single_mealEL.innerHTML = "";

  // Get search keyword
  const keyword = search.value;
  if (keyword.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>Sorry, Could not find any meals for '${keyword}'</h2>`;
        } else {
          resultHeading.innerHTML = `<h2>Search results for '${keyword}'</h2>`;

          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
                <img src=${meal.strMealThumb} alt=${meal.strMeal} />
                <div class="meal-info" data-mealID=${meal.idMeal}>
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
          `
            )
            .join("");
        }
      });

    // Clear search input
    search.value = "";
  } else {
    alert("Please enter a search keyword!");
  }
}

// Fetch Meal by ID
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch Random Meal
function getRandomMeal() {
  // Clear Heading and Meals
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      addMealToDOM(data.meals[0]);
    });
}

// Add Meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEL.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
            </ul>
        </div>
    </div>
  `;
}

/*---------- Event Listeners ---------- */
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealByID(mealID);
  }
});

random.addEventListener("click", getRandomMeal);
