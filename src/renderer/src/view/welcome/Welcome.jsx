import { Link } from "react-router-dom";


const Welcome = () => {
  return (
    <div style={{ height: '100%' }} className="bg-gray-800 text-white text-center">
      <div>Welcome</div>
      <div className="flex justify-around">
        <Link to="/register">Register</Link>
        <Link to="/Home">Home</Link>
        <Link to="/Calendar">calendario</Link>
        <Link to="Users">Users</Link>
        
      </div>
    </div>
  )
}

export default Welcome


