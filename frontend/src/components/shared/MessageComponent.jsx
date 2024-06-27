import { fileFormat } from "@/lib/features";
import moment from "moment";
import React, { memo } from "react";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, attachments = [], content, createdAt } = message;

  const sameSender = sender._id.toString() == user?._id.toString();
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: "-100%",
      }}
      whileInView={{
        opacity: 1,
        x: "0",
      }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        width: "fit-content",
        padding: "0.5rem",
        borderRadius: "5px",
      }}
    >
      {!sameSender && (
        <p className="text-sm text-blue-400 font-normal">{sender.name}</p>
      )}
      {content && <p>{content}</p>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <div key={index}>
              <a
                href=""
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </div>
          );
          1;
        })}

      <p className="text-[0.8rem] text-gray-500">
        {moment(createdAt).fromNow()}
      </p>
    </motion.div>
  );
};

export default memo(MessageComponent);
