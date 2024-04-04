
import useTechnology from "../../../Hooks/useTechnology";

const Technology = () => {
    const { technologys } = useTechnology();

    if (!technologys) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-5">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[50px] font-bold font-[Poppins] text-[#22323d]">Technologies You <br></br> Will Learn</h1>
                </div>
                <div>
                    {technologys.map((technology, index) => (
                        <div key={index} className="mb-6">
                            {/* <p className="text-gray-600">{technology.title}</p> */}
                            <img src={technology.photo} alt={technology.title} className="w-10 h-10" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Technology;
