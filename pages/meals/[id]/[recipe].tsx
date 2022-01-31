import { useRouter } from "next/router"
import { useMemo } from "react";
import useSWR from "swr"
import { Recipe, RecipeEntity } from "../../../models/food";
import { capitalizeFirstLetter, fetcher } from "../../../utils/shared";

export default function MealRecipe() {
  const router = useRouter();
  const { recipe } = router.query;

  const search = decodeURIComponent(capitalizeFirstLetter(recipe as string));

  const { data, error } = useSWR<Recipe, Error>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`, fetcher)

  const r = data?.meals[0];

  if (!r) return <div></div>

  const ingredients = useMemo(() => {
    return Object.keys(r).filter((k) => {
      return k.indexOf('strIngredient') == 0;
    }).reduce(function (newData: Record<any, any>, k) {
      newData[k] = (r as unknown as any)[k];
      return Object.values(newData).filter(Boolean);
    }, {});
  }, [r])

  console.log('r :', r);

  return <div>
    <img width="300px" src={r.strMealThumb} alt="" />
    <h1>{r.strMeal}</h1>
    <h3>Sådan gør du</h3>
    <p>{r.strInstructions}</p>
    <h3>Ingredienser</h3>
    <ul>
      {ingredients.map((item: string) => <li>{item}</li>)}
    </ul>
  </div>
}