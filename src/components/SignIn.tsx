import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignIn() {
  const signIn = () =>
    signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error);

  return (
    <div className="signin">
      <p>Sign in to join the chat</p>
      <button className="btn btn-primary" onClick={signIn}>
        Sign in with Google
      </button>
    </div>
  );
}
