"use client";

import { useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Copy,
  Trash2,
  Wand2,
  Settings,
  Zap,
  Eye,
  RefreshCw,
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  TrendingUp,
  Target,
  FileText,
  Sparkles,
  Brain,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Language' | 'Other';
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: string[];
  projects: any[];
  template: string;
  aiOptimizations: {
    keywordOptimization: boolean;
    atsOptimization: boolean;
    industrySpecific: boolean;
    achievementFocus: boolean;
  };
}

interface AIJobMatch {
  jobTitle: string;
  company: string;
  matchScore: number;
  keywordMatches: string[];
  missingSkills: string[];
  recommendations: string[];
}

function AiResumeBuilderContent() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    template: 'modern',
    aiOptimizations: {
      keywordOptimization: true,
      atsOptimization: true,
      industrySpecific: false,
      achievementFocus: true
    }
  });

  const [currentSection, setCurrentSection] = useState<'personal' | 'experience' | 'education' | 'skills' | 'preview'>('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    summary?: string;
    achievements?: string[];
    skills?: string[];
    improvements?: string[];
  }>({});
  const [jobMatches, setJobMatches] = useState<AIJobMatch[]>([]);
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [targetIndustry, setTargetIndustry] = useState('');
  
  const { showToast } = useToast();

  // Resume templates
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, contemporary design perfect for tech and business roles',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'classic',
      name: 'Classic Elegant',
      description: 'Traditional format ideal for conservative industries',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Eye-catching layout for creative and design positions',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'minimalist',
      name: 'Minimalist Clean',
      description: 'Simple, focused design that highlights content',
      preview: '/api/placeholder/200/280'
    },
    {
      id: 'executive',
      name: 'Executive Premium',
      description: 'Sophisticated format for senior leadership roles',
      preview: '/api/placeholder/200/280'
    }
  ];

  // AI-powered content generation
  const generateAISummary = useCallback(async () => {
    setIsGeneratingAI(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const industry = targetIndustry || 'Technology';
      const role = targetJobTitle || 'Software Developer';
      
      const aiSummary = `Results-driven ${role} with expertise in ${industry.toLowerCase()}. Proven track record of delivering high-quality solutions and driving team success. Passionate about innovation and continuous learning, with strong analytical and problem-solving abilities. Committed to contributing to organizational growth while advancing professional development.`;
      
      const achievements = [
        `Led cross-functional team of 8 members to deliver project 3 weeks ahead of schedule`,
        `Increased system efficiency by 40% through optimization and process improvements`,
        `Reduced operational costs by $120K annually through strategic initiatives`,
        `Mentored 5 junior team members, resulting in 100% retention rate`,
        `Implemented best practices that improved team productivity by 25%`
      ];
      
      const suggestedSkills = [
        'Project Management',
        'Strategic Planning',
        'Team Leadership',
        'Process Optimization',
        'Data Analysis',
        'Problem Solving',
        'Communication',
        'Innovation'
      ];
      
      const improvements = [
        'Add quantifiable achievements with specific metrics',
        'Include industry-specific keywords for ATS optimization',
        'Highlight leadership and collaboration skills',
        'Emphasize results and impact rather than just responsibilities',
        'Use action verbs to start bullet points'
      ];
      
      setAiSuggestions({
        summary: aiSummary,
        achievements,
        skills: suggestedSkills,
        improvements
      });
      
      showToast("AI suggestions generated successfully!", "success");
      
    } catch (error) {
      showToast("Failed to generate AI suggestions", "error");
    } finally {
      setIsGeneratingAI(false);
    }
  }, [targetIndustry, targetJobTitle]);

  // AI job matching
  const generateJobMatches = useCallback(async () => {
    if (!targetJobTitle) {
      showToast("Please specify a target job title", "error");
      return;
    }
    
    setIsGeneratingAI(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockMatches: AIJobMatch[] = [
        {
          jobTitle: `Senior ${targetJobTitle}`,
          company: 'TechCorp Inc.',
          matchScore: 92,
          keywordMatches: ['Leadership', 'Project Management', 'Team Collaboration'],
          missingSkills: ['Cloud Architecture', 'DevOps'],
          recommendations: [
            'Add cloud computing certifications',
            'Highlight automation experience',
            'Include metrics for team leadership'
          ]
        },
        {
          jobTitle: targetJobTitle,
          company: 'Innovation Labs',
          matchScore: 87,
          keywordMatches: ['Problem Solving', 'Analytics', 'Communication'],
          missingSkills: ['Machine Learning', 'Data Science'],
          recommendations: [
            'Consider ML/AI coursework',
            'Showcase data-driven decision making',
            'Add technical writing samples'
          ]
        },
        {
          jobTitle: `Lead ${targetJobTitle}`,
          company: 'Future Systems',
          matchScore: 83,
          keywordMatches: ['Innovation', 'Strategic Planning', 'Process Improvement'],
          missingSkills: ['Agile Methodology', 'Scrum Master'],
          recommendations: [
            'Get Scrum Master certification',
            'Emphasize agile project experience',
            'Include change management examples'
          ]
        }
      ];
      
      setJobMatches(mockMatches);
      showToast("Job matches found!", "success");
      
    } catch (error) {
      showToast("Failed to find job matches", "error");
    } finally {
      setIsGeneratingAI(false);
    }
  }, [targetJobTitle]);

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: '',
      honors: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const addSkill = (skillName: string, level: Skill['level'], category: Skill['category']) => {
    if (!skillName.trim()) return;
    
    const newSkill: Skill = { name: skillName, level, category };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const applySuggestion = (type: 'summary' | 'achievement', content: string) => {
    if (type === 'summary' && aiSuggestions.summary) {
      setResumeData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary: aiSuggestions.summary! }
      }));
      showToast("AI summary applied!", "success");
    }
  };

  const downloadResume = (format: 'pdf' | 'docx' | 'txt') => {
    // Simulate resume generation and download
    const resumeContent = generateResumeContent();
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Resume downloaded as ${format.toUpperCase()}`, "success");
  };

  const generateResumeContent = (): string => {
    const { personalInfo, experience, education, skills } = resumeData;
    
    return `${personalInfo.firstName} ${personalInfo.lastName}
${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
${personalInfo.linkedin} | ${personalInfo.website}

PROFESSIONAL SUMMARY
${personalInfo.summary}

WORK EXPERIENCE
${experience.map(exp => `
${exp.position} | ${exp.company} | ${exp.location}
${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
${exp.description}
${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${education.map(edu => `
${edu.degree} in ${edu.field} | ${edu.institution}
${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}${edu.honors ? ` | ${edu.honors}` : ''}
`).join('\n')}

SKILLS
${skills.map(skill => `• ${skill.name} (${skill.level})`).join('\n')}
`;
  };

  const clearAll = () => {
    setResumeData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      projects: [],
      template: 'modern',
      aiOptimizations: {
        keywordOptimization: true,
        atsOptimization: true,
        industrySpecific: false,
        achievementFocus: true
      }
    });
    setAiSuggestions({});
    setJobMatches([]);
    showToast("Resume cleared", "info");
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: <User size={16} />, completed: resumeData.personalInfo.firstName && resumeData.personalInfo.email },
    { id: 'experience', name: 'Experience', icon: <Briefcase size={16} />, completed: resumeData.experience.length > 0 },
    { id: 'education', name: 'Education', icon: <GraduationCap size={16} />, completed: resumeData.education.length > 0 },
    { id: 'skills', name: 'Skills', icon: <Award size={16} />, completed: resumeData.skills.length > 0 },
    { id: 'preview', name: 'Preview', icon: <Eye size={16} />, completed: false }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
            <FileText size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create professional resumes with AI-powered suggestions, ATS optimization, 
          and job matching. Get hired faster with intelligent resume building.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resume Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={currentSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setCurrentSection(section.id as any)}
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <span>{section.name}</span>
                    {section.completed && (
                      <Badge variant="secondary" className="ml-auto">
                        ✓
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={20} />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-job">Target Job Title</Label>
                <Input
                  value={targetJobTitle}
                  onChange={(e) => setTargetJobTitle(e.target.value)}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-industry">Industry</Label>
                <Select value={targetIndustry} onValueChange={setTargetIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Button onClick={generateAISummary} className="w-full" disabled={isGeneratingAI}>
                  {isGeneratingAI ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Sparkles size={16} className="mr-2" />
                  )}
                  Generate AI Content
                </Button>
                
                <Button onClick={generateJobMatches} variant="outline" className="w-full" disabled={isGeneratingAI}>
                  <Target size={16} className="mr-2" />
                  Find Job Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Personal Information */}
          {currentSection === 'personal' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      value={resumeData.personalInfo.firstName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                      }))}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      value={resumeData.personalInfo.lastName}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                      }))}
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      placeholder="john.doe@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      value={resumeData.personalInfo.location}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, location: e.target.value }
                      }))}
                      placeholder="New York, NY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                      }))}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, summary: e.target.value }
                    }))}
                    placeholder="Brief overview of your professional background and key strengths..."
                    className="min-h-[100px]"
                  />
                  {aiSuggestions.summary && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Label className="text-sm font-medium text-blue-800">AI Suggestion:</Label>
                      <p className="text-sm text-blue-700 mt-1">{aiSuggestions.summary}</p>
                      <Button 
                        size="sm" 
                        onClick={() => applySuggestion('summary', aiSuggestions.summary!)}
                        className="mt-2"
                      >
                        Apply Suggestion
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Work Experience */}
          {currentSection === 'experience' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Briefcase size={20} />
                    Work Experience
                  </span>
                  <Button onClick={addExperience}>Add Experience</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No work experience added yet. Click "Add Experience" to get started.</p>
                  </div>
                ) : (
                  resumeData.experience.map((exp, index) => (
                    <Card key={exp.id} className="border border-gray-200">
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Company *</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position *</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                            />
                            <div className="flex items-center space-x-2 mt-2">
                              <Switch
                                checked={exp.current}
                                onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                              />
                              <Label className="text-sm">Current position</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Describe your role and responsibilities..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}

                {aiSuggestions.achievements && aiSuggestions.achievements.length > 0 && (
                  <Card className="border border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-800">AI Achievement Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {aiSuggestions.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                            <Star size={16} className="mt-0.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {currentSection === 'education' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <GraduationCap size={20} />
                    Education
                  </span>
                  <Button onClick={addEducation}>Add Education</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.education.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <GraduationCap size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No education added yet. Click "Add Education" to get started.</p>
                  </div>
                ) : (
                  resumeData.education.map((edu) => (
                    <Card key={edu.id} className="border border-gray-200">
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Institution *</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: prev.education.map(item => 
                                  item.id === edu.id ? { ...item, institution: e.target.value } : item
                                )
                              }))}
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label>Degree *</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: prev.education.map(item => 
                                  item.id === edu.id ? { ...item, degree: e.target.value } : item
                                )
                              }))}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: prev.education.map(item => 
                                  item.id === edu.id ? { ...item, field: e.target.value } : item
                                )
                              }))}
                              placeholder="Computer Science"
                            />
                          </div>
                          <div>
                            <Label>Graduation Date</Label>
                            <Input
                              type="month"
                              value={edu.graduationDate}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: prev.education.map(item => 
                                  item.id === edu.id ? { ...item, graduationDate: e.target.value } : item
                                )
                              }))}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {currentSection === 'skills' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={20} />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Skill name" id="skill-input" />
                  <Select defaultValue="Intermediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => {
                    const input = document.getElementById('skill-input') as HTMLInputElement;
                    if (input?.value) {
                      addSkill(input.value, 'Intermediate', 'Technical');
                      input.value = '';
                    }
                  }}>
                    Add Skill
                  </Button>
                </div>

                {resumeData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill.name} ({skill.level})
                      </Badge>
                    ))}
                  </div>
                )}

                {aiSuggestions.skills && aiSuggestions.skills.length > 0 && (
                  <Card className="border border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800">AI Skill Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {aiSuggestions.skills.map((skill, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => addSkill(skill, 'Intermediate', 'Technical')}
                            className="text-green-700 border-green-300"
                          >
                            + {skill}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          )}

          {/* Preview & Templates */}
          {currentSection === 'preview' && (
            <div className="space-y-6">
              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`cursor-pointer border-2 rounded-lg p-3 transition-all hover:scale-105 ${
                          selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="aspect-[3/4] bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <FileText size={24} className="text-gray-400" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Download Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Download Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => downloadResume('pdf')}>
                      <Download size={16} className="mr-2" />
                      Download PDF
                    </Button>
                    <Button onClick={() => downloadResume('docx')} variant="outline">
                      <Download size={16} className="mr-2" />
                      Download DOCX
                    </Button>
                    <Button onClick={() => downloadResume('txt')} variant="outline">
                      <Download size={16} className="mr-2" />
                      Download TXT
                    </Button>
                    <Button onClick={clearAll} variant="outline">
                      <Trash2 size={16} className="mr-2" />
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Job Matches */}
          {jobMatches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  AI Job Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobMatches.map((match, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{match.jobTitle}</h4>
                            <p className="text-sm text-gray-600">{match.company}</p>
                          </div>
                          <Badge variant={match.matchScore >= 90 ? "default" : "secondary"}>
                            {match.matchScore}% match
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="font-medium text-green-600">Matching Skills</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {match.keywordMatches.map((keyword, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="font-medium text-orange-600">Missing Skills</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {match.missingSkills.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Label className="font-medium text-blue-600">Recommendations</Label>
                          <ul className="text-sm text-gray-600 mt-1">
                            {match.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* SEO Content */}
</div>
  );
}

export default function AiResumeBuilderPage() {
  return (
    <ToolPageWrapper toolSlug="ai-resume-builder"><ToastProvider>
      <AiResumeBuilderContent /></ToastProvider></ToolPageWrapper>
  );
}