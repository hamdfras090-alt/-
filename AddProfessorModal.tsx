import React, { useState } from 'react';
import { X, UserPlus, Upload } from 'lucide-react';
import { Professor } from '../types';

interface AddProfessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (professor: Omit<Professor, 'id' | 'reviews'>) => void;
}

export const AddProfessorModal: React.FC<AddProfessorModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      university,
      department,
      image: image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' // Default image
    });
    onClose();
    // Reset form
    setName('');
    setUniversity('');
    setDepartment('');
    setImage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus size={24} />
            إضافة دكتور جديد
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">اسم الدكتور</label>
            <input 
              required
              type="text" 
              placeholder="مثال: د. محمد العلي" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">الجامعة</label>
            <input 
              required
              type="text" 
              placeholder="مثال: جامعة الملك سعود" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">القسم / التخصص</label>
            <input 
              required
              type="text" 
              placeholder="مثال: محاسبة، علوم حاسب..." 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">رابط الصورة (اختياري)</label>
            <div className="flex gap-2">
                <input 
                type="url" 
                placeholder="https://example.com/image.jpg" 
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
                <div className="bg-gray-100 border border-gray-300 rounded-xl w-14 flex items-center justify-center shrink-0">
                    {image ? <img src={image} alt="preview" className="w-full h-full object-cover rounded-xl" onError={() => setImage('')}/> : <Upload size={20} className="text-gray-400"/>}
                </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4"
          >
            إضافة للقائمة
          </button>
        </form>
      </div>
    </div>
  );
};