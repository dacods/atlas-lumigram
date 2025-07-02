import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebaseConfig";

async function upload(uri: string, name: string) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, `images/${name}`);
    const result = await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(result.ref);
    const metadata = result.metadata;

    return {
        downloadURL,
        metadata
    };
}

export default {
    upload,
};