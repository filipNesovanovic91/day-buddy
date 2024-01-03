# Naming conventions

## General

Namespaces should be named in plural and using [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)

⚠️ Component naming: naming will be based on functionality and grouped based on a logical group.

<br/>

## Files

All files should be named using [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case)

_Examples:_


❌ Bad practice

```
camelCaseName.service.ts
snake_case_name.service.ts
combinedName_Service.service.ts
```

✔️ Good practice

```
core-members-utilities.service.ts
```

<br/>

## Classes/Interfaces/Enums

Class names should be singular. NG conventions should be followed: **_class-name.TYPE.ts_**.

The _TYPE_ could refer to model, service, pipe, etc. meaning we should have naming like following:

_Examples:_

❌ Bad practice
```
  model-name.ts
  enum-name.ts
  constant-name.ts
```


✔️ Good practice
```
  model-name.model.ts
  enum-name.enum.ts
  constant-name.const.ts
```

**NOTE: Use Interfaces to define models. Avoid using class for this purpose.**

<br/>

## Services

Keep in mind that a service name should describe it's purpose. 

⚠️ Never mix general logic, http calls, and the other stuff into a single service!

If the service is handling some general logic, name it with `utility` suffix. 
All methods that deal with `http` should be encapsulated by a service that contains `http` suffix in it's name.

_Examples_:

❌ Bad practice

```ts
export class AuthService() {
  public getTokenFromApi(): void { /* Call to API here */ }
  public getLastLoginTime(): Date { /* Handle some logic here that deals with local data */ }
}
```

✔️ Good practice

HTTP calls are in a `http` service (that extends `CoreHttpService`),

```ts
export class AuthHttpService() {
  public getTokenFromApi(): void { /* Call to API here */ }
}
```

while general logic is wrapped by a `utility` service.

```ts
export class AuthUtilityService() {
  public getLastLoginTime(): Date { /* Handle some logic here that deals with local data */ }
}
```

<br/>

## Variables/Properties/Methods

Use [camelCase](https://en.wikipedia.org/wiki/Letter_case#Camel_case) for naming those. Names should be descriptive.

_Examples_:

❌ Bad practice

```ts
let last_login-time = null;
```

✔️ Good practice

```ts
let lastLoginTime = null;
```

<br/>

## Observables/Subscriptions

Always use `$` suffix for naming Observables, Subscriptions and similar stuff.

_Examples_:

❌ Bad practice

```ts
private users: Observable<User[]>;
```

✔️ Good practice

```ts
private users$: Observable<User[]>;
```

<br/>

## Methods

<br/>

### UI Responses

Use `on` prefix for all methods that handle UI responses. Those methods are being called from a template.

_Examples:_

❌ Bad practice

```html
<button (click)="save()">Save</button>
```

✔️ Good practice

```html
<button (click)="onSave()">Save</button>
```

and in our `.ts` file, this method should be defined like following:

```ts
public onSave(): void {
  // some code here...
}
```

<br/>

### Subscription callback methods (Handlers)


Methods of this type should be used when we're subscribing to some event or method that has more than two or three lines of code in callback section.

In this case, we need to introduce a new method, which handles all the logic from callback.

The new method should be named with `handle` prefix.

_Examples:_

❌ Bad practice

```ts
private getUsers(): void {
  this.usersHttpService.getUsers()
    .subscribe(users => {
      /* Handling data here */
    })
}
```

✔️ Good practice

```ts
private getUsers(): void {
  this.usersHttpService.getUsers()
    .subscribe(this.handleUsers);
}


private handleUsers = (users: User[]) => {
  /* Do some magic here */
}
```

<br/>

## SCSS conventions

The recommended SCSS convention could be found [here](https://getbem.com/).

Before you continue, check if it is applicable to your portion of code.
