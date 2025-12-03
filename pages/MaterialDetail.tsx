import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Download, Share2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ACCOUTING_MATERIAL, BLANK_PDF } from '../types';

export const MaterialDetail: React.FC = () => {
  const { slug } = useParams();

  // Since we only have one material for now, check strictly or default
  if (slug !== ACCOUTING_MATERIAL.slug && slug !== 'mohasaba-1') {
      // In a real app with many items, we would find by slug. 
      // For now, if url is wrong, redirect home.
      return <Navigate to="/" replace />;
  }

  const material = ACCOUTING_MATERIAL;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = BLANK_PDF; 
    link.download = material.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
     if (navigator.share) {
        navigator.share({
          title: `ملخص ${material.title}`,
          text: material.description,
          url: window.location.href,
        }).catch(console.error);
     } else {
        alert('تم نسخ الرابط للحافظة!');
        navigator.clipboard.writeText(window.location.href);
     }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-primary">الرئيسية</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{material.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Icon Placeholder */}
                <div className="flex-shrink-0 bg-blue-50 w-24 h-24 rounded-xl flex items-center justify-center text-primary">
                  <FileText size={48} />
                </div>
                
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                    {material.title} — ملخص PDF
                  </h1>
                  <h2 className="text-lg text-gray-600 mb-4">
                    {material.fullDescription}
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">الحجم: {material.fileSize}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">الصفحات: {material.pageCount}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">الصيغة: PDF</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 border-b border-gray-100 pb-8">
                <Button onClick={handleDownload} size="lg" className="flex-1 gap-2 shadow-lg shadow-blue-200">
                  <Download size={20} />
                  تحميل الآن (PDF)
                </Button>
                <Button onClick={handleShare} variant="secondary" size="lg" className="gap-2 bg-gray-100 text-gray-700 border-none hover:bg-gray-200">
                  <Share2 size={20} />
                  مشاركة
                </Button>
              </div>

              {/* Table of Contents */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">محتويات الملخص</h3>
                <ul className="space-y-3">
                  {material.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info Note */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>
                  هذا الملخص مجهود طلابي للمساعدة في المراجعة. لا يغني عن الكتاب الجامعي أو محاضرات الدكتور.
                </p>
              </div>

              {/* Ad inside content */}
              <AdPlaceholder location="banner" className="h-auto py-8" />

              {/* Feedback Section (Mock) */}
              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <h4 className="font-bold text-gray-900 mb-3">هل كان الملخص مفيداً؟</h4>
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-2 border rounded-full hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors">نعم 👍</button>
                  <button className="px-6 py-2 border rounded-full hover:bg-red-50 hover:border-red-500 hover:text-red-700 transition-colors">لا 👎</button>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Download Card Sticky */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">تحميل سريع</h3>
              <p className="text-sm text-gray-500 mb-4">
                اسم الملف: <span dir="ltr" className="font-mono bg-gray-100 px-1 rounded">{material.fileName}</span>
              </p>
              <Button onClick={handleDownload} fullWidth className="mb-2">
                تنزيل مباشر
              </Button>
              <p className="text-xs text-center text-gray-400 mt-2">
                آمن وخالي من الفيروسات
              </p>

              {/* Sidebar Ad */}
              <div className="mt-6">
                <AdPlaceholder location="sidebar" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};