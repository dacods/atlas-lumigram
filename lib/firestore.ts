import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

type Post = {
    caption: string;
    image: string;
    createdAt: Date;
    CreatedBy: string;
}

const posts = collection(db, "posts");

async function addPost(post: Post) {
    await addDoc(posts, post);
}

export default {
    addPost,
}