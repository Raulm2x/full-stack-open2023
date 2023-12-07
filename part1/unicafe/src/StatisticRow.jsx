const StatisticRow = ({text, value, percent}) => {
    if (percent==="yes"){
        percent = "%"
    }
    return ( 
        <>
            <tr>
                <td>{text}</td>
                <td>{value}{percent}</td>
            </tr>    
        </>
    )
}


export default StatisticRow