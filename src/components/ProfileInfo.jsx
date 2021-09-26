export const ProfileInfo = ({ selectedRow }) => {
    const infoObj = {
        'Selected profile': `${selectedRow.firstName} ${selectedRow.lastName}`,
        'Description': selectedRow.description,
        'Address': selectedRow.adress.streetAddress,
        'City': selectedRow.adress.city,
        'State': selectedRow.adress.state,
        'Index': selectedRow.adress.zip,
    }
    
    return <div className="profile-info__wrapper">
        <h2>Profile Info:</h2>
        {
            Object.keys(infoObj).map(key => <p><b>{key}</b>: {infoObj[key]}</p>)
        }
    </div>
}