import Header from "./header";
import Content from "./content";

const Course = ({course}) => {

    console.log(course);

    return (
        <>
        <Header name={course.name}/>
        <Content course={course.parts}/>
        </>
    );

}

export default Course;