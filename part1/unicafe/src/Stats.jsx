import StatisticLine from "./StatisticLine"

const Stats = ({good,neutral,bad}) => {
    const full = good + neutral + bad
    const average = (1*good + 0*neutral + (-1)*bad)/full
    const positive = (good/full)*100
    
    if (full === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
    <div>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <p>full: {full}</p>
        <p>average: {average.toFixed(2)}</p>
        <p>positive: {positive.toFixed(2)}%</p>
    </div>
    )
}

export default Stats