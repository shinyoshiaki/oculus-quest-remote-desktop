export type StateDevices = { keyboardOpen: boolean };

const initialState: StateDevices = { keyboardOpen: false };

export const keyboardSwitch = (b: boolean) => ({
  type: "devices_keyboardSwitch" as const,
  payload: b
});

type Actions = ReturnType<typeof keyboardSwitch>;

export default function reducer(
  state = initialState,
  action: Actions
): StateDevices {
  switch (action.type) {
    case "devices_keyboardSwitch":
      return { ...state, keyboardOpen: action.payload };
    default:
      return state;
  }
}
