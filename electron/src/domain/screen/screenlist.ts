export type ScreenSource = {
  id: string;
  name: string;
  thumbnail: { toDataURL: () => any };
};

export default function getScreenList() {
  const load = (window as any).require;
  const desktopCapturer = load("electron").desktopCapturer;
  return new Promise<ScreenSource[]>(resolve => {
    desktopCapturer.getSources(
      {
        types: ["screen", "window"],
        thumbnailSize: { width: 700, height: 700 }
      },
      (_: any, sources: any) => {
        resolve(sources);
      }
    );
  });
}
