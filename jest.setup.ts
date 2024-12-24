import { TextEncoder } from "util";

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
})) as any;

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
          return Promise.resolve({ done: true, value: null });
        }
      },
      releaseLock: jest.fn(),
    };
  }

  cancel = jest.fn();
  pipeThrough = jest.fn();
  pipeTo = jest.fn();
  tee = jest.fn(() => [this, this]);
}

// Mock ReadableStream globally
global.ReadableStream = MockReadableStream as any;

// Mock global fetch
global.fetch = jest.fn((url) => {
  if (url === "/api/explain") {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({ explanation: "This is a mock explanation." }),
      headers: new Headers(),
      redirected: false,
      statusText: "OK",
      type: "basic",
      url: "",
      clone: jest.fn(),
      body: new MockReadableStream(),
      bodyUsed: false,
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
      text: jest.fn(),
    });
  }
  // Default mock response for other fetch calls
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    headers: new Headers(),
    redirected: false,
    statusText: "OK",
    type: "basic",
    url: "",
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  });
});

// Mock implementation of TextDecoder
class MockTextDecoder {
  decode(input?: BufferSource): string {
    // Simulate decoding by converting the input to a string
    return input ? String.fromCharCode(...new Uint8Array(input)) : "";
  }
}

// Assign the mock to the global TextDecoder
global.TextDecoder = MockTextDecoder as any;
