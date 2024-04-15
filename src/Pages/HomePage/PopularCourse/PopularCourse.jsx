import './PopularCourse.css'

const PopularCourse = () => {
  return (
    <div className="my-10">
      {/* title section */}
      <div className="flex items-center">
        <div className="w-[400px] flex gap-7">
          <div>
            <h1 className="text-xl font-semibold">Top Categories</h1>
            <h1 className="text-[40px] font-bold font-[Poppins]">
              Popular Courses
            </h1>
          </div>
          <div className="bg-orange-400 w-[2px]"></div>
        </div>
        <div className="flex items-center justify-between flex-1">
          <p className="text-justify w-[60%]">
            Dive into our comprehensive collection of courses taught by experts
            in their fields, and unlock your full potential through knowledge
            and skill acquisition.
          </p>
          <button className="animated-button uppercase bg-orange-400 px-4 py-3 text-white rounded-3xl font-serif">View All Courses</button>
        </div>
      </div>
    </div>
  );
};

export default PopularCourse;
