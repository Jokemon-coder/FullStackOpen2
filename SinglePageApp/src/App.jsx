import Course from "./Components/course";
import Total from "./Components/total";

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test name',
        exercises: 8,
        id: 4
      }
    ]
  }

return (
<div>
<Course course={course}></Course>
<Total parts={course.parts}/>
</div>
);
}

export default App