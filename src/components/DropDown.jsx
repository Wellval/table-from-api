import { useRef, useState, useEffect } from "react";

export const DropDown = ({ list, filters, setFilters }) => {
    const [open, setOpen] = useState(false);
    const refEl = useRef(null);

    const handleClick = e => {
        if (refEl.current && !refEl.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    let states = new Set();
    list.map(obj => states.add(obj.adress.state))

    return (
        <div ref={refEl} className="dd-wrapper">
            <button type="button" className="dd-header" onClick={() => setOpen(!open)}>
                Filter by state
            </button>
            {
                open && <div role="list" className="dd-list">
                    {
                        Array.from(states).map(state => <button
                            type="button"
                            className={filters.state === state ? "dd-list-item-active" : "dd-list-item"}
                            value={state}
                            onClick={e => {
                                if (filters.state === e.target.value) {
                                    setFilters({ ...filters, state: null })
                                    console.log(filters)
                                } else setFilters({ ...filters, state: e.target.value });
                            }}
                        >{state}
                        </button>)
                    }
                </div>
            }
        </div>
    )
}