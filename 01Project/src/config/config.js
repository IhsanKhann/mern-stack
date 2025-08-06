const config = {
    apiUrl: String(import.meta.env.VITE_APPWRITE_API_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionIdEnrollements: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ENROLLEMENTS),
    collectionIdCourses: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_COURSES),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config;