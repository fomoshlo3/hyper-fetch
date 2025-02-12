import { getAdapter } from "adapter";
import { createSocket } from "../../utils/socket.utils";
import { createWsServer } from "../../websocket/websocket.server";

const windowInstance = global.window;

describe("Socket Adapter [ Utils ]", () => {
  let socket = createSocket();
  let windowSpy: jest.SpyInstance<Window & typeof globalThis, []>;

  beforeEach(() => {
    windowSpy = jest.spyOn(global, "window", "get");
    createWsServer();
    socket = createSocket();
    jest.resetAllMocks();
  });

  it("should allow to remove listener", async () => {
    const spy = jest.fn();
    socket.adapter.listeners.set("test", new Set<any>().add(spy));
    const removed = socket.adapter.removeListener("test", spy);
    expect(removed).toBeTrue();
  });

  it("should not throw when removing not existing listener", async () => {
    const spy = jest.fn();
    const removed = socket.adapter.removeListener("test", spy);
    expect(removed).toBeFalse();
  });

  describe("getAdapter utils no window", () => {
    beforeEach(() => {
      windowSpy.mockImplementation(() => undefined);
    });
    it("should not throw when there is no window", () => {
      const adapter = getAdapter(socket);
      expect(adapter).toBeNull();
    });
    it("should not throw SSE when there is no window", () => {
      socket = createSocket({ isSSE: true });
      const adapter = getAdapter(socket);
      expect(adapter).toBeNull();
    });
  });

  describe("getAdapter utils no instances", () => {
    beforeEach(() => {
      windowSpy.mockImplementation(() => ({} as any));
    });
    it("should not throw when there is no window", () => {
      const adapter = getAdapter(socket);
      expect(adapter).toBeNull();
    });
    it("should not throw SSE when there is no window", () => {
      socket = createSocket({ isSSE: true });
      const adapter = getAdapter(socket);
      expect(adapter).toBeNull();
    });
  });

  describe("getAdapter utils", () => {
    beforeEach(() => {
      windowSpy.mockImplementation(() => windowInstance);
      jest.clearAllMocks();
    });
    it("should create correct url with all parameters", () => {
      socket = createSocket({ auth: { foo: 1 }, queryParams: { bar: 2 } });
      const adapter = getAdapter(socket);
      expect(adapter.url).toBe("ws://localhost:1234/?foo=1&bar=2");
    });
    it("should create correct url with auth", () => {
      socket = createSocket({ auth: { foo: 1 } });
      const adapter = getAdapter(socket);
      expect(adapter.url).toBe("ws://localhost:1234/?foo=1");
    });
    it("should create correct url with query params", () => {
      socket = createSocket({ queryParams: { bar: 2 } });
      const adapter = getAdapter(socket);
      expect(adapter.url).toBe("ws://localhost:1234/?bar=2");
    });
    it("should initialize Websocket", () => {
      const adapter = getAdapter(socket);
      expect(adapter).toBeInstanceOf(WebSocket);
    });
    it("should initialize EventSource", () => {
      socket = createSocket({ isSSE: true });
      const adapter = getAdapter(socket);
      expect(adapter).toBeInstanceOf(EventSource);
    });
  });
});
