// import React, { useState } from 'react';
// import axios from 'axios';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';

// interface LoginResponse {
//     token: string;
// }

// const LoginForm: React.FC = () => {
//     const [userName, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [token, setToken] = useState('');
//     const [error, setError] = useState('');

//     const apiUrl = 'https://demo.globalqss.com/api/v1/auth/tokens';

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<string | undefined> => {
//         event.preventDefault();

//         try {
//             const response = await axios.post<LoginResponse>(apiUrl, { userName, password });
//             const token = response.data.token;
//             // localStorage.setItem('auth', response.data.token)
//             setToken(token);
//             return token;
//         } catch (error) {
//             setError('Invalid username or password');
//             console.error('Error:', error);
//         }
//     };

//     const handleLogout = () => {
//         setToken('');
//     };

//     if (token) {
//         return (
//             <div>
//                 <p>You are logged in with token: {token}</p>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>
//         );
//     }

//     return (

//         <div className="flex align-items-center justify-content-center w-auto h-screen">
//             <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
//                 <div className="text-center mb-5">
//                     <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
//                     <span className="text-600 font-medium line-height-3">Don't have an account?</span>
//                     <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
//                 </div>

//                 <div>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="email" className="block text-900 font-medium mb-2">Username</label>
//                         <InputText type="text" id="username" value={userName} onChange={(event) => setUsername(event.target.value)} placeholder="Email address" className="w-full mb-3" />


//                         <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
//                         <InputText type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Email address" className="w-full mb-3" />

//                         <Button label="Sign In" type='submit' icon="pi pi-user" className="w-full" />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;



// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import * as Comp from "../../components/share/share.component";


// // interface LoginResponse {
// //     access_token: string;
// // }

// // const LoginForm: React.FC = () => {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');

// //     const apiUrl = 'https://demo.globalqss.com/api/v1/auth/tokens';

// //     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// //         event.preventDefault();

// //         try {
// //             const response = await axios.post<LoginResponse>(apiUrl, { username, password });
// //             console.log('Token:', response.data.access_token);
// //         } catch (error) {
// //             setError('Invalid username or password');
// //             console.error('Error:', error);
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit}>

// //             <div className="flex align-items-center justify-content-center h-screen w-auto">
// //                 <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
// //                     <div className="text-center mb-5">
// //                         <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
// //                         <span className="text-600 font-medium line-height-3">Don't have an account?</span>
// //                         <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
// //                     </div>
// //                     <label htmlFor="email" className="block text-900 font-medium mb-2" >User Name</label>
// //                     <Comp.InputText name="userName" id="email" type="text" placeholder="Email address" className="w-full mb-3" value={username} onChange={(event) => setUsername(event.target.value)} />
// //                     <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
// //                     <Comp.InputText type="password" name="password" id="password" placeholder="Password" className="w-full mb-3" value={password} onChange={(event) => setPassword(event.target.value)} />


// //                     <div className="flex align-items-center justify-content-between mb-6">
// //                         <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
// //                     </div>

// //                     <Comp.Button type="submit" label="Sign In" icon="pi pi-user" className="w-full" />
// //                 </div>
// //             </div>

// //         </form>
// //     );
// // };

// // export default LoginForm;
