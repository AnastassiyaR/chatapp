import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <header>
        <h1>⚡ Chat App</h1>
        {user && (
          <button className="btn btn-ghost" onClick={() => signOut(auth)}>
            Sign out
          </button>
        )}
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}
