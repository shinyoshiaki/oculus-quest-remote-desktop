interface option {
  width: number;
  height: number;
}

const defaultOption = { width: 1280, height: 720 };

export function getLocalDesktop(option: Partial<option> = {}) {
  console.log("display");
  return new Promise<MediaStream>((resolve: (v: MediaStream) => void) => {
    const mediaDevices: NavigatorUserMedia = navigator.mediaDevices as any;

    mediaDevices
      .getDisplayMedia({
        video: true
      })
      .then((stream: any) => {
        resolve(stream);
      });
  });
}
