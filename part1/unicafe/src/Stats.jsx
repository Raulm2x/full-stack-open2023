import StatisticLine from "./StatisticLine"
import StatisticRow from "./StatisticRow"

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
        <table>
            <tbody>
                <StatisticRow text="good" value={good}/>
                <StatisticRow text="neutral" value={neutral}/>
                <StatisticRow text="bad" value={bad}/>
                <StatisticRow text="full" value={full}/>
                <StatisticRow text="average" value={average.toFixed(2)}/>
                <StatisticRow text="positive" value={positive.toFixed(2)} percent="yes"/>
            </tbody>
        </table>
    </div>
    )
}

export default Stats