import { connectDB } from '@/lib/db'
import { Task } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const member = req.nextUrl.searchParams.get('member')

    let query = {}
    if (member) {
      query = { member }
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: tasks })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { id, member, text, tags } = body

    if (!member || !text) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const task = new Task({
      id,
      member,
      text,
      tags: tags || [],
      done: false,
      createdAt: new Date(),
    })

    await task.save()

    return NextResponse.json({ success: true, data: task }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
