import { columns } from "../constants";

export const Table = ({ sorts, setSorts, currentData, selectRow, selectedRow }) => {

    return <table>
        <thead>
            <tr>
                {Object.keys(columns).map(x => <td key={x}>
                    {columns[x]} <span onClick={() => setSorts({ [x]: sorts[x] !== undefined ? !sorts[x] : true })}>{!sorts[x] ? '▲' : '▼'}</span>
                </td>)}
            </tr>
        </thead>
        <tbody>
            {currentData.map(obj => <tr 
                key={obj.id + obj.firstName}
                onClick={() => {
                    selectRow(obj);
                }}
                >
                {Object.keys(columns).map(x => <td key={x}>{obj[x]}</td>)}
            </tr>)}
        </tbody>
    </table>
}