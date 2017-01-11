# Part 6 - What are Stubs, Spies and Mocks

*TL:DR; When unit testing, we need to satisfy dependencies, but we don't want to build a whole app. Test doubles are objects and functions that stand in for the real objects to make testing easily. Stubs are tiny lightweight test doubles that contain no code. Mocks are test doubles with an implementation, so we can test their internal state. Spies are test double functions that allow us to assert that they are called.*

## Questions Answered

* What are Test Doubles
* What's the difference between Stubs, Mocks and Spies
* Why do we have so many words for things

## Stubs

We usually don't want our tests to use real data. We create stub objects to allow our functions to run under test. Say we have a `session.create` method that looks like this:

```
var session = {
  create: function(user) {
    this.user = user;
    user.login();
  }
}
```

We might create a stubUser object to check that session.create does what we expected.

```
var stubUser = {
  login: () => {}
}
// now we can test the session.create method.

session.create(stubUser);
expect(session.user).toBe(stubUser);
```

Stubs are dumb, they don't do anything. We make them so that our code doesn't throw `undefined is not a function` errors, and so we can check that our objects are going where we expected them to go. 

In this case, because the stub doesn't do anything, we can only test the session.create method by checking that the user was actually added to the session. We can't check that `user.login()` was actually called.

## Spies

Sometimes we want to verify that a particular function has actually been called. Lets say that we want to check that user.login is being invoked as we expected. We can spy on the function in the real user:

```
spyOn(user, 'login');
session.create(user);
expect(user.login).toHaveBeenCalled();
```

`spyOn` replaces the function with a new implementation that we can call assertions on. We can now check that the `user.login` method has been called.

## Mocks

Mocks are smart stubs, typically stubs plus spies. A mock object has an implementation that we can run expectations against.

```
var mockUser = {
  login: jasmine.createSpy('login')
  logout: jasmine.createSpy('login')
}
```

Later we can verify that the login method has actually been called:

```
session.create(mockUser)
expect(mockUser.login).toHaveBeenCalled();
expect(session.user).toBe(mockUser);
```

A mock might do more things, perhaps keep track of data, or store a count. We can check it's internal state.

## Is there really a difference between stubs and mocks?

Lots of people use these terms fairly interchangably. They really are very similar concepts. The key thing about a mock is that, because it has an implementation, you can check that the result is what you expected. This makes it more useful for BDD, we can check that the system behaves in the way we thought it would.

## Handy Glossary

* **Test Double** - A superclass for all pretend objects we use to make our tests run. Stubs, mocks and spies are all types of test double.
* **Stub** - A dumb test object that is only there to let the test pass.
* **Spy** - A mock funtion that we can call assertions on.
* **Mock** - A stub object with an implementation. This lets us test that the mock has the right state, or was interacted with in the way we hoped.

## Exercise 

Categorise the following as stubs, mocks and spies:

### 1. 

```
var user = {};
```

### 2.

```
var session = {
    login: () => {}
    logout: () => {}
};
```

### 3.

```
spyOn(window, 'alert');
```

### 4.

```
var request = {
    body: jasmine.createSpy('body'),
    close: jasmine.createSpy('close')
};
```

