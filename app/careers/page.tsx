'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Upload, FileText, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react'
import { getFeaturedTools } from '@/lib/tools-data'
import Link from 'next/link'

interface JobApplicationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  experience: string
  location: string
  coverLetter: string
  resume: File | null
}

const positions = [
  'Graphic Designer',
  'SEO Executive',
  'Marketing Executive',
  'Business Development Executive',
  'Digital Marketer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Content Writer',
  'Social Media Manager',
  'Product Manager',
  'Data Analyst',
  'DevOps Engineer',
  'Quality Assurance Engineer'
]

export default function CareersPage() {
  const [formData, setFormData] = useState<JobApplicationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    location: '',
    coverLetter: '',
    resume: null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field: keyof JobApplicationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('position', formData.position)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('coverLetter', formData.coverLetter)
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume)
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const featuredTools = getFeaturedTools().slice(0, 6)

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your interest in joining our team. We're reviewing your application and will get back to you soon.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Meanwhile, you can browse our popular tools to increase your productivity:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredTools.map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600">
            We're looking for talented individuals to help us build amazing tools
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Job Application Form
            </CardTitle>
            <CardDescription>
              Fill out the form below to apply for a position at Toolspy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="position" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Position *
                  </Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Years of Experience *
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                  placeholder="Enter your location (City, Country)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Cover Letter *
                </Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  required
                  placeholder="Tell us why you want to join our team and what makes you a great fit..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Resume/CV *
                </Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                size="lg"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
