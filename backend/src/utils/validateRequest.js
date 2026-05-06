import mongoose from 'mongoose';

const isEmpty = (value) => value === undefined || value === null || value === '';

const isNumberLike = (value) => !Number.isNaN(Number(value));

const normalizeRule = (rule) => {
	if (typeof rule === 'string') {
		return { type: rule };
	}
	return rule || {};
};

const buildError = (field, message) => ({ field, message });

const validateValue = (field, value, ruleConfig) => {
	const rule = normalizeRule(ruleConfig);

	if (rule.required && isEmpty(value)) {
		return buildError(field, `${field} is required`);
	}

	if (isEmpty(value)) {
		return null;
	}

	if (rule.type === 'string' && typeof value !== 'string') {
		return buildError(field, `${field} must be a string`);
	}

	if (rule.type === 'number' && !isNumberLike(value)) {
		return buildError(field, `${field} must be a number`);
	}

	if (rule.type === 'boolean' && typeof value !== 'boolean') {
		return buildError(field, `${field} must be a boolean`);
	}

	if (rule.type === 'email') {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (typeof value !== 'string' || !emailPattern.test(value)) {
			return buildError(field, `${field} must be a valid email`);
		}
	}

	if (rule.type === 'objectId' && !mongoose.Types.ObjectId.isValid(String(value))) {
		return buildError(field, `${field} must be a valid id`);
	}

	const stringValue = typeof value === 'string' ? value.trim() : value;

	if (typeof stringValue === 'string' && rule.minLength && stringValue.length < rule.minLength) {
		return buildError(field, `${field} must be at least ${rule.minLength} characters long`);
	}

	if (typeof stringValue === 'string' && rule.maxLength && stringValue.length > rule.maxLength) {
		return buildError(field, `${field} must be at most ${rule.maxLength} characters long`);
	}

	if (rule.min !== undefined && Number(value) < rule.min) {
		return buildError(field, `${field} must be at least ${rule.min}`);
	}

	if (rule.max !== undefined && Number(value) > rule.max) {
		return buildError(field, `${field} must be at most ${rule.max}`);
	}

	if (rule.enum && Array.isArray(rule.enum) && !rule.enum.includes(value)) {
		return buildError(field, `${field} must be one of: ${rule.enum.join(', ')}`);
	}

	if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
		return buildError(field, `${field} format is invalid`);
	}

	if (typeof rule.custom === 'function') {
		const customMessage = rule.custom(value);
		if (customMessage) {
			return buildError(field, customMessage);
		}
	}

	return null;
};

export const validate = (schema, source = 'body') => (req, res, next) => {
	const payload = req[source] || {};
	const errors = [];

	for (const [field, rule] of Object.entries(schema)) {
		const error = validateValue(field, payload[field], rule);
		if (error) {
			errors.push(error);
		}
	}

	if (errors.length > 0) {
		return res.status(400).json({
			message: 'Validation failed',
			errors,
		});
	}

	return next();
};

export const validateBody = (schema) => validate(schema, 'body');
export const validateParams = (schema) => validate(schema, 'params');
export const validateQuery = (schema) => validate(schema, 'query');
