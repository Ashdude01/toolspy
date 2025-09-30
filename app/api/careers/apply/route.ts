import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Force dynamic rendering
// export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const experience = formData.get('experience') as string
    const location = formData.get('location') as string
    const coverLetter = formData.get('coverLetter') as string
    const resume = formData.get('resume') as File

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !position || !experience || !location || !coverLetter || !resume) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (resume.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    })

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads', 'careers')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = resume.name.split('.').pop()
    const fileName = `${firstName}_${lastName}_${position.replace(/\s+/g, '_')}_${timestamp}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)

    // Save file
    const bytes = await resume.arrayBuffer()
    await writeFile(filePath, new Uint8Array(bytes))

    // Create application record
    const application = {
      id: `APP_${timestamp}`,
      firstName,
      lastName,
      email,
      phone,
      position,
      experience,
      location,
      coverLetter,
      resumeFileName: fileName,
      resumePath: filePath,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('New job application received:', {
      id: application.id,
      name: `${firstName} ${lastName}`,
      email,
      position,
      submittedAt: application.submittedAt
    })

    // You could also send an email notification here
    // await sendApplicationNotification(application)

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    })

  } catch (error) {
    console.error('Error processing job application:', error)
    return NextResponse.json(
      { error: error },
      { status: 500 }
    )
  }
}

// Optional: Add email notification function
async function sendApplicationNotification(application: any) {
  // This would integrate with an email service like SendGrid, Nodemailer, etc.
  // For now, we'll just log the notification
  console.log('Email notification would be sent for application:', application.id)
}
