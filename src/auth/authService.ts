import { Account, ID, Models } from "react-native-appwrite";

export class AuthService {
  account: Account;
  constructor(account: Account) {
    this.account = account;
  }

  async createAccount({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      return this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });
    } catch (error) {
      console.error("❌ Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      return this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch (error) {
      console.error("❌ Error logging in:", error);
      throw error;
    }
  }

  async logout() {
    try {
      return this.account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error("❌ Error logging out:", error);
      throw error;
    }
  }

  async getUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.error("❌ Error getting user:", error);
      throw error;
    }
  }
}

