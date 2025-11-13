import { POST, GET } from "../../favorite/route";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";

jest.mock("@/lib/mongodb", () => ({
  connectDB: jest.fn().mockResolvedValue(true),
}));

jest.mock("@/lib/models/User", () => ({
  findById: jest.fn(),
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

describe("Favorites API", () => {
  const saveMock = jest.fn().mockResolvedValue(true);
  const mockUser = {
    _id: "user123",
    favorites: ["1", "2"],
    save: saveMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ----------------- POST ROUTE -----------------
  it("returns 401 if token is missing", async () => {
    const req = { headers: new Map() } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.message).toBe("Unauthorized");
  });

  it("returns 401 if token is invalid", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    const req = {
      headers: new Map([["authorization", "Bearer badtoken"]]),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.message).toBe("Unauthorized");
  });

  it("returns 400 if movieId is missing", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({}),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.message).toBe("Missing movieId");
  });

  it("returns 404 if user not found", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });
    (User.findById as jest.Mock).mockResolvedValue(null);

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({ movieId: "10" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.message).toBe("User not found");
  });

  it("adds movie to favorites if not exists", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });
    (User.findById as jest.Mock).mockResolvedValue({
      ...mockUser,
      favorites: [...mockUser.favorites],
    });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({ movieId: "10" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe("Added to favorites");
    expect(data.favorites).toContain("10");
    expect(saveMock).toHaveBeenCalled();
  });

  it("removes movie if it already exists", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });
    (User.findById as jest.Mock).mockResolvedValue({
      ...mockUser,
      favorites: ["1", "2", "10"],
    });

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
      json: jest.fn().mockResolvedValue({ movieId: "10" }),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.message).toBe("Removed from favorites");
    expect(data.favorites).not.toContain("10");
    expect(saveMock).toHaveBeenCalled();
  });

  // ----------------- GET ROUTE -----------------
  it("returns 401 if token is missing (GET)", async () => {
    const req = { headers: new Map() } as unknown as Request;

    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.message).toBe("Unauthorized");
  });

  it("returns favorites list for valid user (GET)", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "user123" });
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const req = {
      headers: new Map([["authorization", "Bearer validtoken"]]),
    } as unknown as Request;

    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.favorites).toEqual(["1", "2"]);
  });
});
