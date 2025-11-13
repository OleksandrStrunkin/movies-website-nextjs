import { POST } from "../register/route";
import bcrypt from "bcrypt";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
    })),
  },
}));

jest.mock("@/lib/mongodb", () => ({
  connectDB: jest.fn(),
}));

jest.mock("@/lib/models/User", () => {
  const saveMock = jest.fn();
  const UserMock = jest.fn().mockImplementation(() => ({ save: saveMock }));
  // @ts-expect-error: TS error due to temporary type mismatch
  UserMock.findOne = jest.fn();
  // @ts-expect-error: TS error due to temporary type mismatch
  UserMock.__saveMock = saveMock;
  return UserMock;
});

jest.mock("bcrypt");

const User =
  require("@/lib/models/User").default || require("@/lib/models/User");

describe("POST /api/auth/register", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  const mockUser = {
    username: "TestUser",
    email: "test@test.com",
    password: "123456",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if any field is missing", async () => {
    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ username: "", email: "", password: "" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("All fields are required");
  });

  it("returns 409 if user already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const req = {
      json: jest.fn().mockResolvedValue(mockUser),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(409);
    expect(data.error).toBe("User already exists");
  });

  it("returns 201 if user is created successfully", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");

    const req = {
      json: jest.fn().mockResolvedValue(mockUser),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.message).toBe("User created successfully");
    expect(data.user).toEqual({ username: "TestUser", email: "test@test.com" });
  });

  it("returns 500 if server throws an error", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    const req = {
      json: jest.fn().mockResolvedValue(mockUser),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Server error");
  });
});
