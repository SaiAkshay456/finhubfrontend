"use client";

import dynamic from "next/dynamic";

const MeetingRecord = dynamic(() => import("./MeetingRecord"));
const ActionNotes = dynamic(() => import("./ActionNotes"));

export default function UserExtraSections({ user}) {
  return (
    <div className="space-y-12 mt-12">
      <div >
        <h2 className="text-xl font-semibold mb-4">Meeting Records</h2>
        <MeetingRecord user={user} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Action Notes</h2>
        <ActionNotes user={user} />
      </div>
    </div>
  );
}
