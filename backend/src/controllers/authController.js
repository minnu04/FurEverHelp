import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const isCollegeEmail = (email) => String(email || '').trim().toLowerCase().endsWith('@klu.ac.in');

const normalizeRole = (r) => {
  const map = { donor: 'Donor', student: 'Student', faculty: 'Faculty', owner: 'Owner', shelter: 'Shelter', admin: 'Admin' };
  return map[String(r || '').toLowerCase()] || 'Donor';
};

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const normalizedRole = normalizeRole(role);

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password and confirm password do not match' });
  }

  if ((normalizedRole === 'Student' || normalizedRole === 'Faculty') && !isCollegeEmail(email)) {
    return res.status(400).json({ message: 'Student and faculty accounts must use a @klu.ac.in email address' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: normalizedRole,
  });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// LOGIN 

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

  if (user && (user.role === 'Student' || user.role === 'Faculty') && !isCollegeEmail(user.email)) {
    return res.status(401).json({ message: 'Student and faculty accounts must use a @klu.ac.in email address' });
  }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
