import React from "react";
import FormattedMessage from "./FormattedMessage";
import { isImageUrl, isYoutubeVideoUrl } from "../../utils/checkers";
import { getInitials } from "../../utils/processors";

/**
 * ChatMessage - Component for rendering a single chat message
 *
 * @param {Object} props
 * @param {Object} props.message - The message object to display
 * @param {boolean} props.isCurrentUser - Whether the message is from the current user
 * @param {boolean} props.isConnectedToPrevious - Whether this message should be visually connected to the previous one
 * @param {boolean} props.isLastFromUser - Whether this message is the latest from the user in sequence
 * @param {boolean} props.isTimeBreak - Whether this message starts a new thread after a time gap
 */
const ChatMessage = ({
  message,
  isCurrentUser,
  isConnectedToPrevious,
  isLastFromUser,
  isTimeBreak, // TODO: this props is never used
}) => {
  const { system, username, content, timestamp, type, imageData, caption } =
    message;

  const isImageFromTheWeb = isImageUrl(content);
  const isYoutubeVideo = isYoutubeVideoUrl(content);
  const initials = getInitials(username);

  // Determine if this is an image message
  const isImageMessage = type === "IMAGE_MESSAGE" || isImageFromTheWeb;

  // Determine chat position class based on message type
  const chatPositionClass = (() => {
    switch (true) {
      case system:
        return "chat-system";
      case isCurrentUser && isLastFromUser:
        return "chat-end";
      case isCurrentUser:
        return "chat-end";
      case isLastFromUser:
        return "chat-start";
      default:
        return "chat-start";
    }
  })();

  const carotClass = (() => {
    switch (true) {
      case isCurrentUser && (isLastFromUser || isTimeBreak):
        return "";
      case isCurrentUser:
        return "no-carot";
      case isLastFromUser || isTimeBreak:
        return "";
      default:
        return "no-carot";
    }
  })();

  // Determine bubble style based on message type
  const bubbleClass = system
    ? "chat-bubble-system bg-gray-700"
    : "chat-bubble-neutral bg-gray-700";

  // Add connected message styling
  const connectedClass =
    isConnectedToPrevious && !system && !isTimeBreak ? "mt-0 pt-1" : "mt-4";

  // Add margin to maintain spacing when avatar is not shown
  // Only add margin if not a system message and if this is not the last message from this user or a time break
  let spacingClass = "";
  if (!system && !isLastFromUser && !isTimeBreak) {
    spacingClass = isCurrentUser ? "mr-8" : "ml-8";
  }

  return (
    <div
      className={`chat ${chatPositionClass} animate__animated animate__fadeIn ${connectedClass} ${spacingClass}`}
    >
      {/* Show avatar if not a system message and is either the last message from this user or marks a time break */}
      {!system && (isLastFromUser || isTimeBreak) && (
        <div className="chat-image avatar">
          <div className="w-8 rounded-full relative">
            <img
              src={`https://avatar.vercel.sh/${username}`}
              alt={`${username}'s avatar`}
            />
            <span className="absolute bottom-0 right-0 white inset-0 flex items-center justify-center">
              {initials.split("")[0].toUpperCase()}
            </span>
          </div>
        </div>
      )}

      <div className={`chat-bubble ${bubbleClass} ${carotClass}`}>
        <FormattedMessage
          text={content}
          isYoutubeVideo={isYoutubeVideo}
          isImageMessage={isImageMessage}
          imageData={isImageFromTheWeb ? content : imageData}
          imageCaption={caption}
        />
      </div>

      <div className="chat-footer">
        {/* Show username and timestamp if not a system message and either not connected to previous or is a time break */}
        {!system &&
          (isLastFromUser || (!isConnectedToPrevious && isTimeBreak)) && (
            <>
              {username}
              <time className="text-xs opacity-50">
                {timestamp && new Date(timestamp).toLocaleTimeString()}
              </time>
            </>
          )}
      </div>

      {!system && <div className="chat-footer opacity-50"></div>}
    </div>
  );
};

export default ChatMessage;
