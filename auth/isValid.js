function isValid(user) {
    return user.username && user.password;
  
  }
  
  module.exports = {
    isValid,
  };