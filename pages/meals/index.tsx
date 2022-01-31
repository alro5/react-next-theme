import Link from "next/link";
import useSWR, { SWRResponse } from "swr";
import { FoodCategories, FoodCategory } from "../../models/food";
import { fetcher } from "../../utils/shared";

export default function Meals() {

  const { data, error } = useSWR<FoodCategories, Error>(`https://www.themealdb.com/api/json/v1/1/categories.php`, fetcher);

  return <div>
    <ul>
      {data?.categories.map((item, index: number) => {
        return <li key={`category-${index}`}>
          <Link href={`/meals/${item.strCategory.toLowerCase()}`}>
            <a>
              <img src={item.strCategoryThumb} alt={`Category ${item.strCategory}`} />
              {item.strCategory}
            </a>
          </Link>
        </li>
      })}
    </ul>
  </div>
}