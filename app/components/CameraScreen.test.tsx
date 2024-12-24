import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import CameraScreen from "./CameraScreen";

describe("CameraScreen", () => {
  beforeAll(() => {
    // Mock the getUserMedia function
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: jest.fn().mockResolvedValue({
          getTracks: () => [{ stop: jest.fn() }],
        }),
      },
      writable: true,
    });

    // Mock the getContext method
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      drawImage: jest.fn(),
      toDataURL: jest.fn(() => "data:image/png;base64,photoData"),
    }));

    // Mock the toDataURL method separately
    HTMLCanvasElement.prototype.toDataURL = jest.fn(
      () => "data:image/png;base64,photoData"
    );
  });

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
