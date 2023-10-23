import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import { z } from "zod";

// export async function GET() {
//     return NextResponse.json({success: true, message: "Hello, world!"})
// }

// Define a schema for input validation


const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    
  })
  


export async function POST( req:Request) {


    try{
        const body  =  await req.json()
        const {email,username, password} = userSchema.parse(body) ;

        // check if user exists
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });
        

        if (existingUserByEmail) {
            return NextResponse.json ({user:null , message: "User already exists" }, {status: 409})
        }


           // check if user name already exists
           const existingUserByUsername = await db.user.findUnique({
            where: {
               username: username
            }
        });
        

        if ( existingUserByUsername) {
            return NextResponse.json ({user:null , message: "User  with this Username already exists" }, {status: 409})
        }

        // we are using bcrypt to hash the password
        const hashedPassword = await hash(password, 10);

        const user = await db.user.create({
            data : {
                username,
                email,
                password : hashedPassword
            }
        })

        const {password: newUserPassword, ...rest} = user;

        return NextResponse.json( { user: rest, message: "User created successfully"  } , {status: 201});

    }catch(error)  {
        return NextResponse.json( {   message: "Someting went wrong"  } , {status: 500});
 

    }
}
   