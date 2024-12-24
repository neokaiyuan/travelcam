import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import CameraScreen from "./CameraScreen";

describe("CameraScreen", () => {
  it("should render the camera screen", () => {
    const saveLatestPhoto = jest.fn();
    const { getByTestId } = render(
      <CameraScreen saveLatestPhoto={saveLatestPhoto} />
    );
    const cameraScreen = getByTestId("camera-screen");
    expect(cameraScreen).toBeInTheDocument();
  });

  it("should take a photo when the shutter button is clicked", () => {
    const saveLatestPhoto = jest.fn();
    const { getByRole } = render(
      <CameraScreen saveLatestPhoto={saveLatestPhoto} />
    );
    const shutterButton = getByRole("button", { name: /shutter/i });
    fireEvent.click(shutterButton);
    expect(saveLatestPhoto).toHaveBeenCalled();
  });
});
