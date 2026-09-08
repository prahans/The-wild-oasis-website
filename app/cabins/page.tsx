import Counter from "../components/Counter";

export default async function Page() {
  // Temporary delay to make the loading UI visible during testing.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await res.json();
  return (
    <>
      <h1>Cabins page</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter users={users} />
    </>
  );
}
