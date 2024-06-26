import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const projects = [
  { name: "Project Alpha", status: "In Progress", metrics: { tasks: 10, completed: 5 } },
  { name: "Project Beta", status: "Completed", metrics: { tasks: 8, completed: 8 } },
  { name: "Project Gamma", status: "Pending", metrics: { tasks: 12, completed: 0 } },
];

const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-6">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{project.name}</span>
                <Badge variant="outline">{project.status}</Badge>
              </div>
              <div className="text-sm">
                Tasks: {project.metrics.tasks}, Completed: {project.metrics.completed}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Alert>
        <AlertTitle>Recent Updates</AlertTitle>
        <AlertDescription>
          Project Alpha has 5 tasks remaining.
        </AlertDescription>
      </Alert>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
              Important Info
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Project Beta is completed successfully.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Dashboard;