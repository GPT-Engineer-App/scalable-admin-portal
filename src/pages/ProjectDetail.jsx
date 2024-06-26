import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
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

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>Objectives: {project.objectives}</div>
          <div>Deadlines: {project.deadlines}</div>
          <div>Team Members: {project.teamMembers.join(", ")}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetail;