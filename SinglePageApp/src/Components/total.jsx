const Total = ({parts}) => {
    console.log(parts);

    let number = 0;

    parts.forEach(part => {
       number = number + part.exercises;
       console.log(number);
    });
    return(
      <>
      <p>
        Number of exercises {number}
      </p>
      </>
    );
  }

export default Total;