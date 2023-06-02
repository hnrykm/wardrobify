import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatForm from './HatForm';
import HatsList from './HatsList';
import ShoeList from './ShoeList';
import HatFormEdit from './HatFormEdit';

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />

					<Route path="hats">
						<Route index element={<HatsList />} />
						<Route path="new" element={<HatForm />} />
						<Route path="edit/:id" element={<HatFormEdit />} />
					</Route>
					<Route path="shoes">
						<Route index element={<ShoeList />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
