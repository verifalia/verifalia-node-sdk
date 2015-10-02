Verifalia REST API - SDK and helper library for Node.js
=======================================================

Verifalia provides a simple HTTPS-based API for validating email addresses and checking whether they are deliverable or not. Learn more at http://verifalia.com

## Adding Verifalia REST API support to your Node.js project ##

The easiest way to add support for the Verifalia REST API to your Node.js project is to use [npm](https://npmjs.org/), which will automatically download and install the required files. With npm installed, run the following from your project root:

```bash
$ npm install verifalia
```

### Validate an email address

The example below shows how to have your Node.js application to submit and validate a couple of email addresses using the Verifalia helper library for Node.js:

```javascript
// Initializes and configures the Verifalia SDK, using your sub-account SID and auth
// token. Sub-accounts can be managed through the Verifalia dashboard, in the
// clients area.

var verifalia = require('verifalia')
	.client('YOUR-ACCOUNT-SID', 'YOUR-AUTH-TOKEN');

// Submits the email address to Verifalia

verifalia
	.emailValidations
	.submit('alice@example.com',
	{
		// The callback function is called at the completion of the validation
	
		callback: (error, data) => {
			// Displays the validation results
			
			console.log(data);
		},
		
		// Waits untile the engine completes the validation
		
		waitForCompletion: true
	});
```

#### Validate a list of email addresses

The `submit()` function accepts a single email address, as shown above, or an array of email addresses to validate in the same batch. In this case, just pass an array of strings instead of the single value:

```javascript
// ...

verifalia
	.emailValidations
	.submit([ 'alice@example.com', 'bob@example.net' ],
	{
		callback: (error, data) => {

// ...
```

#### Submit a validation without waiting for its completion

Internally, the `submit()` function sends the email addresses to the Verifalia servers and then polls them until the validations complete.
Instead of relying on this automatic polling behavior, you may even manually query the Verifalia servers by way of the `query()` function. In that case, you can submit the email addresses without waiting for their completion, as shown below:

```javascript
// Submits an email address to Verifalia and returns without waiting for the
// completion of the batch.

verifalia
	.emailValidations
	.submit('alice@example.com',

	// Since we don't want to wait for the completion of the batch, we can just
	// pass a callback here:

	(error, data) => {
		// Displays the uniqueID of the batch, which can be used to later
		// retrieve the results from Verifalia.
		
		if (data.status == verifalia.emailValidations.VALIDATION_STATUS_COMPLETED) {
			// The batch has been completed in a single submit() call
		
			console.log(data);
			return;
		}
		
		// TODO: Schedule a retrieval of the results, by way of the query() function
		
		console.log(data.uniqueID);
	});
```

#### Retrieve the Submit a validation without waiting for its completion

To retrieve the results of a batch you have submitted as shown above, you can pass the `uniqueID` of your batch to the `query()` function, optionally waiting until the job completes:

```javascript
// Retrieves the results of a batch from Verifalia and waits for its completion

verifalia
	.emailValidations
	.query(data.uniqueID, // Assumes we have data.uniqueID from the previous sample
	{
		// The callback function is called at the completion of the validation
	
		callback: (error, data) => {
			// Displays the validation results
			
			console.log(data);
		},
		waitForCompletion: true
	});
```

The `query()` function shares the same semantic of `submit()`, so you can avoid waiting for the completion of the job here as well.

### Delete a batch and its results

Verifalia automatically deletes the lists of email addresses you submit and their results after 30 days since their validation. For security purposes, you can force the immediate removal of a batch by way of the `delete()` function, as shown below:

```javascript
// Deletes a batch, given its uniqueID

verifalia
	.emailValidations
	.delete(data.uniqueID); // Assumes we have data.uniqueID from the previous sample
```

## License

MIT

## Support

Request help and support at [verifalia.com/support/contact-us](http://verifalia.com/support/contact-us).