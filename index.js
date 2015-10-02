var EmailValidationClient = require('./EmailValidationClient');
var WaitForCompletionOptions = require('./WaitForCompletionOptions');

module.exports = {
	DEFAULT_API_VERSION: 'v1.1',
	DEFAULT_BASE_URL: 'https://api.verifalia.com/',
	
	WaitForCompletionOptions: WaitForCompletionOptions
};

module.exports.client = function(accountSid, authToken, options) {
	this.accountSid = accountSid;
	this.authToken = authToken;
	this.baseUrl = (options || {}).baseUrl || module.exports.DEFAULT_BASE_URL;
	this.apiVersion = (options || {}).apiVersion || module.exports.DEFAULT_API_VERSION;
	
	this.emailValidations = new EmailValidationClient(this);
	
	return this;
};