import { useState } from "react";

export const Pagination = ({ page, setPage, pageSize, dataCount }) => {

    const [leftPage, setLeftPage] = useState(0);

    const pagesCount = Math.ceil(dataCount / pageSize);

    const renderPages = () => {

        const result = [];

        for (let i = leftPage; i <= leftPage + 3 && i < pagesCount; ++i) {
            result.push(
                <button
                    key={i}
                    className={i === page ? "page-button page-button-active" : "page-button"}
                    onClick={() => changePage(i)}
                >{i + 1}</button>
            )
        }

        return result;
    }

    const changePage = (newPage) => {
        if (newPage <= leftPage && leftPage - 1 >= 0) {
            setLeftPage(leftPage - 1);
        }
        if (newPage > leftPage + 2 && newPage + 1 < pagesCount) {
            setLeftPage(leftPage + 1)
        }
        setPage(newPage);
    }


    return (
        <div className="pagination-wrapper">
            <button
                className="prev-button"
                onClick={() => page > 0 && changePage(page - 1)}
            >
                prev
            </button>
            {renderPages()}
            <button
                className="next-button"
                onClick={() => page < pagesCount - 1 && changePage(page + 1)}
            >next</button>
        </div>
    )
}