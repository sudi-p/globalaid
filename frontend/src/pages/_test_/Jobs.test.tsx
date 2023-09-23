import { Provider } from 'react-redux';
import Jobs from '../jobs';
import store from '@store/store';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

describe("whole page testing", () => {
	function renderJobs() {
		return render(
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Jobs />
				</QueryClientProvider>
			</Provider>
		);
	}
	test("should render initial component", () => {
		renderJobs();
		const myElement = screen.getByText('Loading...');
		expect(myElement).toBeInTheDocument();
	});
});