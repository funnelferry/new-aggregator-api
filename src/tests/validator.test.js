const sinon = require("sinon");
const { expect } = require("chai");
const Validator = require("../helpers/validator");

describe("Validator", () => {
  describe("validateRegister", () => {
    it("should throw an error if any required fields are missing", () => {
      const req = { body: {} };
      expect(() => Validator.validateRegister(req)).to.throw(
        "Missing required fields"
      );
    });

    it("should throw an error if email format is invalid", () => {
      const req = { body: { fullName: "Test User", email: "invalidemail" } };
      expect(() => Validator.validateRegister(req)).to.throw(
        "Invalid email format"
      );
    });

    it("should not throw an error if all fields are valid", () => {
      const req = {
        body: {
          fullName: "Test User",
          email: "testuser@example.com",
          password: "password",
        },
      };
      expect(() => Validator.validateRegister(req)).to.not.throw();
    });
  });

  describe("validateLogin", () => {
    it("should throw an error if any required fields are missing", () => {
      const req = { body: {} };
      expect(() => Validator.validateLogin(req)).to.throw(
        "Missing required fields"
      );
    });

    it("should throw an error if email format is invalid", () => {
      const req = { body: { email: "invalidemail", password: "password" } };
      expect(() => Validator.validateLogin(req)).to.throw(
        "Invalid email format"
      );
    });

    it("should not throw an error if all fields are valid", () => {
      const req = { body: { email: "testuser@example.com", password: "password" } };
      expect(() => Validator.validateLogin(req)).to.not.throw();
    });
  });
});
