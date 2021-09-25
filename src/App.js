import './App.css';
import { Table } from './components/Table';
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestTableData } from "./redux/actions/tableData";
import { columns, pageSize } from './constants';
import { SearchBar } from './components/SearchBar';
import { DropDown } from './components/DropDown';

function App() {
	const dispatch = useDispatch();

	const [filters, setFilters] = useState({});
	const [sorts, setSorts] = useState({});
	const [page, setPage] = useState(0);

	const { list } = useSelector(state => state.tableData);

	const [currentData, setCurrentData] = useState([]);

	useEffect(() => {
		dispatch(requestTableData());
	}, [dispatch]);

	useEffect(() => {
		const filterObj = {};
		const sortObj = {};
		for (const key of Object.keys(columns)) {
			filterObj[key] = null;
		}
		sortObj.id = true;
		setFilters(filterObj);
		setSorts(sortObj);
		setPage(0);
	}, [list]);


	useEffect(() => {
		let data = list.map(x => ({ ...x, state: x.adress.state }));
		let newPage = page;

		for (const key of Object.keys(filters)) {
			if (filters[key] !== null) {
				data = data.filter(x => x[key].toLowerCase().includes(filters[key].toLowerCase()))
			}
		}

		data = _.orderBy(data, Object.keys(sorts), Object.keys(sorts).map(x => sorts[x] ? 'asc' : 'desc'))

		if (newPage * pageSize > data.length) {
			newPage = 0;
		}

		data = data.slice(newPage * pageSize, (newPage + 1) * pageSize);

		setPage(newPage);
		setCurrentData(data);
	}, [page, sorts, filters, list]);

	return (
		<div className="App">
			<div className="header">
				<SearchBar
					filters={filters}
					setFilters={setFilters}
				/>
				<DropDown
					list={list}
					setFilters={setFilters}
					filters={filters}
				/>
			</div>
			<Table
				sorts={sorts}
				setSorts={setSorts}
				currentData={currentData}
			/>
		</div>
	);
}

export default App;
