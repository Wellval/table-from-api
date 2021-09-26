import { columns } from "../constants";

export const Table = ({ sorts, setSorts, currentData, selectRow, selectedRow, setShowInfo }) => {

    return <table>
        <thead>
            <tr>
                {Object.keys(columns).map(x => <td
                    onClick={() => setSorts({ [x]: sorts[x] !== undefined ? !sorts[x] : true })}
                    key={x}>
                    {columns[x]} <span >{!sorts[x] ? '▲' : '▼'}</span>
                </td>)}
            </tr>
        </thead>
        <tbody>
            {currentData.map(obj => <tr
                key={obj.id + obj.firstName}
                className={obj.firstName === selectedRow?.firstName ? "selected-row" : ""}
                onClick={() => {
                    selectRow(obj);
                    setShowInfo(currentData.filter(e => e.firstName === obj.firstName).length > 0)
                }}
            >
                {Object.keys(columns).map(x => <td key={x}>{obj[x]}</td>)}
            </tr>)}
        </tbody>
    </table>
}