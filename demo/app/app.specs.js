describe('session', () => {

  // A stub is a minimal, content free object that's sufficient to make the code work
  it('can login with a stubUser', () => {
    var stubUser = {
      login: () => {}
    }

    session.create(stubUser);
    expect(session.user).toBe(stubUser);
  });

  // A mock has an implementation, and we can check it works
  // The implementation may be a spy
  it('can login with a mockUser', () => {
    var mockUser = {
      login: jasmine.createSpy()
    }

    session.create(mockUser);
    expect(session.user).toBe(mockUser);
    expect(mockUser.login).toHaveBeenCalled();
  });
});
