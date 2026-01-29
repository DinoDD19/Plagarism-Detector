import React, { useState } from 'react';
import { ChevronRight, Clock, Target, Calendar, Brain, Zap, Palette, Map, Settings, Trophy, Star } from 'lucide-react';

const PersonalityShowcase = () => {
  const [selectedShowcase, setSelectedShowcase] = useState('sprinter');

  const showcaseData = {
    sprinter: {
      personality: {
        type: "The Sprinter",
        emoji: "🔥",
        user: "Alex Chen, 22, Computer Science Student"
      },
      interests: ["Technology & Computing", "Sports & Fitness"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Code Python algorithms (25-min sprint)",
          time: "25 mins",
          format: "Timed challenge",
          reward: "Speed Coding Badge",
          impact: "High"
        },
        {
          task: "Solve Kaggle mini-competition (25-min sprint)",
          time: "25 mins",
          format: "Competitive challenge",
          reward: "Leaderboard Points",
          impact: "High"
        },
        {
          task: "Quick ML concept review (25-min sprint)",
          time: "25 mins",
          format: "Speed drill",
          reward: "Knowledge Badge",
          impact: "Medium"
        }
      ],
      studySchedule: {
        pattern: "4-6 Pomodoro sessions daily with competitive timers",
        frequency: "6 sessions daily",
        bestTime: "High-energy morning & afternoon bursts",
        weeklyGoal: "Complete 30 coding sprints, rank in top 10% of daily challenges"
      },
      tools: ["Coding timer with leaderboards", "Competitive programming platforms", "Achievement tracking"],
      weeklyPlan: [
        { day: "Monday", focus: "Algorithm Speed Challenges", sessions: 6, rewards: "3 badges earned" },
        { day: "Tuesday", focus: "ML Sprint Competitions", sessions: 5, rewards: "Leaderboard climb" },
        { day: "Wednesday", focus: "Data Viz Speed Rounds", sessions: 6, rewards: "Portfolio points" },
        { day: "Thursday", focus: "SQL Racing", sessions: 4, rewards: "Query master badge" },
        { day: "Friday", focus: "Weekend Challenge Prep", sessions: 5, rewards: "Team competition entry" }
      ]
    },

    creator: {
      personality: {
        type: "The Creator",
        emoji: "🎨",
        user: "Maya Rodriguez, 25, UX Designer transitioning to Data Science"
      },
      interests: ["Arts & Design", "Technology & Computing"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Create visual data story with Tableau",
          time: "60 mins",
          format: "Creative project",
          reward: "Portfolio piece",
          impact: "High"
        },
        {
          task: "Design infographic from dataset analysis",
          time: "45 mins",
          format: "Visual creation",
          reward: "Design showcase",
          impact: "High"
        },
        {
          task: "Build interactive dashboard prototype",
          time: "90 mins",
          format: "Creative coding",
          reward: "Demo project",
          impact: "Very High"
        }
      ],
      studySchedule: {
        pattern: "Flexible 2-3 hour creative blocks when inspired",
        frequency: "4 deep sessions weekly",
        bestTime: "Creative peak hours (varies daily)",
        weeklyGoal: "Complete 1 major data visualization project + 3 mini creative explorations"
      },
      tools: ["Figma for data design", "Observable notebooks", "Creative coding platforms"],
      weeklyPlan: [
        { day: "Monday", focus: "Data Art Exploration", sessions: 1, rewards: "Creative breakthrough" },
        { day: "Tuesday", focus: "Visualization Storytelling", sessions: 2, rewards: "Story portfolio" },
        { day: "Wednesday", focus: "Interactive Design", sessions: 1, rewards: "User engagement" },
        { day: "Thursday", focus: "Collaborative Project", sessions: 2, rewards: "Team creation" },
        { day: "Friday", focus: "Portfolio Curation", sessions: 1, rewards: "Showcase ready" }
      ]
    },

    strategist: {
      personality: {
        type: "The Strategist",
        emoji: "🧠",
        user: "Dr. James Patterson, 35, Career Changer from Finance"
      },
      interests: ["Business & Finance", "Technology & Computing"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Deep analysis: Statistical foundations in ML",
          time: "90 mins",
          format: "Structured study",
          reward: "Milestone progress",
          impact: "Very High"
        },
        {
          task: "Deep analysis: Business case study with data",
          time: "60 mins",
          format: "Analytical deep-dive",
          reward: "Strategic insight",
          impact: "High"
        },
        {
          task: "Deep analysis: Algorithm comparison research",
          time: "75 mins",
          format: "Research methodology",
          reward: "Knowledge mastery",
          impact: "Very High"
        }
      ],
      studySchedule: {
        pattern: "90-120 min focused sessions with detailed planning",
        frequency: "5 sessions weekly",
        bestTime: "Early morning dedicated study blocks",
        weeklyGoal: "Master 2 major concepts with full understanding + complete monthly roadmap review"
      },
      tools: ["Detailed mind maps", "Research journals", "Spaced repetition systems"],
      weeklyPlan: [
        { day: "Monday", focus: "Statistics Mastery", sessions: 2, rewards: "Concept mastery" },
        { day: "Tuesday", focus: "ML Theory Deep-dive", sessions: 2, rewards: "Algorithm understanding" },
        { day: "Wednesday", focus: "Business Applications", sessions: 1, rewards: "Strategic alignment" },
        { day: "Thursday", focus: "Research & Analysis", sessions: 2, rewards: "Knowledge synthesis" },
        { day: "Friday", focus: "Weekly Review & Planning", sessions: 1, rewards: "Progress clarity" }
      ]
    },

    hustler: {
      personality: {
        type: "The Hustler",
        emoji: "⚡",
        user: "Sarah Kim, 28, Marketing Manager learning Data Science"
      },
      interests: ["Business & Finance", "Media & Communication"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Quick burst: Python fundamentals flashcards",
          time: "15 mins",
          format: "Interactive session",
          reward: "Streak points",
          impact: "Medium"
        },
        {
          task: "Quick burst: SQL practice problems",
          time: "20 mins",
          format: "Rapid-fire quiz",
          reward: "XP points",
          impact: "High"
        },
        {
          task: "Quick burst: ML concept videos",
          time: "15 mins",
          format: "Interactive slides",
          reward: "Knowledge points",
          impact: "Medium"
        }
      ],
      studySchedule: {
        pattern: "8-10 micro-learning sessions throughout the day",
        frequency: "8 sessions daily",
        bestTime: "Between meetings and during commute",
        weeklyGoal: "Maintain 7-day learning streak + accumulate 500 XP points"
      },
      tools: ["Mobile learning app", "Micro-quiz platforms", "Streak tracking"],
      weeklyPlan: [
        { day: "Monday", focus: "Python Fundamentals", sessions: 8, rewards: "50 XP earned" },
        { day: "Tuesday", focus: "Data Analysis Basics", sessions: 9, rewards: "Streak bonus" },
        { day: "Wednesday", focus: "Visualization Quick Wins", sessions: 7, rewards: "Skill points" },
        { day: "Thursday", focus: "ML Concepts Rapid Fire", sessions: 10, rewards: "Knowledge boost" },
        { day: "Friday", focus: "Week Review & Challenges", sessions: 6, rewards: "Weekly champion" }
      ]
    },

    flowSeeker: {
      personality: {
        type: "The Flow-Seeker",
        emoji: "🌊",
        user: "Elena Volkov, 31, Philosophy PhD pursuing Data Science"
      },
      interests: ["Science & Research", "Education & Teaching"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Immersive session: Deep learning mathematics",
          time: "90 mins",
          format: "Deep focus",
          reward: "Mathematical intuition",
          impact: "Very High"
        },
        {
          task: "Immersive session: Research paper analysis",
          time: "90 mins",
          format: "Contemplative study",
          reward: "Research insight",
          impact: "Very High"
        },
        {
          task: "Immersive session: Philosophical implications of AI",
          time: "60 mins",
          format: "Reflective exploration",
          reward: "Deeper understanding",
          impact: "High"
        }
      ],
      studySchedule: {
        pattern: "2-3 uninterrupted 90-minute deep learning sessions",
        frequency: "3 sessions weekly",
        bestTime: "Early morning in quiet environment with ambient sounds",
        weeklyGoal: "Achieve profound understanding of 1 major topic + complete reflective journal"
      },
      tools: ["Noise-canceling environment", "Academic papers", "Reflection journals"],
      weeklyPlan: [
        { day: "Monday", focus: "Mathematical Foundations", sessions: 1, rewards: "Deep comprehension" },
        { day: "Wednesday", focus: "Research Methodology", sessions: 1, rewards: "Academic insight" },
        { day: "Friday", focus: "Ethical AI Exploration", sessions: 1, rewards: "Philosophical clarity" },
        { day: "Sunday", focus: "Integration & Reflection", sessions: 1, rewards: "Wisdom synthesis" }
      ]
    },

    builder: {
      personality: {
        type: "The Builder",
        emoji: "🛠",
        user: "Marcus Thompson, 29, Mechanical Engineer transitioning to Data Science"
      },
      interests: ["Engineering", "Technology & Computing"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Hands-on practice: Build predictive model from scratch",
          time: "75 mins",
          format: "Applied learning",
          reward: "Working prototype",
          impact: "Very High"
        },
        {
          task: "Hands-on practice: Deploy model to cloud platform",
          time: "60 mins",
          format: "Real-world application",
          reward: "Live project",
          impact: "High"
        },
        {
          task: "Hands-on practice: Debug and optimize code",
          time: "45 mins",
          format: "Problem-solving",
          reward: "Technical skill",
          impact: "High"
        }
      ],
      studySchedule: {
        pattern: "Learn (30min) → Build (60min) → Test & Iterate (30min)",
        frequency: "4 sessions weekly",
        bestTime: "When you have access to development environment",
        weeklyGoal: "Complete 1 end-to-end project + contribute to open source"
      },
      tools: ["Jupyter labs", "Cloud platforms", "GitHub projects"],
      weeklyPlan: [
        { day: "Monday", focus: "Project Planning & Setup", sessions: 1, rewards: "Foundation built" },
        { day: "Tuesday", focus: "Core Development", sessions: 2, rewards: "MVP completed" },
        { day: "Thursday", focus: "Testing & Debugging", sessions: 1, rewards: "Quality assured" },
        { day: "Saturday", focus: "Deployment & Showcase", sessions: 1, rewards: "Portfolio addition" }
      ]
    },

    explorer: {
      personality: {
        type: "The Explorer",
        emoji: "🗺",
        user: "Zara Ahmed, 26, Liberal Arts Graduate exploring Data Science"
      },
      interests: ["Science & Research", "Media & Communication", "Arts & Design"],
      career: "Data Scientist",
      dailyTasks: [
        {
          task: "Explore connections: Data science in journalism",
          time: "40 mins",
          format: "Discovery session",
          reward: "Cross-domain insight",
          impact: "High"
        },
        {
          task: "Explore connections: AI ethics and society",
          time: "35 mins",
          format: "Interdisciplinary study",
          reward: "Broader perspective",
          impact: "Medium"
        },
        {
          task: "Explore connections: Data visualization in art",
          time: "30 mins",
          format: "Creative exploration",
          reward: "Novel approach",
          impact: "Medium"
        }
      ],
      studySchedule: {
        pattern: "Daily 45-minute exploration of different data science applications",
        frequency: "6 diverse sessions weekly",
        bestTime: "When curiosity peaks (varies)",
        weeklyGoal: "Discover 5 new applications of data science + create interdisciplinary connections"
      },
      tools: ["Topic randomizer", "Cross-domain reading", "Connection mapping"],
      weeklyPlan: [
        { day: "Monday", focus: "Data Science + Healthcare", sessions: 1, rewards: "Medical insights" },
        { day: "Tuesday", focus: "Data Science + Environment", sessions: 1, rewards: "Sustainability ideas" },
        { day: "Wednesday", focus: "Data Science + Sports", sessions: 1, rewards: "Athletic analytics" },
        { day: "Thursday", focus: "Data Science + Finance", sessions: 1, rewards: "Economic patterns" },
        { day: "Friday", focus: "Data Science + Psychology", sessions: 1, rewards: "Behavioral understanding" },
        { day: "Saturday", focus: "Synthesis & New Discoveries", sessions: 1, rewards: "Innovation potential" }
      ]
    }
  };

  const currentShowcase = showcaseData[selectedShowcase];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Personality-Based Learning Outcomes</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See how different learning personalities experience personalized career pathways. 
            Each personality type gets a completely different learning experience tailored to their style.
          </p>
        </div>

        {/* Personality Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.entries(showcaseData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedShowcase(key)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                selectedShowcase === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              <span className="mr-2 text-lg">{data.personality.emoji}</span>
              <span className="font-medium">{data.personality.type}</span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{currentShowcase.personality.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold">{currentShowcase.personality.type}</h2>
              <p className="text-blue-100">{currentShowcase.personality.user}</p>
              <p className="text-blue-100">Career Goal: {currentShowcase.career}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Today's Personalized Tasks */}
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Today's Personalized Tasks
              </h3>
              <div className="space-y-4">
                {currentShowcase.dailyTasks.map((task, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r-lg">
                    <h4 className="font-medium text-sm mb-1">{task.task}</h4>
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.time}
                      <span className="ml-3 text-blue-600">Impact: {task.impact}</span>
                      <span className="ml-3 text-purple-600">Format: {task.format}</span>
                    </div>
                    <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded inline-block">
                      🎁 {task.reward}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Schedule */}
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Personalized Study Schedule
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Study Pattern:</h4>
                  <p className="text-sm text-gray-600">{currentShowcase.studySchedule.pattern}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Frequency:</h4>
                  <p className="text-sm text-gray-600">{currentShowcase.studySchedule.frequency}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Best Time:</h4>
                  <p className="text-sm text-gray-600">{currentShowcase.studySchedule.bestTime}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Weekly Goal:</h4>
                  <p className="text-sm text-blue-600 font-medium">{currentShowcase.studySchedule.weeklyGoal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Learning Tools */}
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                Recommended Tools
              </h3>
              <div className="space-y-2">
                {currentShowcase.tools.map((tool, index) => (
                  <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="text-sm font-medium text-purple-800">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Plan */}
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Map className="w-5 h-5 mr-2 text-orange-600" />
                Weekly Learning Plan
              </h3>
              <div className="space-y-3">
                {currentShowcase.weeklyPlan.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{day.day}</h4>
                      <p className="text-xs text-gray-600">{day.focus}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-blue-600">{day.sessions} sessions</div>
                      <div className="text-xs text-green-600">🏆 {day.rewards}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Insights */}
        <div className="mt-8 bg-white p-6 rounded-xl border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-600" />
            Why This Works for {currentShowcase.personality.type}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {selectedShowcase === 'sprinter' && (
              <>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">High Energy & Competition</h4>
                  <p className="text-sm text-red-700">Short sprints with leaderboards tap into competitive nature and provide instant gratification.</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Immediate Rewards</h4>
                  <p className="text-sm text-red-700">Badges and achievements after each session maintain motivation and momentum.</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Progress Tracking</h4>
                  <p className="text-sm text-red-700">Daily metrics and ranking systems provide clear progress indicators.</p>
                </div>
              </>
            )}
            {selectedShowcase === 'creator' && (
              <>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Creative Expression</h4>
                  <p className="text-sm text-purple-700">Transforms technical learning into visual and creative projects that build portfolios.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Flexible Timing</h4>
                  <p className="text-sm text-purple-700">Adapts to natural creative rhythms rather than rigid schedules.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Tangible Outcomes</h4>
                  <p className="text-sm text-purple-700">Each session produces something visual and shareable.</p>
                </div>
              </>
            )}
            {selectedShowcase === 'strategist' && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Deep Understanding</h4>
                  <p className="text-sm text-blue-700">Long sessions allow for thorough mastery of complex concepts.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Structured Approach</h4>
                  <p className="text-sm text-blue-700">Planned curriculum with clear milestones and progress tracking.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Research Focus</h4>
                  <p className="text-sm text-blue-700">Emphasis on analysis and understanding rather than quick wins.</p>
                </div>
              </>
            )}
            {selectedShowcase === 'hustler' && (
              <>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Micro-Learning</h4>
                  <p className="text-sm text-yellow-700">Fits into busy schedule with quick, high-impact sessions.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Streak Motivation</h4>
                  <p className="text-sm text-yellow-700">Daily consistency builds momentum and habit formation.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Mobile Friendly</h4>
                  <p className="text-sm text-yellow-700">Learn anywhere, anytime with bite-sized content.</p>
                </div>
              </>
            )}
            {selectedShowcase === 'flowSeeker' && (
              <>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2">Deep Focus</h4>
                  <p className="text-sm text-teal-700">Uninterrupted sessions allow for profound understanding and insights.</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2">Quality over Quantity</h4>
                  <p className="text-sm text-teal-700">Fewer but deeper sessions lead to better retention and understanding.</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2">Reflective Practice</h4>
                  <p className="text-sm text-teal-700">Journaling and reflection deepen the learning experience.</p>
                </div>
              </>
            )}
            {selectedShowcase === 'builder' && (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Hands-On Learning</h4>
                  <p className="text-sm text-green-700">Every concept is immediately applied through practical projects.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Real-World Application</h4>
                  <p className="text-sm text-green-700">Projects solve actual problems and build professional portfolio.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Iterative Process</h4>
                  <p className="text-sm text-green-700">Learn → Build → Test → Improve cycle reinforces learning.</p>
                </div>
              </>
            )}
            {selectedShowcase === 'explorer' && (
              <>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-800 mb-2">Variety & Discovery</h4>
                  <p className="text-sm text-indigo-700">Daily exploration of different applications keeps learning fresh and engaging.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-800 mb-2">Cross-Domain Connections</h4>
                  <p className="text-sm text-indigo-700">Linking data science to diverse fields creates unique insights and opportunities.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-800 mb-2">Curiosity-Driven</h4>
                  <p className="text-sm text-indigo-700">Following natural curiosity leads to deeper engagement and retention.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityShowcase;