import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Meals } from "../../../models/food";
import { fetcher } from "../../../utils/shared";

const Meal = () => {

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR<Meals, Error>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`, fetcher);

  return (
    <div>
      <h1>{id}</h1>
      <ul>
        {data?.meals.map(item => {
          return <li key={item.idMeal}>
            <Link href={`/meals/${encodeURIComponent(id as string)}/${encodeURIComponent(item.strMeal)}`}>
              <a>
                {item.strMeal}
              </a>
            </Link>
          </li>
        })}
      </ul>
    </div>
  )

}

export default Meal;