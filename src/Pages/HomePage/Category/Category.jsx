import useCategory from "../../../Hooks/useCategory";

import "./Category.css";
const Category = () => {
  const { category } = useCategory();
  if (!category) {
    return <div>Loading...</div>;
  }

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(5,10,35,0.75), rgba(5,10,35,0.75)), url('https://i.ibb.co/6rDbq6F/category.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: '200px',
  };


  return (
    <div className="">
        
      {/* cover section */}
      <div style={backgroundImageStyle} className="relative mb-20">
      <div className="h-[200px] text-gray-300 font-serif flex flex-col items-center justify-center mt-10 bg-slate-500 bg-opacity-20">
        <h1 className="text-3xl uppercase"> Creative Categories</h1>
        <h1 className="text-3xl uppercase mt-2"> For Students</h1>
        {/* <h4 className='capitalize '> {para}</h4> */}
      </div>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 ">
        {category.map((data, index) => (
          <div key={index} className="card mb-6  p-4 mx-2">
            <div className="icon">
              <div className="imgBox">
                <img src={data.photo} alt="" className="" />
              </div>
            </div>
            <div className="content">
              <h1 className="mt-16 text-center text-2xl font-semibold font-serif">
                {data.title}
              </h1>
              <p className="p-2 text-justify text-gray-700 text-sm">
                {data.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
