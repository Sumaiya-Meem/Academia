import useCategory from "../../../Hooks/useCategory";


const Category = () => {
    const {category } = useCategory();
    if (!category ) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            
            <div>
                    <h1 className="text-[40px] font-bold font-[Poppins] text-[#22323d]">Creative Categories <br></br> For Students </h1>
                </div>
                <div className="grid grid-cols-5 gap-3">
                    {category.map((data, index) => (
                        <div key={index} className="mb-6">
                            <p className="text-gray-600">{data.title}</p>
                            {/* <img src={technology.photo} alt={technology.title} className="w-20 h-20" /> */}
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default Category;