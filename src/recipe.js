class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }

  getAmounts() {
    return this.ingredients.map(item => {
      item.quantity.amount = +item.quantity.amount.toFixed(2);
      return item.quantity.amount + ' ' + item.quantity.unit + ' ';
    })
  }

  searchRecipeByIngredient(ingredient, recipeContainer) {
    let searchIngredients =  ingredientsData.find(item => {
      if (ingredient === item.name) {
        return item;
      }
    })
    if (!searchIngredients) {
      return null;
    }
    let searchRecipes = recipeContainer.reduce((results, recipe) => {
      recipe.ingredients.forEach(item => {
        if (item.id === searchIngredients.id && !results.includes(recipe)) {
          results.push(recipe)
        }
      })
      return results;
    }, [])
    return searchRecipes;
  }

  searchRecipeByName(recipeName, recipesContainer) {
    let searchRecipes = recipesContainer.reduce((results, recipe) => {
      if (recipeName.toLowerCase() === recipe.name.toLowerCase()) {
        results.push(recipe)
      }
      return results
    }, []);
    return searchRecipes
  }

  filterRecipe(recipeTag, recipesContainer) {
    let filterResults = recipesContainer.reduce((results, recipe) => {
      recipe.tags.forEach(tag => {
        if (recipeTag === tag) {
          results.push(recipe);
        }
      })
      return results;
    }, []);
    return filterResults;
  }

  getInstructions() {
    let recipeSteps = this.instructions.map(step => {
      return step.instruction;
    })
    return recipeSteps;
  }

  getIngredients() {
    let recipeIngredients = this.ingredients.map(ingredient => {
      return ingredientHashmap[ingredient.id].name;
    })
    return recipeIngredients;
  }

  getIngredientNames() {
    return this.getIngredients().reduce((ingredientDetail, ingredient) => {
      ingredientDetail.push(ingredient)
      return ingredientDetail;
    }, [])
  }

  getCost() {
    let recipeCost;
    let recipeIngredient;
    let recipeMath = this.ingredients.reduce((totalCost, ingredient) => {
      recipeCost = ingredient.quantity.amount;
      recipeIngredient = ingredientsData.find(cost => {
        return cost.id === ingredient.id;
      })
      totalCost += recipeCost * recipeIngredient.estimatedCostInCents;
      return totalCost;
    }, 0)
    return recipeMath / 100;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
