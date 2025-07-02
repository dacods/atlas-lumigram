import { db } from "@/firebaseConfig";
import { collection, getDocs, doc, setDoc, query, orderBy, limit, startAfter, addDoc, DocumentData, QueryDocumentSnapshot, } from "firebase/firestore";

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

const PAGE_SIZE = 5;

async function getPosts(lastDoc: QueryDocumentSnapshot<DocumentData> | null = null) {
  const baseQuery = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    ...(lastDoc ? [startAfter(lastDoc)] : []),
    limit(PAGE_SIZE)
  );

  const snapshot = await getDocs(baseQuery);
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

  return {
    posts,
    lastDoc: newLastDoc,
  };
}

async function addToFavorites(userId: string, postId: string, postData: any) {
  const userFavoritesRef = doc(db, "users", userId, "favorites", postId);
  await setDoc(userFavoritesRef, postData);
}


export default {
    addPost,
    getPosts,
    addToFavorites,
}