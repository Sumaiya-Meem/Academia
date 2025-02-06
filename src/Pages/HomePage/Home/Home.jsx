import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularCourse from "../PopularCourse/PopularCourse";
import SuccessStudent from "../SuccessStudent/SuccessStudent";
import Technology from "../Technology/Technology";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Technology></Technology>
           
           <PopularCourse></PopularCourse>
           <SuccessStudent></SuccessStudent>
           <Category></Category>
           
        </div>
    );
};

export default Home;