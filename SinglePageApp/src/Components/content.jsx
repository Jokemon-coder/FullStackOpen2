const Part = ({part, exercises}) => {
console.log(part, exercises);
  return(
    <>
    <p>
      {part} {exercises}
    </p>
    </>
  );
}

const Content = ({course}) => { 
    console.log(course);
  
    return(
      <>
      {
        course.parts.map(part => {
            console.log(part);
            return(
                <Part key={part.id} part={part.name} exercises={part.exercises}></Part>
            )
        })
      }
      </>
    );
    
  }

export default Content;