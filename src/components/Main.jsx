// -------------------------------------3-------------------------------------------------------

import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"



export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

    const recipeSection = React.useRef(null)

     React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref = {recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}







// -------------------------------------------1------------------------------------------------------

// import React from "react"
// import IngredientsList from "./components/IngredientsList"
// import ClaudeRecipe from "./components/ClaudeRecipe"

// export default function Main(){

//     const [ingredients, setIngredients] = React.useState([])
    
//     const ingredientsListItems = ingredients.map((ingredient) => (
//         <li key="ingredient">{ingredient}</li>
//     ))

//     function addIngredient(formData){
//         const newIngredient = formData.get("ingredient")
//         setIngredients(prevIngredients => [...prevIngredients, newIngredient])
//     }

//     return (
//         <main>
//             <form action={addIngredient} className="add-ingredient-form">
//                 <input type="text" 
//                 placeholder="e.g. oregano" 
//                 aria-label="Add ingredients" 
//                 name="ingredient"/>
//                 <button>Add ingredient</button>
//             </form>
//             {ingredients.length > 0 && <section>
//                 <h2>Ingredients on hand:</h2>
//                 <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
//                 {ingredients.length > 3 && <div className="get-recipe-container">
//                     <div>
//                         <h3>Ready for a recipe?</h3>
//                         <p>Generate a recipe from your list of ingredients.</p>
//                     </div>
//                     <button>Get a recipe</button>
//                 </div>}
//             </section>}
//         </main>
//     )
// }




// ----------------------------------2----------------------------------------------------------

// import React from "react"
// import IngredientsList from "./IngredientsList"
// import ClaudeRecipe from "./ClaudeRecipe"

// export default function Main() {
//     const [ingredients, setIngredients] = React.useState(
//         ["all the main spices", "pasta", "ground beef", "tomato paste"]
//     )
//     const [recipeShown, setRecipeShown] = React.useState(false)

//     function toggleRecipeShown() {
//         setRecipeShown(prevShown => !prevShown)
//     }

//     function addIngredient(formData) {
//         const newIngredient = formData.get("ingredient")
//         setIngredients(prevIngredients => [...prevIngredients, newIngredient])
//     }

//     return (
//         <main>
//             <form action={addIngredient} className="add-ingredient-form">
//                 <input
//                     type="text"
//                     placeholder="e.g. oregano"
//                     aria-label="Add ingredient"
//                     name="ingredient"
//                 />
//                 <button>Add ingredient</button>
//             </form>

//             {ingredients.length > 0 &&
//                 <IngredientsList
//                     ingredients={ingredients}
//                     toggleRecipeShown={toggleRecipeShown}
//                 />
//             }

//             {recipeShown && <ClaudeRecipe />}
//         </main>
//     )
// }