/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createUser({email, password, name}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);

            if (user) { 
                return await this.loginUser({email, password})
             } else {
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    async loginUser({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
        // eslint-disable-next-line no-unreachable
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authservice = new AuthService();

export default authservice;