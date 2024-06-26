import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => setError(error));
  }, []);

  const deleteUser = (id) => {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => setError(error));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">User List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          {users.map((user) => (
            <div key={user.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
                <Button variant="outline" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </div>
              <div className="text-sm">
                Role: {user.role}, Status: {user.status}, Registered: {new Date(user.registered).toLocaleDateString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;