import React, { useState } from 'react';
import { auth, googleProvider, foundCollectionRef, usersCollectionRef, db } from '../Config/config.js'
import { createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';

function Register() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const navigate = useNavigate();

  const [docSnap, setDoc] = useState();
  let currUserId = auth?.currentUser?.uid;

  // async function isUserDetailsDocExists() {
  //   console.log('checking if userdetails exists');
  //   console.log('curr user id is: ', currUserId);

  //   const userDocRef = doc(db, 'users', auth?.currentUser?.uid);
  //   const userDocSnap = await getDoc(userDocRef);

  //   if (userDocSnap.exists()) {
  //     setDoc(userDocSnap.data());
  //     console.log("Document exists:", userDocSnap.data());
  //     return true;
  //   } else {
  //     console.log("No document found with the current user's UID as the name.");
  //     return false;
  //   }
  // }

  async function signUp(e) {
    e.preventDefault();
    if (!email || !pass) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      console.log('User registered:', userCredential.user.email);
      navigate('/userdetails'); // Redirect to user details page
    } catch (err) {
      console.error('Error during registration:', err.message);
      alert('Registration failed. Please try again.');
    }
  }

  async function signInGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful. User:', result.user.email);
  
      // Check if user details exist in Firestore
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        // User details found
        console.log('User details found. Redirecting to Home.');
        navigate('/home'); // Redirect to home
      } else {
        // New user, redirect to user details page
        console.log('New user detected. Redirecting to UserDetails.');
        navigate('/userdetails');
      }
    } catch (err) {
      console.error('Error during Google Sign-In:', err.message);
      alert('Google Sign-In failed. Please try again.');
    }
  }
  

  async function logout() {
    try {
      await signOut(auth);
      console.log('User logged out successfully.');
      navigate('/login'); // Redirect to login after logout
    } catch (err) {
      console.error('Error during logout:', err.message);
      alert('Logout failed. Please try again.');
    }
  }

  return (
    <div class=" flex items-center justify-center min-h-screen p-4 register">
      <div class="bg-white py-4 px-6 rounded-lg shadow-lg w-full max-w-sm">
        <div class="flex justify-start mb-4">
          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1suzj4p" focusable="false" aria-hidden="true" viewBox="0 0 86 19" width="92" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#B4C0D3" d="m.787 12.567 6.055-2.675 3.485 2.006.704 6.583-4.295-.035.634-4.577-.74-.422-3.625 2.817-2.218-3.697Z"></path><path fill="#00D3AB" d="m10.714 11.616 5.352 3.908 2.112-3.767-4.295-1.725v-.845l4.295-1.76-2.112-3.732-5.352 3.908v4.013Z"></path><path fill="#4876EF" d="m10.327 7.286.704-6.583-4.295.07.634 4.577-.74.422-3.66-2.816L.786 6.617l6.055 2.676 3.485-2.007Z"></path><path fill="#4876EE" d="M32.507 8.804v6.167h2.312v-7.86h-3.366v1.693h1.054ZM32.435 6.006c.212.22.535.33.968.33.434 0 .751-.11.953-.33.213-.23.318-.516.318-.86 0-.354-.105-.641-.318-.86-.202-.23-.52-.345-.953-.345-.433 0-.756.115-.968.344-.202.22-.303.507-.303.86 0 .345.101.632.303.861ZM24.46 14.799c.655.296 1.46.444 2.413.444.896 0 1.667-.139 2.312-.416.645-.277 1.141-.664 1.488-1.162.357-.506.535-1.094.535-1.764 0-.65-.169-1.2-.506-1.649-.328-.459-.785-.818-1.373-1.076-.587-.267-1.266-.435-2.037-.502l-.809-.071c-.481-.039-.828-.168-1.04-.388a1.08 1.08 0 0 1-.318-.774c0-.23.058-.44.173-.631.116-.201.29-.359.52-.474.241-.114.535-.172.882-.172.366 0 .67.067.91.201.053.029.104.059.15.09l.012.009.052.037c.146.111.263.243.35.395.125.21.188.444.188.703h2.311c0-.689-.159-1.286-.476-1.793-.318-.516-.776-.913-1.373-1.19-.588-.287-1.296-.43-2.124-.43-.79 0-1.474.133-2.052.4a3.131 3.131 0 0 0-1.358 1.12c-.318.487-.477 1.066-.477 1.735 0 .927.314 1.673.94 2.237.626.564 1.464.89 2.514.976l.794.071c.645.058 1.113.187 1.401.388a.899.899 0 0 1 .434.788 1.181 1.181 0 0 1-.231.717c-.154.201-.38.36-.68.474-.298.115-.669.172-1.112.172-.49 0-.89-.067-1.199-.2-.308-.144-.539-.33-.694-.56a1.375 1.375 0 0 1-.216-.746h-2.297c0 .679.168 1.281.505 1.807.337.517.834.928 1.489 1.234ZM39.977 15.07c-.8 0-1.445-.095-1.936-.286a2.03 2.03 0 0 1-1.084-.99c-.221-.469-.332-1.1-.332-1.893V8.789h-1.2V7.11h1.2V4.988h2.153V7.11h2.312V8.79h-2.312v3.198c0 .373.096.66.289.86.202.192.486.287.852.287h1.17v1.937h-1.112Z"></path><path fill="#4876EE" fill-rule="evenodd" d="M43.873 14.899c.52.23 1.117.344 1.791.344.665 0 1.252-.115 1.763-.344.51-.23.934-.55 1.271-.96.337-.412.564-.88.679-1.407h-2.124c-.096.24-.279.44-.549.603-.27.162-.616.244-1.04.244-.262 0-.497-.031-.704-.093a1.572 1.572 0 0 1-.423-.194 1.662 1.662 0 0 1-.636-.803 3.159 3.159 0 0 1-.163-.645h5.784v-.775a4.28 4.28 0 0 0-.463-1.98 3.686 3.686 0 0 0-1.343-1.477c-.578-.382-1.291-.574-2.139-.574-.645 0-1.223.115-1.733.345-.501.22-.92.52-1.257.903a4.178 4.178 0 0 0-.78 1.305c-.174.478-.26.98-.26 1.506v.287c0 .507.086 1.004.26 1.492.183.478.443.913.78 1.305.347.382.775.688 1.286.918Zm-.094-4.674.02-.09a2.507 2.507 0 0 1 .117-.356c.145-.354.356-.622.636-.804.104-.067.217-.123.339-.165.204-.071.433-.107.686-.107.395 0 .723.09.983.272.27.173.472.426.607.76a2.487 2.487 0 0 1 .16.603h-3.57c.006-.038.013-.076.022-.113Z" clip-rule="evenodd"></path><path fill="#4876EE" d="M50.476 14.97V7.112h1.835v1.98a4.54 4.54 0 0 1 .173-.603c.202-.536.506-.937.91-1.205.405-.277.9-.416 1.488-.416h.101c.598 0 1.094.139 1.489.416.404.268.707.67.91 1.205l.016.04.013.037.028-.077c.212-.536.52-.937.925-1.205.405-.277.901-.416 1.489-.416h.1c.598 0 1.098.139 1.503.416.414.268.727.67.94 1.205.211.535.317 1.205.317 2.008v4.475h-2.312v-4.604c0-.43-.115-.78-.346-1.047-.222-.268-.54-.402-.954-.402-.414 0-.742.139-.982.416-.241.268-.362.626-.362 1.076v4.56h-2.326v-4.603c0-.43-.115-.78-.346-1.047-.222-.268-.535-.402-.94-.402-.423 0-.756.139-.996.416-.241.268-.362.626-.362 1.076v4.56h-2.311Z"></path><path fill="#4876EE" fill-rule="evenodd" d="M68.888 13.456v1.515h1.834v-4.82c0-.726-.144-1.319-.433-1.778-.289-.468-.712-.817-1.271-1.047-.549-.23-1.228-.344-2.037-.344a27.76 27.76 0 0 0-.896.014c-.318.01-.626.024-.924.043l-.229.016a36.79 36.79 0 0 0-.552.042v1.936a81.998 81.998 0 0 1 1.733-.09 37.806 37.806 0 0 1 1.171-.025c.424 0 .732.1.925.301.193.201.289.502.289.904v.029h-1.43c-.704 0-1.325.09-1.864.272-.54.172-.959.445-1.257.818-.299.363-.448.832-.448 1.405 0 .526.12.98.361 1.363.24.373.573.66.997.86.433.201.934.302 1.502.302.55 0 1.012-.1 1.388-.302.385-.2.683-.487.895-.86a2.443 2.443 0 0 0 .228-.498l.018-.056Zm-.39-1.397v-.63h-1.445c-.405 0-.718.1-.939.3-.212.192-.318.455-.318.79 0 .157.026.3.08.429a.99.99 0 0 0 .238.345c.221.191.534.287.939.287a2.125 2.125 0 0 0 .394-.038c.106-.021.206-.052.3-.092.212-.095.385-.253.52-.473.135-.22.212-.526.23-.918Z" clip-rule="evenodd"></path><path fill="#4876EE" d="M72.106 14.97V7.11h1.835v2.595c.088-.74.31-1.338.665-1.791.481-.603 1.174-.904 2.08-.904h.303v1.98h-.578c-.635 0-1.127.172-1.473.516-.347.334-.52.822-.52 1.463v4.001h-2.312ZM79.92 11.298h.767l2.499 3.672h2.6l-3.169-4.51 2.606-3.35h-2.427l-2.875 3.737V4.5h-2.312v10.47h2.312v-3.672Z"></path></svg>
        </div>
        <h2 class="text-3xl font-semibold text-left mb-4">
          Sign Up
        </h2>
        <form>
          <div class="mb-3">
            <label class="block text-gray-700">
              Email
            </label>
            <input class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" type="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div class="mb-3">
            <div class="flex justify-between items-center">
              <label class="block text-gray-700">
                Password
              </label>
            </div>
            <input class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" type="password" onChange={(e) => setPass(e.target.value)} required />
          </div>
          <button class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200" type="submit" onClick={signUp}>
            Sign Up
          </button>
        </form>
        <div class="text-center mt-3">
          <p class="text-gray-700">
            Already have an account?
            <span> </span>
            <a class="text-blue-500 hover:underline" onClick={(e)=>{
              e.preventDefault();
              navigate('/login')
            }}>
              Login
            </a>
          </p>
        </div>
        <div class="flex items-center my-3">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-2 text-gray-500">
            or
          </span>
          <hr class="flex-grow border-gray-300" />
        </div>
        <button class="w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200 mb-2" onClick={signInGoogle}>
          <i class="fab fa-google text-red-500 text-xl mr-2"></i>
          Sign in with Google
        </button>
        <button class="w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Register;
