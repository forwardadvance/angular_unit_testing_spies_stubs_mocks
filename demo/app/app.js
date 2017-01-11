var session = {
  create: function(user) {
    this.user = user;
    user.login();
  }
}
