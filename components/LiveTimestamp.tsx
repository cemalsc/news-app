"use client"

import TimeAgo from "react-timeago";
import React from "react";

interface LiveTimestampProps {
  time: string;
}

const LiveTimestamp: React.FC<LiveTimestampProps> = ({ time }: LiveTimestampProps) => {
  return <TimeAgo date={time} />;
};

export default LiveTimestamp;