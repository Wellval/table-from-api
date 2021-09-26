export const ProfileInfo = ({ selectedRow }) => {
    return <div className="profile-info__wrapper">
        <h2>Profile Info:</h2>
        <p>Selected profile: {selectedRow.firstName} {selectedRow.lastName}</p>
        <p>Description: {selectedRow.description}</p>
        <p>Address: {selectedRow.adress.streetAddress}</p>
        <p>City: {selectedRow.adress.city}</p>
        <p>State: {selectedRow.adress.state}</p>
        <p>Index: {selectedRow.adress.zip}</p>
    </div>
}