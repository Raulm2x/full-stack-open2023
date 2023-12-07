import ShowPoints from "./ShowPoints";

const MostVoted = ({anecdotes, points}) => {

    const values = Object.values(points);
    const maxValue = Math.max(...values);
    const maxKey = Object.keys(points).find(key => points[key] === maxValue);
  
    if (maxValue === 0){
      return (
        <div>
          <p>No votes yet.</p>
        </div>
      );
    };
  
    return(
      <div>
        {anecdotes[maxKey]}<br/>
        <ShowPoints counter={maxValue}/>
      </div>
    );
  };

export default MostVoted