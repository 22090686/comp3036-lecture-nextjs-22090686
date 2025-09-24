import { posts } from "@repo/db/data";
import {parse} from "marked";
import { ViewPost } from "./Post";

export default async function Page({params}: { params: { urlid: string } }) {

    const post = posts.find(post => post.urlId === params.urlid);
    const {urlid} = await params;


    if (post == null) {
        return <div>Post not found</div>;
    }


    return <ViewPost post={post} />;
}