// VerticalTimeline.js

import React from "react";

const VerticalLine = ({ complaints }) => {
  return (
    <div className="overflow-y-auto h-96">
      {complaints.map((complaint) => (
        <div key={complaint.id} className="flex mb-6">
          <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white">{complaint.id}</span>
          </div>
          <div className="ml-4">
            <h3 className="font-medium">{complaint.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">
              {complaint.description}
            </p>
            <div className="flex space-x-2 text-muted-foreground">
              <p>Received: {complaint.receivedDate}</p>
              <p>Resolved: {complaint.resolvedDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalLine;
