import Login from "./Login";
import Profile from "./Profile";
import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    console.log(user && user);
    return (
      <div>
        Hello {user.name}{" "}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }
  // return (
  //   <div className="App">
  //     <Router>
  //       <Routes>
  //         <Route path="/" exact element={<Home />} />
  //         <Route path="/profile" element={<Profile />} />
  //         {/* <Route path="/external-api" component={ExternalApi} /> */}
  //       </Routes>
  //     </Router>
  //   </div>
  // );
}

export default App;

// function Home(props) {
//   return (
//     <>
//       <h1>My App</h1>
//       <Login />
//     </>
//   );
// }
