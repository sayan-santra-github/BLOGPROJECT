/* eslint-disable no-useless-catch */
import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf"

class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async showPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Show Post Error: ", error)
            return false;
        }
    }

    async readPost(documentId){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId)
        } catch (error) {
            throw error;
        }
    }

    async updatePost({documentId, title, content, featuredImage, status}){
        try {
            await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId, 
                {
                title,
                content,
                featuredImage,
                status
                }
            );
            return true;
        } catch (error) {
            console.log("Update Post Error: ", error)
            return false;
        }
    }

    async  deletePost({documentId}){
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId)
        } catch (error) {
            throw error;
        }
    }

    // file upload
    async uploadFile(file){
        try {
            const uploadedFile = await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
            return uploadedFile.$id;
        } catch (error) {
            console.log("Upload file Error: ", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true;
        } catch (error) {
            console.log("Delete file Error: ", error)
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFileView(conf.appwriteBucketId, fileId)
        } catch (error) {
            throw error;
        }
    }

}

const service = new Service();
export default service;