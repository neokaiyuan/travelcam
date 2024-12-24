import { TextEncoder } from "util";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // Return a simple img element with the same props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt="test" />;
  },
}));

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
})) as jest.Mock;

// Mock the toDataURL method separately
HTMLCanvasElement.prototype.toDataURL = jest.fn(
  () => "data:image/png;base64,photoData"
);

// Mock implementation of ReadableStream
class MockReadableStream {
  locked = false;

  constructor() {}

  getReader() {
    const textEncoder = new TextEncoder();
    const plainText = "Mock explanation";
    let readIndex = 0;

    return {
      read: () => {
        if (readIndex < plainText.length) {
          const value = textEncoder.encode(
            // Simulate expected model response format
            `0:"${plainText.slice(readIndex, readIndex + 1)}"`
          );
          readIndex++;
          return Promise.resolve({ done: false, value });
        } else {
          return Promise.resolve({ done: true, value: undefined });
        }
      },
      releaseLock: jest.fn(),
      closed: Promise.resolve(),
      cancel: jest.fn(),
    };
  }

  cancel = jest.fn();
  pipeThrough = jest.fn();
  pipeTo = jest.fn();
  tee = jest.fn(() => [this, this]);
}

// Mock ReadableStream globally
// Disable ESLint for this line because the mock is only for testing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.ReadableStream = MockReadableStream as any;

// Mock global fetch
global.fetch = jest.fn((url) => {
  if (url === "/api/explain") {
    return Promise.resolve({
      body: new MockReadableStream(),
    });
  }
  // Default mock response for other fetch calls
  return Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  });
}) as jest.Mock;

// Mock implementation of TextDecoder
class MockTextDecoder {
  decode(input?: BufferSource): string {
    // Convert input to Uint8Array if it's an ArrayBufferView
    const uint8Array = new Uint8Array(input as ArrayBuffer);
    // Simulate decoding by converting the input to a string
    return String.fromCharCode(...uint8Array);
  }
}

// Assign the mock to the global TextDecoder
global.TextDecoder = MockTextDecoder as typeof TextDecoder;
