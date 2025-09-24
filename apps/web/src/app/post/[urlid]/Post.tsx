"use client";

import { Post } from "@repo/db/data";
import { parse } from "marked";
import { useState } from "react";


export function ViewPost({post} : { post : Post }) {

        const [likes, setlikes] = useState(post.likes || 0);

    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: parse(post.content)}}/>
            <hr/>
            <button onClick={() => setlikes(likes + 1)}>
                Like {likes}
            </button>
        </div>
        //how can i save likes to the database?
    );
}