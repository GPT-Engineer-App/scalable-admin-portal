import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [objectives, setObjectives] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = { name, objectives, deadlines, teamMembers: teamMembers.split(",") };

    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then(() => navigate("/projects"))
      .catch((error) => setError(error));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Create Project</CardTitle>
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
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Textarea
              placeholder="Objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              required
            />
            <Input
              placeholder="Deadlines"
              value={deadlines}
              onChange={(e) => setDeadlines(e.target.value)}
              required
            />
            <Input
              placeholder="Team Members (comma separated)"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;