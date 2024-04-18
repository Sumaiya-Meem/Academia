
import useTechnology from "../../../Hooks/useTechnology";
import Loading from "../../Loading/Loading";

const Technology = () => {
    const { technologys } = useTechnology();

    if (!technologys) {
        return <Loading></Loading>;
    }

    return (
        <div className="mt-5 mx-5">
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <div className="mt-10">
                    <h1 className="text-[50px] font-bold font-[Poppins] text-[#22323d]">Technologies You <br></br> Will Learn</h1>
                </div>
                <div className="grid  grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3">
                    {technologys.map((technology, index) => (
                        <div key={index} className="mb-6">
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
