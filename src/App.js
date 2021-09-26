import './App.css';
import { Table } from './components/Table';
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestTableData } from "./redux/actions/tableData";
import { columns, pageSize } from './constants';
import { SearchBar } from './components/SearchBar';
import { DropDown } from './components/DropDown';
import { Pagination } from './components/Pagination';
import { ProfileInfo } from './components/ProfileInfo';

function App() {
	const dispatch = useDispatch();

	const [filters, setFilters] = useState({});
	const [sorts, setSorts] = useState({});
	const [page, setPage] = useState(0);
	const [showInfo, setShowInfo] = useState(false);

	const { list } = useSelector(state => state.tableData);

	const [currentData, setCurrentData] = useState([]);
	const [realSize, setRealSize] = useState(0);
	const [selectedRow, selectRow] = useState(null);

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

		data = _.orderBy(data, Object.keys(sorts), Object.keys(sorts).map(x => sorts[x] ? 'asc' : 'desc'));

		if (newPage * pageSize >= data.length) {
			newPage = 0;
		}

		setRealSize(data.length);

		data = data.slice(newPage * pageSize, (newPage + 1) * pageSize);

		setPage(newPage);
		setCurrentData(data);
		if (selectedRow) {
			setShowInfo(data.filter(e => e.firstName === selectedRow.firstName).length > 0);
		}
	}, [page, sorts, filters, list, selectedRow]);

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
				selectRow={selectRow}
				selectedRow={selectedRow}
				setShowInfo={setShowInfo}
			/>
			<Pagination
				page={page}
				setPage={setPage}
				pageSize={pageSize}
				dataCount={realSize}
			/>
			{selectedRow && showInfo ? <ProfileInfo
				selectedRow={selectedRow}
				currentData={currentData}
			/> : ''}
		</div>
	);
}

export default App;
