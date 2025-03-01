import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Employee Dashboard</h1>
      <p>Manage employees efficiently with our dashboard.</p>
      <Link to="/dashboard" className="home-btn">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
