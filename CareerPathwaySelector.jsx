import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, TrendingUp, BookOpen, Briefcase, Award, Calendar, Brain, Compass, User, BarChart, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const CareerPathwaySelector = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    interests: [],
    hobbies: [],
    dailyRoutines: {},
    careerGoals: [],
    skills: [],
    learningStyle: '',
    timeCommitment: '',
    progressData: []
  });
  
  const [recommendations, setRecommendations] = useState({
    courses: [],
    certifications: [],
    internships: [],
    blogs: [],
    universities: [],
    skills: [],
    dailyTasks: []
  });

  const [pathwayProgress, setPathwayProgress] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState(null);

  // Sample career paths database
  const careerPaths = {
    archaeologist: {
      title: "Archaeologist",
      description: "Study human history through excavation and analysis of artifacts",
      requiredSkills: ["Research Methods", "Historical Analysis", "Field Work", "Documentation", "Critical Thinking"],
      milestones: [
        { id: 1, title: "Foundation Knowledge", duration: "3-6 months", completed: false },
        { id: 2, title: "Field Experience", duration: "6-12 months", completed: false },
        { id: 3, title: "Specialization", duration: "1-2 years", completed: false },
        { id: 4, title: "Professional Practice", duration: "Ongoing", completed: false }
      ]
    },
    dataScientist: {
      title: "Data Scientist",
      description: "Analyze complex data to help organizations make better decisions",
      requiredSkills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL"],
      milestones: [
        { id: 1, title: "Programming Basics", duration: "2-4 months", completed: false },
        { id: 2, title: "Statistical Foundation", duration: "3-6 months", completed: false },
        { id: 3, title: "ML & AI Applications", duration: "6-12 months", completed: false },
        { id: 4, title: "Real-world Projects", duration: "Ongoing", completed: false }
      ]
    }
  };

  // AI-driven recommendation engine simulation
  const generateRecommendations = (interests, career) => {
    const careerRecommendations = {
      archaeologist: {
        courses: [
          { name: "Introduction to Archaeology", provider: "Coursera", duration: "6 weeks", level: "Beginner" },
          { name: "Ancient Civilizations", provider: "edX", duration: "8 weeks", level: "Intermediate" },
          { name: "Field Methods in Archaeology", provider: "FutureLearn", duration: "4 weeks", level: "Advanced" }
        ],
        certifications: [
          { name: "Archaeological Field School Certificate", provider: "Archaeological Institute", duration: "3 months" },
          { name: "GIS for Archaeology", provider: "ESRI", duration: "2 months" }
        ],
        internships: [
          { company: "National Museum", position: "Research Assistant", duration: "3-6 months" },
          { company: "Archaeological Survey", position: "Field Intern", duration: "Summer program" }
        ],
        blogs: [
          { name: "Archaeology Magazine Blog", url: "archaeology.org/blog", topics: ["Field Reports", "New Discoveries"] },
          { name: "Past Horizons", url: "pasthorizons.com", topics: ["Ancient History", "Excavations"] }
        ],
        universities: [
          { name: "University of Cambridge", program: "BA in Archaeology", ranking: "#1 in UK" },
          { name: "Harvard University", program: "PhD in Archaeology", ranking: "#1 in USA" }
        ],
        skills: ["Research Methods", "Excavation Techniques", "Artifact Analysis", "Report Writing"],
        dailyTasks: [
          { task: "Read one archaeology research paper", time: "30 mins", impact: "High" },
          { task: "Practice sketching artifacts", time: "20 mins", impact: "Medium" },
          { task: "Study ancient language basics", time: "15 mins", impact: "Medium" }
        ]
      },
      dataScientist: {
        courses: [
          { name: "Python for Data Science", provider: "Coursera", duration: "4 weeks", level: "Beginner" },
          { name: "Machine Learning Fundamentals", provider: "Udacity", duration: "3 months", level: "Intermediate" }
        ],
        certifications: [
          { name: "Google Data Analytics Certificate", provider: "Google", duration: "6 months" },
          { name: "AWS Machine Learning Specialty", provider: "Amazon", duration: "3 months" }
        ],
        internships: [
          { company: "Tech Startup", position: "Data Science Intern", duration: "3 months" }
        ],
        blogs: [
          { name: "Towards Data Science", url: "towardsdatascience.com", topics: ["ML", "AI", "Analytics"] }
        ],
        universities: [
          { name: "MIT", program: "MS in Data Science", ranking: "#1 in Technology" }
        ],
        skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
        dailyTasks: [
          { task: "Code 1 hour in Python", time: "60 mins", impact: "High" },
          { task: "Solve data problems on Kaggle", time: "30 mins", impact: "High" }
        ]
      }
    };

    return careerRecommendations[career] || careerRecommendations.archaeologist;
  };

  // Progress tracking
  const updateProgress = () => {
    const totalMilestones = selectedCareer ? careerPaths[selectedCareer].milestones.length : 0;
    const completedMilestones = selectedCareer ? 
      careerPaths[selectedCareer].milestones.filter(m => m.completed).length : 0;
    
    setPathwayProgress(totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0);
  };

  // Question components
  const WelcomeScreen = () => (
    <div className="text-center py-12">
      <Compass className="w-16 h-16 mx-auto mb-6 text-blue-600" />
      <h1 className="text-3xl font-bold mb-4">AI Career Pathway Selector</h1>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Let's discover your perfect career path through personalized questions about your interests, 
        hobbies, and daily routines. Our AI will guide you step by step towards your dream career.
      </p>
      <button
        onClick={() => setCurrentStep('basicInfo')}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
      >
        Get Started <ChevronRight className="ml-2 w-4 h-4" />
      </button>
    </div>
  );

  const BasicInfoScreen = () => {
    const [localData, setLocalData] = useState({ name: userData.name || '', age: userData.age || '' });

    const handleSubmit = () => {
      if (localData.name && localData.age) {
        setUserData({ ...userData, ...localData });
        setCurrentStep('interests');
      }
    };

    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Let's get to know you</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={localData.name}
              onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Your Age</label>
            <input
              type="number"
              value={localData.age}
              onChange={(e) => setLocalData({ ...localData, age: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!localData.name || !localData.age}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const InterestsSelector = () => {
    const interestOptions = [
      "History & Archaeology", "Technology & Computing", "Science & Research",
      "Arts & Design", "Business & Finance", "Healthcare & Medicine",
      "Education & Teaching", "Environment & Nature", "Engineering",
      "Media & Communication", "Sports & Fitness", "Law & Justice"
    ];

    const toggleInterest = (interest) => {
      const newInterests = userData.interests.includes(interest)
        ? userData.interests.filter(i => i !== interest)
        : [...userData.interests, interest];
      
      setUserData({ ...userData, interests: newInterests });
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">What are your interests?</h2>
        <p className="text-gray-600 mb-6">Select all that apply to you</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-3 rounded-lg border-2 transition-all ${
                userData.interests.includes(interest)
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentStep('hobbies')}
          disabled={userData.interests.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    );
  };

  const HobbiesScreen = () => {
    const [hobbyInput, setHobbyInput] = useState('');

    const addHobby = () => {
      if (hobbyInput.trim()) {
        setUserData({ ...userData, hobbies: [...userData.hobbies, hobbyInput.trim()] });
        setHobbyInput('');
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addHobby();
      }
    };

    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Tell us about your hobbies</h2>
        <p className="text-gray-600 mb-6">What do you enjoy doing in your free time?</p>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={hobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a hobby..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addHobby}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {userData.hobbies.map((hobby, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span>{hobby}</span>
                <button
                  onClick={() => setUserData({
                    ...userData,
                    hobbies: userData.hobbies.filter((_, i) => i !== index)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentStep('dailyRoutine')}
          disabled={userData.hobbies.length === 0}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    );
  };

  const DailyRoutineScreen = () => {
    const routineQuestions = [
      {
        question: "How many hours do you spend reading/researching daily?",
        options: ["Less than 1 hour", "1-2 hours", "2-4 hours", "More than 4 hours"]
      },
      {
        question: "Do you prefer working alone or in teams?",
        options: ["Always alone", "Mostly alone", "Mostly in teams", "Always in teams"]
      },
      {
        question: "What time of day are you most productive?",
        options: ["Early morning", "Morning", "Afternoon", "Evening/Night"]
      }
    ];

    const [answers, setAnswers] = useState(userData.dailyRoutines || {});

    const handleAnswer = (question, answer) => {
      setAnswers({ ...answers, [question]: answer });
    };

    const handleSubmit = () => {
      setUserData({ ...userData, dailyRoutines: answers });
      setCurrentStep('careerMatch');
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Understanding your daily routine</h2>
        
        <div className="space-y-6">
          {routineQuestions.map((q, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p className="font-medium mb-3">{q.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(q.question, option)}
                    className={`p-2 rounded-lg border transition-all ${
                      answers[q.question] === option
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < routineQuestions.length}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Get Career Matches
        </button>
      </div>
    );
  };

  const CareerMatchScreen = () => {
    // Simulate AI matching based on interests
    const getCareerMatch = () => {
      if (userData.interests.includes("History & Archaeology")) {
        return "archaeologist";
      } else if (userData.interests.includes("Technology & Computing")) {
        return "dataScientist";
      }
      return "archaeologist"; // default
    };

    const career = getCareerMatch();
    const careerInfo = careerPaths[career];

    const selectCareer = () => {
      setSelectedCareer(career);
      setRecommendations(generateRecommendations(userData.interests, career));
      setCurrentStep('pathway');
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your AI-Recommended Career Path</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold">{careerInfo.title}</h3>
          </div>
          
          <p className="text-gray-700 mb-6">{careerInfo.description}</p>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Key Skills You'll Develop:</h4>
            <div className="flex flex-wrap gap-2">
              {careerInfo.requiredSkills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={selectCareer}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start This Career Path
          </button>
        </div>
      </div>
    );
  };

  const PathwayDashboard = () => {
    const career = careerPaths[selectedCareer];
    
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your {career.title} Journey</h1>
          <p className="text-gray-600">Welcome back, {userData.name}! Here's your personalized pathway.</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Overall Progress</h3>
            <span className="text-2xl font-bold">{Math.round(pathwayProgress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${pathwayProgress}%` }}
            />
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Tasks
            </h3>
            <div className="space-y-3">
              {recommendations.dailyTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <div className="flex-1">
                    <p className="font-medium">{task.task}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.time}
                      <span className="ml-3 text-blue-600">Impact: {task.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Milestone */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Current Milestone
            </h3>
            <div className="space-y-3">
              {career.milestones.slice(0, 1).map((milestone) => (
                <div key={milestone.id}>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">Duration: {milestone.duration}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Complete foundation courses
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-gray-300" />
                      Join online community
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-gray-300" />
                      Start first project
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
              Recommended Courses
            </h3>
            <div className="space-y-3">
              {recommendations.courses.slice(0, 2).map((course, index) => (
                <div key={index} className="border-l-4 border-purple-600 pl-3">
                  <h4 className="font-medium text-sm">{course.name}</h4>
                  <p className="text-xs text-gray-600">{course.provider} • {course.duration}</p>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mt-1 inline-block">
                    {course.level}
                  </span>
                </div>
              ))}
              <button className="text-purple-600 text-sm hover:underline">View all courses →</button>
            </div>
          </div>

          {/* Internships */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
              Internship Opportunities
            </h3>
            <div className="space-y-3">
              {recommendations.internships.map((internship, index) => (
                <div key={index} className="border-l-4 border-orange-600 pl-3">
                  <h4 className="font-medium text-sm">{internship.position}</h4>
                  <p className="text-xs text-gray-600">{internship.company}</p>
                  <p className="text-xs text-gray-500">{internship.duration}</p>
                </div>
              ))}
              <button className="text-orange-600 text-sm hover:underline">Browse more →</button>
            </div>
          </div>

          {/* Skills to Develop */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-green-600" />
              Skills to Develop
            </h3>
            <div className="space-y-2">
              {recommendations.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{skill}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 rounded-full h-2"
                      style={{ width: `${Math.random() * 50 + 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
            Update Today's Progress <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Main render logic
  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'basicInfo':
        return <BasicInfoScreen />;
      case 'interests':
        return <InterestsSelector />;
      case 'hobbies':
        return <HobbiesScreen />;
      case 'dailyRoutine':
        return <DailyRoutineScreen />;
      case 'careerMatch':
        return <CareerMatchScreen />;
      case 'pathway':
        return <PathwayDashboard />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress indicator */}
        {currentStep !== 'welcome' && currentStep !== 'pathway' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                Step {['basicInfo', 'interests', 'hobbies', 'dailyRoutine', 'careerMatch'].indexOf(currentStep) + 1} of 5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all duration-500"
                style={{ 
                  width: `${((['basicInfo', 'interests', 'hobbies', 'dailyRoutine', 'careerMatch'].indexOf(currentStep) + 1) / 5) * 100}%`
                }}
              />
            </div>
          </div>
        )}
        
        {renderStep()}
      </div>
    </div>
  );
};

export default CareerPathwaySelector;