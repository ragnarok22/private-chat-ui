export const isYoutubeVideoUrl = (content) => {
  const youtubeCheckRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?/;
  return youtubeCheckRegex.test(content);
};

export const isImageUrl = (content) => {
  return /^(https?:\/\/.*\.(?:jpg|gif|avif))(?:\?.*)?$/i.test(content);
};
