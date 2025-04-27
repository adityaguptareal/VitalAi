import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, Star, Target, Award, Gift, Flame, Calendar } from "lucide-react";


const challenges = [
  { id: 1, title: "Daily Health Check", points: 50, icon: <Target className="w-6 h-6" />, description: "Complete your daily health assessment" },
  { id: 2, title: "Medicine Reminder", points: 30, icon: <Gift className="w-6 h-6" />, description: "Take your medications on time" },
  { id: 3, title: "Exercise Goal", points: 100, icon: <Trophy className="w-6 h-6" />, description: "Complete 30 minutes of exercise" },
  { id: 4, title: "Sleep Schedule", points: 80, icon: <Star className="w-6 h-6" />, description: "Maintain a consistent sleep schedule" },
  { id: 5, title: "Healthy Diet", points: 60, icon: <Award className="w-6 h-6" />, description: "Log your meals and stay on track" },
];

const achievements = [
  { id: 1, name: "Health Novice", requirement: 100, icon: "🎖️" },
  { id: 2, name: "Wellness Warrior", requirement: 500, icon: "🏅" },
  { id: 3, name: "Health Champion", requirement: 1000, icon: "🏆" },
];

export default function Gamification() {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('healthPoints');
    return savedPoints ? parseInt(savedPoints) : 0;
  });
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('healthLevel');
    return savedLevel ? parseInt(savedLevel) : 1;
  });
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('healthStreak');
    return savedStreak ? parseInt(savedStreak) : 0;
  });
  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem('lastCompletedDate');
  });
  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const saved = localStorage.getItem('completedChallenges');
    return saved ? JSON.parse(saved) : [];
  });
  const [showReward, setShowReward] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [showChallengeDetails, setShowChallengeDetails] = useState(null);
  const [challengeAnimation, setChallengeAnimation] = useState(null);

  useEffect(() => {
    // Check for achievements
    const newAchievement = achievements.find(
      (a) => points >= a.requirement && !completedChallenges.includes(`achievement_${a.id}`)
    );
    if (newAchievement) {
      setCurrentAchievement(newAchievement);
      setShowReward(true);
      setCompletedChallenges([...completedChallenges, `achievement_${newAchievement.id}`]);
    }
  }, [points, completedChallenges]);

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastCompletedDate) {
      const lastDate = new Date(lastCompletedDate).toDateString();
      const isConsecutiveDay = new Date(lastDate).getTime() === new Date(today).getTime() - 86400000;
      if (!isConsecutiveDay) {
        setStreak(0);
        localStorage.setItem('healthStreak', '0');
      }
      
      // Reset daily challenges if it's a new day
      if (lastDate !== today) {
        setCompletedChallenges([]);
        localStorage.setItem('completedChallenges', '[]');
      }
    }
  }, [lastCompletedDate]);

  useEffect(() => {
    const newLevel = Math.floor(points / 500) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setShowReward(true);
      setCurrentAchievement({ name: `Level ${newLevel}`, icon: "🌟", description: "Level up!" });
    }
  }, [points, level]);

  const handleChallengeComplete = async (challenge) => {
    if (!completedChallenges.includes(challenge.id)) {
      const today = new Date().toDateString();
      const bonusPoints = streak >= 5 ? Math.floor(challenge.points * 0.5) : 0;
      const totalPoints = challenge.points + bonusPoints;
      
      // Set animation state for visual feedback
      setChallengeAnimation(challenge.id);
      setTimeout(() => setChallengeAnimation(null), 1000);

      // Update points and save to localStorage
      const newPoints = points + totalPoints;
      setPoints(newPoints);
      localStorage.setItem('healthPoints', newPoints.toString());

      // Update completed challenges
      const newCompletedChallenges = [...completedChallenges, challenge.id];
      setCompletedChallenges(newCompletedChallenges);
      localStorage.setItem('completedChallenges', JSON.stringify(newCompletedChallenges));

      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('healthStreak', newStreak.toString());

      // Update last completed date
      setLastCompletedDate(today);
      localStorage.setItem('lastCompletedDate', today);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Health Quest</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-600">{streak} Day Streak</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-600">Level {level}</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-600">{points} Points</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl cursor-pointer transition-all ${completedChallenges.includes(challenge.id)
                  ? "bg-green-100 border-green-200"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  } border-2 ${challengeAnimation === challenge.id ? 'animate-bounce' : ''}`}
                onClick={() => handleChallengeComplete(challenge)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600">{challenge.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.points} points</p>
                    <p className="text-xs text-gray-500">{challenge.description}</p>
                    {streak >= 5 && !completedChallenges.includes(challenge.id) && (
                      <p className="text-xs text-orange-600 mt-1">+50% Streak Bonus!</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Achievements</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className={`flex-shrink-0 p-4 rounded-lg ${points >= achievement.requirement ? "bg-yellow-100" : "bg-gray-100"
                    } w-48`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-sm text-gray-600">
                    {points >= achievement.requirement
                      ? "Unlocked!"
                      : `${points}/${achievement.requirement} points`}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievement Popup */}
        {showReward && currentAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setShowReward(false)}
          >
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
              <div className="text-6xl mb-4">{currentAchievement.icon}</div>
              <h3 className="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
              <p className="text-lg text-gray-600 mb-4">{currentAchievement.name}</p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                onClick={() => setShowReward(false)}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}