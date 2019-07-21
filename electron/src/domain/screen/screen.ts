export function getScreen(id: string) {
  return new Promise<MediaStream>(resolve => {
    const nav = navigator.mediaDevices as any;
    nav
      .getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: "desktop"
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: id,
            maxWidth: 1920,
            maxHeight: 1080
          },
          optional: [{ maxFrameRate: 15 }]
        }
      })
      .then((stream: any) => {
        resolve(stream);
      })
      .catch(() => {
        nav
          .getUserMedia({
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: id,
                maxWidth: 1920,
                maxHeight: 1080
              },
              optional: [{ maxFrameRate: 15 }]
            }
          })
          .then((stream: any) => {
            resolve(stream);
          });
      });
  });
}
