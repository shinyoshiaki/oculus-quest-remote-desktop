export function getScreen() {
  return new Promise<MediaStream>(resolve => {
    (navigator.mediaDevices as any)
      .getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: "desktop"
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: "desktop"
          }
        }
      })
      .then((stream: any) => {
        resolve(stream);
      });
  });
}
