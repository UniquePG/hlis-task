import connectMongo from '@/lib/mongoConnection';
import Users from '@/models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectMongo();

    // Get request body
    const { fullName, username, email, phone, gender, place, role, password, signupMethod } = await req.json();

    console.log('Signup data received:', { fullName, username, email, phone, gender, place, role: 2, password, signupMethod });

    // Validation checks
    if (!fullName || !username || !email || !phone || !gender || !place || !password ) {
      throw new Error('All fields are required');
    }

    // Check if the user already exists (by email or username)
    const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('Email or Username already exists');
    }

    // Validate gender
    if (!['male', 'female'].includes(gender)) {
      throw new Error('Invalid gender value');
    }

    // Validate password (minimum length 6 characters)
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Users({
      fullName,
      username,
      email,
      phone: parseInt(phone),
      gender,
      place,
      role: 2, 
      password: hashedPassword,
      signupMethod: "manual"

    });

    // Save the user to the database
    await newUser.save();

    // Create JWT token for authentication
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return new Response(
      JSON.stringify({
        message: 'User registered successfully!',
        token,
        user: {
          fullName: newUser.fullName,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          phone: newUser.phone,
          place: newUser.place
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error.message);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
}
