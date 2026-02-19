import { useEffect, useRef, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  const fetchUser = async (id) => {
    // Abort previous request if still running
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      setUser(data);
      setLoading(false);
    } catch (err) {
      if (err.name === "AbortError") return; // request cancelled
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // userId is in the dependency array so we refetch whenever it changes
    fetchUser(userId);

    // Cleanup aborts fetch on unmount to prevent memory leaks
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [userId]);

  const handleRefresh = () => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    fetchUser(randomId);
  };

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <>
        <p>Error: {error}</p>
        <button onClick={handleRefresh}>Refresh</button>
      </>
    );

  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>

      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Company: {user.company?.name}</p>
        </div>
      )}
    </>
  );
}

export default UserProfile;
