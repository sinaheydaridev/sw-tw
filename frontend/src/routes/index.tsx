import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
// routes
import Routes from "./routes";
// components
import AppLoading from "components/shared/AppLoading";

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
