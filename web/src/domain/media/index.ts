export function getScreen() {
  return new Promise<MediaStream>(resolve => {
    const constraints: any = {
      audio: false,
      video: { mandatory: { chromeMediaSource: "screen" } }
    };
    navigator.getUserMedia(constraints, stream => resolve(stream), () => {});
  });
}
