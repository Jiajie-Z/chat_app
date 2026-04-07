export default function UserList({ users }) {
  return (
    <ul className="users">
      {Object.values(users).map((user) => (
        <li key={user}>
          <div className="user">
            <span className="username">{user}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}