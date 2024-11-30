import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { Hero } from "../components/storefront/Hero";
import { Navbar } from "../components/storefront/Navbar";

export default function IndexPage() {
    return (
        <div className="flx">
            <Hero/>
            <CategoriesSelection/>
            Home Page
        </div>
    )
};
