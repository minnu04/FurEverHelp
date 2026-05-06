const WINDOW_MS = 15 * 60 * 1000;

const createRateLimiter = ({
	windowMs = WINDOW_MS,
	max = 100,
	message = 'Too many requests, please try again later.',
} = {}) => {
	const requests = new Map();

	return (req, res, next) => {
		const now = Date.now();
		const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
		const entry = requests.get(key);

		if (!entry || entry.resetAt <= now) {
			requests.set(key, { count: 1, resetAt: now + windowMs });
			return next();
		}

		entry.count += 1;

		if (entry.count > max) {
			return res.status(429).json({ message });
		}

		return next();
	};
};

export const apiLimiter = createRateLimiter({
	max: 300,
	message: 'Too many API requests from this IP. Please try again later.',
});

export const authLimiter = createRateLimiter({
	max: 20,
	message: 'Too many authentication attempts. Please wait before retrying.',
});

export const paymentLimiter = createRateLimiter({
	max: 40,
	message: 'Too many payment requests. Please try again later.',
});

export default createRateLimiter;
