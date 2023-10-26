class AuthFakeData {
  public memberLoginBestCase = {
    email: "moon@gmail.com",
    password: "12345678",
  };

  public loginInvalidPass = {
    email: "moon@gmail.com",
    password: "1234qwerqw578",
  };

  public loginInvalidEntity = {
    password: "123456asdf78",
  };
}

export default AuthFakeData;
