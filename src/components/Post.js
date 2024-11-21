export default function Post({ userId, id, title, body }) {
  return (
    <li>
      <div>
        <div>ID: {id}</div>
        <div>UserID: {userId}</div>
        <div>Title: {title}</div>
        <div>Body: {body}</div>
      </div>
    </li>
  );
}
