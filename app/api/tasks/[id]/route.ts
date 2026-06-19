import { connectDB } from '@/lib/db'
import { Task } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const body = await req.json()
    const { done, text, tags } = body
    const taskId = params.id

    const updateData: any = {}
    if (done !== undefined) updateData.done = done
    if (text !== undefined) updateData.text = text
    if (tags !== undefined) updateData.tags = tags
    if (body.member !== undefined) updateData.member = body.member

    const task = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    })

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: task })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const taskId = params.id

    const task = await Task.findByIdAndDelete(taskId)

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: task })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
