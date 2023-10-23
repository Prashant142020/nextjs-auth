import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

 

const  page = async () => {


  const  session = await getServerSession(authOptions);
  // console.log(session?.user);

  if (session?.user){
    return <h1 className="test-4xl"> Admin page -welcome back {session?.user.username || session.user.name}</h1>
  };
  
  return <h1  className="test-4xl">Please login to see tis admin page</h1>  ;
  
   
};

export default page ;