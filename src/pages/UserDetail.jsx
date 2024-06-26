import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => setError(error));
  }, [id]);

  if (error) {
    return (
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>Role: {user.role}</div>
          <div>Status: {user.status}</div>
          <div>Registered: {new Date(user.registered).toLocaleDateString()}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;