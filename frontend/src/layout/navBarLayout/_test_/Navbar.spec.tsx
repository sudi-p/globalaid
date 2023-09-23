import { fireEvent, render, screen } from "@testing-library/react";
import { NavBar } from "..";
import { Provider } from 'react-redux';
import store from '@store/store';
import { createMockRouter } from "@utils/test-utils/createMockRouter";
import { RouterContext } from 'next/dist/shared/lib/router-context';

// const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("Navbar Component", () => {
    const router = createMockRouter({ pathname: "/"})
    function renderNavBar() {
        return render(
            <Provider store={store}>
                <RouterContext.Provider value={router}>
                    <NavBar />
                </RouterContext.Provider>
            </Provider >
        )
    }

    it("should render Navbar Component", () => {
        renderNavBar();
        const HomeLink = screen.getByRole("link", {name: "Jobs"})
        expect(HomeLink).toBeInTheDocument();
        fireEvent.click(HomeLink);
        expect(router.push).toHaveBeenCalledWith('/jobs', expect.anything(), expect.anything())
    })
})