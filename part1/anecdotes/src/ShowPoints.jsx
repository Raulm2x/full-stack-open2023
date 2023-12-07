const ShowPoints = ({counter}) => {
    if (counter === 0){
      return (
        <div>
          <p>has no votes yet.</p>
        </div>
      );
    } else if (counter === 1){
      return (
        <div>
          <p>has {counter} vote.</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>has {counter} votes.</p>
        </div>
      );
    };
  };

export default ShowPoints