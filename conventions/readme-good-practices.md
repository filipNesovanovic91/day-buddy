# Applying good practices

Your code should be aligned with the following rules.

<br/>

## Avoid using `any`

❌ Bad practice

Use `any` when you're not sure about a type.

✔️ Good practice

Replace `any` with the real data types wherever possible.

If needed, use `unknown` rather than `any`.

<br/>

## Don't write directly to Lifecycle methods

❌ Bad practice

Put logic directly to Lifecycle methods.

✔️ Good practice

Introduce a new method, and call it from Lifecycle method if necessary.

Even if you think it's a line or two, move it outside. Consider scalability!

<br/>

## Change detection OnPush

Always use 

❌ Bad practice

```ts
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  /** Default change detection is applied */
})

export class HeaderComponent {

public users: User[]; /* Property interpolated inside a template */

}
```
and template would look like:

```html
<div>
  {{ users }}
</div>
```

✔️ Good practice

```ts
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush /* This line is a key */
})

export class HeaderComponent {

public users$ = new BehaviorSubject<User[]>([]); /* This is a change too */

}
```

and template would look like:

```html
<div>
  {{ users$ | async }}
</div>
```
<br/>

## Keep methods lite

❌ Bad practice

  - All logic wrapped by a single method
  - Huge methods, hard to understand and maintain

✔️ Good practice

  - Keep methods as small as possible
  - If there is a large amount of logic, break it into several smaller methods
  - Large code sections should be moved into utility services

The target is to make a component scalable, clear and it's content should be easy to understand.

<br/>

## Be clear about encapsulation

Don't forget to declare an accessibility operator alongside properties and methods.

❌ Bad practice

```ts
export class ExampleComponent {
  
  loginForm: FormGroup;
  users: User[];
```

✔️ Good practice

```ts
export class ExampleComponent {
  
  public formGroup: FormGroup[];
  private users: User[];
```

## Who goes first?

Tend to group properties and methods of same accessibility.

Of course, the properties should be defined before the class methods.

It's recommended that `public` items go first, then `protected` and `private`.

The first lines are reserved for `@Input`, `@Output`, `@ViewChild`

❌ Bad practice

```ts
export class ExampleComponent {
  
  public users: User[];
  private adminUsers: User[];
  @Input userId: number;
  private unsubscribe$: Subscription;
  private initForm(): void { /* some code here */ }
  public loginForm: FormGroup;
  public getUsers(): void { /* some code here */ }
```

✔️ Good practice

```ts
export class ExampleComponent {
  
  @Input userId: number;
  public loginForm: FormGroup;
  public users: User[];
  private adminUsers: User[];
  private unsubscribe$: Subscription;

  public getUsers(): void { /* some code here */ }
  private initForm(): void { /* some code here */ }
```

## Defining models

Stick with a hybrid solution between `one-model -> one-file` and `all-models -> one-file`. 

If the model is minor, used inside the other one, feel free to keep it in the same file with the bigger one.

<br/>

## Subscription callback methods (Handlers)


Methods of this type should be used when we're subscribing to some event or method that has more than two or three lines of code in callback section.

In this case, we need to introduce a new method, which handles all the logic from callback.

The new method should be named with `handle` prefix. Introduce a new method even if it consists of several lines only. Consider scalability and maintenance.

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

## Regions

Use regions to wrap properties or methods of same type.

This way, our code will be easier for maintenance.

Order of things inside a class should be like following:

```ts
class SomeGeneralClassName {

    #region Angular stuff (@ViewChildren/@Input/@Output)
    // ...
    #endregion

    #region Class properties
    //...
    #endregion

    constructor() {}

    #region Life cycle hooks
    //...
    #endregion

    #region Init methods 
    //...
    #endregion

    #region UI Responses
    //...
    #endregion

    #region Handlers
    //...
    #endregion
}
```

Of course, no need to use all of regions if their content would be empty.

<br/>

## General suggestions

  - Don't hardcode routes; Use Enums instead
  - Avoid callback hell
  - Reactive forms should be used rather than template-driven
  - Use kebab-case to define app URLs
  - ⚠️ Always unsubscribe!

_How to unsubscribe?_

✔️ The first approach

```ts
this.subscription$
  .pipe(first()) /* This line is a key */
  .subscribe(this.handleSub);
```

✔️ The second approach

```ts
private unsubscribe$ = new Subject<boolean>();
...

this.subscription$
  .pipe(takeUntil(this.unsubscribe$)) /* This line is a key */
  .subscribe(this.handleSub);
...

public ngOnDestroy(): void {
  this.unsubscribe$.next(true);
  this.unsubscribe$.complete();
}
```
