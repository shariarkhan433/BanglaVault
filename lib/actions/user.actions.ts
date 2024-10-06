'use server'

import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const SignIn=async ()=>{
    try {
        //! Implement Database operations

    } catch (error) {
        console.error('Error',error);
        
    } finally {
        
    }
}


export const SignUp=async (userData:SignUpParams)=>{
  try {
      //! Create a user account
      const { account, database } = await createAdminClient();

      //* Destructured the user data into this variables
      const {email, password, lastName,firstName} =userData;
      const newUserAccount = await account.create(
       ID.unique(),
       email,
       password,
       `${firstName} ${lastName}`
      );

      const session = await account.createEmailPasswordSession(email, password);
      
      const userId = newUserAccount.$id;

      const newUserData = {
          userId,
          email,
          firstName,
          lastName
      }
      const permissions = [
        Permission.read(Role.any()), // Adjust as needed
        Permission.write(Role.user(userId)) // Grant write access to the user
      ];
      
      await database.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
          ID.unique(),
          newUserData,
          permissions
        );

    
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      return parseStringify(newUserAccount);

  } catch (error) {
      console.error('Error',error);
      
  } finally {
      
  }
}
export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      console.error('Error Creating document', error )
    }
  }