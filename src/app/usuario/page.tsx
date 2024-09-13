import PostForm from "../components/postform";
import useAuthGuard from "../components/guardian";

export default function UserPage() {
    
  // useAuthGuard();

    return (
      <div >
      <PostForm/>
      </div>
    );
}