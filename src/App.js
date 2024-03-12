import { Route, Routes } from "react-router-dom";
import ProductHome from "./components/ProductHome";
import Profile from "./components/Profile";
import { createContext } from "react";
import { notification } from "antd";

const cartNotification = createContext();

function App() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, cartMessage) => {
    api.success({
      message: cartMessage,
      placement,
    });
  };
  return (
    <div className="App">
      {contextHolder}
      <cartNotification.Provider value={openNotification}>
        <Routes>
          <Route path="/" element={<ProductHome />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </cartNotification.Provider>
    </div>
  );
}

export default App;
export {cartNotification}