import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setRole(data.role);
        setStatus(data.status);
      })
      .catch((error) => setError(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, role, status };

    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => navigate(`/users/${id}`))
      .catch((error) => setError(error));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Edit User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;