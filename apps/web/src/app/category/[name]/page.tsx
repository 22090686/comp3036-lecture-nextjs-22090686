import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";

export default async function Page({params}: { params: { name: string } }) {

    const filteredPosts = posts.filter(post => toUrlPath(post.category) === params.name && post.active);

    return(
        <div>
            <h1>Category: {params.name}</h1>

            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}