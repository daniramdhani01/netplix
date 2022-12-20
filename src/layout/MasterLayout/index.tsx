import { Outlet } from "react-router-dom";
import Header from "../Header";

function MasterLayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayout;
