import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

 

const  page = async () => {


  const  session = await getServerSession(authOptions);

  if (session?.user){
    return <h1 className="test-4xl"> Admin page -welcome back {session?.user.username}</h1>
  }
  console.log(session);
  return <h1  className="test-4xl">Please login to see tis admin page</h1>  ;
  
   
};

export default page ;