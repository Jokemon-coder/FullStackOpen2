import Header from "./header";
import Content from "./content";
import Total from "./total";

const Course = ({courses}) => {

    console.log(courses);

    return(
    courses.map(course => {
        return(
        <div key={course.id}>
        <Header name={course.name}/>
        <Content course={course}/>
        <Total course={course}/>
        </div>
        );
    }));

}

export default Course;