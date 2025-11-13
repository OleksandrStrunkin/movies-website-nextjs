import { POST } from "../login/route";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
    })),
  },
}));

jest.mock("@/lib/models/User", () => ({
  findOne: jest.fn(),
}));
jest.mock("@/lib/mongodb", () => ({
  connectDB: jest.fn(),
}));
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("POST /api/auth/login", () => {
  const mockUser = {
    _id: "user-id-123",
    username: "TestUser",
    email: "test@test.com",
    password: "hashed-password",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if email or password is missing", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ email: "", password: "" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Email and password are required");
  });

  it("returns 404 if user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "notfound@test.com", password: "123456" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("User not found");
  });

  it("returns 401 if user has no password (Google account)", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      ...mockUser,
      password: null,
    });

    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "test@test.com", password: "123456" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toMatch(/Google/);
  });

  it("returns 401 if password is invalid", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "test@test.com",
        password: "wrongpassword",
      }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Invalid credentials");
  });

  it("returns 200 and token if login is successful", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mock-token");

    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "test@test.com", password: "123456" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.token).toBe("mock-token");
    expect(data.user.username).toBe("TestUser");
    expect(data.user.email).toBe("test@test.com");
    expect(data.message).toBe("Login successful");
  });
});
