import "./App.css";
import NavBar from "./components/NavBar";
import PostContainer from "./components/PostContainer";

const App = () => {
  return (
    <div className="bg-slate-300">
      <NavBar />
      <PostContainer />
    </div>
  );
};

export default App;
