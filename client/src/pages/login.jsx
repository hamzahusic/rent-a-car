import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from '../context/userContext';

const LogIn = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const {user,setUser} = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password){
            alert("Unesite sve informacije!");
            return;
       }
    
       const request = await fetch('http://localhost:8000/user/login',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email" : email,
            "sifra" : password,
        })
       })
    
       if(!request.ok){
        alert("Greska prilikom logiranja korisnika")
        return;
       }

       const data = await request.json();
       
       console.log(data.userInfo);
       setUser(data.userInfo);

       console.log(user)

       navigate("/");

    }

    return ( 
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <Link to={"/"}><img src="/logo.jpg" alt="" className="max-w-[250px] mx-auto"/></Link>
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Prijavite se na vaš račun</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Šifra</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600">Prijava</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Nemate nalog?
                    <Link to="/register" className="font-semibold leading-6 text-gray-900 hover:text-gray-600 ml-2">Registruj se</Link>
                </p>
            </div>
        </div>
     );
}
 
export default LogIn;