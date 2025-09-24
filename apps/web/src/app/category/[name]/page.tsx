import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import Link from "next/link";

export default async function Page({params}: { params: { name: string } }) {

    const { name } = await params;
    
    const filteredPosts = posts.filter(post => toUrlPath(post.category) === params.name && post.active);

    return(
        <div>
            <h1>Category: {params.name}</h1>

            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>
                        <h2><b>
                            <Link href={`/post/${post.urlId}`}>{post.title}</Link>
                            </b></h2>
                        <div>{post.description}</div>
                        <div>{post.category}</div>
                        <div>{post.date.toLocaleDateString("en-US")}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}