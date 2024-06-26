import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => setError(error));
  }, []);

  const deleteProject = (id) => {
    fetch(`/api/projects/${id}`, { method: "DELETE" })
      .then(() => setProjects(projects.filter((project) => project.id !== id)))
      .catch((error) => setError(error));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Project List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
                <Button variant="outline" onClick={() => deleteProject(project.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectList;