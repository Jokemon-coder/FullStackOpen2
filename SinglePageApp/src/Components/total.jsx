const Total = ({course}) => {
    console.log(course);

     /*courses.forEach(course => {
      const parts = course.parts;

      const exercisesArray = [];*/

    const parts = course.parts;

    const exercisesArray = [];
    parts.forEach(part => {
      exercisesArray.push(part.exercises);
      console.log(exercisesArray);
      });
      const initialNum = 0;
      const totalExercises = exercisesArray.reduce((accumulator, currentValue) => accumulator + currentValue, initialNum);
      console.log(totalExercises);
    return(
      <>
      <p>
        Number of exercises {totalExercises}
      </p>
      </>
    );
  }

export default Total;