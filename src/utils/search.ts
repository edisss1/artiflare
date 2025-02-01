import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firestore/firebaseConfig"

export async function search(searchQuery: string, collectionName: string) {
    const collectionToSearchIn = collection(db, collectionName)

    const q = query(
        collectionToSearchIn,
        where("lowercaseName", ">=", searchQuery.toLowerCase()),
        where("lowercaseName", "<=", searchQuery.toLowerCase() + "\uf8ff")
    )

    const querySnap = await getDocs(q)
    return querySnap.docs.map((doc) => doc.data())
}
