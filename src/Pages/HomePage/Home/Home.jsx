import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularCourse from "../PopularCourse/PopularCourse";
import Technology from "../Technology/Technology";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Technology></Technology>
           
           <PopularCourse></PopularCourse>
           <Category></Category>
        </div>
    );
};

export default Home;