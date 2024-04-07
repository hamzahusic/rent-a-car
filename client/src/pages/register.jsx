import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from '../context/userContext'

const Register = () => {

    const [name,setName] = useState('');
    const [lastname,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        if(!email || !password || !name || !lastname){
            alert("Unesite sve informacije!");
            return;
       }
    
       const request = await fetch('http://localhost:8000/user/register',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ime" : name,
            "prezime" : lastname,
            "sifra" : password,
            "email" : email,
        })
       })
    
       if(!request.ok){
        alert("Greška prilikom kreiranja korisnika! Važno : Samo jedan korisnik može koristiti jedan email")
        return;
       }

       
       setUser({
            "ime" : name,
            "prezime" : lastname,
            "email" : email,
        })

       console.log(user)

       navigate("/");

    }

    return ( 
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                <Link to={"/"}><img src="/logo.jpg" alt="" className="max-w-[250px] mx-auto"/></Link>
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registujte vaš nalog</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Ime</label>
                        <div className="mt-2">
                        <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">Prezime</label>
                        <div className="mt-2">
                        <input id="lname" name="lname" type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Šifra</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={password}  onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600">Registruj se</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Imate nalog?
                <Link to="/login" className="font-semibold leading-6 text-gray-900 hover:text-gray-600 ml-2">Prijava</Link>
                </p>
            </div>
        </div>
     );
}
 
export default Register;