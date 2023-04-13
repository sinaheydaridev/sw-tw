import { Outlet } from "react-router-dom";
// local
import Header from "./Header";
import SideBarColumn from "./SideBarColumn";
import SideBarNavigation from "./SideBarNavigation";

const Main = () => {
  return (
    <div className="container">
      <div className="row">
        {/* Navigation */}
        <div className="col-1 m-0 p-0">
          <SideBarNavigation />
        </div>
        {/* Content */}
        <div className="col-8 border-start border-end m-0 p-0">
          <Header />
          <main className="container">
            <Outlet />
          </main>
        </div>
        {/* Right side column */}
        <div className="col-3 m-0 px-0">
          <SideBarColumn />
        </div>
      </div>
    </div>
  );
};

export default Main;
