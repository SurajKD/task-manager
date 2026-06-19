import { connectDB } from '@/lib/db'
import { User } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { action, password } = body

    if (action === 'create-password') {
      // Check if user already exists
      let user = await User.findOne({ userId: 'default' })

      if (user) {
        return NextResponse.json(
          { success: false, error: 'Password already exists' },
          { status: 400 }
        )
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      user = new User({
        userId: 'default',
        password: hashedPassword,
      })

      await user.save()

      return NextResponse.json(
        { success: true, message: 'Password created' },
        { status: 201 }
      )
    }

    if (action === 'login') {
      const user = await User.findOne({ userId: 'default' })

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        )
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Incorrect password' },
          { status: 401 }
        )
      }

      return NextResponse.json({ success: true, message: 'Login successful' })
    }

    if (action === 'check') {
      const user = await User.findOne({ userId: 'default' })
      return NextResponse.json({ success: true, exists: !!user })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
