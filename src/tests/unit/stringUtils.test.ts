import { getInitials } from "../../lib/stringUtils";

describe("getInitials", () => {
  it("should return the correct initials for a given full name", () => {
    const fullName = "John Doe";
    const expectedInitials = "JD";
    const result = getInitials(fullName);
    expect(result).toEqual(expectedInitials);
  });

  it("should handle full names with multiple words", () => {
    const fullName = "Alice Bob Charlie";
    const expectedInitials = "ABC";
    const result = getInitials(fullName);
    expect(result).toEqual(expectedInitials);
  });

  it("should return an empty string if the full name is empty", () => {
    const fullName = "";
    const expectedInitials = "";
    const result = getInitials(fullName);
    expect(result).toEqual(expectedInitials);
  });
});
