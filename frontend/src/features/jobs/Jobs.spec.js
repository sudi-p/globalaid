import Jobs from './Jobs';
import { render, screen } from '@testing-library/react';

describe("whole page testing", ()=>{
	test("should render initial component", () => {
		const { queryByText } = render(<Jobs />)
		expect(screen.getByText("Jobs")).toBeInTheDocument();
	});
});