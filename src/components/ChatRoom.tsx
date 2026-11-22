import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  limitToLast,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firebase';
import type { Message } from '../types';
import ChatMessage from './ChatMessage';

const messagesRef = collection(firestore, 'messages');
const messagesQuery = query(messagesRef, orderBy('createdAt'), limitToLast(50));

export default function ChatRoom() {
  const [snapshot] = useCollection(messagesQuery);
  const messages = snapshot?.docs.map((d) => ({ id: d.id, ...d.data() }) as Message);
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [snapshot]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    const user = auth.currentUser;
    if (!trimmed || !user) return;

    setText('');
    await addDoc(messagesRef, {
      text: trimmed,
      createdAt: serverTimestamp(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
  };

  return (
    <>
      <main>
        {messages?.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        <div ref={bottomRef} />
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          maxLength={1000}
          autoFocus
        />
        <button className="btn btn-primary" type="submit" disabled={!text.trim()}>
          Send
        </button>
      </form>
    </>
  );
}
