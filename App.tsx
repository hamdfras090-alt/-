import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, User, Sparkles, MapPin, ChevronLeft, ThumbsUp, BookOpen, AlertCircle, Filter, TrendingUp, UserPlus, Plus } from 'lucide-react';
import { StarRating } from './components/StarRating';
import { ReviewModal } from './components/ReviewModal';
import { generateProfessorSummary } from './services/geminiService';
import { Professor, Review } from './types';

// --- Owner Data (Initial Professors) ---
const INITIAL_PROFESSORS: Professor[] = [
  {
    id: '1',
    name: 'د. أحمد المنصور',
    university: 'جامعة القاهرة',
    department: 'محاسبة',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    reviews: [
      {
        id: 'r1',
        professorId: '1',
        studentName: 'محمد علي',
        rating: 5,
        attendance: 5,
        grading: 4,
        difficulty: 3,
        text: 'شرح ممتاز جداً ويبسط المعلومة، لكن يركز جداً على الحضور.',
        date: '2024-03-15',
        likes: 12
      }
    ]
  },
  {
    id: '2',
    name: 'د. سارة العمري',
    university: 'جامعة الملك سعود',
    department: 'علوم سياسية',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    reviews: []
  },
  {
    id: '3',
    name: 'د. خالد الفايز',
    university: 'جامعة الملك عبدالعزيز',
    department: 'إدارة أعمال',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    reviews: []
  },
   {
    id: '4',
    name: 'د. يوسف كمال',
    university: 'جامعة عين شمس',
    department: 'محاسبة',
    image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    reviews: []
  }
];

// --- Constants ---
const QUICK_FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'accounting', label: 'محاسبة' },
  { id: 'business', label: 'إدارة أعمال' },
  { id: 'pol_sci', label: 'علوم سياسية' },
];

// --- Sub-components for pages ---

const Header = ({ goHome }: { goHome: () => void }) => (
  <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={goHome}>
        <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200 shadow-md">
           <GraduationCap className="text-white" size={24} />
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-indigo-700 to-indigo-500">قيّم دكتورك</span>
      </div>
      
      {/* Admin/Owner Placeholder (Hidden for students) */}
      <div className="hidden md:block text-xs text-gray-400 font-medium">
        نسخة الطلاب v1.0
      </div>
    </div>
  </header>
);

const SearchHero = ({ onSearch, activeFilter, onFilterChange }: { onSearch: (q: string) => void, activeFilter: string, onFilterChange: (f: string) => void }) => {
  const handleQuickFilter = (label: string) => {
    if (label === 'الكل') {
      onSearch('');
      onFilterChange('');
    } else {
      onSearch(label);
      onFilterChange(label);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white pt-16 pb-24 px-4 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
        
        {/* Logo Image */}
        <div className="flex justify-center mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/8074/8074800.png" 
              alt="شعار قيم دكتورك" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 filter brightness-110" 
            />
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
          ابحث عن دكتورك الجامعي
        </h1>
        <p className="text-base md:text-lg text-indigo-100 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          شاهد تقييمات الطلاب السابقين وشارك تجربتك بكل سرية ومصداقية.
        </p>
        
        <div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center max-w-2xl mx-auto mb-8 transform hover:scale-[1.01] transition-transform duration-300 ring-4 ring-indigo-500/20">
          <Search className="text-gray-400 mr-4 ml-2" size={24} />
          <input 
            type="text" 
            placeholder="ابحث باسم الدكتور، التخصص، أو الجامعة..." 
            className="flex-1 bg-transparent text-gray-800 outline-none px-2 py-3 text-lg placeholder:text-gray-400"
            onChange={(e) => {
              onSearch(e.target.value);
              onFilterChange(''); 
            }}
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.label || (filter.label === 'الكل' && activeFilter === '');
            return (
              <button
                key={filter.id}
                onClick={() => handleQuickFilter(filter.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive 
                    ? 'bg-white text-indigo-900 border-white shadow-lg scale-105' 
                    : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const ProfessorList = ({ 
    professors, 
    onSelect 
}: { 
    professors: Professor[], 
    onSelect: (p: Professor) => void
}) => (
  <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 pb-20">
    <div className="flex items-center justify-between mb-6 px-2">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <TrendingUp className="text-indigo-600" />
        الدكاترة المتاحين
      </h2>
      <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
        {professors.length} نتيجة
      </span>
    </div>
    
    {professors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 animate-fade-in flex flex-col items-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">لا توجد نتائج مطابقة</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                لم نجد دكتوراً بهذا الاسم أو في هذا القسم. جرب البحث بكلمات أخرى.
            </p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professors.map((prof, idx) => {
            const reviewCount = prof.reviews.length;
            const avgRating = reviewCount 
                ? (prof.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) 
                : 'جديد';
            
            const style = { animationDelay: `${idx * 100}ms` };
                
            return (
            <div 
                key={prof.id} 
                onClick={() => onSelect(prof)}
                style={style}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden animate-fade-in-up"
            >
                <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                        <img 
                        src={prof.image} 
                        alt={prof.name} 
                        className="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" 
                        />
                        {Number(avgRating) >= 4.5 && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1 shadow-sm border-2 border-white">
                            <Sparkles size={12} fill="currentColor" />
                        </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold mb-2 ${reviewCount > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                            <StarRating rating={Number(avgRating) || 0} size={12} />
                            <span className="mr-1 pt-0.5">{avgRating}</span>
                        </div>
                    </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{prof.name}</h3>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={14} className="ml-1 text-gray-400" />
                        {prof.university}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <BookOpen size={14} className="ml-1 text-gray-400" />
                        {prof.department}
                    </div>
                </div>
                </div>
                
                <div className="bg-gray-50/80 px-6 py-4 flex justify-between items-center text-xs font-medium border-t border-gray-100 group-hover:bg-indigo-50/30 transition-colors">
                    <span className="text-gray-500">{reviewCount > 0 ? `${reviewCount} تقييم طلابي` : 'لا توجد تقييمات'}</span>
                    <span className="text-indigo-600 flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                    عرض الملف والتقييم <ChevronLeft size={14} />
                    </span>
                </div>
            </div>
            );
        })}
        </div>
    )}
  </div>
);

const ProfessorDetail = ({ 
  professor, 
  onBack, 
  onAddReview 
}: { 
  professor: Professor, 
  onBack: () => void,
  onAddReview: (pId: string, r: Omit<Review, 'id' | 'likes' | 'date'>) => void
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const reviewCount = professor.reviews.length;
  const avgRating = reviewCount ? (professor.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) : '0.0';
  const avgAttendance = reviewCount ? (professor.reviews.reduce((acc, r) => acc + r.attendance, 0) / reviewCount).toFixed(1) : '0.0';
  const avgGrading = reviewCount ? (professor.reviews.reduce((acc, r) => acc + r.grading, 0) / reviewCount).toFixed(1) : '0.0';
  const avgDifficulty = reviewCount ? (professor.reviews.reduce((acc, r) => acc + r.difficulty, 0) / reviewCount).toFixed(1) : '0.0';

  const handleGeminiSummary = async () => {
    setIsLoadingSummary(true);
    const result = await generateProfessorSummary(professor.name, professor.reviews);
    setSummary(result);
    setIsLoadingSummary(false);
  };

  const getPercentage = (val: string) => (Number(val) / 5) * 100;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors font-medium group">
            <div className="bg-white p-2 rounded-full shadow-sm ml-2 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <ChevronLeft size={20} />
            </div>
            العودة للبحث
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 h-40 relative">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>
            <div className="px-8 pb-8 flex flex-col md:flex-row items-start md:items-end -mt-16 gap-6">
                <img src={professor.image} className="w-36 h-36 rounded-3xl border-4 border-white shadow-lg bg-white object-cover" alt={professor.name} />
                <div className="flex-1 pt-2 md:pt-0">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{professor.name}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600 mb-4">
                      <span className="flex items-center gap-2">
                        <GraduationCap size={18} className="text-indigo-500" />
                        {professor.university}
                      </span>
                      <span className="hidden sm:block text-gray-300">|</span>
                      <span className="flex items-center gap-2">
                        <BookOpen size={18} className="text-indigo-500" />
                        {professor.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                         <span className="inline-flex items-center bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200 shadow-sm">
                            <StarRating rating={Number(avgRating)} size={16} />
                            <span className="mr-2 pt-1">{reviewCount > 0 ? avgRating : 'جديد'}</span>
                         </span>
                    </div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all w-full md:w-auto mt-4 md:mt-0 flex items-center justify-center gap-2"
                >
                    <StarRating rating={1} size={18} interactive={false} />
                    قيّم هذا الدكتور
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Column */}
            <div className="space-y-6">
                {/* Metrics Card */}
                {reviewCount > 0 ? (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-6 text-gray-800 flex items-center gap-2">
                        <TrendingUp className="text-indigo-600" size={20} />
                        إحصائيات التقييم
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-bold text-gray-700">
                                    <span>الحضور والالتزام</span>
                                    <span className="text-indigo-600">{avgAttendance}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out" style={{width: `${getPercentage(avgAttendance)}%`}}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2 font-bold text-gray-700">
                                    <span>عدالة الدرجات</span>
                                    <span className="text-indigo-600">{avgGrading}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out" style={{width: `${getPercentage(avgGrading)}%`}}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2 font-bold text-gray-700">
                                    <span>سهولة المادة</span>
                                    <span className="text-indigo-600">{avgDifficulty}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out" style={{width: `${getPercentage(avgDifficulty)}%`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* AI Summary Card */}
                {reviewCount > 0 && (
                    <div className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                        <Sparkles className="absolute -top-4 -left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500" size={100} />
                        
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2 relative z-10">
                            <Sparkles size={20} className="text-yellow-400 animate-pulse" />
                            ملخص الذكاء الاصطناعي
                        </h3>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10">
                            تحليل فوري لجميع التعليقات لتوفير وقتك وإعطائك الصورة الكاملة.
                        </p>
                        
                        {summary ? (
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-sm leading-relaxed border border-white/20 animate-fade-in shadow-inner relative z-10">
                                {summary}
                            </div>
                        ) : (
                            <button 
                                onClick={handleGeminiSummary}
                                disabled={isLoadingSummary}
                                className="relative z-10 w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all shadow-lg flex justify-center items-center gap-2"
                            >
                                {isLoadingSummary ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-900 border-t-transparent"></span>
                                    جاري التحليل...
                                </>
                                ) : 'توليد الملخص الآن'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Reviews Column */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <User size={20} />
                      </div>
                      تجارب الطلاب ({reviewCount})
                  </h3>
                </div>

                {professor.reviews.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-200 text-center text-gray-500 flex flex-col items-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                           <AlertCircle size={32} className="text-gray-400" />
                        </div>
                        <p className="text-lg font-medium mb-2">لا توجد تقييمات بعد</p>
                        <p className="text-sm">كن أول طالب يشارك تجربته مع هذا الدكتور!</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="mt-6 text-indigo-600 font-bold hover:underline"
                        >
                            إضافة تقييم الآن
                        </button>
                    </div>
                ) : (
                    professor.reviews.map((review, idx) => (
                        <div 
                          key={review.id} 
                          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                          style={{animationDelay: `${idx * 100}ms`}}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                                        {review.studentName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{review.studentName}</h4>
                                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{review.date}</span>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 px-3 py-1.5 rounded-full flex items-center gap-1 border border-yellow-100 shadow-sm">
                                    <span className="font-bold text-yellow-700">{review.rating}</span>
                                    <StarRating rating={review.rating} size={14} />
                                </div>
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed mb-4 text-base">
                                {review.text || <span className="italic text-gray-400">بدون تعليق نصي</span>}
                            </p>

                            <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-500 border-t pt-4">
                                <span className={`px-3 py-1.5 rounded-lg border ${review.attendance >= 4 ? 'bg-green-50 text-green-700 border-green-200' : review.attendance <= 2 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                                    {review.attendance >= 4 ? '✅ يحضر بانتظام' : review.attendance <= 2 ? '❌ كثير الغياب' : '⚠️ حضور متوسط'}
                                </span>
                                <span className={`px-3 py-1.5 rounded-lg border ${review.grading >= 4 ? 'bg-blue-50 text-blue-700 border-blue-200' : review.grading <= 2 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                                    {review.grading >= 4 ? '✅ درجات عادلة' : '⚠️ درجات متفاوتة'}
                                </span>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-1 text-gray-400 hover:text-indigo-600 cursor-pointer w-fit transition-colors group">
                                <ThumbsUp size={16} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium">مفيد ({review.likes})</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        <ReviewModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            professorName={professor.name}
            onSubmit={(reviewData) => onAddReview(professor.id, reviewData)}
        />
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>(INITIAL_PROFESSORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);

  const filteredProfessors = professors.filter(p => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      p.name.toLowerCase().includes(query) || 
      p.university.toLowerCase().includes(query) ||
      p.department.toLowerCase().includes(query)
    );
    const matchesFilter = activeFilter ? p.department.includes(activeFilter) || (activeFilter === 'الكل') : true;

    return matchesSearch && matchesFilter;
  });

  const handleAddReview = (professorId: string, reviewData: Omit<Review, 'id' | 'likes' | 'date'>) => {
    const newReview: Review = {
        ...reviewData,
        id: Math.random().toString(36).substr(2, 9),
        likes: 0,
        date: new Date().toLocaleDateString('ar-EG'),
        professorId
    };

    setProfessors(prev => prev.map(prof => {
        if (prof.id === professorId) {
            return { ...prof, reviews: [newReview, ...prof.reviews] };
        }
        return prof;
    }));

    if (selectedProfessor && selectedProfessor.id === professorId) {
        setSelectedProfessor(prev => prev ? { ...prev, reviews: [newReview, ...prev.reviews] } : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Cairo']">
      <Header 
        goHome={() => setSelectedProfessor(null)} 
      />
      
      <main className="flex-1">
        {selectedProfessor ? (
          <ProfessorDetail 
            professor={selectedProfessor} 
            onBack={() => setSelectedProfessor(null)}
            onAddReview={handleAddReview}
          />
        ) : (
          <>
            <SearchHero 
              onSearch={setSearchQuery} 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            <ProfessorList 
                professors={filteredProfessors} 
                onSelect={setSelectedProfessor} 
            />
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <GraduationCap className="text-indigo-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">قيّم دكتورك</span>
            </div>
            <p className="mb-6 text-gray-600 max-w-md mx-auto">منصة طلابية مستقلة تهدف لتحسين البيئة التعليمية من خلال الشفافية وتبادل الخبرات.</p>
            <div className="flex justify-center gap-6 text-sm font-medium text-gray-500">
               <a href="#" className="hover:text-indigo-600">سياسة الخصوصية</a>
               <a href="#" className="hover:text-indigo-600">شروط الاستخدام</a>
               <a href="#" className="hover:text-indigo-600">تواصل معنا</a>
            </div>
            <div className="mt-8 text-xs text-gray-400">
              جميع الحقوق محفوظة © 2024
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;