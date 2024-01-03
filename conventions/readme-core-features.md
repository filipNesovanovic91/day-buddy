# Using core features

In order to get the best experience and performances, please stick with a following suggestions/rules.

## HTTP Services

❌ Bad practice

Continue using `core.service.ts` located at `src\app\core\services\http\core.service.ts` to achieve a http communication with Backend inside a component.

✔️ Good practice

Instead, use `core-http-service.ts` located at `src\app\core\services\http\core-http.service.ts`.

_How it works?_

Let's say we have a component named `users.component.ts`. We need to get data from `https:/test-dev.com/test1/users` by `GET` method. Keep in mind that path to BE (`https://test-dev.com/test1/`) is already declared inside the environment file.

In this case, we'll generate a new service, named `users-http.service.ts`. **Please don't forget to include a suffix `http` into it's name**. This way, everybody else will know it's purpose.

This service will extend existing `core-http.service`. Inject a HttpClient, and make a `super()` call. The service will now look like:

```ts
export class UsersHttpService extends CoreHttpService {
  constructor(protected http: HttpClient) {
    super(http);
  }
}
```

Now, we can add the first method into it. Let's say we are going to name it `getUsers`. It will be like following:

```ts
public getUsers(): Observable<User[]> {
  return this.get<User[]>('users');
}
```

As you can see, the `get` method is only retrieving `'users'` slug, instead of whole path to API. No need to use full path here.

The same is with `POST/PUT/PATCH/DELETE` methods. For more info, take a look of `core-http.service.ts`.

The last step is to inject `users-http.service.ts` into our `users.component.ts` component:

```ts
constructor(private usersHttpService: UsersHttpService) {}
```

and finally make a call to `getUsers` method.

```ts
public getAllUsersFromComponent(): void {
  this.usersHttpService.getUsers()
    .subscribe(users => {
      /* Do some magic here */
    });
}
```

_NOTE: No unsubscribe mechanism, since we're dealing with the HTTP request here, which is going to be unsubscribed when it's completed. Otherwise, we would have to take care of the unsubscribe. Also, no RxJS operators introduced, for simplicity of the example._

<br/>

## HTTP Error handling

❌ Bad practice

Handling the errors inside a component.

This is **not** a good practice:

```ts
  this.service.getData()
    .subscribe(
      (data) => { /* ... */ }
      (error) => { /* Handle the Error here!!! */ }
    )
```

✔️ Good practice

Instead, let the newly introduced `http-error.interceptor.ts` work for you.

You just need to make a HTTP call, and that's all. If the error occurs, the Interceptor will handle it.

<br/>

## Loader

❌ Bad practice

Turning the loader on and off inside a component.

✔️ Good practice

After you make a HTTP call, it will be intercepted by a `http-loader.interceptor.ts` and the interceptor will trigger a `loader-state.service.ts`.

_What is the consequence?_

**The loader will be automatically shown on each HTTP request.**

Also, it will be turned off by the automatism, when the HTTP request if finished.

Is it possible to turn the loader on from a component? Yes, but if there are any other HTTP requests that are not yet finished, your request to display the loader will come to queue and wait for the others. No guaranties that the loader will be displayed immediately.

Keep in mind that the loader will be displayed on a whole screen. There is also an advanced mechanism named `dedicated loader`.

This feature allows us to display the loader on a separate UI element, instead on a whole screen. For example, you need a loader to be shown only above your Table, or above a Button, the dedicated loader is what you need.

_How to use it?_

This is an example of usage. Let's say we want to display a loader inside a button.

First, in `.ts` define a method like following.

It's necessary that we:

1. Define a Unique ID for our Loader

2. Define an Observable that will show/hide the Loader

3. Make a HTTP call

Don't forget to inject a `LoaderStateService` which do the most of job for us.

```typescript

constructor(private loaderStateService: LoaderStateService) {
  //...
}

public onButtonClick(): void {
    // Prepare Unique ID that is important for service to display a loader on your UI element.
    const uniqueId = this.loaderStateService.generateUniqueKey();

    // Prepare a loader visibility Observable. It will show/hide the loader.
    this.dedicatedLoaderDisplayed$ = this.loaderStateService.dedicatedLoaderFor(uniqueId);

    // Make a HTTP request
    this.httpClient
      .get('users', {
        headers: {
          [HeaderName.showDedicatedLoader]: uniqueId,
        },
      })
      .subscribe(
        // Some subscription handling here...
      );
}

```

And in our component's template, the Button should look like following ():

```html
<button (click)="onButtonClick()">
  <!-- Button text... -->
  <mat-spinner *ngIf="dedicatedLoaderDisplayed$ | async"></mat-spinner>
</button>
```
