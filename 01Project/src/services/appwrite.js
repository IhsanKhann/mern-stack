import config from '../config/config.js';
import { Client, Account, ID } from 'appwrite';

class AppwriteService {
  constructor() {
    this.client = new Client()
      .setEndpoint(config.apiUrl)
      .setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async Register({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);
      if(user){
        this.Login(email,password);
      }
    } catch (error) {
      console.error('Register error:', error.message);
      throw error;
    }
  }

  async Login({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  }

  async Logout() {
    try {
      await this.account.deleteSession('current');
      return true;
    } catch (error) {
      console.error('Logout error:', error.message);
      throw error;
    }
  }

  async GetUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error('GetUser error:', error.message);
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
