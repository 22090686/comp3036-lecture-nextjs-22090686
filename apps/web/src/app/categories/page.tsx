import { posts } from "@repo/db/data";
import { categories } from "@/functions/categories";
import { toUrlPath } from "@repo/utils/url";
import Link from "next/link";


export default function Page() {
    const postCategories = categories(posts);

    return (
        <div>
            <h1>Categories:</h1>
            <ul>
                {postCategories.map((category) => (
                    <li key={category.name}>
                        <Link href={`/category/${toUrlPath(category.name)}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}