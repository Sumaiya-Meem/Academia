import useCategory from "../../../Hooks/useCategory";

import "./Category.css";
const Category = () => {
  const { category } = useCategory();
  if (!category) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <div>
        <h1 className="text-2xl lg:text-[40px]  mb-20 font-bold font-[Poppins] text-[#22323d]">
          Creative Categories <br></br> For Students{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 ">
        {category.map((data, index) => (
          <div key={index} className="card mb-6  p-4 ">
             <div className="icon"></div>
            <div className="content">
              <h1 className="">{data.title}</h1>
              <p className="p-2">{data.description}</p>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
