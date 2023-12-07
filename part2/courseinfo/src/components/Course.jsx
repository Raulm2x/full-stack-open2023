//Subcomponents
const Header = ({course}) => (
  <>
    <h2>{course}</h2>
  </>
);

const Content = ({parts}) => (
  <>
    <Parts parts={parts}/>
    <Total parts={parts}/>
  </>
);
 
const Parts = ({parts}) => (
    <>
      {parts.map(part => (
        <p key={part.id}>
          {part.name}: {part.exercises}
        </p>
      ))}
    </>
);

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    
    return (
      <>
        <h3>
          total of exercises: {total}
        </h3>
      </>
    );
};


//Main Component 
const Course = ({courses}) => {
    return (
        <div>
            {courses.map(course => (
                <div key={course.id}>
                    <Header course={course.name}/>
                    <Content parts={course.parts}/>
                </div>
            ))}
        </div>
    )
};

export default Course;