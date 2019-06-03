export function getScreen() {
  return new Promise<MediaStream>(resolve => {
    const constraints: any = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "screen",
          minWidth: 1080,
          minHeight: 1920
        }
      }
    };
    navigator.getUserMedia(constraints, stream => resolve(stream), () => {});
  });
}
