class Validator {
    static validateRegister(req) {
      const fullName = req.body.fullName;
      const email = req.body.email;
      const password = req.body.password;
  
      if (!fullName || !email || !password) {
        throw new Error("Missing required fields");
      }
  
      // validate email format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }
    }
  
    static validateLogin(req) {
      const email = req.body.email;
      const password = req.body.password;
  
      if (!email || !password) {
        throw new Error("Missing required fields");
      }
  
      // validate email format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }
    }
  }

module.exports = Validator;