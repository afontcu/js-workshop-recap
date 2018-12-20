# Exercise 8

1. This exercise is a work-log (aka timesheet) application. Run the fixed version of the exercise ("ex8-fixed.html") in your browser and play around to see the expected behavior.

2. For this exercise, you should only need to make changes to "ex8.js", not the HTML or CSS.

3. Using the OLOO pattern, change `Project` from using the prototypal class pattern to just being a simple object with methods.

	- define a `setupProject(..)` factory function that makes and initializes a new project object (linked to `Project` -- hint: `Object.create(..)`)
	- each project object needs these data properties: `projectId`, `description`, `work`, and `time`
	- update the `addProject(..)` method to use `setupProject(..)` instead of `new Project(..)`

4. Using the OLOO pattern, wire `App`, `UI`, and `Helpers` objects together into a single virtually-composed object delegation context.

	- remove the `setupUI(..)` function; instead, using `Object.create(..)`, define a `UI` object that prototype-delegates to `Helpers`
	- using `Object.create(..)`, define an `Application` object (which prototype-delegates to `UI`) to hold all the `App` oriented methods
	- change `setupApp()` (no `UI` argument needed now) to create (via `Object.create(..)`) an application object that prototype-delegates to `Application`; this object will be named `App`
	- now there will be four linked objects in the delegation chain:
		`App` (data for the application instance)
		   ->
		`Application` (application related methods)
		   ->
		`UI` (UI related methods)
		   ->
		`Helpers` (helper methods)
	- instead of `UI.init()`, call `App.init()` so the `this` context (where all data is stored) for all subsequent method calls will be `App`
	- hints:
		- all variable and function accesses that relied on lexical scope before, now rely on `this` context
		- `submitNewWorkEntry(..)` needs to be hard-bound to maintain proper `this` across event calls
		- the previous circular method call references between `App` and `UI` are replaced with delegated method calls via `this` context

4. **BONUS:**
	- define and use a helper (e.g. `makeDelegate(..)`) that creates an object instance that's prototype-delegated to another object, and copies properties/methods onto the newly linked object
	- write a set of tests that independently mocks each of `App`, `Application`, `UI`, and `Helpers` objects in the prototype-delegation chain to test all logic
	- write out a detailed analysis, in your own words, of the pros/cons of this OLOO-style approach compared to the module/object/prototype approaches used in the previous exercises (5, 6, and 7).
