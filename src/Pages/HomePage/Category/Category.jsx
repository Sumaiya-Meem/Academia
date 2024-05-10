import useCategory from "../../../Hooks/useCategory";
import Loading from "../../Loading/Loading";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "./Category.css";
import { MdSupportAgent } from "react-icons/md";

const Category = () => {
  const { category } = useCategory();
  if (!category) {
    return <Loading />;
  }

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(5,10,35,0.95), rgba(5,10,35,0.95)), url('https://i.ibb.co/6rDbq6F/category.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: '200px',
  };

  return (
    <div>
      {/* cover section */}
      <div style={backgroundImageStyle} className="relative mb-20">
        <div className="h-[200px] text-white flex flex-col items-center justify-center mt-10 bg-slate-500 bg-opacity-20">
          <h1 className="text-3xl uppercase">Creative Categories</h1>
          <h1 className="text-3xl uppercase mt-2">For Students</h1>
        </div>
      </div>
     
      <VerticalTimeline lineColor="blue">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 50, 150)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="2019 - 2024"
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MdSupportAgent />}
        >
          <h3 className="vertical-timeline-element-title">Support Session</h3>
          <h4 className="vertical-timeline-element-subtitle">Get personalized support and guidance from experienced tutors</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          contentStyle={{ background: 'rgb(33, 50, 150)', color: '#fff'}}
          date="2016-2018"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<MdSupportAgent />}
        >
          <h3 className="vertical-timeline-element-title">Hackathon</h3>
          <h4 className="vertical-timeline-element-subtitle">Participate in a hackathon event where you can brainstorm ideas</h4>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Category;
