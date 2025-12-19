export default function StudyPlanCard({ day, topic, hours }) {
  return (
    <div className="border rounded-xl p-5 bg-gray-50 hover:shadow-sm transition">
      <h3 className="font-semibold text-lg mb-1">
        Day {day}
      </h3>

      <p className="text-gray-800">{topic}</p>

      <p className="text-sm text-gray-600 mt-1">
        Study Time: <span className="font-medium">{hours} hrs</span>
      </p>
    </div>
  );
}
