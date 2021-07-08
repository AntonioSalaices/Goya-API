module.exports = {
  generate() {
    const limit = 4;
    let token = '';

    for (let index = 0; index < limit; index++) {
      token += this.getToken();
    }

    return token;
  },
  generateCode() {
    return Math.random().toString(36).slice(-6);
  },
  getToken() {
    return Math.random().toString(36).slice(-5);
  }
};
