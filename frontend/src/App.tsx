import { HeadProvider } from "react-head";
import { ToastContainer } from "react-toastify";
import Router from "routes";
// context
import { UserProvider } from "context/user";
import { QuickViewProvider } from "context/quickView";
// services
import ApiProvider from "services/provider";
// styles
import "scss/index.scss";
import "scss/bootstrap/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { AppConfigProvider } from "context/appConfig";

const App = () => {
  return (
    <HeadProvider>
      <ApiProvider>
        <AppConfigProvider>
          <QuickViewProvider>
            <UserProvider>
              <Router />
            </UserProvider>
          </QuickViewProvider>
          <ToastContainer
            position="bottom-left"
            theme="dark"
            progressClassName="bg-primary"
            autoClose={2500}
          />
        </AppConfigProvider>
      </ApiProvider>
    </HeadProvider>
  );
};

export default App;
