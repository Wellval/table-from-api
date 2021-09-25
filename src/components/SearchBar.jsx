import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const SearchBar = ({ filters, setFilters }) => {
    return (
        <form id="search-bar">
            <button className="btn-search">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
                type="text"
                className="input-search"
                placeholder="Search by name..."
                onChange={e => setFilters({ ...filters, firstName: e.target.value })}
            ></input>
        </form>
    );
}