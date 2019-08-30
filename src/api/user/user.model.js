var User = function(user) {
    this.id = user.id ? user.id : 0;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  };
  
  export default User;