export const Pagination = ({ page, setPage, pages }) => {
    return (
        <div className="pagination-wrapper">
            <button
                onClick={(e) => {
                    if (page > 0) {
                        setPage(prevPage => prevPage - 1)
                    }
                }}
            >
                prev
            </button>
            {
                pages.map(pageNumber => <button key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                >{pageNumber + 1}</button>)
                
            }
            <button
                onClick={(e) => {
                    setPage(prevPage => prevPage + 1)
                }}
            >next</button>
        </div>
    )
}