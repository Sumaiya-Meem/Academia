
import useTechnology from "../../../Hooks/useTechnology";
import Loading from "../../Loading/Loading";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Technology = () => {
    const { technologys } = useTechnology();

    if (!technologys) {
        return <Loading></Loading>;
    }
    AOS.init();
    return (
        <div className="my-10 mx-5">
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="mt-10 lg:ml-5"
                data-aos="zoom-in"
                data-aos-duration="1000"
           data-aos-easing="ease-in-out"
                >
                    <h1 className="text-[50px] font-bold font-[Poppins] text-[#22323d]">Technologies You <br></br> Will Learn</h1>
                </div>
                <div className="grid  grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3"
              
                >
                    {technologys.map((technology, index) => (
                        <div key={index} className="mb-6"
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                   data-aos-easing="ease-in-out">
                            {/* <p className="text-gray-600">{technology.title}</p> */}
                            <img src={technology.photo} alt={technology.title} className="w-20 h-20" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Technology;
