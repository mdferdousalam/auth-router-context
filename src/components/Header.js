import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/UserContext';


const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    console.log(user);

    const handleSignout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="navbar bg-primary text-primary-content">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Awsam auth</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/home'>Home</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/orders'>Orders</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/login'>Login</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/register'>Register</Link>
                {user?.email && <span>Welcome, {user.email} </span>}
                {
                    user?.email ?
                        <button onClick={handleSignout} className='btn btn-sm' >Sign out</button>
                        : <Link to='/login' >
                            <button className='btn btn-sm'>Log In</button>
                        </Link>
                }
            </div>
        </div>
    );
};

export default Header;