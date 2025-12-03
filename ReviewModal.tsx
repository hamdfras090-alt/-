import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { StarRating } from './StarRating';
import { Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  professorName: string;
  onSubmit: (review: Omit<Review, 'id' | 'likes' | 'date'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, professorName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [attendance, setAttendance] = useState(3);
  const [grading, setGrading] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [text, setText] = useState('');
  const [studentName, setStudentName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
        alert("الرجاء اختيار التقييم العام");
        return;
    }
    onSubmit({
      professorId: '', // Filled by parent
      studentName: studentName || 'طالب مجهول',
      rating,
      attendance,
      grading,
      difficulty,
      text
    });
    onClose();
  };

  const getLabel = (val: number, type: 'attendance' | 'grading' | 'difficulty') => {
    if (type === 'attendance') {
        if (val === 1) return 'يغيب دائماً';
        if (val === 5) return 'لا يغيب أبداً';
    }
    if (type === 'grading') {
        if (val === 1) return 'ظالم جداً';
        if (val === 5) return 'عادل جداً';
    }
    if (type === 'difficulty') {
        if (val === 1) return 'صعب جداً';
        if (val === 5) return 'سهل جداً';
    }
    return '';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">تقييم الدكتور {professorName}</h2>
          <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Rating */}
          <div className="text-center">
            <label className="block text-gray-700 font-semibold mb-2">التقييم العام</label>
            <div className="flex justify-center">
                <StarRating rating={rating} size={40} interactive onRate={setRating} />
            </div>
            <p className="text-sm text-gray-500 mt-1">{rating > 0 ? `${rating} من 5 نجوم` : 'اضغط للتقييم'}</p>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 border-b pb-2">تفاصيل دقيقة</h3>
            
            {/* Attendance Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">الحضور والالتزام</label>
                <span className="text-xs font-bold text-indigo-600">{getLabel(attendance, 'attendance')}</span>
              </div>
              <input 
                type="range" min="1" max="5" step="1"
                value={attendance} onChange={(e) => setAttendance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>سيء</span>
                <span>ممتاز</span>
              </div>
            </div>

            {/* Grading Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">توزيع الدرجات</label>
                <span className="text-xs font-bold text-indigo-600">{getLabel(grading, 'grading')}</span>
              </div>
              <input 
                type="range" min="1" max="5" step="1"
                value={grading} onChange={(e) => setGrading(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
               <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>ظالم</span>
                <span>عادل</span>
              </div>
            </div>

             {/* Difficulty Slider */}
             <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">صعوبة المادة/الشرح</label>
                <span className="text-xs font-bold text-indigo-600">{getLabel(difficulty, 'difficulty')}</span>
              </div>
              <input 
                type="range" min="1" max="5" step="1"
                value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
               <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>صعب</span>
                <span>سهل</span>
              </div>
            </div>
          </div>

          {/* Text Review */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">اكتب تجربتك (اختياري)</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-24"
              placeholder="كيف كان شرحه؟ هل الامتحانات صعبة؟..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Anonymous Name */}
          <div>
             <label className="block text-gray-700 font-semibold mb-2">الاسم (اختياري)</label>
             <input 
                type="text" 
                placeholder="فاعل خير" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
             />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Check size={20} />
            نشر التقييم
          </button>
        </form>
      </div>
    </div>
  );
};