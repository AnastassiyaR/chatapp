import { auth } from '../firebase';
import type { Message } from '../types';

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
});

export default function ChatMessage({ message }: { message: Message }) {
  const { text, uid, photoURL, displayName, createdAt } = message;
  const own = uid === auth.currentUser?.uid;
  // createdAt is null for a moment while the server timestamp is pending
  const time = createdAt ? timeFormat.format(createdAt.toDate()) : '';

  return (
    <div className={`message ${own ? 'sent' : 'received'}`}>
      {photoURL && <img src={photoURL} alt="" referrerPolicy="no-referrer" />}
      <div className="bubble">
        <div className="meta">
          <span className="name">{displayName || 'Anonymous'}</span>
          {time && <time>{time}</time>}
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}
