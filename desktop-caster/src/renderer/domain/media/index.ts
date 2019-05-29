import electron_ from "electron";
const load = (window as any).require;
const electron: typeof electron_ = load("electron");
const { desktopCapturer } = electron;

interface option {
  width: number;
  height: number;
}

export function getScreen() {
  return new Promise<MediaStream>(resolve => {
    desktopCapturer.getSources(
      { types: ["screen", "window"] },
      (err, sources) => {
        let mediaSources = sources;
        console.log({ mediaSources });
        (navigator.mediaDevices as any)
          .getUserMedia({
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: mediaSources[0].id,
                maxWidth: 1920,
                maxHeight: 1080
              },
              audio: false
            }
          })
          .then((stream: any) => {
            resolve(stream);
          });
      }
    );
  });
}

export function getLocalDesktop(option: Partial<option> = {}) {
  console.log("display");
  return new Promise<MediaStream>((resolve: (v: MediaStream) => void) => {
    const mediaDevices: NavigatorUserMedia = navigator.mediaDevices as any;

    mediaDevices
      .getDisplayMedia({
        video: true,
        audio: true
      })
      .then((stream: any) => {
        resolve(stream);
      });
  });
}
