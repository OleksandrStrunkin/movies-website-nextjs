// app/api/auth/__test__/updateUserApi.test.ts
import { PUT } from "../../profile/route";
import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

// 🧩 Моки
jest.mock("@/lib/mongodb", () => ({
  connectDB: jest.fn(),
}));

jest.mock("@/lib/models/User", () => ({
  findByIdAndUpdate: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
    })),
  },
}));

describe("PUT /api/auth/updateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 401 if authorization header is missing", async () => {
    const req = {
      headers: new Map(),
    } as unknown as Request;

    const res = await PUT(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("returns 400 if username is missing", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Request;

    const res = await PUT(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Username is required");
  });

  it("returns 404 if user not found", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });
    (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({ username: "NewName" }),
    } as unknown as Request;

    const res = await PUT(req);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("User not found");
  });

  it("returns 200 and updated username if successful", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });
    (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValue({ _id: "user123", username: "NewName" }),
    });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({ username: "NewName" }),
    } as unknown as Request;

    const res = await PUT(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe("Username updated");
    expect(data.username).toBe("NewName");
  });

  it("returns 500 if any error occurs", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("fail");
    });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({ username: "NewName" }),
    } as unknown as Request;

    const res = await PUT(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Server error");
  });
});
