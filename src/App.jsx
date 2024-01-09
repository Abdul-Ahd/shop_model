import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./component/login";
import Main from "./component/main";
import { log } from "./hook/auth";
import { CookiesProvider, useCookies } from "react-cookie";
function App() {
  const { tag1, set1 } = log();
  const [count, setCount] = useState(0);
  const cookies = decodeURIComponent(document.cookie);
  //const [cookies, setCookie] = useCookies();
  if (tag1) {
  }
  if (cookies) {
    return (
      <>
        <div>
          <Main />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Login />
        </div>
      </>
    );
  }
}

export default App;
